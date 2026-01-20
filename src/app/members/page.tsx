import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, GraduationCap, Mail, Phone } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

async function getStudents() {
  try {
    await connectDB();
    const students = await Student.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return students.map(student => ({
      ...student,
      _id: student._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

export default async function MembersPage() {
  const members = await getStudents();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
          Our Community
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Meet the <span className="text-primary">Students</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The dedicated students at Presidential Graduate School pursuing their academic excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <Card key={member._id} className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            
            <CardHeader className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-muted transition-transform group-hover:scale-105 group-hover:border-primary/20 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="line-clamp-1">{member.name}</CardTitle>
              <CardDescription>
                {member.studentId ? `ID: ${member.studentId}` : 'Student'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{member.course || 'N/A'}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Course</span>
                  </div>
                  <div className="h-8 w-[1px] bg-border" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{member.year || 'N/A'}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Year</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Badge variant="outline" className="gap-1">
                    <Award className="h-3 w-3" />
                    Active Student
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {members.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No students found</h3>
            <p className="text-muted-foreground">Students will appear here once they are added by the admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
