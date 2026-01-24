import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter text-primary">PGS Software Club</h2>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Empowering the next generation of software engineers through collaboration, learning, and open-source contribution.
            </p>
          </div>
          
          {/* Mobile: Split resources into two columns */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            <div className="text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li><a href="/roadmap" className="hover:text-primary">Roadmap</a></li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-0">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="/resources" className="hover:text-primary">Learning Hub</a></li>
                <li><a href="/events" className="hover:text-primary">Events</a></li>
              </ul>
            </div>
          </div>

          {/* Desktop: Single resources column */}
          <div className="hidden sm:block text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/roadmap" className="hover:text-primary">Roadmap</a></li>
              <li><a href="/resources" className="hover:text-primary">Learning Hub</a></li>
              <li><a href="/events" className="hover:text-primary">Events</a></li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex gap-4 justify-center sm:justify-start">
              <a href="https://github.com/pgs-software-club" className="text-muted-foreground hover:text-[#333] dark:hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/pgs-software-club" className="text-muted-foreground hover:text-[#0077B5] transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/pgs_softwareclub" className="text-muted-foreground hover:text-[#E4405F] transition-colors">
                <FaInstagram className="h-5 w-5" />
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
