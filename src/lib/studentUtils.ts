import Student from '@/models/Student';

export async function generateNextStudentId(): Promise<string> {
  try {
    // Find the highest existing student ID
    const students = await Student.find({ 
      studentId: { $regex: /^PGS\d+$/ },
      isActive: true 
    }).sort({ studentId: -1 }).limit(1);

    if (students.length === 0) {
      return 'PGS001';
    }

    const lastId = students[0].studentId;
    const lastNumber = parseInt(lastId.replace('PGS', ''));
    const nextNumber = lastNumber + 1;
    
    return `PGS${nextNumber.toString().padStart(3, '0')}`;
  } catch (error) {
    console.error('Error generating student ID:', error);
    // Fallback to a random number if there's an error
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    return `PGS${randomNum.toString().padStart(3, '0')}`;
  }
}