import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const brandDir = join(root, "public/brand");
const qaDir = join(brandDir, "qa");
const iconDir = join(root, "public/icons");
const appDir = join(root, "src/app");
const tempDir = join(root, ".brand-build");

const palette = {
  carbon: "#080A09",
  mineral: "#F2F0E8",
  graphite: "#151A16",
  lichen: "#9DA69C",
  signal: "#B6FF4A",
  oxide: "#E36F45",
};

// PJ Hinge canonical geometry. Every production asset is generated from these
// three filled forms; do not redraw the mark in application components.
const geometry = {
  p: "M6 6H31L43 18V29L32 40H23V58H6ZM23 18V29H30L35 24V22L31 18Z",
  j: "M42 6H58V41L43 58H27V45H36L42 39Z",
  hinge: "M35 27L42 20L49 27L42 34Z",
};

function markGroup({ p = palette.mineral, j = palette.lichen, hinge = palette.signal } = {}) {
  return `<g id="pj-hinge-mark"><path fill="${j}" d="${geometry.j}"/><path fill="${p}" fill-rule="evenodd" d="${geometry.p}"/><path fill="${hinge}" d="${geometry.hinge}"/></g>`;
}

function svgDocument(group, background = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${background}${group}</svg>\n`;
}

function write(path, contents) {
  writeFileSync(path, contents);
}

function render(svgPath, pngPath, size) {
  execFileSync("magick", ["-background", "none", "-density", "384", svgPath, "-resize", `${size}x${size}!`, "-strip", pngPath]);
}

mkdirSync(brandDir, { recursive: true });
mkdirSync(qaDir, { recursive: true });
mkdirSync(iconDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });

const darkMark = svgDocument(markGroup());
const lightMark = svgDocument(markGroup({ p: palette.carbon, j: "#394039" }));
const monoMark = svgDocument(markGroup({ p: palette.mineral, j: palette.mineral, hinge: palette.mineral }));
const appIcon = svgDocument(markGroup(), `<rect width="64" height="64" fill="${palette.carbon}"/>`);

write(join(brandDir, "pj-hinge-mark.svg"), darkMark);
write(join(brandDir, "pj-hinge-mark-light.svg"), lightMark);
write(join(brandDir, "pj-hinge-mark-mono.svg"), monoMark);
write(join(appDir, "icon.svg"), appIcon);

write(
  join(brandDir, "pj-hinge-pattern.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="192" viewBox="0 0 320 192">
  <rect width="320" height="192" fill="${palette.carbon}"/>
  <g fill="none" stroke="${palette.lichen}" stroke-opacity=".14" stroke-width="1">
    <path d="M-30 62 34-2M34 194l192-192M162 194 354 2M290 194l64-64"/>
    <path d="M-4 96h74l32-32h86l32 32h104"/>
  </g>
  <g fill="${palette.signal}" opacity=".5">
    <path d="m91 61 8-8 8 8-8 8z"/><path d="m219 93 8-8 8 8-8 8z"/>
  </g>
  <g fill="${palette.oxide}" opacity=".28"><path d="m27 189 5-5 5 5-5 5z"/></g>
</svg>\n`,
);

const iconSource = join(tempDir, "icon.svg");
write(iconSource, appIcon);
for (const size of [16, 24, 32, 48, 64, 180, 192, 512]) {
  render(iconSource, join(tempDir, `icon-${size}.png`), size);
}

execFileSync("magick", [
  join(tempDir, "icon-16.png"),
  join(tempDir, "icon-32.png"),
  join(tempDir, "icon-48.png"),
  join(appDir, "favicon.ico"),
]);

execFileSync("magick", [join(tempDir, "icon-180.png"), "-alpha", "off", join(appDir, "apple-icon.png")]);
execFileSync("magick", [join(tempDir, "icon-192.png"), "-alpha", "off", join(iconDir, "parv-jain-192.png")]);
execFileSync("magick", [join(tempDir, "icon-512.png"), "-alpha", "off", join(iconDir, "parv-jain-512.png")]);

const maskableSvg = svgDocument(
  `<g transform="translate(12.8 12.8) scale(.6)">${markGroup()}</g>`,
  `<rect width="64" height="64" fill="${palette.carbon}"/>`,
);
const maskableSource = join(tempDir, "maskable.svg");
write(maskableSource, maskableSvg);
render(maskableSource, join(iconDir, "parv-jain-maskable-512.png"), 512);

const markData = Buffer.from(darkMark).toString("base64");
const lightMarkData = Buffer.from(lightMark).toString("base64");
const keyArtData = readFileSync(join(brandDir, "pj-hinge-key-art.webp")).toString("base64");

