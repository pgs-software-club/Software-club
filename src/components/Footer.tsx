import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter text-primary">PGS Software Club</h2>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Empowering the next generation of software engineers through collaboration, learning, and open-source contribution.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="/syllabus" className="hover:text-primary">Syllabus</a></li>
              <li><a href="/resources" className="hover:text-primary">Learning Hub</a></li>
              <li><a href="/events" className="hover:text-primary">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex gap-4">
              <a href="https://github.com/pgs-software-club" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PGS Software Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
