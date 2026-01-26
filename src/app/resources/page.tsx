"use client"

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, Globe, Terminal } from "lucide-react";

const resources = [
  {
    category: "1. How the Web Works",
    items: [
      { name: "CS50 Week 0 (YouTube)", description: "Harvard's beginner-friendly introduction to computer science.", link: "https://www.youtube.com/watch?v=YoXxevp1WRQ", icon: <Video className="h-5 w-5" /> },
      { name: "MDN: How the Internet Works", description: "Understanding the fundamental architecture of the internet.", link: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work", icon: <Globe className="h-5 w-5" /> },
      { name: "MDN: How the Web Works", description: "Learn how websites function from request to response.", link: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", icon: <Globe className="h-5 w-5" /> },
    ],
  },
  {
    category: "2. Git & GitHub (Version Control First)",
    items: [
      { name: "Git & GitHub for Beginners", description: "Simple visual guide to understanding Git concepts.", link: "https://www.freecodecamp.org/news/git-and-github-for-beginners/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Git & GitHub Crash Course", description: "Video tutorial covering Git basics and GitHub workflow.", link: "https://www.youtube.com/watch?v=RGOj5yH7evk", icon: <Video className="h-5 w-5" /> },
      { name: "Git Tutorial", description: "Official Git tutorial covering all essential commands.", link: "https://git-scm.com/docs/gittutorial", icon: <Terminal className="h-5 w-5" /> },
      { name: "GitHub Docs", description: "Complete guide to using GitHub for collaboration.", link: "https://docs.github.com/en/get-started", icon: <Globe className="h-5 w-5" /> },
    ],
  },
  {
    category: "3. HTML",
    items: [
      { name: "HTML Basics for Beginners", description: "Simple introduction to HTML structure and tags.", link: "https://www.w3schools.com/html/html_intro.asp", icon: <BookOpen className="h-5 w-5" /> },
      { name: "MDN HTML", description: "Complete HTML reference and learning guide.", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML", icon: <Globe className="h-5 w-5" /> },
      { name: "freeCodeCamp Responsive Web Design", description: "Interactive HTML course with projects.", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "4. CSS",
    items: [
      { name: "CSS Basics Tutorial", description: "Beginner-friendly CSS fundamentals and styling.", link: "https://www.w3schools.com/css/css_intro.asp", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Flexbox Froggy", description: "Fun game to learn CSS Flexbox layout.", link: "https://flexboxfroggy.com/", icon: <Globe className="h-5 w-5" /> },
      { name: "MDN CSS", description: "Comprehensive CSS learning path from basics to advanced.", link: "https://developer.mozilla.org/en-US/docs/Learn/CSS", icon: <Globe className="h-5 w-5" /> },
      { name: "freeCodeCamp Responsive Web Design", description: "Learn CSS with hands-on projects and challenges.", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "5. JavaScript",
    items: [
      { name: "JavaScript for Beginners", description: "Gentle introduction to JavaScript programming.", link: "https://www.w3schools.com/js/js_intro.asp", icon: <BookOpen className="h-5 w-5" /> },
      { name: "JavaScript.info", description: "Modern JavaScript tutorial from basics to advanced concepts.", link: "https://javascript.info/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "freeCodeCamp JS Algorithms", description: "JavaScript fundamentals with algorithm challenges.", link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "6. Data Structures & Algorithms",
    items: [
      { name: "Visualgo", description: "Interactive algorithm visualizations for better understanding.", link: "https://visualgo.net/en", icon: <Globe className="h-5 w-5" /> },
      { name: "Data Structures Easy to Advanced", description: "Beginner-friendly introduction to data structures.", link: "https://www.freecodecamp.org/news/data-structures-101/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "GeeksforGeeks DSA", description: "Comprehensive data structures and algorithms guide.", link: "https://www.geeksforgeeks.org/data-structures/", icon: <Terminal className="h-5 w-5" /> },
      { name: "LeetCode", description: "Practice coding problems and prepare for interviews.", link: "https://leetcode.com", icon: <Terminal className="h-5 w-5" /> },
      { name: "HackerRank", description: "Coding challenges and skill assessments.", link: "https://www.hackerrank.com", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "7. Backend Development",
    items: [
      { name: "Python for Everybody", description: "Beginner-friendly Python course by University of Michigan.", link: "https://www.py4e.com/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "CS50 Python", description: "Harvard's introduction to programming with Python.", link: "https://cs50.harvard.edu/python/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "freeCodeCamp Backend", description: "Backend development and APIs with Python/Node.js.", link: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "8. Databases",
    items: [
      { name: "SQL in 10 Minutes", description: "Quick introduction to SQL basics for beginners.", link: "https://www.w3schools.com/sql/sql_quickref.asp", icon: <BookOpen className="h-5 w-5" /> },
      { name: "SQLBolt", description: "Interactive SQL tutorial with hands-on exercises.", link: "https://sqlbolt.com/", icon: <Terminal className="h-5 w-5" /> },
      { name: "W3Schools SQL", description: "Complete SQL reference and tutorial.", link: "https://www.w3schools.com/sql/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
  {
    category: "9. Testing & Clean Code",
    items: [
      { name: "Clean Code Basics", description: "Introduction to writing readable and maintainable code.", link: "https://www.freecodecamp.org/news/clean-coding-for-beginners/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Refactoring Guru", description: "Design patterns, SOLID principles, and refactoring techniques.", link: "https://refactoring.guru/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Martin Fowler", description: "Software development best practices and patterns.", link: "https://martinfowler.com/bliki/", icon: <Globe className="h-5 w-5" /> },
    ],
  },
  {
    category: "10. System Design",
    items: [
      { name: "System Design for Beginners", description: "Gentle introduction to system design concepts.", link: "https://www.freecodecamp.org/news/systems-design-for-interviews/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "System Design Primer", description: "Learn how to design large-scale distributed systems.", link: "https://github.com/donnemartin/system-design-primer", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "11. DevOps & Linux Basics",
    items: [
      { name: "Linux Command Line Basics", description: "Essential Linux commands for beginners.", link: "https://www.freecodecamp.org/news/linux-command-line-tutorial/", icon: <BookOpen className="h-5 w-5" /> },
      { name: "Linux Journey", description: "Learn Linux fundamentals step by step.", link: "https://linuxjourney.com/", icon: <Terminal className="h-5 w-5" /> },
      { name: "Docker Getting Started", description: "Official Docker tutorial for containerization.", link: "https://docs.docker.com/get-started/", icon: <Terminal className="h-5 w-5" /> },
    ],
  },
  {
    category: "12. Advanced Computer Science",
    items: [
      { name: "CS50x Introduction", description: "Harvard's beginner-friendly computer science course.", link: "https://cs50.harvard.edu/x/", icon: <Video className="h-5 w-5" /> },
      { name: "MIT OCW", description: "Free MIT computer science courses and materials.", link: "https://ocw.mit.edu", icon: <BookOpen className="h-5 w-5" /> },
      { name: "CS50 AI", description: "Harvard's introduction to artificial intelligence.", link: "https://cs50.harvard.edu/ai/", icon: <BookOpen className="h-5 w-5" /> },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Learning <span className="text-primary">Resources</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Structured learning path from zero to job-ready software engineer.</p>
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
