"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "होम", href: "/" , icon: "home" },
  { label: "टॉप न्यूज़", href: "/#topnews", icon: "news" },
  { label: "खेल", href: "/#sports", icon: "sports" },
  { label: "बिजनेस", href: "/#business", icon: "business" },
  { label: "टेक्नोलॉजी", href: "/#technology", icon: "tech" },
  { label: "मनोरंजन", href: "/#entertainment", icon: "media" },
];

function Icon({ name, size = 16 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" };
  switch (name) {
    case "home":
      return (
        <svg {...common} className="nav-icon">
          <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "news":
      return (
        <svg {...common} className="nav-icon">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M7 8h10M7 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "sports":
      return (
        <svg {...common} className="nav-icon">
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M5 19c1.5-3 4-5 7-5s5.5 2 7 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "business":
      return (
        <svg {...common} className="nav-icon">
          <path d="M4 7h16M8 7v12M16 7v12"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "tech":
      return (
        <svg {...common} className="nav-icon">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M8 3v2M16 3v2M12 21v-2"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "media":
      return (
        <svg {...common} className="nav-icon">
          <path d="M3 7v10l7-5 7 5V7H3z"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links.map(l => l.href.replace("/#", ""));

    const handleScroll = () => {
      let current = "";
      sections.forEach(id => {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100 && top > -500) current = id;
        }
      });
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={38}
            height={38}
            className="brand-logo"
          />

          <span style={{marginLeft: 10, display: "flex", flexDirection: "column", lineHeight: 1}}>
            <span style={{fontSize: 16}}>न्यूज़पोर्टल</span>
            <small style={{fontSize: 11, opacity: 0.95}}>हिन्दी</small>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {links.map((link, index) => {
              const idKey = link.href.replace("/#", "");
              const isActive = active === idKey || (link.href === "/" && window.location.pathname === "/");

              return (
                <li className="nav-item" key={index}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "fw-bold text-warning active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span style={{display: "inline-flex", alignItems: "center", gap: 8}}>
                      <Icon name={link.icon} size={18} />
                      <span>{link.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}

          </ul>
        </div>

      </div>
    </nav>
  );
}
