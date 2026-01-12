"use client"

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, Globe, Terminal } from "lucide-react";

const resources = [
  {
    category: "Official Documentation",
    items: [
      { name: "MDN Web Docs", description: "The definitive resource for web developers.", link: "https://developer.mozilla.org", icon: <Globe className="h-5 w-5" /> },
      { name: "React Docs", description: "Learn React from the official documentation.", link: "https://react.dev", icon: <Globe className="h-5 w-5" /> },
      { name: "Next.js Learn", description: "Interactive tutorials for Next.js.", link: "https://nextjs.org/learn", icon: <Globe className="h-5 w-5" /> },
    ],
  },
  {
    category: "Learning Platforms",
    items: [
      { name: "FreeCodeCamp", description: "Learn to code for free with certifications.", link: "https://www.freecodecamp.org", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Frontend Masters", description: "Advanced frontend engineering courses.", link: "https://frontendmasters.com", icon: <Video className="h-5 w-5" /> },
      { name: "Exercism", description: "Code practice and mentorship for 67 languages.", link: "https://exercism.org", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "Tools & Utilities",
    items: [
      { name: "Vercel", description: "Deploy your frontend projects easily.", link: "https://vercel.com", icon: <Terminal className="h-5 w-5" /> },
      { name: "Supabase", description: "Open source Firebase alternative.", link: "https://supabase.com", icon: <Terminal className="h-5 w-5" /> },
      { name: "Shadcn/UI", description: "Beautifully designed components.", link: "https://ui.shadcn.com", icon: <Terminal className="h-5 w-5" /> },
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
