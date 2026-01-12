"use client"

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, Globe, Terminal } from "lucide-react";

const resources = [
  {
    category: "Version Control",
    items: [
      { name: "Git Documentation", description: "Official Git reference and tutorials.", link: "https://git-scm.com/doc", icon: <Terminal className="h-5 w-5" /> },
      { name: "GitHub Skills", description: "Interactive courses to learn GitHub.", link: "https://skills.github.com", icon: <Globe className="h-5 w-5" /> },
      { name: "Pro Git Book", description: "Free comprehensive Git book online.", link: "https://git-scm.com/book/en/v2", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "Frontend Fundamentals",
    items: [
      { name: "MDN Web Docs", description: "Complete HTML, CSS, and JavaScript reference.", link: "https://developer.mozilla.org", icon: <Globe className="h-5 w-5" /> },
      { name: "JavaScript.info", description: "Modern JavaScript tutorial from basics to advanced.", link: "https://javascript.info", icon: <BookOpen className="h-5 w-5" /> },
      { name: "CSS-Tricks", description: "Tips, tricks, and techniques on using CSS.", link: "https://css-tricks.com", icon: <Globe className="h-5 w-5" /> },
      { name: "W3Schools", description: "Web development tutorials for beginners.", link: "https://www.w3schools.com", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "TypeScript",
    items: [
      { name: "TypeScript Handbook", description: "Official TypeScript documentation.", link: "https://www.typescriptlang.org/docs", icon: <Globe className="h-5 w-5" /> },
      { name: "TypeScript Deep Dive", description: "Free online book on TypeScript.", link: "https://basarat.gitbook.io/typescript", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Total TypeScript", description: "Free TypeScript tutorials and workshops.", link: "https://www.totaltypescript.com", icon: <Video className="h-5 w-5" /> },
    ],
  },
  {
    category: "React & Next.js",
    items: [
      { name: "React Docs", description: "Official React documentation with examples.", link: "https://react.dev", icon: <Globe className="h-5 w-5" /> },
      { name: "Next.js Learn", description: "Interactive Next.js tutorial course.", link: "https://nextjs.org/learn", icon: <BookOpen className="h-5 w-5" /> },
      { name: "React TypeScript Cheatsheet", description: "React patterns in TypeScript.", link: "https://react-typescript-cheatsheet.netlify.app", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "Styling",
    items: [
      { name: "Tailwind CSS Docs", description: "Official Tailwind CSS documentation.", link: "https://tailwindcss.com/docs", icon: <Globe className="h-5 w-5" /> },
      { name: "Tailwind UI", description: "Beautiful UI components built with Tailwind.", link: "https://tailwindui.com", icon: <Globe className="h-5 w-5" /> },
      { name: "Shadcn/UI", description: "Beautifully designed accessible components.", link: "https://ui.shadcn.com", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js Docs", description: "Official Node.js documentation.", link: "https://nodejs.org/docs", icon: <Terminal className="h-5 w-5" /> },
      { name: "Express.js Guide", description: "Fast, minimalist web framework for Node.js.", link: "https://expressjs.com", icon: <Terminal className="h-5 w-5" /> },
      { name: "JWT.io", description: "Introduction to JSON Web Tokens.", link: "https://jwt.io/introduction", icon: <Terminal className="h-5 w-5" /> },
      { name: "Postman Learning", description: "API testing and development tutorials.", link: "https://learning.postman.com", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB University", description: "Free MongoDB courses and certifications.", link: "https://university.mongodb.com", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Prisma Docs", description: "Next-generation ORM for Node.js and TypeScript.", link: "https://www.prisma.io/docs", icon: <Globe className="h-5 w-5" /> },
      { name: "SQL Tutorial", description: "Learn SQL with interactive exercises.", link: "https://www.sqltutorial.org", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "Python",
    items: [
      { name: "Python.org Tutorial", description: "Official Python programming tutorial.", link: "https://docs.python.org/3/tutorial", icon: <Globe className="h-5 w-5" /> },
      { name: "Real Python", description: "Python tutorials and articles for developers.", link: "https://realpython.com", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Automate the Boring Stuff", description: "Practical programming for beginners.", link: "https://automatetheboringstuff.com", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "DevOps & Deployment",
    items: [
      { name: "Docker Docs", description: "Get started with Docker containerization.", link: "https://docs.docker.com/get-started", icon: <Terminal className="h-5 w-5" /> },
      { name: "Docker Curriculum", description: "Comprehensive Docker tutorial for beginners.", link: "https://docker-curriculum.com", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Vercel Docs", description: "Deploy and host your frontend applications.", link: "https://vercel.com/docs", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "Learning Platforms",
    items: [
      { name: "FreeCodeCamp", description: "Learn to code with free certifications.", link: "https://www.freecodecamp.org", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Frontend Masters", description: "Advanced frontend engineering courses.", link: "https://frontendmasters.com", icon: <Video className="h-5 w-5" /> },
      { name: "Codecademy", description: "Interactive coding lessons for all levels.", link: "https://www.codecademy.com", icon: <Video className="h-5 w-5" /> },
      { name: "The Odin Project", description: "Free full-stack curriculum.", link: "https://www.theodinproject.com", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Exercism", description: "Code practice and mentorship for 67 languages.", link: "https://exercism.org", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Learning <span className="text-primary">Resources</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Curated materials to help you master software development.</p>
      </div>

      <div className="space-y-16">
        {resources.map((section, idx) => (
          <motion.section
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="mb-8 text-2xl font-bold tracking-tight">{section.category}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card key={item.name} className="group transition-all hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                      <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        Visit Site <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
