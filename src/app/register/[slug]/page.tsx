"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    CheckCircle2, AlertCircle, ChevronRight, Loader2,
    Trophy, Activity, Target, Dumbbell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function RegistrationForm() {
    const params = useParams();
    const slug = params.slug as string;
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [responses, setResponses] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    useEffect(() => {
        if (slug) {
            fetchForm();
        }
    }, [slug]);

    const fetchForm = async () => {
        try {
            // Find form by slug
            const res = await fetch(`/api/sports-week/forms`);
            const allForms = await res.json();
            const currentForm = allForms.find((f: any) => f.slug === slug);

            if (!currentForm) {
                toast.error("Form not found");
                return;
            }

            setForm(currentForm);

            // Initialize responses
            const initial: Record<string, any> = {};
            currentForm.fields.forEach((f: any) => {
                if (f.type === "checkbox") initial[f.id] = [];
                else initial[f.id] = "";
            });
            setResponses(initial);

        } catch (error) {
            toast.error("Failed to load registration form");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (fieldId: string, value: any) => {
        setResponses((prev) => ({ ...prev, [fieldId]: value }));
        if (errors[fieldId]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (fieldId: string, optionValue: string, checked: boolean) => {
        setResponses((prev) => {
            const current = prev[fieldId] || [];
            const updated = checked
                ? [...current, optionValue]
                : current.filter((v: string) => v !== optionValue);
            return { ...prev, [fieldId]: updated };
        });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        form.fields.forEach((field: any) => {
            if (field.required) {
                const val = responses[field.id];
                if (!val || (Array.isArray(val) && val.length === 0)) {
                    newErrors[field.id] = `${field.label} is required`;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            toast.error("Please fill in all required fields");
            return;
        }

        setSubmitting(true);
        try {
            const studentIdField = form.fields.find((f: any) => f.type === 'studentId');
            const studentId = studentIdField ? responses[studentIdField.id] : null;

            const res = await fetch("/api/sports-week/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formId: form._id,
                    responses,
                    studentId
                }),
            });

            if (res.ok) {
                setSubmitted(true);
                toast.success("Registration successful!");
            } else {
                const err = await res.json();
                toast.error(err.error || "Submission failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8F9FA]">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#2E3192]" />
            <div className="absolute top-2 left-0 w-full h-1 bg-[#BE1E2D]" />
            <Loader2 className="h-12 w-12 animate-spin text-[#2E3192] mb-4" />
            <p className="text-xl font-bold text-[#2E3192] tracking-widest uppercase animate-pulse">Loading...</p>
        </div>
    );

    if (!form) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8F9FA]">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#2E3192]" />
            <div className="absolute top-2 left-0 w-full h-1 bg-[#BE1E2D]" />
            <AlertCircle className="h-16 w-16 text-[#BE1E2D] mb-4" />
            <h1 className="text-2xl font-bold text-[#2E3192]">Form Not Found</h1>
            <p className="text-muted-foreground mt-2">The link you followed might be broken or the form has been deleted.</p>
            <Button className="mt-6 bg-[#2E3192] hover:bg-[#2E3192]/90" onClick={() => router.push("/")}>Go Home</Button>
        </div>
    );

    if (!form.isOpen && !submitted) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <Card className="max-w-md w-full text-center p-8 bg-card/50 backdrop-blur-sm border-2">
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-6 drop-shadow-lg" />
                <h1 className="text-3xl font-bold mb-4 tracking-tight">Registration Closed</h1>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                    The registration for <strong>{form.title}</strong> is currently closed. Thank you for your interest!
                </p>
                <Button className="w-full h-12 text-lg" onClick={() => router.push("/")}>Back to Website</Button>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 py-12 px-4 relative overflow-hidden font-sans">
            {/* Logo-inspired background elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#2E3192]" />
            <div className="absolute top-2 left-0 w-full h-1 bg-[#BE1E2D]" />

            {/* Large Decorative Diamond (Matches Logo Rhombus) */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F15A24] opacity-10 rotate-45 transform pointer-events-none" />
            <div className="absolute top-1/2 -right-24 w-64 h-64 border-8 border-[#2E3192] opacity-5 rotate-45 transform pointer-events-none" />
            <div className="absolute bottom-12 left-1/4 w-32 h-32 bg-[#BE1E2D] opacity-5 rotate-45 transform pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border-t-[10px] border-t-[#F15A24] shadow-2xl overflow-hidden backdrop-blur-sm bg-white dark:bg-zinc-900/90 border-x border-b border-slate-200 dark:border-zinc-800">
                                <CardHeader className="space-y-6 pb-8 border-b text-center relative">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-4 relative">
                                            {/* Rhombus Icon Backdrop */}
                                            <div className="absolute inset-0 bg-[#F15A24] rotate-45 rounded-lg transform scale-110" />
                                            <div className="relative z-10 bg-white dark:bg-zinc-800 p-3 rotate-0 rounded-md shadow-sm">
                                                <Trophy className="h-10 w-10 text-[#2E3192] dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#2E3192] dark:text-blue-400 uppercase">
                                                PRESIDENTIAL
                                            </h1>
                                            <h2 className="text-xl md:text-2xl font-bold text-[#BE1E2D] dark:text-red-400 tracking-wide uppercase">
                                                GRADUATE SCHOOL
                                            </h2>
                                            <div className="h-1 w-20 bg-[#F15A24] mx-auto my-3" />
                                            <CardTitle className="text-lg font-semibold text-slate-600 dark:text-zinc-300 tracking-wider">
                                                {form.title}
                                            </CardTitle>
                                        </div>
                                        <CardDescription className="text-base text-slate-500 dark:text-zinc-400 max-w-lg mx-auto mt-4 px-4 line-clamp-2">
                                            {form.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-8">
                                    <form id="sports-form" onSubmit={handleSubmit} className="space-y-8">
                                        {form.fields.map((field: any) => (
                                            <motion.div
                                                key={field.id}
                                                className="space-y-3"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                            >
                                                <Label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-[#2E3192] dark:text-blue-400">
                                                    {field.label}
                                                    {field.required && <span className="text-[#BE1E2D] dark:text-red-400">*</span>}
                                                </Label>

                                                {field.type === "text" || field.type === "studentId" ? (
                                                    <Input
                                                        value={responses[field.id]}
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                        placeholder={field.placeholder}
                                                        className={`h-12 border-2 focus-visible:ring-primary ${errors[field.id] ? "border-destructive" : "border-slate-200 dark:border-zinc-800"}`}
                                                    />
                                                ) : field.type === "number" ? (
                                                    <Input
                                                        type="number"
                                                        value={responses[field.id]}
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                        placeholder={field.placeholder}
                                                        className="h-12 border-2"
                                                    />
                                                ) : field.type === "textarea" ? (
                                                    <Textarea
                                                        value={responses[field.id]}
                                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                        placeholder={field.placeholder}
                                                        rows={4}
                                                        className="border-2"
                                                    />
                                                ) : field.type === "select" ? (
                                                    <Select onValueChange={(val) => handleInputChange(field.id, val)}>
                                                        <SelectTrigger className="h-12 border-2">
                                                            <SelectValue placeholder="Select an option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options.map((opt: any) => (
                                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : field.type === "radio" ? (
                                                    <RadioGroup onValueChange={(val) => handleInputChange(field.id, val)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {field.options.map((opt: any) => (
                                                            <div key={opt.value} className="flex items-center space-x-3 p-4 border-2 rounded-xl transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                                                <RadioGroupItem value={opt.value} id={`${field.id}-${opt.value}`} />
                                                                <Label htmlFor={`${field.id}-${opt.value}`} className="flex-grow cursor-pointer font-medium">{opt.label}</Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                ) : field.type === "checkbox" ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {field.options.map((opt: any) => (
                                                            <div key={opt.value} className="flex items-center space-x-3 p-4 border-2 rounded-xl transition-colors hover:bg-muted/50 has-[button[aria-checked=true]]:border-primary has-[button[aria-checked=true]]:bg-primary/5">
                                                                <Checkbox
                                                                    id={`${field.id}-${opt.value}`}
                                                                    checked={(responses[field.id] || []).includes(opt.value)}
                                                                    onCheckedChange={(checked) => handleCheckboxChange(field.id, opt.value, !!checked)}
                                                                />
                                                                <Label htmlFor={`${field.id}-${opt.value}`} className="flex-grow cursor-pointer font-medium">{opt.label}</Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : null}

                                                {errors[field.id] && (
                                                    <p className="text-xs font-bold text-destructive animate-bounce flex items-center gap-1">
                                                        <AlertCircle size={14} /> {errors[field.id]}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </form>
                                </CardContent>
                                <CardFooter className="bg-[#2E3192]/5 dark:bg-white/5 p-8 border-t dark:border-zinc-800 flex flex-col gap-4">
                                    <Button
                                        type="submit"
                                        form="sports-form"
                                        className="w-full h-14 text-xl font-bold uppercase tracking-widest bg-[#2E3192] dark:bg-blue-600 hover:bg-[#2E3192]/90 dark:hover:bg-blue-500 shadow-xl shadow-blue-900/20 group hover:scale-[1.01] active:scale-[0.99] transition-all"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <Loader2 className="mr-2 h-6 w-6 animate-spin text-white" />
                                        ) : (
                                            <>Register Now <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </Button>
                                    <div className="flex justify-center items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-[#8E9AAF] uppercase">
                                        <span>LEAD</span>
                                        <span className="w-1 h-1 bg-[#F15A24] rounded-full" />
                                        <span>INSPIRE</span>
                                        <span className="w-1 h-1 bg-[#F15A24] rounded-full" />
                                        <span>INNOVATE</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                        >
                            <Card className="text-center p-12 shadow-2xl border-t-[10px] border-t-[#2E3192] bg-white/95 backdrop-blur-sm">
                                <div className="mb-8 flex justify-center">
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="bg-[#2E3192] p-6 rounded-full shadow-lg shadow-blue-500/30"
                                        >
                                            <CheckCircle2 className="h-20 w-20 text-white" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-4 border-2 border-dashed border-[#F15A24]/30 rounded-full"
                                        />
                                    </div>
                                </div>
                                <CardTitle className="text-4xl font-black mb-4 tracking-tighter uppercase text-[#2E3192]">Success!</CardTitle>
                                <CardDescription className="text-xl mb-8 font-medium">
                                    Your registration for <span className="text-[#BE1E2D] font-bold">{form.title}</span> has been successfully recorded.
                                </CardDescription>
                                <div className="bg-[#2E3192]/5 p-6 rounded-2xl mb-8 border border-[#2E3192]/10">
                                    <p className="text-muted-foreground italic">"Champions aren't made in gyms. Champions are made from something they have deep inside them - a desire, a dream, a vision."</p>
                                </div>
                                <Button variant="outline" className="h-12 px-8 text-lg border-2 border-[#2E3192] text-[#2E3192] hover:bg-[#2E3192] hover:text-white" onClick={() => router.push("/")}>Return to Website</Button>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function RegistrationRoot() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <RegistrationForm />
        </Suspense>
    );
}
