'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Calendar, Save, Users } from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  email?: string;
  studentId?: string;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendance();
    }
  }, [selectedDate, students]);

  const checkAuth = () => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
        
        // Initialize attendance records for all students
        const initialRecords = data.students.map((student: Student) => ({
          studentId: student._id,
          status: 'present' as const,
          notes: '',
        }));
        setAttendanceRecords(initialRecords);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/attendance?date=${selectedDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const existingAttendance = data.attendance;

        // Update attendance records with existing data
        const updatedRecords = students.map((student) => {
          const existing = existingAttendance.find((a: any) => a.studentId._id === student._id);
          return {
            studentId: student._id,
            status: existing ? existing.status : 'present',
            notes: existing ? existing.notes || '' : '',
          };
        });
        setAttendanceRecords(updatedRecords);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const updateAttendanceRecord = (studentId: string, field: keyof AttendanceRecord, value: string) => {
    setAttendanceRecords(prev =>
      prev.map(record =>
        record.studentId === studentId
          ? { ...record, [field]: value }
          : record
      )
    );
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/attendance/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          attendanceRecords,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Attendance saved successfully! ${data.successful} records processed.`);
        if (data.errors.length > 0) {
          setError(`${data.failed} records failed to save.`);
        }
      } else {
        setError(data.error || 'Failed to save attendance');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const markAllAs = (status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(prev =>
      prev.map(record => ({ ...record, status }))
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'present':
        return 'default';
      case 'absent':
        return 'destructive';
      case 'late':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusCount = (status: string) => {
    return attendanceRecords.filter(record => record.status === status).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/admin/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Take Attendance</h1>
                <p className="text-sm text-muted-foreground">Mark student attendance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(error || success) && (
          <Alert className={`mb-6 ${success ? 'border-green-200 bg-green-50' : ''}`} variant={error ? 'destructive' : 'default'}>
            <AlertDescription>{error || success}</AlertDescription>
          </Alert>
        )}

        {/* Date Selection and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-green-600">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {getStatusCount('present')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-red-600">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {getStatusCount('absent')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-yellow-600">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {getStatusCount('late')}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance for {new Date(selectedDate).toLocaleDateString()}
                </CardTitle>
                <CardDescription>
                  Mark attendance for {students.length} students
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAllAs('present')}
                >
                  Mark All Present
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAllAs('absent')}
                >
                  Mark All Absent
                </Button>
                <Button
                  onClick={handleSaveAttendance}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const record = attendanceRecords.find(r => r.studentId === student._id);
                  return (
                    <TableRow key={student._id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        {student.studentId ? (
                          <Badge variant="outline">{student.studentId}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={record?.status || 'present'}
                          onValueChange={(value) => updateAttendanceRecord(student._id, 'status', value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Add notes..."
                          value={record?.notes || ''}
                          onChange={(e) => updateAttendanceRecord(student._id, 'notes', e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      No students found. Add students first.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}