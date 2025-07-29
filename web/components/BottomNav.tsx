"use client";

import React, { useState } from "react";
import Image from "next/image";

const navItems = [
  { href: "/lottery", label: "Lottery", icon: "/file.svg", comingSoon: false },
  { href: "/insurance", label: "Insurance", icon: "/window.svg", comingSoon: true },
  { href: "/profile", label: "Profile", icon: "/globe.svg", comingSoon: true },
];

const BottomNav = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e: React.MouseEvent, comingSoon: boolean) => {
    if (comingSoon) {
      e.preventDefault();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0",
        zIndex: 1000
      }}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={e => handleClick(e, item.comingSoon)}
            style={{ textDecoration: "none", color: "#333", display: "flex", flexDirection: "column", alignItems: "center", fontSize: 12 }}
          >
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      {showPopup && (
        <div style={{
          position: "fixed",
          bottom: 70,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(60,60,60,0.95)",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: 8,
          fontSize: 16,
          zIndex: 2000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          Coming soon
        </div>
      )}
    </>
  );
};

export default BottomNav; 