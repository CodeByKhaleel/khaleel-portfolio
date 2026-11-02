"use client";

import { useEffect } from "react";

export default function CareerCardTilt() {
  useEffect(() => {
    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(document.querySelectorAll("#main .career-flow .career-step"));
    const reset = (card) => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.classList.remove("is-tilting");
    };
    const cleanups = cards.map((card) => {
      const move = (event) => {
        if (!motion.matches || event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        card.style.setProperty("--tilt-x", `${((0.5 - y) * 7).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${((x - 0.5) * 7).toFixed(2)}deg`);
        card.classList.add("is-tilting");
      };
      const leave = () => reset(card);
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("pointercancel", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); card.removeEventListener("pointercancel", leave); reset(card); };
    });
    const handlePreference = () => { if (!motion.matches) cards.forEach(reset); };
    motion.addEventListener("change", handlePreference);
    return () => { motion.removeEventListener("change", handlePreference); cleanups.forEach((cleanup) => cleanup()); };
  }, []);
  return null;
}
