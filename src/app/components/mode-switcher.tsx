import Link from "next/link";
import { portfolioContent } from "../data/portfolio";

export type PortfolioMode = "atlas" | "minimal";

export function ModeSwitcher({
  current,
  className = "",
}: {
  current: PortfolioMode;
  className?: string;
}) {
  return (
    <nav
      className={`mode-switcher ${className}`.trim()}
      aria-label="Switch portfolio visual style"
    >
      <div className="mode-switcher__options" role="presentation">
        {portfolioContent.modes.options.map((option) => (
          <Link
            key={option.id}
            href={option.href}
            aria-current={option.id === current ? "page" : undefined}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
