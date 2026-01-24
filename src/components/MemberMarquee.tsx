"use client"

import { motion } from "framer-motion";
import { Contributor } from "@/lib/github";
import { FaGithub } from "react-icons/fa";

interface MemberMarqueeProps {
  members: Contributor[];
}

export function MemberMarquee({ members }: MemberMarqueeProps) {
  // Ensure we have enough members to fill the screen, if not, duplicate
  const baseMembers = members.length > 0 ? members : [{ login: "pgs-software-club", avatar_url: "https://github.com/pgs-software-club.png", html_url: "https://github.com/pgs-software-club", name: "PGS Software Club", bio: "The official software club of Presidential Graduate School." }];
  const displayMembers = [...baseMembers, ...baseMembers, ...baseMembers, ...baseMembers];

  return (
    <div className="group relative flex w-full overflow-hidden border-y border-primary/10 bg-primary/[0.02] py-6 backdrop-blur-sm">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {displayMembers.map((member, idx) => (
            <a
              key={`${member.login}-${idx}`}
              href={member.html_url}
              target="_blank"
              rel="noreferrer"
              className="mx-4 md:mx-6 flex items-center gap-4 md:gap-5 rounded-2xl border border-primary/5 bg-background/50 px-4 md:px-6 py-3 transition-all hover:border-primary/30 hover:bg-background hover:shadow-xl hover:shadow-primary/5"
            >
              <img 
                src={member.avatar_url} 
                alt={member.login} 
                className="h-10 w-10 rounded-xl border border-primary/20 object-cover shadow-sm"
              />
              <div className="flex flex-col items-start leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-bold tracking-tight text-foreground">{member.name || member.login}</span>
                </div>
                  <div className="mt-0.5 flex flex-col">
                    <span className="text-xs md:text-[11px] font-medium text-primary">GitHub Profile</span>
                    <span className="text-xs md:text-[10px] text-muted-foreground/70">{(member.html_url || '').replace('https://', '')}</span>
                  </div>
                {member.bio && (
                  <p className="mt-1.5 max-w-[220px] overflow-hidden text-ellipsis whitespace-normal line-clamp-1 text-xs md:text-[11px] italic text-muted-foreground">
                    "{member.bio}"
                  </p>
                )}
              </div>
              <FaGithub className="ml-2 h-4 w-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
            </a>

        ))}
      </motion.div>
      
      {/* Gradient overlays for smooth fading edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}
