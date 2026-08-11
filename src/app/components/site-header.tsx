"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { BrandMark } from "./brand-mark";

type HeaderLink = Readonly<{ href: string; label: string; index: string }>;


function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function SiteHeader({
  links,
  name,
  studioLine,
  availability,
  availabilityLong,
  resume,
}: {
  links: readonly HeaderLink[];
  name: string;
  studioLine: string;
  availability: string;
  availabilityLong: string;
  resume: Readonly<{ label: string; href: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const closeMenu = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setIsOpen(false);
  };

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    closeMenu();
    window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <header className="site-header">
      <a className="identity" href="#main-content" aria-label={`${name}, go to introduction`}>
        <BrandMark className="identity__mark" />
        <span className="identity__name">
          <strong>{name}</strong>
          <small>{studioLine}</small>
        </span>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            <span>{link.index}</span>{link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <span className="availability"><i />{availability}</span>
        <a className="resume-link" href={resume.href} target="_blank" rel="noreferrer">
          {resume.label} <Arrow />
        </a>
      </div>

      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span /><span />
      </button>

      <dialog
        ref={dialogRef}
        className="mobile-menu"
        id="mobile-navigation"
        onCancel={() => setIsOpen(false)}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu__panel">
          <div className="mobile-menu__head">
            <span>INDEX / NAVIGATION</span>
            <button type="button" onClick={closeMenu}>Close</button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <a href={link.href} onClick={(event) => navigateFromMenu(event, link.href)} key={link.href}>
                <span>{link.index}</span><strong>{link.label}</strong><span aria-hidden="true">↓</span>
              </a>
            ))}
            <a href={resume.href} target="_blank" rel="noreferrer" onClick={closeMenu}>
              <span>06</span><strong>{resume.label}</strong><Arrow />
            </a>
          </nav>
          <p><i /> {availabilityLong}</p>
        </div>
      </dialog>
    </header>
  );
}
