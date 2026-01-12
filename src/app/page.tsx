import { getAllMembers, getOrgRepos } from "@/lib/github";
import { MemberMarquee } from "@/components/MemberMarquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Code, Users, Calendar, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const members = await getAllMembers();
  const repos = await getOrgRepos();

  const team = [
    { name: "Sushant Thapa", role: "President", avatar: "https://github.com/pgs-software-club.png" },
    { name: "John Doe", role: "Vice President", avatar: "https://avatar.vercel.sh/john" },
    { name: "Jane Smith", role: "Technical Lead", avatar: "https://avatar.vercel.sh/jane" },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            Future of Software Engineering
          </Badge>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Building the Next Generation of <span className="text-primary">Software Innovators</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Welcome to PGS Software Club. We are a community of passionate developers, builders, and learners at Presidential Graduate School.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/syllabus">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer">
                View Projects
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Member Marquee */}
      <section>
        <div className="mb-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Contributors</h2>
        </div>
        <MemberMarquee members={members} />
      </section>

      {/* Why Join Us Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Why Join PGS Software Club?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We provide the environment and resources you need to transition from a student to a professional developer.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Peer Learning",
              description: "Collaborate with like-minded individuals on real-world projects and grow together.",
              icon: <Users className="h-10 w-10 text-primary" />,
            },
            {
              title: "Expert Guidance",
              description: "Get mentorship from seniors and industry professionals who have been in your shoes.",
              icon: <Code className="h-10 w-10 text-primary" />,
            },
            {
              title: "Industry Ready",
              description: "Learn modern tech stacks (React, Next.js, Supabase) that companies are actually using.",
              icon: <Zap className="h-10 w-10 text-primary" />,
            },
          ].map((feature, i) => (
            <Card key={i} className="border-none bg-secondary/20 shadow-none">
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}}
      <section className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Open Source Projects</h2>
            <p className="text-muted-foreground">Recent work from our organization repositories</p>
          </div>
          <Button variant="ghost" asChild>
            <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer">
              See All <Github className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.slice(0, 6).map((repo) => (
            <Card key={repo.id} className="group transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Code className="h-5 w-5 text-primary" />
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
                    {repo.language || "TypeScript"}
                  </Badge>
                </div>
                <CardTitle className="mt-4 line-clamp-1">{repo.name}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">
                  {repo.description || "Building something amazing with the club."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> 10+
                    </span>
                    <span className="flex items-center gap-1">
                      <Github className="h-4 w-4" /> {repo.stargazers_count}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                    <a href={repo.html_url} target="_blank" rel="noreferrer">Details</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Our Leadership</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-4 border-primary/10">
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover grayscale transition-all hover:grayscale-0" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-primary uppercase tracking-wider">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl font-bold sm:text-5xl">Ready to build the future?</h2>
          <p className="mx-auto mt-6 max-w-xl text-primary-foreground/80 text-lg">
            Join the PGS Software Club today and start your journey into professional software development.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-12 px-8 bg-white text-primary hover:bg-white/90">
              Join Discord
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
