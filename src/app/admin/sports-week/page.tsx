"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, BarChart3, Trash2, ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SportsForm {
    _id: string;
    title: string;
    description: string;
    isOpen: boolean;
    slug: string;
    createdAt: string;
}

export default function SportsWeekAdmin() {
    const [forms, setForms] = useState<SportsForm[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const res = await fetch("/api/sports-week/forms");
            const data = await res.json();
            setForms(data);
        } catch (error) {
            toast.error("Failed to fetch forms");
        } finally {
            setLoading(false);
        }
    };

    const deleteForm = async (id: string) => {
        if (!confirm("Are you sure you want to delete this form?")) return;

        try {
            const res = await fetch(`/api/sports-week/forms/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Form deleted");
                fetchForms();
            }
        } catch (error) {
            toast.error("Failed to delete form");
        }
    };

    const toggleStatus = async (form: SportsForm) => {
        try {
            const res = await fetch(`/api/sports-week/forms/${form._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isOpen: !form.isOpen }),
            });
            if (res.ok) {
                toast.success(`Form ${!form.isOpen ? "opened" : "closed"}`);
                fetchForms();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sports Week Manager</h1>
                    <p className="text-muted-foreground">Manage registration forms and track participation.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/sports-week/builder">
                        <Plus className="mr-2 h-4 w-4" /> Create New Form
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="h-24 bg-muted" />
                            <CardContent className="h-32" />
                        </Card>
                    ))}
                </div>
            ) : forms.length === 0 ? (
                <Card className="text-center py-20">
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold">No forms found</h3>
                            <p className="text-muted-foreground mb-6">Create your first sports week registration form to get started.</p>
                            <Button asChild>
                                <Link href="/admin/sports-week/builder">
                                    <Plus className="mr-2 h-4 w-4" /> Create Form
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forms.map((form) => (
                        <Card key={form._id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <Badge variant={form.isOpen ? "default" : "secondary"}>
                                        {form.isOpen ? "Open" : "Closed"}
                                    </Badge>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => toggleStatus(form)}>
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteForm(form._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle className="mt-2">{form.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{form.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-sm text-muted-foreground mb-4">
                                    Created: {new Date(form.createdAt).toLocaleDateString()}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/admin/sports-week/builder?id=${form._id}`}>
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/admin/sports-week/analytics/${form._id}`}>
                                            <BarChart3 className="mr-2 h-4 w-4" /> Stats
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full col-span-2" asChild>
                                        <Link href={`/register/${form.slug}`} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" /> View Public Link
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
