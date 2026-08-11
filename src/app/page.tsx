import type { Metadata } from "next";
import Image from "next/image";
import { BrandMark } from "./components/brand-mark";
import { ModeSwitcher } from "./components/mode-switcher";
import { PortfolioJsonLd } from "./components/portfolio-json-ld";
import { portfolioContent as content } from "./data/portfolio";
import styles from "./minimal.module.css";

export const metadata: Metadata = {
  title: "Editorial Ledger — Product & Full-stack Developer",
  description: "Parv Jain’s product systems and interface work, rendered as a quiet editorial ledger.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Parv Jain — Editorial Ledger",
    description: "The same product systems and interface work, through a restrained editorial interface.",
    url: "/",
    siteName: "Parv Jain / Abstergo",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Parv Jain Editorial Ledger portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parv Jain — Editorial Ledger",
    description: "One body of product work, rendered as an editorial ledger.",
    creator: "@notabbytwt",
    images: [{ url: "/opengraph-image", alt: "Parv Jain Editorial Ledger portfolio" }],
  },
};

function Outbound() { return <span aria-hidden="true">↗</span>; }

function LedgerHeading({ id, index, eyebrow, title, description }: {
  id: string; index: string; eyebrow: string; title: string; description: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <div><span>{index}</span><span>{eyebrow}</span></div>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default function HomePage() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.shell} data-portfolio-mode="minimal">
      <a className={styles.skip} href="#main-content">Skip to main content</a>
      <header className={styles.siteHeader}>
        <a className={styles.identity} href="#main-content" aria-label={`${content.identity.name}, go to introduction`}>
          <BrandMark className={styles.mark} tone="mono" />
          <span><strong>{content.identity.name}</strong><small>{content.identity.studio} / {content.identity.descriptor}</small></span>
        </a>
        <nav className={styles.primaryNav} aria-label="Editorial ledger sections">
          {content.navigation.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
        <nav className={styles.mobileSectionNav} aria-label="Editorial ledger sections">
          {content.navigation.map((link) => <a href={link.href} key={link.href}><span>{link.index}</span>{link.label}</a>)}
        </nav>
      </header>

      <main id="main-content" className={styles.rail}>
        <PortfolioJsonLd />
        <section className={styles.introduction} aria-labelledby="minimal-hero-title">
          <div className={styles.keyArt}>
            <Image src="/brand/pj-hinge-key-art.webp" alt="" fill priority sizes="(max-width: 768px) 100vw, 960px" />
            <div><span>VOLUME / 01</span><span>{content.modes.statement}</span></div>
          </div>
          <div className={styles.dossier}>
            <Image className={styles.portrait} src={content.about.portrait} alt={content.about.portraitAlt} width={184} height={184} priority />
            <div className={styles.dossierName}>
              <span>{content.about.profileRecord}</span><h1>{content.identity.name}</h1><strong>{content.about.profileLine}</strong><p>{content.identity.location}</p>
            </div>
            <dl>
              <div><dt>Status</dt><dd>{content.identity.availability}</dd></div>
              <div><dt>Focus</dt><dd>{content.identity.focus}</dd></div>
              <div><dt>Register</dt><dd>{content.modes.callout}</dd></div>
            </dl>
          </div>
          <article className={styles.lede}>
            <p>{content.hero.eyebrow}</p>
            <h2 id="minimal-hero-title">{content.hero.titleLead} <em>{content.hero.titleMiddle}</em> {content.hero.titleTail}</h2>
            <p className={styles.heroCopy}>{content.hero.biography}</p>
            <div className={styles.textLinks}>{content.hero.actions.map((action) => <a href={action.href} key={action.href}>{action.label} <span aria-hidden="true">↓</span></a>)}</div>
          </article>
        </section>

        <section id="systems" className={styles.section} aria-labelledby="minimal-systems-title">
          <LedgerHeading id="minimal-systems-title" {...content.sections.systems} />
          <div className={styles.systemGrid}>
            {content.systems.map((project) => (
              <article id={`system-${project.id}`} data-content-kind="system" className={styles.systemCard} key={project.id}>
                <div className={styles.systemImage}>
                  <Image src={project.image} alt="" width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 720px) calc(100vw - 2.5rem), 450px" />
                </div>
                <div className={styles.recordLine}><span>{project.index}</span><span>{project.category}</span></div>
                <h3>{project.title}</h3><p>{project.description}</p><p className={styles.stack}>{project.stack.join(" · ")}</p>
                <div className={styles.textLinks}>{project.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Outbound /></a>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="interfaces" className={styles.section} aria-labelledby="minimal-interfaces-title">
          <LedgerHeading id="minimal-interfaces-title" {...content.sections.interfaces} />
          <div className={styles.interfaceRegister}>
            <div className={styles.registerHead}><span>{content.sections.interfaces.register}</span><span>{content.sections.interfaces.range}</span><span>{content.sections.interfaces.discipline}</span></div>
            {content.interfaces.map((item) => (
              <article id={`interface-${item.id}`} data-content-kind="interface" className={styles.interfaceRow} key={item.id}>
                <span className={styles.rowIndex}>{item.index}</span>
                <div className={styles.interfaceImage}>
                  <Image src={item.image} alt="" width={item.imageWidth} height={item.imageHeight} sizes="(max-width: 720px) 112px, 160px" />
                </div>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
                <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`}>Open <Outbound /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="practice" className={styles.section} aria-labelledby="minimal-practice-title">
          <LedgerHeading id="minimal-practice-title" {...content.sections.practice} />
          <article className={styles.sdkRecord} data-content-kind="practice">
            <div className={styles.sdkLabel}><span>{content.practice.record}</span><strong>{content.practice.status}</strong></div>
            <div><p>{content.practice.eyebrow}</p><h3>{content.practice.title}</h3><p>{content.practice.description}</p></div>
            <div className={styles.textLinks}>{content.practice.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <Outbound /></a>)}</div>
          </article>
          <div className={styles.capabilityLedger} data-content-kind="capabilities">
            {content.capabilities.map((group) => <article key={group.index}><span>{group.index}</span><h3>{group.title}</h3><p>{group.items}</p></article>)}
          </div>
        </section>

        <section id="about" className={styles.section} aria-labelledby="minimal-about-title">
          <header className={styles.aboutHeading}><p>{content.sections.about.eyebrow}</p><h2 id="minimal-about-title">{content.sections.about.title}</h2><p>{content.about.biography}</p></header>
          <div className={styles.timeline} aria-label="Experience and education">
            {content.timeline.map((entry) => <article id={`timeline-${entry.id}`} data-content-kind="timeline" key={entry.id}><div><span>{entry.index}</span><time>{entry.date}</time></div><h3>{entry.title}</h3><strong>{entry.role}</strong><p>{entry.description}</p></article>)}
          </div>
        </section>

        <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="minimal-contact-title">
          <div className={styles.contactCoordinate}><span>{content.contact.coordinate}</span><span>{content.contact.zone}</span></div>
          <p>{content.contact.eyebrow}</p>
          <h2 id="minimal-contact-title">{content.contact.titleLead}<br />{content.contact.titleTail}</h2>
          <a className={styles.email} href={`mailto:${content.contact.email}`}>{content.contact.email} <Outbound /></a>
          <div className={styles.directory}>
            {content.contact.social.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}><span>{link.label}</span><Outbound /></a>)}
            <a href={content.contact.resume.href} target="_blank" rel="noreferrer"><span>{content.contact.resume.label}</span><Outbound /></a>
          </div>
          <footer className={styles.footer}><span>{content.footer.identity}</span><span>© {year} / {content.footer.builtWith}</span><a href="#main-content">{content.footer.origin} ↑</a></footer>
        </section>
      </main>
      <ModeSwitcher current="minimal" className="mode-switcher--dock mode-switcher--minimal" />
    </div>
  );
}
