import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { landscape } from "./art/render";

export const alt = "Parv Jain, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono = await readFile(join(process.cwd(), "src/app/fonts/JetBrainsMono-Regular.ttf"));

const ink = "#e6e4de";
const dim = "#8e8c85";

export default function OpenGraphImage() {
  const scene = landscape(120, 28, 0).split("\n");
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "56px 60px",
        background: "#0f0f0e",
        color: ink,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", fontSize: 15, lineHeight: 1 }}>
        {scene.map((row, i) => (
          <div key={i} style={{ display: "flex", whiteSpace: "pre", height: 15 }}>
            {row || " "}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 24 }}>
        <div style={{ display: "flex", fontSize: 48 }}>Parv Jain</div>
        <div style={{ display: "flex", color: dim }}>kurambit.com / heycirce.com</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "JetBrains Mono", data: mono, style: "normal", weight: 400 }] },
  );
}
