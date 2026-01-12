"use client"

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const events = [
  {
    title: "Open Source Workshop",
    description: "Learn how to contribute to open source projects and master Git workflow.",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Block B, Room 302",
    status: "Upcoming",
    category: "Workshop",
  },
  {
    title: "Web3 & Blockchain Intro",
    description: "An introductory session on decentralized applications and smart contracts.",
    date: "Dec 20, 2024",
    time: "1:00 PM - 3:00 PM",
    location: "Online (Zoom)",
    status: "Registration Open",
    category: "Seminar",
  },
  {
    title: "Internal Hackathon 2024",
    description: "24-hour building challenge. Theme will be announced at the start.",
    date: "Jan 10, 2025",
    time: "9:00 AM onwards",
    location: "Main Hall",
    status: "Planned",
    category: "Competition",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Upcoming <span className="text-primary">Events</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Join our workshops, seminars, and hackathons.</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {events.map((event, idx) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="group overflow-hidden transition-all hover:border-primary/50">
              <div className="flex flex-col md:flex-row">
                <div className="flex w-full flex-col justify-center bg-primary/5 p-6 text-center md:w-48">
                  <span className="text-sm font-bold uppercase text-primary">{event.category}</span>
                  <span className="mt-2 text-2xl font-bold">{event.date.split(',')[0]}</span>
                  <span className="text-sm text-muted-foreground">{event.date.split(',')[1]}</span>
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline" className="border-secondary/20 bg-secondary/5 text-secondary">
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{event.description}</CardDescription>
                  
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> 50+ slots
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6 md:border-l">
                  <button className="w-full rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 md:w-auto">
                    Register
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
