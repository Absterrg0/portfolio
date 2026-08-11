import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Parv Jain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markBase64 = await readFile(join(process.cwd(), "public/brand/pj-hinge-mark-mono.svg"), "base64");
const newsreader = await readFile(join(process.cwd(), "public/brand/newsreader-og-regular.ttf"));

export default function MinimalOpenGraphImage() {
  return new ImageResponse(
    <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", color: "#EEE7DC", background: "#171513", fontFamily: "Newsreader" }}>
      <div style={{ position: "absolute", inset: 32, display: "flex", border: "1px solid rgba(238,231,220,.19)" }} />
      {[184, 344, 504].map((top) => <div key={top} style={{ position: "absolute", left: 32, right: 32, top, display: "flex", borderTop: "1px solid rgba(238,231,220,.12)" }} />)}
      <div style={{ position: "absolute", left: 344, top: 32, bottom: 32, display: "flex", borderLeft: "1px solid rgba(238,231,220,.12)" }} />
      <div style={{ position: "absolute", left: 72, top: 70, display: "flex", alignItems: "center", gap: 20 }}>
        <img alt="" src={`data:image/svg+xml;base64,${markBase64}`} width="62" height="62" style={{ width: 62, height: 62 }} />
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: ".08em" }}>PARV JAIN</span>
          <span style={{ marginTop: 6, color: "#A69C90", fontSize: 12, letterSpacing: ".14em" }}>ABSTERGO / PRODUCT SYSTEMS</span>
        </div>
      </div>
      <div style={{ position: "absolute", right: 72, top: 84, display: "flex", color: "#BD5D42", fontFamily: "monospace", fontSize: 14, letterSpacing: ".14em" }}>REGISTER / 02</div>
      <div style={{ position: "absolute", left: 72, top: 225, display: "flex", width: 930, flexDirection: "column" }}>
        <span style={{ color: "#BD5D42", fontFamily: "monospace", fontSize: 14, letterSpacing: ".14em" }}>EDITORIAL LEDGER / ONE BODY OF WORK</span>
        <span style={{ marginTop: 18, fontSize: 78, letterSpacing: "-.045em", lineHeight: .96 }}>Product &amp; full-stack</span>
        <span style={{ color: "#A69C90", fontSize: 78, letterSpacing: "-.045em", lineHeight: .96 }}>developer.</span>
      </div>
      <div style={{ position: "absolute", left: 72, right: 72, bottom: 67, display: "flex", justifyContent: "space-between", color: "#A69C90", fontFamily: "monospace", fontSize: 13, letterSpacing: ".12em" }}>
        <span>SAME WORK. DIFFERENT INTERFACE.</span><span style={{ color: "#EEE7DC" }}>ABSTERGO.FYI</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }],
    },
  );
}
