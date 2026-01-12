"use client"

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layout, Zap, Atom, Database, Server, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "HTML5 & Semantic Web",
    description: "Master the structure of the web. Learn about semantic tags, forms, and accessibility.",
    icon: <Layout className="h-6 w-6" />,
    color: "bg-orange-500",
    topics: ["Tags & Attributes", "Semantic HTML", "Forms & Validation", "SEO Basics"],
  },
  {
    title: "CSS3 & Modern Styling",
    description: "Design beautiful interfaces. Flexbox, Grid, Animations, and Responsive Design.",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-blue-500",
    topics: ["Flexbox & Grid", "CSS Variables", "Tailwind CSS", "Animations"],
  },
  {
    title: "JavaScript (ES6+)",
    description: "The logic of the web. Functional programming, DOM manipulation, and Async/Await.",
    icon: <Code2 className="h-6 w-6" />,
    color: "bg-yellow-500",
    topics: ["ES6 Syntax", "DOM Manipulation", "Fetch API", "Promises"],
  },
  {
    title: "React.js",
    description: "Modern UI library. Components, Hooks, State Management, and Virtual DOM.",
    icon: <Atom className="h-6 w-6" />,
    color: "bg-cyan-500",
    topics: ["JSX", "useState & useEffect", "Props", "Context API"],
  },
  {
    title: "Next.js & App Router",
    description: "Production-ready framework. Server components, Routing, and Optimizations.",
    icon: <Server className="h-6 w-6" />,
    color: "bg-black",
    topics: ["App Router", "Server Actions", "SSR & ISR", "API Routes"],
  },
  {
    title: "Backend & Database",
    description: "Scale your apps. Supabase, PostgreSQL, and Authentication.",
    icon: <Database className="h-6 w-6" />,
    color: "bg-emerald-500",
    topics: ["SQL Basics", "Auth", "Storage", "Realtime"],
  },
];

export default function SyllabusPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Learning <span className="text-primary">Path</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Follow our structured curriculum to become a professional developer.</p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Central Line */}
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border hidden md:block" />

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col items-center md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot on line */}
              <div className="absolute left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />

              {/* Content Card */}
              <div className="w-full md:w-[45%]">
                <Card className="overflow-hidden border-2 transition-all hover:border-primary/30">
                  <div className={`h-1.5 w-full ${step.color}`} />
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      {step.icon}
                      <span className="text-sm font-bold uppercase tracking-wider">Step {index + 1}</span>
                    </div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-muted-foreground">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="bg-secondary/10">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spacing for layout */}
              <div className="hidden w-[45%] md:block" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resource Footer */}
      <div className="mt-24 rounded-3xl border bg-card p-12 text-center">
        <h2 className="text-2xl font-bold">Ready to dive in?</h2>
        <p className="mt-2 text-muted-foreground">Check out our resources page for learning materials for each step.</p>
        <Button size="lg" className="mt-8 rounded-full px-8 h-12" asChild>
          <Link href="/resources">
            View Resources <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
