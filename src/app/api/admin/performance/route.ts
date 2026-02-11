import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { verifyAdminToken } from '@/lib/middleware';

export interface PerformanceRecord {
  _id: string;
  studentId: string;
  studentName: string;
  totalPoints: number;
  totalDays: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  attendancePercentage: number;
  rank: number;
}

export interface PerformanceResponse {
  leaderboard: PerformanceRecord[];
  generatedAt: string;
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const admin = verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Aggregate attendance data with performance calculations
    const performanceData = await Attendance.aggregate([
      {
        $group: {
          _id: '$studentId',
          presentCount: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          lateCount: {
            $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
          },
          absentCount: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          },
          totalDays: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $match: {
          'student.isActive': true,
          'student.isVerified': true
        }
      },
      {
        $project: {
          _id: 1,
          studentId: '$student.studentId',
          studentName: '$student.name',
          presentCount: 1,
          lateCount: 1,
          absentCount: 1,
          totalDays: 1,
          totalPoints: {
            $add: [
              '$presentCount',
              { $multiply: ['$lateCount', 0.5] }
            ]
          },
          attendancePercentage: {
            $multiply: [
              {
                $divide: [
                  { $add: ['$presentCount', { $multiply: ['$lateCount', 0.5] }] },
                  '$totalDays'
                ]
              },
              100
            ]
          }
        }
      },
      { $sort: { totalPoints: -1, studentName: 1 } }
    ]);

    // Get all verified students to include those with no attendance
    const allStudents = await Student.find({ 
      isActive: true, 
      isVerified: true 
    }).select('_id name studentId');

    // Create a map of students with attendance
    const studentsWithAttendance = new Set(
      performanceData.map(record => record._id.toString())
    );

    // Add students with no attendance (0 points)
    const studentsWithoutAttendance = allStudents
      .filter(student => !studentsWithAttendance.has(student._id.toString()))
      .map(student => ({
        _id: student._id,
        studentId: student.studentId || '',
        studentName: student.name,
        presentCount: 0,
        lateCount: 0,
        absentCount: 0,
        totalDays: 0,
        totalPoints: 0,
        attendancePercentage: 0,
      }));

    // Combine and sort all students
    const allPerformanceData = [...performanceData, ...studentsWithoutAttendance]
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        return a.studentName.localeCompare(b.studentName);
      });

    // Add rank to each record
    const leaderboard: PerformanceRecord[] = allPerformanceData.map((record, index) => ({
      _id: record._id.toString(),
      studentId: record.studentId,
      studentName: record.studentName,
      totalPoints: Math.round(record.totalPoints * 10) / 10, // Round to 1 decimal
      totalDays: record.totalDays,
      presentCount: record.presentCount,
      lateCount: record.lateCount,
      absentCount: record.absentCount,
      attendancePercentage: Math.round(record.attendancePercentage * 10) / 10, // Round to 1 decimal
      rank: index + 1,
    }));

    const response: PerformanceResponse = {
      leaderboard,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Performance endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
}
