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
import { ArrowLeft, Calendar, Download, Filter, BarChart3 } from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  email?: string;
  studentId?: string;
}

interface AttendanceRecord {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    studentId?: string;
  };
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
  createdAt: string;
}

export default function ReportsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    studentId: 'all',
    status: 'all',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchStudents();
    fetchAttendance();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [attendanceRecords, filters]);

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
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/attendance', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceRecords(data.attendance);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setError('Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...attendanceRecords];

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(record => 
        new Date(record.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(record => 
        new Date(record.date) <= new Date(filters.endDate)
      );
    }

    // Filter by student
    if (filters.studentId && filters.studentId !== 'all') {
      filtered = filtered.filter(record => 
        record.studentId._id === filters.studentId
      );
    }

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(record => 
        record.status === filters.status
      );
    }

    setFilteredRecords(filtered);
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      studentId: 'all',
      status: 'all',
    });
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

  const getStatusStats = () => {
    const total = filteredRecords.length;
    const present = filteredRecords.filter(r => r.status === 'present').length;
    const absent = filteredRecords.filter(r => r.status === 'absent').length;
    const late = filteredRecords.filter(r => r.status === 'late').length;

    return { total, present, absent, late };
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Student Name', 'Student ID', 'Status', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        new Date(record.date).toLocaleDateString(),
        record.studentId.name,
        record.studentId.studentId || '',
        record.status,
        record.notes || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading reports...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Attendance Reports</h1>
                <p className="text-sm text-muted-foreground">View attendance history and statistics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <Badge variant="default" className="bg-green-500">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <Badge variant="destructive">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.absent / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <BarChart3 className="h-3 w-3" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.late / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance History
                </CardTitle>
                <CardDescription>
                  Filter and view attendance records
                </CardDescription>
              </div>
              <Button onClick={exportToCSV} disabled={filteredRecords.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={filters.studentId} onValueChange={(value) => setFilters({ ...filters, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All students" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All students</SelectItem>
                    {students.map((student) => (
                      <SelectItem key={student._id} value={student._id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Recorded At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {record.studentId.name}
                    </TableCell>
                    <TableCell>
                      {record.studentId.studentId ? (
                        <Badge variant="outline">{record.studentId.studentId}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.notes || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(record.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No attendance records found matching your filters.
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