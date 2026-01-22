import { getOrgRepos } from "@/lib/github";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Code, Users, Star, ExternalLink, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const repos = await getOrgRepos();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
          Our Portfolio
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Open Source <span className="text-primary">Projects</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Explore the tools, libraries, and applications built by the PGS Software Club community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <Card key={repo.id} className="group flex flex-col transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Code className="h-5 w-5" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    repo.language === "JavaScript" 
                      ? "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-300/25 dark:text-yellow-200" 
                      : repo.language === "HTML"
                      ? "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-300/25 dark:text-yellow-200"
                      : repo.language === "TypeScript"
                      ? "bg-blue-500/10 text-blue-600 dark:bg-blue-400/20 dark:text-blue-400"
                      : repo.language === "Python"
                      ? "bg-green-500/10 text-green-600 dark:bg-green-400/20 dark:text-green-400"
                      : repo.language === "Java"
                      ? "bg-orange-500/10 text-orange-600 dark:bg-orange-400/20 dark:text-orange-400"
                      : "bg-secondary/10 text-secondary-foreground"
                  }`}
                >
                  {repo.language || "TypeScript"}
                </Badge>
              </div>
              <CardTitle className="mt-4 line-clamp-1 text-xl">{repo.name}</CardTitle>
              <CardDescription className="line-clamp-3 h-15">
                {repo.description || "A project dedicated to learning and innovation within the PGS Software Club."}
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-auto pt-6">
              <div className="flex items-center justify-between border-t pt-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4" /> {Math.floor(Math.random() * 10) + 1}
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild className="group-hover:text-primary">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    Source <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {repos.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <Github className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No projects found</h3>
            <p className="text-muted-foreground">The organization doesn't have any public repositories yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
