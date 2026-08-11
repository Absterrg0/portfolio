import { readFile } from "node:fs/promises";
import ts from "typescript";

const routes = ["/", "/atlas"];
const sectionIds = ["systems", "interfaces", "practice", "about", "contact"];
const source = await readFile(new URL("../src/app/data/portfolio.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { portfolioContent: content } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const decode = (value) => value
  .replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'")
  .replaceAll("&lt;", "<").replaceAll("&gt;", ">").replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
const normalize = (value) => decode(value).replace(/\s+/g, " ").trim();
const visibleText = (html) => normalize(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const count = (html, fragment) => (html.match(new RegExp(escapeRegex(fragment), "g")) ?? []).length;

const requiredText = [
  content.hero.eyebrow, content.hero.titleLead, content.hero.titleMiddle, content.hero.titleTail, content.hero.biography,
  ...Object.values(content.sections).flatMap((section) => [section.eyebrow, section.title, section.description].filter(Boolean)),
  ...content.systems.flatMap((project) => [project.index, project.title, project.category, project.description, project.stack.join(" · ")]),
  ...content.interfaces.flatMap((item) => [item.index, item.title, item.description]),
  content.practice.title, content.practice.description,
  ...content.capabilities.flatMap((group) => [group.index, group.title, group.items]),
  content.about.biography, content.identity.name, content.about.profileLine,
  ...content.timeline.flatMap((entry) => [entry.index, entry.date, entry.title, entry.role, entry.description]),
  content.contact.eyebrow, content.contact.titleLead, content.contact.titleTail, content.contact.email,
  ...content.contact.social.map((link) => link.label), content.contact.resume.label,
];
const requiredHrefs = [
  ...content.systems.flatMap((project) => project.links.map((link) => link.href)),
  ...content.interfaces.map((item) => item.href),
  ...content.practice.links.map((link) => link.href),
  ...content.contact.social.map((link) => link.href),
  content.contact.resume.href,
  `mailto:${content.contact.email}`,
];
const requiredIds = [
  ...sectionIds,
  ...content.systems.map((project) => `system-${project.id}`),
  ...content.interfaces.map((item) => `interface-${item.id}`),
  ...content.timeline.map((entry) => `timeline-${entry.id}`),
];

const staticFiles = { "/": "../.next/server/app/index.html", "/atlas": "../.next/server/app/atlas.html" };
const pages = await Promise.all(routes.map(async (route) => {
  if (process.env.PORTFOLIO_URL) {
    const response = await fetch(`${process.env.PORTFOLIO_URL}${route}`);
    if (!response.ok) throw new Error(`${route} returned ${response.status}`);
    return [route, await response.text()];
  }
  return [route, await readFile(new URL(staticFiles[route], import.meta.url), "utf8")];
}));

const failures = [];
for (const [route, html] of pages) {
    const text = visibleText(html);
    for (const expected of requiredText) {
      if (!text.includes(normalize(expected))) failures.push(`${route}: missing canonical text: ${expected}`);
    }
    for (const href of requiredHrefs) {
      if (!decode(html).includes(`href="${href}"`)) failures.push(`${route}: missing href: ${href}`);
    }
    for (const id of requiredIds) {
      if (!html.includes(`id="${id}"`)) failures.push(`${route}: missing id: ${id}`);
    }
    const order = sectionIds.map((id) => html.indexOf(`id="${id}"`));
    if (order.some((position) => position < 0) || order.some((position, index) => index > 0 && position <= order[index - 1])) {
      failures.push(`${route}: canonical section order is invalid`);
    }
    const systemCount = count(html, "data-content-kind=\"system\"");
    const interfaceCount = count(html, "data-content-kind=\"interface\"");
    const timelineCount = count(html, "data-content-kind=\"timeline\"");
    if (systemCount !== 4) failures.push(`${route}: expected 4 systems, found ${systemCount}`);
    if (interfaceCount !== 9) failures.push(`${route}: expected 9 interfaces, found ${interfaceCount}`);
    if (timelineCount !== content.timeline.length) failures.push(`${route}: expected ${content.timeline.length} timeline records, found ${timelineCount}`);
    if (count(html, "data-content-kind=\"practice\"") !== 1) failures.push(`${route}: Okito SDK record count is not 1`);
    if (count(html, "data-content-kind=\"capabilities\"") !== 1) failures.push(`${route}: capability group container count is not 1`);
    if (route !== "/" && !html.includes('name="robots" content="noindex, follow"')) failures.push(`${route}: missing noindex,follow robots metadata`);
    if (!/rel="canonical" href="https:\/\/abstergo\.fyi\/?"/.test(html)) failures.push(`${route}: canonical does not resolve to the root portfolio`);
}

if (failures.length) throw new Error(`Mode parity failed:\n- ${failures.join("\n- ")}`);
console.log(`Mode parity verified against ${process.env.PORTFOLIO_URL ?? ".next static production HTML"}`);
console.log(`✓ 4 systems · 9 interfaces · Okito SDK · 4 capability groups · ${content.timeline.length} timeline records`);
console.log("✓ canonical hero/about/contact copy, IDs, order, email, social, résumé, project and source URLs");
console.log("✓ /atlas noindex+follow and both routes canonicalize to /");
