'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';

interface Student {
  _id: string;
  name: string;
  email?: string;
  studentId?: string;
  phone?: string;
  course?: string;
  year?: string;
  createdAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    phone: '',
    course: '',
    year: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.studentId && student.studentId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredStudents(filtered);
  }, [students, searchTerm]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('admin-token');
      const url = editingStudent ? `/api/students/${editingStudent._id}` : '/api/students';
      const method = editingStudent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({ name: '', email: '', studentId: '', phone: '', course: '', year: '' });
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setEditingStudent(null);
        fetchStudents();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email || '',
      studentId: student.studentId || '',
      phone: student.phone || '',
      course: student.course || '',
      year: student.year || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        fetchStudents();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to delete student');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', studentId: '', phone: '', course: '', year: '' });
    setEditingStudent(null);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading students...</p>
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
                <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
                <p className="text-sm text-muted-foreground">Manage student records</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(error || success) && (
          <Alert className={`mb-6 ${success ? 'border-green-500/20 bg-green-500/10 dark:border-green-400/20 dark:bg-green-400/10' : ''}`} variant={error ? 'destructive' : 'default'}>
            <AlertDescription>{error || success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Students ({filteredStudents.length})</CardTitle>
                <CardDescription>Manage student information and records</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student's information below.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID (Optional)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="studentId"
                            placeholder="e.g., PGS006"
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem('admin-token');
                                const response = await fetch('/api/students/next-id', {
                                  headers: { 'Authorization': `Bearer ${token}` }
                                });
                                if (response.ok) {
                                  const data = await response.json();
                                  setFormData({ ...formData, studentId: data.nextId });
                                }
                              } catch (error) {
                                console.error('Error generating ID:', error);
                              }
                            }}
                          >
                            Auto
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Add Student
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Search */}
            <div className="flex items-center space-x-2 mt-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      {student.studentId ? (
                        <Badge variant="outline">{student.studentId}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{student.email || '-'}</TableCell>
                    <TableCell>{student.course || '-'}</TableCell>
                    <TableCell>{student.year || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(student._id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No students found matching your search.' : 'No students added yet.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student's information below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-studentId">Student ID (Optional)</Label>
                  <Input
                    id="edit-studentId"
                    placeholder="e.g., PGS006"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Course</Label>
                  <Input
                    id="edit-course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Update Student
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}