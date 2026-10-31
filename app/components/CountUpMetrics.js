"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const metricPages = new Set([
  "/",
  "/projects",
  "/projects/repeatable-workflows",
]);
const metricSelector = [
  ".featured-stats .stat strong",
  ".project-feature-numbers > strong",
  ".metrics-grid .metric-card strong",
].join(", ");
const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

function getNumberTextNode(element) {
  return Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
}

export default function CountUpMetrics() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    if (!metricPages.has(path)) return;

    const elements = Array.from(document.querySelectorAll(metricSelector));
    const counters = elements.flatMap((element) => {
      const textNode = getNumberTextNode(element);
      const original = textNode?.textContent?.trim() ?? "";
      const match = original.match(/^([\d,]+)(.*)$/);
      if (!textNode || !match) return [];

      return [{
        element,
        textNode,
        target: Number(match[1].replaceAll(",", "")),
        suffix: match[2],
        finalText: original,
      }];
    });

    if (!counters.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const frameIds = new Set();
    const started = new WeakSet();
    const duration = 1350;

    const animate = (counter) => {
      if (started.has(counter.element)) return;
      started.add(counter.element);
      const startTime = performance.now();

      const frame = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(counter.target * eased);
        counter.textNode.textContent = `${numberFormat.format(value)}${counter.suffix}`;
        if (progress < 1) {
          const frameId = window.requestAnimationFrame(frame);
          frameIds.add(frameId);
        } else {
          counter.textNode.textContent = counter.finalText;
        }
      };

      const frameId = window.requestAnimationFrame(frame);
      frameIds.add(frameId);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return () => frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = counters.find((candidate) => candidate.element === entry.target);
        if (counter) animate(counter);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    counters.forEach(({ element }) => observer.observe(element));

    return () => {
      observer.disconnect();
      frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      counters.forEach(({ textNode, finalText }) => {
        textNode.textContent = finalText;
      });
    };
  }, [pathname]);

  return null;
}
