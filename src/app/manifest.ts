import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Parv Jain",
    short_name: "Parv Jain",
    description: "Selected product systems and interface work by Parv Jain.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#171513",
    theme_color: "#171513",
    icons: [
      { src: "/icons/parv-jain-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/parv-jain-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/parv-jain-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
