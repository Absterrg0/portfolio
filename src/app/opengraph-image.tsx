import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { fox } from "./data/ascii";

export const alt = "Parv Jain, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono = await readFile(join(process.cwd(), "src/app/fonts/JetBrainsMono-Regular.ttf"));

const ink = "#e6e4de";
const dim = "#8e8c85";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%",
        height: "100%",
        padding: "72px 80px",
        background: "#0f0f0e",
        color: ink,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 26 }}>
        <div style={{ display: "flex", fontSize: 56, marginBottom: 18 }}>Parv Jain</div>
        <div style={{ display: "flex", color: dim }}>full-stack developer, bengaluru</div>
        <div style={{ display: "flex", color: dim }}>kurambit.com / heycirce.com</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, fontSize: 15 }}>
        {fox.map((row, i) => (
          <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
            {row || " "}
          </div>
        ))}
      </div>
    </div>,
    { ...size, fonts: [{ name: "JetBrains Mono", data: mono, style: "normal", weight: 400 }] },
  );
}
