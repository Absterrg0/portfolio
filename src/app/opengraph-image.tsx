import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { banner } from "./data/ascii";

export const alt = "Parv Jain, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono = await readFile(join(process.cwd(), "src/app/fonts/JetBrainsMono-Regular.ttf"));

const line = (text: string, color: string, fontSize: number) => (
  <div style={{ display: "flex", color, fontSize, whiteSpace: "pre" }}>{text}</div>
);

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "80px 88px",
        background: "#0f0f0e",
        color: "#e6e4de",
        fontFamily: "JetBrains Mono",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        {banner.split("\n").map((row, i) => (
          <div key={i} style={{ display: "flex", fontSize: 30, whiteSpace: "pre" }}>{row || " "}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {line("full-stack developer / bengaluru", "#76746e", 26)}
        {line("> kurambit   a game studio that plays what it builds", "#e6e4de", 26)}
        {line("> circe      a voice-first control plane for coding agents", "#e6e4de", 26)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#76746e", fontSize: 22 }}>
        <span>abstergo.fyi</span>
        <span>kurambit.com  /  heycirce.com</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "JetBrains Mono", data: mono, style: "normal", weight: 400 }] },
  );
}
