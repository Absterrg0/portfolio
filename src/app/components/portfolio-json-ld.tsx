import { portfolioContent as content } from "../data/portfolio";

export function PortfolioJsonLd() {
  const projectEntries = [...content.systems, ...content.interfaces].map((project, position) => ({
    "@type": "ListItem",
    position: position + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: "href" in project ? project.href : project.links[0].href,
      creator: { "@id": "https://abstergo.fyi/#person" },
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://abstergo.fyi/#person",
        name: content.identity.name,
        url: "https://abstergo.fyi/",
        jobTitle: content.identity.role,
        address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bengaluru" },
        sameAs: content.contact.social.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": "https://abstergo.fyi/#website",
        name: `${content.identity.name} / ${content.identity.studio}`,
        url: "https://abstergo.fyi/",
        description: "Selected product systems and interface work by Parv Jain.",
        author: { "@id": "https://abstergo.fyi/#person" },
      },
      {
        "@type": "ItemList",
        "@id": "https://abstergo.fyi/#selected-work",
        name: "Selected systems and interface work",
        numberOfItems: projectEntries.length,
        itemListElement: projectEntries,
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
