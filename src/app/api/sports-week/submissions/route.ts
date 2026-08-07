import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SportsSubmission from '@/models/SportsSubmission';
import SportsForm from '@/models/SportsForm';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { formId, responses, studentId } = body;

        // Check if form is open
        const form = await SportsForm.findById(formId);
        if (!form || !form.isOpen) {
            return NextResponse.json({ error: 'Form is closed or does not exist' }, { status: 400 });
        }

        // Check for duplicate submission if studentId is provided
        if (studentId) {
            const existing = await SportsSubmission.findOne({ formId, studentId });
            if (existing) {
                return NextResponse.json({ error: 'You have already submitted this form' }, { status: 400 });
            }
        }

        const submission = await SportsSubmission.create({
            formId,
            responses,
            studentId
        });

        return NextResponse.json(submission, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Duplicate submission detected' }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const formId = searchParams.get('formId');

        if (!formId) {
            return NextResponse.json({ error: 'formId is required' }, { status: 400 });
        }

        await connectDB();
        const submissions = await SportsSubmission.find({ formId }).sort({ submittedAt: -1 });
        return NextResponse.json(submissions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
