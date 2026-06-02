"use client";
import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    // ── Barra de progresso ──
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Fade-up ao entrar na viewport ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
