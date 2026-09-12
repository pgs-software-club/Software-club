"use client"
import { motion } from "framer-motion";
import { Code2, Layout, Zap, Database, Server, Rocket, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { hackathon } from "@/lib/hackathon";

const phases = [
  {
    phase: "Phase 1: Web Foundations",
    weeks: "Week 1-2",
    sessions: "4 sessions",
    focus: "HTML, CSS, JS, Git & GitHub",
    project: "Personal Portfolio Website",
    color: "bg-orange-500",
    topics: ["HTML5 Semantics", "CSS Flexbox/Grid", "JavaScript DOM", "Git Basics", "GitHub Pages"],
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    phase: "Phase 2: Frontend Development",
    weeks: "Week 3-6",
    sessions: "8 sessions",
    focus: "React, Tailwind, State Management",
    project: "E-commerce Store Frontend",
    color: "bg-blue-500",
    topics: ["React Components", "Hooks & State", "Tailwind CSS", "React Router", "API Integration"],
    icon: <Layout className="w-6 h-6" />,
  },
  {
    phase: "Phase 3: Backend & APIs",
    weeks: "Week 7-10",
    sessions: "8 sessions",
    focus: "Node.js, Express, MongoDB",
    project: "REST API with Authentication",
    color: "bg-purple-500",
    topics: ["REST APIs", "Express Middleware", "MongoDB & Mongoose", "JWT Auth", "Error Handling"],
    icon: <Server className="w-6 h-6" />,
  },
  {
    phase: "Phase 4: Full-Stack Integration",
    weeks: "Week 11-12",
    sessions: "4 sessions",
    focus: "Connect Frontend + Backend",
    project: "Full-Stack E-commerce App",
    color: "bg-green-500",
    topics: ["CORS & Security", "Environment Variables", "State Management", "File Uploads", "Deployment"],
    icon: <Zap className="w-6 h-6" />,
  },
  {
    phase: "Phase 5: Databases & ORM",
    weeks: "Week 13-14",
    sessions: "4 sessions",
    focus: "PostgreSQL, Prisma, Docker",
    project: "Database Migration & Dockerization",
    color: "bg-cyan-500",
    topics: ["SQL & PostgreSQL", "Prisma ORM", "Docker Containers", "Docker Compose", "Database Relations"],
    icon: <Database className="w-6 h-6" />,
  },
  {
    phase: "Phase 6: Production & Next.js",
    weeks: "Week 15-16",
    sessions: "4 sessions",
    focus: "Next.js, CI/CD, Final Project",
    project: "Production-Ready Application",
    color: "bg-indigo-500",
    topics: ["Next.js App Router", "Server Components", "CI/CD Pipeline", "Performance Optimization", "Team Projects"],
    icon: <Rocket className="w-6 h-6" />,
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen text-foreground px-4 py-16 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-balance text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Full-Stack <span className="text-gradient">Roadmap</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            16-week curriculum • 2 sessions/week • Portfolio-ready projects
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-20 rounded-2xl border border-border bg-card/50 py-8 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground mb-1">4</p>
            <p className="text-sm text-muted-foreground">Months</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground mb-1">32</p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground mb-1">6+</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
        </motion.div>

        {/* Hackathon Milestone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20 rounded-2xl border border-primary/30 bg-primary/5 p-8 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {hackathon.dates} • {hackathon.duration}
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                Milestone: SparkX Hackathon 2026
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          <p className="text-muted-foreground mb-6">
            The curriculum builds toward one thing: shipping something real under a deadline. Ten
            teams of two to four students get 24 hours across two days to build a working prototype
            in AI &amp; Machine Learning, Cybersecurity or Open Innovation — mentored through five
            checkpoint rounds and judged on the Friday morning. {hackathon.prizePool} in prizes.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "AI & Machine Learning",
              "Cybersecurity",
              "Open Innovation",
              "Git & Version Control",
              "Live Demo & Pitch",
            ].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-background text-muted-foreground text-xs rounded-full border border-border"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href={hackathon.registrationUrl} target="_blank" rel="noreferrer">
                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/hackathon">Event Details</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Registration closes {hackathon.registrationCloses} • {hackathon.fee}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-16">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              data-reveal
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="relative"
            >
              {/* Phase Card */}
              <div className="lift rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                {/* Phase Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {phase.weeks} • {phase.sessions}
                    </p>
                    <h3 className="text-2xl font-bold text-foreground">
                      {phase.phase}
                    </h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-white`}>
                    {phase.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      Focus
                    </p>
                    <p className="text-lg text-muted-foreground">{phase.focus}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Final Project</p>
                    <p className="font-medium text-foreground">{phase.project}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      Key Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {phase.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center border-t border-border pt-16"
        >
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            Start Your Journey Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our structured program with weekly projects and code reviews.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/resources">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                View Resources
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                See Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        data-reveal
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center text-muted-foreground text-sm"
      >
        <p>2 sessions/week • Wednesday & Thursday • 90 minutes each</p>
      </motion.div>
    </div>
  );
}