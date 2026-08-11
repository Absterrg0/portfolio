import type { Metadata } from "next";
import Image from "next/image";
import { AbstergoStack } from "../components/abstergo-stack";
import { BrandMark } from "../components/brand-mark";
import { LocalTime } from "../components/local-time";
import { ModeSwitcher } from "../components/mode-switcher";
import { PortfolioJsonLd } from "../components/portfolio-json-ld";
import { SiteHeader } from "../components/site-header";
import { portfolioContent as content } from "../data/portfolio";

export const metadata: Metadata = {
  description: "Parv Jain’s product systems and interface work.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Parv Jain",
    description: "Selected product systems and interface work by Parv Jain.",
    url: "/atlas",
    siteName: "Parv Jain",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/atlas/opengraph-image", width: 1200, height: 630, alt: "Parv Jain" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parv Jain",
    description: "Selected product systems and interface work by Parv Jain.",
    creator: "@notabbytwt",
    images: [{ url: "/atlas/opengraph-image", alt: "Parv Jain" }],
  },
};


const INDIA_TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: content.identity.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function Arrow({ direction = "external" }: { direction?: "external" | "down" }) {
  return <span className="arrow" aria-hidden="true">{direction === "down" ? "↓" : "↗"}</span>;
}

function SectionHeader({ section, headingId }: {
  section: Readonly<{ index: string; eyebrow: string; title: string; description: string }>;
  headingId: string;
}) {
  return (
    <header className="section-header">
      <div className="section-header__index"><span>{section.index}</span><span>{section.eyebrow}</span></div>
      <h2 id={headingId}>{section.title}</h2>
      <p>{section.description}</p>
    </header>
  );
}

function SystemCard({ project, position }: {
  project: (typeof content.systems)[number];
  position: number;
}) {
  return (
    <article id={`system-${project.id}`} data-content-kind="system" className={`system-card ${position % 2 === 1 ? "system-card--reverse" : ""}`}>
      <div className="system-card__visual iso-frame">
        <Image src={project.image} alt="" width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 58vw, 61vw" />
        <span className="visual-coordinate">{project.index} / VISUAL RECORD</span>
      </div>
      <div className="system-card__body">
        <div className="system-card__title"><span>{project.index}</span><h3>{project.title}</h3></div>
        <p className="system-card__category">{project.category}</p>
        <p className="system-card__description">{project.description}</p>
        <p className="technology-line">{project.stack.join(" · ")}</p>
        <div className="work-links">
          {project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Arrow /></a>)}
        </div>
      </div>
    </article>
  );
}

function InterfaceCard({ item }: { item: (typeof content.interfaces)[number] }) {
  const isFeatured = item.span === "feature";
  const signal = "signal" in item ? item.signal : "neutral";
  return (
    <article id={`interface-${item.id}`} data-content-kind="interface" className={`interface-card interface-card--${item.span} interface-card--${signal}`}>
      <a href={item.href} target="_blank" rel="noreferrer" className="interface-card__link">
        <div className="interface-card__visual iso-frame">
          <Image src={item.image} alt="" width={item.imageWidth} height={item.imageHeight} sizes={isFeatured ? "(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 58vw, 64vw" : "(max-width: 767px) calc(100vw - 2rem), 46vw"} />
          <span className="visual-coordinate">{item.index} / INTERFACE CAPTURE</span>
        </div>
        <div className="interface-card__body">
          <div><span className="interface-card__index">{item.index}</span><h3>{item.title}</h3></div>
          <p>{item.description}</p>
          <span className="interface-card__action">Open case <Arrow /></span>
          <span className="sr-only">(opens in a new tab)</span>
        </div>
      </a>
    </article>
  );
}