const scaleStrip = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="360" viewBox="0 0 1100 360">
  <rect width="1100" height="180" fill="${palette.carbon}"/><rect y="180" width="1100" height="180" fill="${palette.mineral}"/>
  <g font-family="monospace" font-size="16" letter-spacing="2"><text x="34" y="50" fill="${palette.lichen}">DARK TAB</text><text x="34" y="230" fill="#4b524b">LIGHT TAB</text></g>
  ${[16, 24, 32, 48, 64].map((size, i) => {
    const x = 210 + i * 170;
    const y1 = 84 - size / 2;
    const y2 = 264 - size / 2;
    return `<image href="data:image/svg+xml;base64,${markData}" x="${x}" y="${y1}" width="${size}" height="${size}"/><image href="data:image/svg+xml;base64,${lightMarkData}" x="${x}" y="${y2}" width="${size}" height="${size}"/><text x="${x + size / 2}" y="145" fill="${palette.lichen}" font-family="monospace" font-size="14" text-anchor="middle">${size}px</text><text x="${x + size / 2}" y="325" fill="#4b524b" font-family="monospace" font-size="14" text-anchor="middle">${size}px</text>`;
  }).join("")}
</svg>`;
const scaleSource = join(tempDir, "scale-strip.svg");
write(scaleSource, scaleStrip);
execFileSync("magick", [scaleSource, "-strip", join(qaDir, "favicon-scale-strip.png")]);

const brandBoard = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 1800 1200">
  <rect width="1800" height="1200" fill="${palette.carbon}"/>
  <image href="data:image/webp;base64,${keyArtData}" x="1030" y="0" width="770" height="514" preserveAspectRatio="xMidYMid slice" opacity=".78"/>
  <rect x="0" y="0" width="1800" height="1200" fill="url(#fade)"/>
  <defs><linearGradient id="fade"><stop offset="0" stop-color="${palette.carbon}"/><stop offset=".55" stop-color="${palette.carbon}" stop-opacity=".92"/><stop offset="1" stop-color="${palette.carbon}" stop-opacity=".08"/></linearGradient></defs>
  <g font-family="sans-serif"><text x="88" y="86" fill="${palette.signal}" font-family="monospace" font-size="20" letter-spacing="4">IDENTITY SYSTEM / V2</text><text x="88" y="172" fill="${palette.mineral}" font-size="72" font-weight="700" letter-spacing="-3">PARV JAIN</text><text x="92" y="218" fill="${palette.lichen}" font-family="monospace" font-size="20" letter-spacing="3">ABSTERGO / PRODUCT SYSTEMS</text></g>
  <image href="data:image/svg+xml;base64,${markData}" x="88" y="300" width="280" height="280"/>
  <g font-family="sans-serif"><text x="420" y="360" fill="${palette.mineral}" font-size="46" font-weight="650">PJ Hinge</text><text x="420" y="405" fill="${palette.lichen}" font-family="monospace" font-size="18" letter-spacing="2">INTERFACE PLANE / SYSTEM PLANE / SIGNAL CUT</text><text x="420" y="474" fill="${palette.lichen}" font-size="24">Two architectural planes meet at one exact 45° incision.</text><text x="420" y="512" fill="${palette.lichen}" font-size="24">Parv leads. Abstergo remains the studio descriptor.</text></g>
  ${Object.entries(palette).map(([name, color], i) => `<g transform="translate(${88 + i * 270} 700)"><rect width="230" height="126" fill="${color}" stroke="rgba(242,240,232,.18)"/><text y="166" fill="${palette.mineral}" font-family="monospace" font-size="17" letter-spacing="2">${name.toUpperCase()}</text><text y="194" fill="${palette.lichen}" font-family="monospace" font-size="16">${color}</text></g>`).join("")}
  <g font-family="monospace" font-size="16" letter-spacing="2" fill="${palette.lichen}"><text x="88" y="930">SCALE TEST / 16 · 24 · 32 · 48 · 64</text><text x="88" y="1114">MINIMUM DIGITAL SIZE / 16PX</text><text x="1190" y="1114">CLEARSPACE / 1× HINGE WIDTH</text></g>
  ${[16, 24, 32, 48, 64].map((size, i) => `<image href="data:image/svg+xml;base64,${markData}" x="${115 + i * 150}" y="${990 - size / 2}" width="${size}" height="${size}"/>`).join("")}
  <line x1="88" y1="1148" x2="1712" y2="1148" stroke="${palette.lichen}" stroke-opacity=".22"/><text x="88" y="1180" fill="${palette.mineral}" font-family="monospace" font-size="14" letter-spacing="2">PRIMARY SANS / MANROPE</text><text x="1530" y="1180" fill="${palette.signal}" font-family="monospace" font-size="14" letter-spacing="2">SIGNAL / ACTIVE</text>
</svg>`;
const boardSource = join(tempDir, "brand-board.svg");
write(boardSource, brandBoard);
execFileSync("magick", [boardSource, "-strip", join(brandDir, "brand-board.png")]);

rmSync(tempDir, { recursive: true, force: true });
console.log("Generated PJ Hinge vector, favicon, app icons, scale strip, and brand board.");
