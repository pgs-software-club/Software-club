import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SportsForm from '@/models/SportsForm';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const form = await SportsForm.findById(params.id);
        if (!form) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 });
        }
        return NextResponse.json(form);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await req.json();
        const form = await SportsForm.findByIdAndUpdate(params.id, body, { new: true });
        if (!form) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 });
        }
        return NextResponse.json(form);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const form = await SportsForm.findByIdAndDelete(params.id);
        if (!form) {
            return NextResponse.json({ error: 'Form not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Form deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
