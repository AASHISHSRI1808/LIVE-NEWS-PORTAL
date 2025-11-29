"use client";
import { useEffect, useState } from "react";

export default function BreakingNews({ headlines }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!headlines.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [headlines]);

  return (
    <div className="bg-danger text-white py-2">
      <div className="container d-flex gap-3">
        <strong>Breaking:</strong>
        <span style={{ fontWeight: "600" }}>{headlines[index]}</span>
      </div>
    </div>
  );
}
