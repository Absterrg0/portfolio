import { contact, now, site, work } from "../data/portfolio";

export function PortfolioJsonLd() {
  const person = `${site.url}/#person`;
  const projects = [now.kurambit, now.circe, ...work.filter((item) => item.name !== "interfaces")];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: site.name,
        url: `${site.url}/`,
        jobTitle: site.role,
        email: `mailto:${contact.email}`,
        address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bengaluru" },
        sameAs: contact.links.filter((link) => link.href.startsWith("http")).map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        description: site.description,
        author: { "@id": person },
      },
      {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: "tagline" in project ? project.tagline : project.line,
            url: project.links[0].href,
            creator: { "@id": person },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
