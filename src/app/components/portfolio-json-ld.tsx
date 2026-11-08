import { circe, contact, earlier, kurambit, site } from "../data/portfolio";

export function PortfolioJsonLd() {
  const person = `${site.url}/#person`;
  const projects = [
    { name: kurambit.name, description: kurambit.summary, url: kurambit.links[0].href },
    { name: circe.name, description: circe.summary, url: circe.links[0].href },
    ...earlier
      .filter((item) => item.name !== "interfaces")
      .map((item) => ({ name: item.name, description: item.line, url: item.links[0].href })),
  ];
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
            description: project.description,
            url: project.url,
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
