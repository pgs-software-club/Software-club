import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Shield,
  Lightbulb,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  Clock,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  FileCode2,
  Sparkles,
  Boxes,
  Mic,
  Terminal,
  Megaphone,
  Camera,
  Share2,
  Handshake,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  hackathon,
  stats,
  formatNote,
  tracks,
  trackNote,
  eligibility,
  preEventTimeline,
  scheduleDayOne,
  scheduleDayTwo,
  checkpoints,
  mentorPanel,
  submissions,
  codeRules,
  judgingFormat,
  judgingCriteria,
  awards,
  awardsNote,
  organisingTeam,
  organisingTeamNote,
  sponsors,
  sponsorsNote,
  faqs,
} from "@/lib/hackathon";

export const metadata: Metadata = {
  title: "SparkX Hackathon 2026 | PGS Software Club",
  description:
    "A 24-hour hackathon at Presidential Graduate School, 17–18 September 2026. Ten teams, three tracks, NPR 25,000 in prizes. Register now.",
};

const trackIcons = {
  brain: Brain,
  shield: Shield,
  lightbulb: Lightbulb,
} as const;

const roleIcons = {
  boxes: Boxes,
  mic: Mic,
  terminal: Terminal,
  calendar: CalendarDays,
  users: Users,
  megaphone: Megaphone,
  camera: Camera,
  share: Share2,
} as const;

