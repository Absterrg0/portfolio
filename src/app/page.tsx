import { AsciiTorus } from "./components/ascii-torus";
import { LocalTime } from "./components/local-time";
import { PortfolioJsonLd } from "./components/portfolio-json-ld";
import { banner, circeRoute, kurambitLoop } from "./data/ascii";
import { contact, experience, intro, now, site, work, type Link } from "./data/portfolio";

function Rule({ label }: { label: string }) {
  return (
    <h2 className="rule">
      <span>{`-- ${label} `}</span>
      <span className="rule-fill" aria-hidden="true" />
    </h2>
  );
}

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

function Links({ links }: { links: readonly Link[] }) {
  return (
    <span className="links">
      {links.map((link) => (
        <Out key={link.href} href={link.href}>
          {link.label}
        </Out>
      ))}
    </span>
  );
}

function initialIst() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function Home() {
  const { kurambit, circe } = now;

  return (
    <>
      <PortfolioJsonLd />
      <main className="page">
        <header className="hero">
          <div className="hero-text">
            <h1 className="sr-only">Parv Jain</h1>
            <pre className="banner" aria-hidden="true">{banner}</pre>
            <p className="meta">
              {site.role.toLowerCase()} <span className="dim">/</span> {site.location.toLowerCase()}
            </p>
            {intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <AsciiTorus />
        </header>

        <section aria-label="Now">
          <Rule label="now" />

          <article className="project">
            <div className="project-head">
              <h3>{kurambit.name}</h3>
              <Links links={kurambit.links} />
            </div>
            <p className="tagline">{kurambit.tagline}</p>
            <p>{kurambit.description}</p>
            <pre className="art" aria-label="The loop: brief, build, play, judge, keep going.">{kurambitLoop}</pre>
            <p className="dim small">games made with it</p>
            <ul className="tree">
              {kurambit.games.map((game, i) => (
                <li key={game.name}>
                  <span className="dim" aria-hidden="true">
                    {i === kurambit.games.length - 1 ? "`-- " : "|-- "}
                  </span>
                  <span className="tree-name">{game.name}</span>
                  <span className="tree-engine dim">{game.engine}</span>
                  <span className="tree-line">{game.line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="project">
            <div className="project-head">
              <h3>{circe.name}</h3>
              <Links links={circe.links} />
            </div>
            <p className="tagline">{circe.tagline}</p>
            <p>{circe.description}</p>
            <pre className="art" aria-label="A spoken request routed to a machine, a project and an agent.">{circeRoute}</pre>
          </article>
        </section>

        <section aria-label="Work">
          <Rule label="work" />
          <ul className="rows">
            {work.map((item) => (
              <li key={item.name} className="row">
                <span className="row-name">{item.name}</span>
                <span className="row-line">{item.line}</span>
                <Links links={item.links} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Experience">
          <Rule label="experience" />
          <ul className="rows">
            {experience.map((item) => (
              <li key={item.where} className="row row-xp">
                <span className="row-when dim">{item.when}</span>
                <span className="row-name">{item.where}</span>
                <span className="row-line">{item.what}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Contact">
          <Rule label="contact" />
          <p>
            Open to full-time roles and interesting problems. The fastest way to reach me is{" "}
            <Out href={`mailto:${contact.email}`}>{contact.email}</Out>.
          </p>
          <p>
            <Links links={contact.links} />
          </p>
        </section>

        <footer className="footer">
          <span>parv jain, {new Date().getFullYear()}</span>
          <span>
            bengaluru <LocalTime initialTime={initialIst()} />
          </span>
        </footer>
      </main>
    </>
  );
}
