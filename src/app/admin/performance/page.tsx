'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Trophy, RefreshCw, Medal, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceRecord {
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

export default function PerformancePage() {
  const [leaderboard, setLeaderboard] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchLeaderboard();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchLeaderboard = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/performance', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } else if (response.status === 401) {
        router.push('/admin/login');
      } else {
        setError('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return 'default';
    if (rank === 2) return 'secondary';
    if (rank === 3) return 'outline';
    return 'outline';
  };

  const getChartData = () => {
    return leaderboard.slice(0, 10).map(record => ({
      name: record.studentName.length > 15 
        ? record.studentName.substring(0, 15) + '...' 
        : record.studentName,
      points: record.totalPoints,
      percentage: record.attendancePercentage,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
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
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Student Performance Leaderboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Rankings based on attendance scores (Present=1pt, Late=0.5pt, Absent=0pt)
                </p>
              </div>
            </div>
            <Button
              onClick={() => fetchLeaderboard(true)}
              disabled={refreshing}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Top 3 Students Highlight */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboard.slice(0, 3).map((student) => (
              <Card 
                key={student._id}
                className={`${
                  student.rank === 1 
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20' 
                    : student.rank === 2
                    ? 'border-gray-400 bg-gray-50 dark:bg-gray-950/20'
                    : 'border-amber-600 bg-amber-50 dark:bg-amber-950/20'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getRankIcon(student.rank)}
                      Rank #{student.rank}
                    </CardTitle>
                    <Badge variant={getRankBadgeVariant(student.rank)}>
                      {student.totalPoints} pts
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg mb-2">{student.studentName}</p>
                  {student.studentId && (
                    <p className="text-sm text-muted-foreground mb-2">ID: {student.studentId}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Attendance</p>
                      <p className="font-semibold">{student.attendancePercentage.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Days</p>
                      <p className="font-semibold">{student.totalDays}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Performance Chart */}
        {leaderboard.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top 10 Students Performance
              </CardTitle>
              <CardDescription>
                Visual representation of attendance points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="points" fill="#8884d8" name="Total Points" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Leaderboard</CardTitle>
            <CardDescription>
              All students ranked by attendance performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead className="text-right">Total Points</TableHead>
                  <TableHead className="text-right">Attendance %</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                  <TableHead className="text-center">Late</TableHead>
                  <TableHead className="text-center">Absent</TableHead>
                  <TableHead className="text-right">Total Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((student) => (
                  <TableRow 
                    key={student._id}
                    className={student.rank <= 3 ? 'bg-muted/50' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(student.rank)}
                        #{student.rank}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{student.studentName}</TableCell>
                    <TableCell>
                      {student.studentId ? (
                        <Badge variant="outline">{student.studentId}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {student.totalPoints.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={
                        student.attendancePercentage >= 90 ? 'default' :
                        student.attendancePercentage >= 75 ? 'secondary' :
                        'destructive'
                      }>
                        {student.attendancePercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-green-600 dark:text-green-400">
                      {student.presentCount}
                    </TableCell>
                    <TableCell className="text-center text-yellow-600 dark:text-yellow-400">
                      {student.lateCount}
                    </TableCell>
                    <TableCell className="text-center text-red-600 dark:text-red-400">
                      {student.absentCount}
                    </TableCell>
                    <TableCell className="text-right">{student.totalDays}</TableCell>
                  </TableRow>
                ))}
                {leaderboard.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      No performance data available yet. Start taking attendance to see rankings!
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
