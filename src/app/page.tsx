import { Fox } from "./components/fox";
import { LocalTime } from "./components/local-time";
import { PortfolioJsonLd } from "./components/portfolio-json-ld";
import { circeFigure } from "./data/ascii";
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

// A labelled ASCII rule: "-- earlier -----------".
function Rule({ id, children }: { id: string; children: string }) {
  return (
    <h2 className="rule" id={id}>
      <span>{children}</span>
    </h2>
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

function Project({
  project,
  children,
}: {
  project: { name: string; meta: string; body: readonly string[]; links: readonly Link[] };
  children?: React.ReactNode;
}) {
  const id = project.name.toLowerCase();
  return (
    <article className="project" aria-labelledby={id}>
      <div className="project-head">
        <h3 id={id}>{project.name}</h3>
        <Links links={project.links} />
      </div>
      <p className="project-meta">{project.meta}</p>
      {project.body.map((sentence) => (
        <p key={sentence}>{sentence}</p>
      ))}
      {children}
    </article>
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
        <header className="hero">
          <Fox />
          <h1>{site.name}</h1>
          <p className="intro">{intro}</p>
          <p className="meta">
            {site.location.split(",")[0].toLowerCase()} <LocalTime initialTime={initialIst()} />
          </p>
        </header>

        <section aria-labelledby="now">
          <Rule id="now">now</Rule>
          <Project project={kurambit}>
            <p className="sub">{kurambit.gamesLabel}</p>
            <ul className="index">
              {kurambit.games.map((game) => (
                <Row key={game.name} name={game.name} note={game.line} end={game.engine} />
              ))}
            </ul>
          </Project>
          <Project project={circe}>
            <pre className="art circe" role="img" aria-label="A spoken request sorted into a question, an operation or work. This one is an operation.">
              {circeFigure.map((runs, i) => (
                <span key={i} className="circe-line">
                  {runs.map(([text, inked], j) => (
                    <span key={j} className={inked ? "ink" : undefined}>
                      {text}
                    </span>
                  ))}
                  {"\n"}
                </span>
              ))}
            </pre>
          </Project>
        </section>

        <section aria-labelledby="earlier">
          <Rule id="earlier">earlier</Rule>
          <ul className="index">
            {earlier.map((item) => (
              <Row key={item.name} name={item.name} note={item.line} end={<Links links={item.links} />} />
            ))}
          </ul>
          <p className="sub">{experiments.label}</p>
          <p className="index">
            <Links links={experiments.links} />
          </p>
        </section>

        <section aria-labelledby="work">
          <Rule id="work">work</Rule>
          <ul className="index">
            {experience.map((item) => (
              <Row key={item.where} name={item.where} note={item.what} end={item.when} />
            ))}
          </ul>
        </section>

        <footer aria-labelledby="contact">
          <Rule id="contact">contact</Rule>
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
        </footer>
      </main>
    </>
  );
}
