import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const mono = await readFile(join(process.cwd(), "src/app/fonts/JetBrainsMono-Regular.ttf"));

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#1a1a18",
        color: "#f6f5f1",
        fontFamily: "JetBrains Mono",
        fontSize: 84,
      }}
    >
      <span>pj_</span>
    </div>,
    { ...size, fonts: [{ name: "JetBrains Mono", data: mono, style: "normal", weight: 400 }] },
  );
}
