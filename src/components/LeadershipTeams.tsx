"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";
import { Shield, Code, Paintbrush, Share2, Award, Users, GraduationCap } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  github?: string;
  teamRole?: string; // e.g. "Lead", "Member"
}

// Helper to get initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Helper to get deterministic premium gradient class based on name
const getGradientClass = (name: string) => {
  const gradients = [
    "from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/20 dark:text-violet-300",
    "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/20 dark:text-blue-300",
    "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20 dark:text-emerald-300",
    "from-orange-500/20 to-rose-500/20 text-orange-400 border-orange-500/20 dark:text-orange-300",
    "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/20 dark:text-pink-300",
    "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/20 dark:text-indigo-300",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

export default function LeadershipTeams() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const coreCommittee: TeamMember[] = [
    { name: "Lagzen Thakuri", role: "Lead / President", github: "lagzenthakuri" },
    { name: "Shibam Guragai", role: "Co-lead / Vice President", github: "06shivam" },
    { name: "Ishant Dahal", role: "Technical Lead", github: "ishantdidit" },
  ];

  const departments = {
    technical: {
      name: "Technical Team",
      icon: <Code className="h-4 w-4" />,
      members: [
        { name: "Ishant Dahal", role: "Technical Lead", github: "ishantdidit", teamRole: "Lead" },
        { name: "Anup Prajapati", role: "Technical Team Member", teamRole: "Member" },
        { name: "Rahul Singh", role: "Technical Team Member", github: "rahulsingh239", teamRole: "Member" },
      ],
    },
    branding: {
      name: "Branding Team",
      icon: <Paintbrush className="h-4 w-4" />,
      members: [
        { name: "Pema Sherpa", role: "Branding Team Member", github: "pay-wang", teamRole: "Member" },
        { name: "Tsering Ghirmey Lama Helmo", role: "Branding Team Member", github: "tseringwangdue328-beep", teamRole: "Member" },
      ],
    },
    community: {
      name: "Community Engagement Team",
      icon: <Share2 className="h-4 w-4" />,
      members: [
        { name: "Saroj Tamang", role: "Community Engagement Member", github: "Sarojlama288", teamRole: "Member" },
        { name: "Bidhanshu Soni", role: "Community Engagement Member", teamRole: "Member" },
        { name: "Vivek Raut", role: "Community Engagement Member", github: "Vivek-057", teamRole: "Member" },
      ],
    },
  };

  const executiveMembers: TeamMember[] = [
    { name: "Abhyudayik Sharma", role: "Executive Member", github: "Aabhyudayik" },
    { name: "Bhuwan Ghimire", role: "Executive Member" },
    { name: "Jenia Shahi", role: "Executive Member" },
    { name: "Jeshan K.C.", role: "Executive Member" },
    { name: "Safal Subedi", role: "Executive Member", github: "falfal827" },
  ];

  const advisors: TeamMember[] = [
    { name: "Aashish Dhakal", role: "Club Advisor" },
    { name: "Bipin Ghimire", role: "Club Advisor" },
    { name: "Cyrus Gautam", role: "Club Advisor" },
    { name: "Sagar Shrestha", role: "Club Advisor", github: "Chief-spartan-117" },
    { name: "Sudip Bista", role: "Club Advisor" },
  ];

  const generalMembers: TeamMember[] = [
    { name: "Ayan Akhtar Ansari", role: "General Member" },
    { name: "Karuna Joshi", role: "General Member", github: "Karuna-storm" },
    { name: "Ojashwi Raymajhi", role: "General Member" },
    { name: "Pratigya Mahato", role: "General Member", github: "Pratigya625" },
    { name: "Muskan Yadav", role: "General Member" },
    { name: "Biplav Yadav", role: "General Member" },
    { name: "Ishani Giri", role: "General Member" },
  ];

  const handleImageError = (name: string) => {
    setImgErrors((prev) => ({ ...prev, [name]: true }));
  };

  const renderMemberCard = (member: TeamMember) => {
    const hasImage = member.github && !imgErrors[member.name];
    const gradClass = getGradientClass(member.name);

    return (
      <Card
        key={member.name}
        className="group relative overflow-hidden border border-muted transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 bg-card"
      >
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary via-purple-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <CardHeader className="flex flex-col items-center text-center pb-2">
          <div className="relative mb-4 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl border-2 border-muted transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 flex items-center justify-center bg-muted/30">
            {hasImage ? (
              <img
                src={`https://github.com/${member.github}.png`}
                alt={member.name}
                className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110"
                onError={() => handleImageError(member.name)}
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br border font-bold text-2xl tracking-wider rounded-2xl ${gradClass}`}>
                {getInitials(member.name)}
              </div>
            )}
          </div>
          <CardTitle className="text-base sm:text-lg font-bold tracking-tight line-clamp-1">{member.name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-1 flex flex-col items-center gap-1.5">
            <span className="font-semibold text-primary/80 uppercase tracking-widest text-[10px]">
              {member.role}
            </span>
            {member.teamRole && (
              <Badge variant="outline" className="text-[9px] py-0 px-2 uppercase tracking-wide bg-primary/5 text-primary border-primary/10">
                {member.teamRole}
              </Badge>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center pb-4 pt-1">
          {member.github ? (
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 px-3.5 rounded-full bg-muted/40 hover:bg-muted"
            >
              <FaGithub className="h-3.5 w-3.5" />
              <span>@{member.github}</span>
            </a>
          ) : (
            <div className="h-6 flex items-center text-[10px] text-muted-foreground/50 italic select-none">
              PGS Software Club
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <Tabs defaultValue="core" className="w-full flex flex-col items-center">
        <TabsList className="flex flex-wrap justify-center bg-muted/50 p-1.5 rounded-xl border border-muted w-fit max-w-full gap-1 mb-8">
          <TabsTrigger value="core" className="rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all">
            <Shield className="h-3.5 w-3.5 mr-1.5" /> Core Committee
          </TabsTrigger>
          <TabsTrigger value="departments" className="rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all">
            <Code className="h-3.5 w-3.5 mr-1.5" /> Departments
          </TabsTrigger>
          <TabsTrigger value="executives" className="rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all">
            <Award className="h-3.5 w-3.5 mr-1.5" /> Executives
          </TabsTrigger>
          <TabsTrigger value="advisors" className="rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all">
            <GraduationCap className="h-3.5 w-3.5 mr-1.5" /> Advisors
          </TabsTrigger>
          <TabsTrigger value="general" className="rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all">
            <Users className="h-3.5 w-3.5 mr-1.5" /> General Members
          </TabsTrigger>
        </TabsList>

        {/* Core Committee Content */}
        <TabsContent value="core" className="w-full animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto px-4">
            {coreCommittee.map(renderMemberCard)}
          </div>
        </TabsContent>

        {/* Departments Content */}
        <TabsContent value="departments" className="w-full animate-in fade-in-50 duration-300">
          <div className="space-y-12 max-w-6xl mx-auto px-4">
            {Object.entries(departments).map(([key, dept]) => (
              <div key={key} className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-muted pb-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{dept.name}</h3>
                  <Badge variant="outline" className="text-xs ml-2 bg-muted/40">
                    {dept.members.length} {dept.members.length === 1 ? 'member' : 'members'}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {dept.members.map(renderMemberCard)}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Executive Members Content */}
        <TabsContent value="executives" className="w-full animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto px-4">
            {executiveMembers.map(renderMemberCard)}
          </div>
        </TabsContent>

        {/* Advisors Content */}
        <TabsContent value="advisors" className="w-full animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto px-4">
            {advisors.map(renderMemberCard)}
          </div>
        </TabsContent>

        {/* General Members Content */}
        <TabsContent value="general" className="w-full animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-4">
            {generalMembers.map(renderMemberCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
