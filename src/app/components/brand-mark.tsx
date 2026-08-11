import Image from "next/image";

export function BrandMark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light" | "mono";
}) {
  const source = tone === "light"
    ? "/brand/pj-hinge-mark-light.svg"
    : tone === "mono"
      ? "/brand/pj-hinge-mark-mono.svg"
      : "/brand/pj-hinge-mark.svg";

  return (
    <Image
      src={source}
      alt=""
      width={64}
      height={64}
      className={className}
      aria-hidden="true"
      unoptimized
    />
  );
}
