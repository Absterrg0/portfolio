import { Lighthouse } from "./components/lighthouse";
import { LocalTime } from "./components/local-time";
import { PortfolioJsonLd } from "./components/portfolio-json-ld";
import { circeFigure } from "./data/ascii";
import { circe, contact, earlier, experience, intro, kurambit, site, type Link } from "./data/portfolio";

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

// One line of the ledger: mono facts in the margin, sentences in the column.
function Line({
  side,
  children,
  className = "",
}: {
  side?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`line ${className}`}>
      <div className="side">{side}</div>
      <div className="main">{children}</div>
    </div>
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
  return (
    <>
      <PortfolioJsonLd />
      <main className="page">
        <header>
          <Line side={<span className="caption">the lighthouse from tidewake, a game made with kurambit</span>} className="figure">
            <Lighthouse />
          </Line>
          <Line
            className="head"
            side={
              <>
                <span>{site.location.toLowerCase()}</span>
                <LocalTime initialTime={initialIst()} />
              </>
            }
          >
            <h1>{site.name}</h1>
            {intro.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </Line>
        </header>

        <section aria-labelledby="kurambit">
          <Line className="head" side={<Links links={kurambit.links} />}>
            <h2 id="kurambit">{kurambit.name}</h2>
            <p>{kurambit.body}</p>
          </Line>
          <ul className="games" aria-label="Games made with Kurambit">
            {kurambit.games.map((game) => (
              <li key={game.name}>
                <Line
                  side={
                    <>
                      <span className="name">{game.name}</span>
                      <span>{game.engine}</span>
                    </>
                  }
                >
                  <p>{game.line}</p>
                </Line>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="circe">
          <Line
            className="head"
            side={
              <>
                <Links links={circe.links} />
                <span>{circe.note}</span>
              </>
            }
          >
            <h2 id="circe">{circe.name}</h2>
            <p>{circe.body}</p>
          </Line>
          <Line className="figure">
            <pre className="art" aria-label="A spoken request sorted into a question, an operation or work.">
              {circeFigure.lines.map((row, i) => (
                <span key={i} className={(circeFigure.taken as readonly number[]).includes(i) ? "ink" : undefined}>
                  {row + "\n"}
                </span>
              ))}
            </pre>
          </Line>
        </section>

        <section aria-labelledby="earlier">
          <Line side={<h2 id="earlier">earlier</h2>} className="label">
            {null}
          </Line>
          <ul>
            {earlier.map((item) => (
              <li key={item.name}>
                <Line
                  side={
                    <>
                      <span className="name">{item.name}</span>
                      <Links links={item.links} />
                    </>
                  }
                >
                  <p>{item.line}</p>
                </Line>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="experience">
          <Line side={<h2 id="experience">experience</h2>} className="label">
            {null}
          </Line>
          <ul>
            {experience.map((item) => (
              <li key={item.where}>
                <Line side={<span>{item.when}</span>}>
                  <p>
                    <strong>{item.where}.</strong> {item.what}
                  </p>
                </Line>
              </li>
            ))}
          </ul>
        </section>

        <footer>
          <Line side={<h2>contact</h2>} className="contact">
            <p className="email">
              <Out href={`mailto:${contact.email}`}>{contact.email}</Out>
            </p>
            <Links links={contact.links} />
          </Line>
        </footer>
      </main>
    </>
  );
}