function ScheduleTable({
  title,
  rows,
}: {
  title: string;
  rows: { time: string; activity: string; highlight?: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm">
        {rows.map((row) => (
          <div
            key={row.time + row.activity}
            className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6 ${
              row.highlight ? "bg-primary/5" : ""
            }`}
          >
            <span
              className={`shrink-0 font-mono text-sm sm:w-32 ${
                row.highlight ? "font-bold text-primary" : "text-muted-foreground"
              }`}
            >
              {row.time}
            </span>
            <span className={`text-sm ${row.highlight ? "font-semibold" : "text-muted-foreground"}`}>
              {row.activity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HackathonPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 px-4 py-24">
        <div className="container mx-auto max-w-5xl text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge
            variant="outline"
            className="mb-6 border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
          >
            {hackathon.organiser} · Flagship Event
          </Badge>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Spark<span className="text-gradient">X</span> Hackathon
          </h1>
          <p className="mt-6 text-xl font-medium text-muted-foreground sm:text-2xl">
            &ldquo;{hackathon.tagline}&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Twenty-four hours, ten teams, three tracks. Two days on campus with faculty, alumni and
            industry mentors beside you, and one evening at home where the clock keeps running.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> {hackathon.datesLong}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {hackathon.venue}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> {hackathon.fee}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> {hackathon.campusHours}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8" asChild>
              <a href={hackathon.registrationUrl} target="_blank" rel="noreferrer">
                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <Link href="#schedule">View Schedule</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Registration open {hackathon.registrationOpens} — closes {hackathon.registrationCloses}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="lift rounded-2xl border border-border bg-card/60 px-6 py-8 text-center backdrop-blur-sm hover:border-primary/40"
            >
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three Focused Tracks</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">{trackNote}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tracks.map((track) => {
            const Icon = trackIcons[track.icon as keyof typeof trackIcons];
            return (
              <Card key={track.name} className="lift h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${track.color} text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {track.number}
                  </p>
                  <CardTitle className="text-xl">{track.name}</CardTitle>
                  <CardDescription className="text-base">{track.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Registration timeline */}
      <section className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Dates</h2>
          <p className="mt-3 text-muted-foreground">
            From registration to the post-event showcase.
          </p>
        </div>
        <div className="relative border-l border-border pl-8">
          {preEventTimeline.map((item) => (
            <div key={item.date} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[41px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background" />
              <p className="text-sm font-semibold text-primary">{item.date}</p>
              <p className="mt-1 text-muted-foreground">{item.milestone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="container mx-auto scroll-mt-24 px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The 24 Hours</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{formatNote}</p>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScheduleTable title="Day One — Thursday 17 September" rows={scheduleDayOne} />
          <ScheduleTable title="Day Two — Friday 18 September" rows={scheduleDayTwo} />
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:gap-5">
          <Sunset className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Nobody sleeps at the college.</span>{" "}
            The hall clears at 5:00 pm on Thursday and reopens at 8:00 am on Friday. The clock does
            not pause in between — keep building from home if you want the hours.
          </p>
        </div>
      </section>

      {/* Mentorship */}
      <section className="container mx-auto px-4">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            Mentorship
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Five Checkpoint Rounds
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Mentors visit every team in five scheduled rounds — three in the hall on Thursday, one
            online during the Thursday evening, and one before judging on Friday morning. Each round
            has a defined purpose, so teams get the right kind of advice at the right stage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {checkpoints.map((cp) => (
              <div
                key={cp.round}
                className="lift flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm hover:border-primary/40 sm:flex-row sm:items-start sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                    {cp.round}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">{cp.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{cp.focus}</p>
              </div>
            ))}
          </div>

          <Card className="h-fit bg-primary/5">
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>The Mentor Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mentorPanel.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Eligibility */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold tracking-tight">
              <ShieldCheck className="h-7 w-7 text-primary" /> Who Can Take Part
            </h2>
            <ul className="space-y-4">
              {eligibility.map((rule) => (
                <li key={rule} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold tracking-tight">
              <FileCode2 className="h-7 w-7 text-primary" /> What You Submit
            </h2>
            <div className="space-y-4">
              {submissions.map((item, i) => (
                <div key={item.title} className="lift rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm hover:border-primary/40">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Everything is submitted through the official submission form before 10:00 on 18
              September. Incomplete submissions are evaluated only on what was received.
            </p>
          </div>
        </div>
      </section>

      {/* Rules on pre-existing code and AI */}
      <section className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pre-Existing Code &amp; AI Tools
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{codeRules.note}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" /> Permitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {codeRules.permitted.map((rule) => (
                  <li key={rule} className="text-sm text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <XCircle className="h-5 w-5 text-destructive" /> Not Permitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {codeRules.notPermitted.map((rule) => (
                  <li key={rule} className="text-sm text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Judging */}
      <section className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Judging</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            All ten teams present in a single round before the full panel, in an order drawn by lot.
            A visible countdown timer runs on the projector and is enforced strictly.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {judgingFormat.map((slot) => (
            <div key={slot.label} className="lift rounded-xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm hover:border-primary/40">
              <p className="text-3xl font-bold">{slot.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{slot.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {judgingCriteria.map((c) => (
            <div key={c.criterion} className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary/40">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">{c.criterion}</h3>
                <span className="shrink-0 font-mono text-sm font-bold text-primary">
                  {c.weight}%
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${c.weight * 5}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Each judge scores every criterion on a 1–5 scale; the weighted average across judges gives
          the final score. In the event of a tie, the higher score in Functionality &amp;
          Completeness prevails, then Problem Relevance &amp; Impact. Written feedback is returned to
          every team afterwards.
        </p>
      </section>

      {/* Awards */}
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Trophy className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hackathon.prizePool} in Prizes
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">{awardsNote}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {awards.map((award, i) => (
            <Card
              key={i}
              className={`lift h-full ${award.featured ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" : "hover:border-primary/40"}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Trophy
                    className={`h-6 w-6 ${award.featured ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-right text-xl font-bold text-primary">{award.prize}</span>
                </div>
                <CardTitle className="mt-4">{award.award}</CardTitle>
                <CardDescription className="text-base">{award.recognition}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Handshake className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sponsors &amp; Partners</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">{sponsorsNote}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              className="lift flex min-h-28 items-center justify-center rounded-xl border border-border bg-card/60 px-5 py-6 text-center backdrop-blur-sm hover:border-primary/40"
            >
              <span className="text-base font-semibold">{sponsor.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Organising team */}
      <section id="team" className="container mx-auto scroll-mt-24 px-4">
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            Organising Committee
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who Runs SparkX</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{organisingTeamNote}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {organisingTeam.map((desk) => {
            const Icon = roleIcons[desk.icon as keyof typeof roleIcons];
            return (
              <div
                key={desk.role}
                className="lift flex h-full flex-col rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm hover:border-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{desk.role}</h3>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {desk.members.map((member) => (
                    <span
                      key={member.name + (member.note ?? "")}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm"
                    >
                      {member.name}
                      {member.note ? (
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          {member.note}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{desk.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Care & conduct */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm sm:p-12">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight">
            <Clock className="h-6 w-6 text-primary" /> On Campus, and the Evening Between
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Campus hours",
                detail:
                  "The hall is open 8:00 am to 5:00 pm on both days. Nobody stays overnight at the college, and the venue is cleared and locked at 5:00 pm.",
              },
              {
                title: "Access control",
                detail:
                  "Entry only on production of a college ID and event badge. An entry and exit register is maintained at the reporting desk each morning.",
              },
              {
                title: "The evening window",
                detail:
                  "Between 5:00 pm and 8:00 am teams build from home. Mentors are on call on the club channel from 19:30 to 21:30 for the debugging clinic.",
              },
              {
                title: "Supervision",
                detail:
                  "At least two faculty members and two committee members on duty through every campus hour, on a published roster.",
              },
              {
                title: "Food and drink",
                detail:
                  "Lunch and evening snacks on day one, lunch on day two, and a self-service tea and coffee counter open through both campus days.",
              },
              {
                title: "Medical",
                detail:
                  "A stocked first-aid kit at the help desk, a trained first-aider on duty, and hospital and on-call vehicle numbers posted at the desk.",
              },
              {
                title: "Getting home",
                detail:
                  "Volunteers see participants out at 5:00 pm. Tell the event-day desk if you need help arranging transport.",
              },
              {
                title: "Code of conduct",
                detail:
                  "Zero tolerance of harassment, discrimination or intimidation. A named grievance contact is published and complaints are handled confidentially.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
          <Sparkles className="mx-auto mb-6 h-10 w-10" />
          <h2 className="text-3xl font-bold sm:text-5xl">Twenty-four hours. One prototype.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            17–18 September 2026 · winners announced at 1:00 pm on the Friday.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
            Registration is free and open to all enrolled PGS students. Ten team slots — bring two to
            four people and a 200-word idea.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 bg-white px-8 text-primary hover:bg-white/90"
              asChild
            >
              <a href={hackathon.registrationUrl} target="_blank" rel="noreferrer">
                Register Your Team
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 border border-white/30 bg-transparent px-8 text-white hover:border-white/50 hover:bg-white/10 hover:text-white"
              asChild
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=thakurizen2@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask a Question
              </a>
            </Button>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <Timer className="h-4 w-4" /> Registration closes {hackathon.registrationCloses}
          </p>
        </div>
      </section>
    </div>
  );
}
