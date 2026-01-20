'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, UserPlus, LogOut, BarChart3 } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const today = new Date().toISOString().split('T')[0];

      // Fetch students
      const studentsResponse = await fetch('/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Fetch today's attendance
      const attendanceResponse = await fetch(`/api/attendance?date=${today}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (studentsResponse.ok && attendanceResponse.ok) {
        const studentsData = await studentsResponse.json();
        const attendanceData = await attendanceResponse.json();

        const totalStudents = studentsData.students.length;
        const attendance = attendanceData.attendance;

        const presentToday = attendance.filter((a: any) => a.status === 'present').length;
        const absentToday = attendance.filter((a: any) => a.status === 'absent').length;
        const lateToday = attendance.filter((a: any) => a.status === 'late').length;

        setStats({
          totalStudents,
          presentToday,
          absentToday,
          lateToday,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin-token');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('admin-token');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Student Management System</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Active students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <Badge variant="default" className="bg-green-500">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.presentToday}</div>
              <p className="text-xs text-muted-foreground">Students present</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <Badge variant="destructive">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.absentToday}</div>
              <p className="text-xs text-muted-foreground">Students absent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Today</CardTitle>
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.lateToday}</div>
              <p className="text-xs text-muted-foreground">Students late</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/students')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Manage Students
              </CardTitle>
              <CardDescription>
                Add, edit, or remove students from the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Go to Students
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/attendance')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Take Attendance
              </CardTitle>
              <CardDescription>
                Mark student attendance for today or any date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Take Attendance
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/reports')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                View Reports
              </CardTitle>
              <CardDescription>
                View attendance history and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}