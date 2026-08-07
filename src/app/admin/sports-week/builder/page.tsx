"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Plus, Trash2, GripVertical, Check, Save, ChevronUp, ChevronDown,
    Type, AlignLeft, Hash, List, Radio, CheckSquare, Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion, Reorder } from "framer-motion";

const FIELD_TYPES = [
    { value: "text", label: "Short Text", icon: Type },
    { value: "textarea", label: "Paragraph", icon: AlignLeft },
    { value: "number", label: "Number", icon: Hash },
    { value: "select", label: "Dropdown", icon: List },
    { value: "radio", label: "Radio Buttons", icon: Radio },
    { value: "checkbox", label: "Checkboxes", icon: CheckSquare },
    { value: "studentId", label: "Student ID", icon: Fingerprint },
];

interface Option {
    label: string;
    value: string;
}

interface FormField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    required: boolean;
    options: Option[];
    order: number;
}

function BuilderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formId = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fields, setFields] = useState<FormField[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (formId) {
            fetchForm(formId);
        }
    }, [formId]);

    const fetchForm = async (id: string) => {
        try {
            const res = await fetch(`/api/sports-week/forms/${id}`);
            const data = await res.json();
            setTitle(data.title);
            setDescription(data.description);
            setFields(data.fields.sort((a: FormField, b: FormField) => a.order - b.order));
        } catch (error) {
            toast.error("Failed to load form");
        }
    };

    const addField = (type: string = "text") => {
        const newField: FormField = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            label: `New ${type} field`,
            placeholder: "",
            required: false,
            options: type === "select" || type === "radio" || type === "checkbox" ? [{ label: "Option 1", value: "option1" }] : [],
            order: fields.length,
        };
        setFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const addOption = (fieldId: string) => {
        setFields(fields.map((f) => {
            if (f.id === fieldId) {
                const newOptions = [...f.options, { label: `Option ${f.options.length + 1}`, value: `option${f.options.length + 1}` }];
                return { ...f, options: newOptions };
            }
            return f;
        }));
    };

    const updateOption = (fieldId: string, index: number, updates: Partial<Option>) => {
        setFields(fields.map((f) => {
            if (f.id === fieldId) {
                const newOptions = f.options.map((opt, i) => (i === index ? { ...opt, ...updates } : opt));
                return { ...f, options: newOptions };
            }
            return f;
        }));
    };

    const removeOption = (fieldId: string, index: number) => {
        setFields(fields.map((f) => {
            if (f.id === fieldId) {
                return { ...f, options: f.options.filter((_, i) => i !== index) };
            }
            return f;
        }));
    };

    const saveForm = async () => {
        if (!title) {
            toast.error("Form title is required");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                title,
                description,
                fields: fields.map((f, i) => ({ ...f, order: i })),
            };

            const url = formId ? `/api/sports-week/forms/${formId}` : "/api/sports-week/forms";
            const method = formId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success(formId ? "Form updated" : "Form created");
                router.push("/admin/sports-week");
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to save form");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <div className="flex gap-4">
                    <Button onClick={saveForm} disabled={isSaving}>
                        {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Form</>}
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Form header */}
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Form Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Sports Week 2025 Registration"
                                className="text-2xl font-bold h-14"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this form is for..."
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Form fields */}
                <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
                    {fields.map((field) => (
                        <Reorder.Item key={field.id} value={field}>
                            <Card className="relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors cursor-grab" />
                                <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
                                    <div className="flex items-center gap-2">
                                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                                        <CardTitle className="text-sm font-medium">
                                            {FIELD_TYPES.find(t => t.value === field.type)?.label} Field
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor={`req-${field.id}`} className="text-xs">Required</Label>
                                            <Switch
                                                id={`req-${field.id}`}
                                                checked={field.required}
                                                onCheckedChange={(val) => updateField(field.id, { required: val })}
                                            />
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeField(field.id)} className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Field Label</Label>
                                            <Input
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                placeholder="e.target.value"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Field Type</Label>
                                            <Select defaultValue={field.type} onValueChange={(val) => updateField(field.id, { type: val })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {FIELD_TYPES.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            <div className="flex items-center">
                                                                <type.icon className="mr-2 h-4 w-4" />
                                                                {type.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {field.type !== "textarea" && field.type !== "select" && field.type !== "radio" && field.type !== "checkbox" && (
                                        <div className="space-y-2">
                                            <Label>Placeholder</Label>
                                            <Input
                                                value={field.placeholder}
                                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                placeholder="e.g., Enter your name"
                                            />
                                        </div>
                                    )}

                                    {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                                        <div className="space-y-3 pt-2">
                                            <Label className="text-sm">Options</Label>
                                            <div className="space-y-2">
                                                {field.options.map((opt, optIndex) => (
                                                    <div key={optIndex} className="flex gap-2 items-center">
                                                        <Input
                                                            value={opt.label}
                                                            onChange={(e) => updateOption(field.id, optIndex, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                                            className="h-8"
                                                        />
                                                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeOption(field.id, optIndex)}>
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button variant="ghost" size="sm" onClick={() => addOption(field.id)} className="text-xs">
                                                    <Plus className="mr-1 h-3 w-3" /> Add Option
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {/* Add Field Buttons */}
                <div className="flex flex-wrap gap-2 justify-center p-6 border-2 border-dashed rounded-lg bg-muted/30">
                    {FIELD_TYPES.map((type) => (
                        <Button key={type.value} variant="outline" size="sm" onClick={() => addField(type.value)}>
                            <type.icon className="mr-2 h-4 w-4" /> Add {type.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SportsWeekBuilder() {
    return (
        <Suspense fallback={<div>Loading builder...</div>}>
            <BuilderContent />
        </Suspense>
    );
}
