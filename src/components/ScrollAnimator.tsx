"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimator() {
  const pathname = usePathname();

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
    // Re-executa a cada mudança de rota para capturar os novos elementos
    const elements = document.querySelectorAll("[data-animate]");

    // Reset: remove in-view de elementos que ainda não estão visíveis
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.88;
      if (!isVisible) el.classList.remove("in-view");
    });

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

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]); // <-- re-executa sempre que a rota muda

  return null;
}
