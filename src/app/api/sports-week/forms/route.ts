import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SportsForm from '@/models/SportsForm';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const forms = await SportsForm.find({}).sort({ createdAt: -1 });
        return NextResponse.json(forms);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Generate a unique slug if not provided
        if (!body.slug) {
            body.slug = Math.random().toString(36).substring(2, 12);
        }

        const form = await SportsForm.create(body);
        return NextResponse.json(form, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