export default function AtlasPage() {
  const currentTime = INDIA_TIME_FORMATTER.format(new Date());
  const currentYear = new Date().getFullYear();
  const studioLine = `${content.identity.studio} / ${content.identity.descriptor}`;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader
        links={content.navigation}
        name={content.identity.name}
        studioLine={studioLine}
        availability={content.identity.availability}
        availabilityLong={content.identity.availabilityLong}
        resume={content.contact.resume}
      />
      <main id="main-content" data-portfolio-mode="atlas">
        <PortfolioJsonLd />
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__index" aria-hidden="true"><span>INDEX / 01—05</span><span>SCROLL TO NAVIGATE <Arrow direction="down" /></span></div>
          <div className="hero__content">
            <p className="eyebrow"><i /> {content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.titleLead} <span>{content.hero.titleMiddle} <span className="hero__keep">{content.hero.titleTail}</span></span></h1>
            <p className="hero__copy">{content.hero.biography}</p>
            <div className="hero__actions">
              {content.hero.actions.map((action) => <a href={action.href} key={action.href}>{action.label} <Arrow direction="down" /></a>)}
            </div>
          </div>
          <AbstergoStack />
          <div className="hero__status">
            <div><span>STATUS</span><strong><i /> {content.identity.availability}</strong></div>
            <div><span>LOCAL TIME / INDIA</span><strong><LocalTime initialTime={currentTime} /></strong></div>
            <div><span>RECENT</span><strong>{content.identity.focus}</strong></div>
          </div>
        </section>

        <section className="page-section systems-section" id="systems" aria-labelledby="systems-title">
          <SectionHeader section={content.sections.systems} headingId="systems-title" />
          <div className="systems-grid">{content.systems.map((project, position) => <SystemCard project={project} position={position} key={project.id} />)}</div>
        </section>

        <section className="page-section interfaces-section" id="interfaces" aria-labelledby="interfaces-title">
          <SectionHeader section={content.sections.interfaces} headingId="interfaces-title" />
          <div className="archive-register" aria-hidden="true"><span>{content.sections.interfaces.register}</span><span>{content.sections.interfaces.range}</span><span>{content.sections.interfaces.discipline}</span></div>
          <div className="interfaces-grid">{content.interfaces.map((item) => <InterfaceCard item={item} key={item.id} />)}</div>
        </section>

        <section className="page-section practice-section" id="practice" aria-labelledby="practice-title">
          <SectionHeader section={content.sections.practice} headingId="practice-title" />
          <div className="practice-grid">
            <article className="sdk-module" data-content-kind="practice">
              <div className="sdk-module__top"><span>{content.practice.record}</span><span className="availability"><i /> {content.practice.status}</span></div>
              <div className="sdk-mark" aria-hidden="true"><span>OK</span><i /><i /><i /></div>
              <div className="sdk-module__copy"><p className="eyebrow">{content.practice.eyebrow}</p><h3>{content.practice.title}</h3><p>{content.practice.description}</p></div>
              <div className="work-links">{content.practice.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Arrow /></a>)}</div>
            </article>
            <div className="capability-matrix" data-content-kind="capabilities">
              <div className="capability-matrix__head"><span>CAPABILITY MATRIX</span><span>04 DISCIPLINES</span></div>
              {content.capabilities.map((group) => <article key={group.index}><span>{group.index}</span><h3>{group.title}</h3><p>{group.items}</p></article>)}
            </div>
          </div>
        </section>

        <section className="page-section about-section" id="about" aria-labelledby="about-title">
          <div className="about-intro"><p className="eyebrow">{content.sections.about.eyebrow}</p><h2 id="about-title">{content.sections.about.title}</h2><p>{content.about.biography}</p></div>
          <div className="profile-module">
            <div className="profile-module__image iso-frame"><Image src={content.about.portrait} alt={content.about.portraitAlt} width={400} height={400} sizes="(max-width: 767px) 45vw, 220px" /></div>
            <div><span>{content.about.profileRecord}</span><strong>{content.identity.name}</strong><small>{content.about.profileLine}</small></div>
          </div>
          <div className="timeline" aria-label="Experience and education">
            {content.timeline.map((entry) => <article id={`timeline-${entry.id}`} data-content-kind="timeline" key={entry.id}><div><span>{entry.index}</span><time>{entry.date}</time></div><h3>{entry.title}</h3><p className="timeline__role">{entry.role}</p><p>{entry.description}</p></article>)}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-section__coordinate"><span>{content.contact.coordinate}</span><span>{content.contact.zone}</span></div>
          <p className="eyebrow"><i /> {content.contact.eyebrow}</p>
          <h2 id="contact-title">{content.contact.titleLead}<br />{content.contact.titleTail}</h2>
          <a className="contact-email" href={`mailto:${content.contact.email}`}>{content.contact.email} <Arrow /></a>
          <div className="social-links">
            {content.contact.social.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Arrow /></a>)}
            <a href={content.contact.resume.href} target="_blank" rel="noreferrer">{content.contact.resume.label} <Arrow /></a>
          </div>
          <footer className="site-footer"><span className="site-footer__identity"><BrandMark className="site-footer__mark" tone="light" /> {content.footer.identity}</span><span>© {currentYear} / {content.footer.builtWith}</span><a href="#main-content">{content.footer.origin} ↑</a></footer>
        </section>
      </main>
      <ModeSwitcher current="atlas" className="mode-switcher--dock mode-switcher--atlas" />
    </>
  );
}
