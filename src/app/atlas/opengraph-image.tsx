import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Parv Jain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markBase64 = await readFile(
  join(process.cwd(), "public/brand/pj-hinge-mark.svg"),
  "base64",
);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          color: "#F2F0E8",
          backgroundColor: "#080A09",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 82% 42%, rgba(182,255,74,.08), transparent 310px), linear-gradient(90deg, #080A09 0%, #080A09 54%, rgba(8,10,9,.60) 100%)",
          }}
        />

        <svg
          width="520"
          height="520"
          viewBox="0 0 520 520"
          style={{ position: "absolute", right: 8, top: 38 }}
        >
          <polygon points="250,38 468,147 318,222 100,113" fill="#1b211c" stroke="rgba(242,240,232,.34)" strokeWidth="2" />
          <polygon points="100,113 318,222 318,256 100,147" fill="#111512" stroke="rgba(242,240,232,.18)" />
          <polygon points="318,222 468,147 468,181 318,256" fill="#0d100e" stroke="#E36F45" strokeOpacity=".55" />
          <polygon points="250,267 468,376 318,451 100,342" fill="#151A16" stroke="rgba(242,240,232,.34)" strokeWidth="2" />
          <polygon points="100,342 318,451 318,485 100,376" fill="#0e120f" stroke="rgba(242,240,232,.18)" />
          <polygon points="318,451 468,376 468,410 318,485" fill="#0b0e0c" stroke="rgba(242,240,232,.18)" />
          <path d="M289 244 326 225 349 237 312 256Z" fill="#B6FF4A" />
          <path d="M405 180c42 28 42 74 0 102-31 21-31 64 0 85" fill="none" stroke="#B6FF4A" strokeWidth="3" strokeDasharray="8 10" />
          <circle cx="405" cy="180" r="7" fill="#B6FF4A" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 12,
            height: "100%",
            display: "flex",
            background: "#B6FF4A",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            padding: "58px 64px 48px 76px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <img
              alt=""
              src={`data:image/svg+xml;base64,${markBase64}`}
              width="84"
              height="84"
              style={{ width: 84, height: 84 }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, fontWeight: 750, letterSpacing: ".08em" }}>PARV JAIN</span>
              <span style={{ marginTop: 7, color: "#9DA69C", fontSize: 14, letterSpacing: ".14em" }}>
                ABSTERGO / PRODUCT SYSTEMS
              </span>
            </div>
          </div>

          <div style={{ display: "flex", width: 720, flexDirection: "column" }}>
            <span style={{ color: "#B6FF4A", fontSize: 16, letterSpacing: ".14em" }}>
              PRODUCT + INTERFACE ENGINEERING
            </span>
            <div
              style={{
                display: "flex",
                marginTop: 19,
                flexDirection: "column",
                fontSize: 69,
                fontWeight: 680,
                letterSpacing: "-.055em",
                lineHeight: 1.01,
              }}
            >
              <span>Product &amp; full-stack</span>
              <span style={{ color: "#9DA69C", fontWeight: 460 }}>developer.</span>
            </div>
            <span style={{ width: 590, marginTop: 22, color: "#9DA69C", fontSize: 20, lineHeight: 1.45 }}>
              Designing the interface and building the system behind it.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(242,240,232,.22)",
              paddingTop: 16,
              color: "#9DA69C",
              fontSize: 14,
              letterSpacing: ".12em",
            }}
          >
            <span>ABSTERGO.FYI</span>
            <span style={{ color: "#E36F45" }}>BENGALURU / INDIA</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
