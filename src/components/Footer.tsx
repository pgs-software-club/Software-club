import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const resourceLinks = [
  { name: "Home", href: "/" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Learning Hub", href: "/resources" },
  { name: "Hackathon 2026", href: "/hackathon" },
];

const communityLinks = [
  { name: "Members", href: "/members" },
  { name: "Projects", href: "/projects" },
  { name: "Register", href: "/register" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/pgs-software-club", icon: FaGithub, hover: "hover:text-[#333] dark:hover:text-white" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/pgs-software-club", icon: FaLinkedin, hover: "hover:text-[#0077B5]" },
  { name: "Instagram", href: "https://www.instagram.com/pgs_softwareclub", icon: FaInstagram, hover: "hover:text-[#E4405F]" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/40 py-16 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="PGS Software Club Logo" className="h-9 w-9 object-contain" />
              <span className="text-2xl font-bold tracking-tighter text-primary">PGS Software Club</span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Empowering the next generation of software engineers through collaboration, learning,
              and open-source contribution.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ name, href, icon: Icon, hover }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 ${hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Learn</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Community</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=thakurizen2@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PGS Software Club. All rights reserved.</p>
          <p>Presidential Graduate School · Thapagaun, Kathmandu</p>
        </div>
      </div>
    </footer>
  );
}
