import { getAllMembers } from "@/lib/github";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Users, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
          Our Community
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Meet the <span className="text-primary">Innovators</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The brilliant minds building the future of software at Presidential Graduate School.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <Card key={member.login} className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            
            <CardHeader className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-muted transition-transform group-hover:scale-105 group-hover:border-primary/20">
                <img 
                  src={member.avatar_url} 
                  alt={member.login} 
                  className="h-full w-full object-cover"
                />
              </div>
              <CardTitle className="line-clamp-1">{member.name || member.login}</CardTitle>
              <CardDescription>@{member.login}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {member.bio && (
                  <p className="line-clamp-2 min-h-[2.5rem] text-center text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                )}
                
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary">{member.contributions || 0}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Contributions</span>
                  </div>
                  <div className="h-8 w-[1px] bg-border" />
                  <div className="flex flex-col items-center">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Member</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2 transition-colors hover:bg-primary hover:text-primary-foreground" asChild>
                  <a href={member.html_url} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub Profile
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {members.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No members found</h3>
            <p className="text-muted-foreground">Check your GitHub token configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
}
