import { getAllMembers, getOrgRepos } from "@/lib/github";
import { MemberMarquee } from "@/components/MemberMarquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Users,
  Calendar,
  ArrowRight,
  Zap,
  Brain,
  Shield,
  Lightbulb,
  Trophy,
  MapPin,
  Clock,
  Star,
  GitBranch,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import LeadershipTeams from "@/components/LeadershipTeams";
import { Reveal } from "@/components/Reveal";
import { hackathon, stats as hackathonStats, tracks as hackathonTracks } from "@/lib/hackathon";

// Configure the route to be dynamic since we're fetching external data
export const dynamic = 'force-dynamic';
// Revalidate every 5 minutes for homepage data
export const revalidate = 300;

export default async function Home() {
  const members = await getAllMembers();
  const repos = await getOrgRepos();



  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center">
            {/* Content Section */}
            <div className="text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
              <Link
                href="/hackathon"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 py-1.5 pl-2 pr-4 text-sm text-primary transition-colors hover:bg-primary/10"
              >
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  New
                </span>
                <span className="font-medium">Internal Hackathon 2026 — registration open</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Building the Next Generation of{" "}
                <span className="text-gradient">Software Innovators</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl lg:max-w-2xl">
                Welcome to PGS Software Club. We are a community of passionate developers, builders, and learners at Presidential Graduate School.
              </p>
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link href="/roadmap">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer">
                    View Projects
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Logo Section */}
            <div className="flex justify-center animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="group relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse" />
                <img
                  src="/logo.png"
                  alt="PGS Software Club Logo"
                  className="relative h-40 w-40 rounded-xl object-contain ring-2 ring-orange-700 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                />
              </div>
            </div>
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

      {/* Hackathon Section */}
      <section className="container mx-auto px-4">
        <Reveal>
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="relative px-6 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.15),transparent_55%)]" />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              {/* Left: headline + details */}
              <div>
                <Badge variant="outline" className="mb-4 border-primary/20 bg-background text-primary">
                  Flagship Event · Registration Open
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                  Internal <span className="text-primary">Hackathon</span> 2026
                </h2>
                <p className="mt-3 text-xl font-medium text-muted-foreground">
                  &ldquo;{hackathon.tagline}&rdquo;
                </p>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  Ten teams. Twenty-four hours on campus. Build a working software prototype
                  overnight in one of three tracks, with faculty, alumni and industry mentors beside
                  you through five checkpoint rounds.
                </p>

                <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 shrink-0 text-primary" />
                    {hackathon.datesLong} · {hackathon.duration}
                  </span>
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    {hackathon.venue}
                  </span>
                  <span className="flex items-center gap-3">
                    <Trophy className="h-4 w-4 shrink-0 text-primary" />
                    {hackathon.prizePool} in prizes, plus trophies and certificates
                  </span>
                  <span className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    Registration closes {hackathon.registrationCloses} — {hackathon.fee}
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" className="h-12 px-8" asChild>
                    <a href={hackathon.registrationUrl} target="_blank" rel="noreferrer">
                      Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                    <Link href="/hackathon">Full Details</Link>
                  </Button>
                </div>
              </div>

              {/* Right: stats + tracks */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {hackathonStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border bg-background px-4 py-6 text-center"
                    >
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {hackathonTracks.map((track) => {
                    const Icon =
                      track.icon === "brain" ? Brain : track.icon === "shield" ? Shield : Lightbulb;
                    return (
                      <div
                        key={track.name}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${track.color} text-white`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                            {track.number}
                          </p>
                          <p className="font-semibold">{track.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Why Join Us Section */}
<section className="container mx-auto px-4 py-12">
  <Reveal>
    <div className="mb-16 text-center">
      <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
        Why Us
      </Badge>
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
        Why Join PGS Software Club?
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
       In today's world, software skills are no longer optional. Almost every field now depends on technology, and understanding how software works gives you a real advantage. PGS Software Club exists to help students build strong, practical foundations in programming and development. We focus on teaching what actually matters in the real world, starting from the basics and moving step by step toward real projects.
      </p>
    </div>
  </Reveal>

  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    {[
      {
        title: "From Beginner to Builder",
        description:
          "No prior experience is required. We start from the basics and gradually move toward building real projects, helping you develop a strong understanding of how software works.",
        icon: <Users className="h-10 w-10 text-primary" />,
      },
      {
        title: "Project-Based Learning",
        description:
          "Learning happens by doing. You will build websites, work on small projects, debug errors, and gain hands-on experience that builds confidence and real skills.",
        icon: <Code className="h-10 w-10 text-primary" />,
      },
      {
        title: "Strong Foundation for the Future",
        description:
          "The skills you learn here form a solid base for careers in web development, AI/ML, cybersecurity, freelancing, startups, and more.",
        icon: <Zap className="h-10 w-10 text-primary" />,
      },
    ].map((feature, i) => (
      <Reveal key={i} delay={i * 0.1} className="flex">
        <Card className="lift w-full border-primary/10 bg-primary/6 shadow-none hover:border-primary/30">
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
      </Reveal>
    ))}
  </div>
</section>


      {/* Projects Section */}
      <section className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Public Projects</h2>
              <p className="text-muted-foreground">Recent work from our organization repositories</p>
            </div>
            <Button variant="ghost" asChild className="group">
              <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer" className="flex items-center">
                <span className="group-hover:text-primary transition-colors">See All</span>
                <FaGithub className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-[#333] dark:group-hover:text-white transition-colors" />
              </a>
            </Button>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.slice(0, 6).map((repo, i) => (
            <Reveal key={repo.id} delay={i * 0.06} className="flex">
            <Card className="group lift flex w-full flex-col hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
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
              <CardContent className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4" /> {repo.forks_count ?? 0}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                    <a href={repo.html_url} target="_blank" rel="noreferrer">Details</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-12">
        <Reveal>
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
              Our Committee
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              Meet Our Leadership &amp; Teams
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The dedicated team of students guiding, branding, engaging, and building the PGS Software Club.
            </p>
          </div>
        </Reveal>
        <LeadershipTeams />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
          <h2 className="relative text-balance text-3xl font-bold sm:text-5xl">Ready to build the future?</h2>
          <p className="relative mx-auto mt-6 max-w-xl text-primary-foreground/80 text-lg">
            Join the PGS Software Club today and start your journey into professional software development.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-12 px-8 bg-white text-primary hover:bg-white/90" asChild>
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSea8AZoPk8HVKVLsiVx_tYIEtIGC_gOUJKL_XsZDgxDoKzuUg/viewform" target="_blank">Join The Club</Link>
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-8 border border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 bg-transparent" asChild>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thakurizen2@gmail.com" target="_blank" rel="noopener noreferrer">Contact Us</a>
            </Button>
          </div>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
