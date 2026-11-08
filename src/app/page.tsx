import { AsciiArt } from "./components/ascii-art";
import { LocalTime } from "./components/local-time";
import { PortfolioJsonLd } from "./components/portfolio-json-ld";
import { art } from "./data/art";
import { circe, contact, earlier, experience, experiments, intro, kurambit, site, type Link } from "./data/portfolio";

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

// A section with a small label over it.
function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section className="section" aria-labelledby={id}>
      <h2 className="label" id={id}>
        {label}
      </h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

// One index line: name, a short note, and whatever sits on the right.
function Row({ name, note, end }: { name: React.ReactNode; note: React.ReactNode; end: React.ReactNode }) {
  return (
    <li className="row">
      <span className="row-name">{name}</span>
      <span className="row-note">{note}</span>
      <span className="row-end">{end}</span>
    </li>
  );
}

function ProjectHead({ project }: { project: { name: string; meta: string; links: readonly Link[] } }) {
  return (
    <header className="project-head">
      <h3 id={project.name.toLowerCase()}>{project.name}</h3>
      <p className="project-meta">
        {project.meta}
        <span className="sep" aria-hidden="true">
          {"  /  "}
        </span>
        <Links links={project.links} />
      </p>
    </header>
  );
}

function initialIst() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function Home() {
  return (
    <>
      <PortfolioJsonLd />
      <main className="page">
        <AsciiArt className="scene" name="landscape" {...art.landscape} />

        <header className="hero">
          <div className="hero-line">
            <h1>{site.name}</h1>
            <p className="meta">
              {site.location.split(",")[0].toLowerCase()} <LocalTime initialTime={initialIst()} />
            </p>
          </div>
          <p className="intro">{intro}</p>
        </header>

        <Section id="now" label="now">
          <article className="project" aria-labelledby="kurambit">
            <ProjectHead project={kurambit} />
            {kurambit.body.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
            <p className="sub">{kurambit.gamesLabel}</p>
            <ul className="index">
              {kurambit.games.map((game) => (
                <Row key={game.name} name={game.name} note={game.line} end={game.engine} />
              ))}
            </ul>
          </article>

          <article className="project" aria-labelledby="circe">
            <ProjectHead project={circe} />
            {circe.body.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </article>
        </Section>

        <Section id="earlier" label="earlier">
          <ul className="index">
            {earlier.map((item) => (
              <Row key={item.name} name={item.name} note={item.line} end={<Links links={item.links} />} />
            ))}
          </ul>
          <p className="index experiments">
            <span className="dim">{experiments.label}</span>
            <Links links={experiments.links} />
          </p>
        </Section>

        <Section id="work" label="work">
          <ul className="index">
            {experience.map((item) => (
              <Row key={item.where} name={item.where} note={item.what} end={item.when} />
            ))}
          </ul>
        </Section>

        <Section id="contact" label="contact">
          <dl className="index contact">
            <div>
              <dt>email</dt>
              <dd>
                <Out href={`mailto:${contact.email}`}>{contact.email}</Out>
              </dd>
            </div>
            {contact.links.map((link) => (
              <div key={link.label}>
                <dt>{link.label}</dt>
                <dd>
                  <Out href={link.href}>{link.value}</Out>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

      </main>
    </>
  );
}
