"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Download, Users, Calendar, Filter,
    BarChart as BarChartIcon, PieChart as PieChartIcon, Table as TableIcon,
    ChevronsUpDown, Check
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function AnalyticsContent() {
    const params = useParams();
    const router = useRouter();
    const formId = params.id as string;

    const [form, setForm] = useState<any>(null);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (formId) {
            fetchData();
        }
    }, [formId]);

    const fetchData = async () => {
        try {
            const [formRes, subRes] = await Promise.all([
                fetch(`/api/sports-week/forms/${formId}`),
                fetch(`/api/sports-week/submissions?formId=${formId}`)
            ]);

            const formData = await formRes.json();
            const subData = await subRes.json();

            setForm(formData);
            setSubmissions(subData);
        } catch (error) {
            toast.error("Failed to load analytics data");
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (submissions.length === 0) return;

        // Create CSV header
        const headers = ['Submission Date', ...form.fields.map((f: any) => f.label)];

        // Create CSV rows
        const rows = submissions.map(sub => {
            const rowData = [
                new Date(sub.submittedAt).toLocaleString(),
                ...form.fields.map((field: any) => {
                    const val = sub.responses[field.id];
                    if (Array.isArray(val)) {
                        return `"${val.join(', ')}"`;
                    }
                    const stringVal = val ? String(val).replace(/"/g, '""') : '';
                    return `"${stringVal}"`;
                })
            ];
            return rowData.join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${form.title.replace(/\s+/g, '_')}_Responses.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Exported to CSV");
    };

    const getFieldStats = (fieldId: string) => {
        const counts: Record<string, number> = {};
        submissions.forEach(sub => {
            const val = sub.responses[fieldId];
            if (Array.isArray(val)) {
                val.forEach(v => {
                    counts[v] = (counts[v] || 0) + 1;
                });
            } else if (val) {
                counts[val] = (counts[val] || 0) + 1;
            }
        });

        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    };

    const chartableFields = useMemo(() => {
        if (!form) return [];
        return form.fields.filter((f: any) => ['select', 'radio', 'checkbox'].includes(f.type));
    }, [form]);

    if (loading) return <div className="p-20 text-center">Loading analytics...</div>;
    if (!form) return <div className="p-20 text-center">Form not found</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/admin/sports-week")} className="mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">{form.title} Analytics</h1>
                    <p className="text-muted-foreground">Detailed overview of registrations and participation.</p>
                </div>
                <Button onClick={exportToCSV} disabled={submissions.length === 0}>
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{submissions.length}</div>
                        <p className="text-xs text-muted-foreground">Across all fields</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Form Status</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <Badge variant={form.isOpen ? "default" : "secondary"} className="text-lg px-3">
                                {form.isOpen ? "Accepting Responses" : "Closed"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Field Count</CardTitle>
                        <Filter className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {form.fields.length}
                        </div>
                        <p className="text-xs text-muted-foreground">Active entry points</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="visuals" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="visuals">
                        <BarChartIcon className="mr-2 h-4 w-4" /> Visual Insights
                    </TabsTrigger>
                    <TabsTrigger value="responses">
                        <TableIcon className="mr-2 h-4 w-4" /> All Responses
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="visuals" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {chartableFields.map((field: any) => {
                            const data = getFieldStats(field.id);
                            return (
                                <Card key={field.id}>
                                    <CardHeader>
                                        <CardTitle>{field.label}</CardTitle>
                                        <CardDescription>Distribution Analysis</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {chartableFields.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Categories</CardTitle>
                                    <CardDescription>Primary field breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={getFieldStats(chartableFields[0].id)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {getFieldStats(chartableFields[0].id).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="responses">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Detailed Response Log</CardTitle>
                                <CardDescription>Complete list of all submitted entries.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px]">Date</TableHead>
                                        {form.fields.map((field: any) => (
                                            <TableHead key={field.id} className="min-w-[120px]">{field.label}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {submissions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={form.fields.length + 1} className="py-20 text-center text-muted-foreground">
                                                No submissions recorded yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        submissions.map((sub, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="text-xs font-mono">
                                                    {new Date(sub.submittedAt).toLocaleDateString()}
                                                </TableCell>
                                                {form.fields.map((field: any) => {
                                                    const val = sub.responses[field.id];
                                                    return (
                                                        <TableCell key={field.id}>
                                                            {Array.isArray(val) ? (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {val.map((v, i) => (
                                                                        <Badge key={i} variant="outline" className="text-[10px]">{v}</Badge>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span>{val || '-'}</span>
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function AnalyticsRoot() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Loading stats...</div>}>
            <AnalyticsContent />
        </Suspense>
    );
}
