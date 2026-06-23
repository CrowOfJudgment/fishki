import type { MouseEvent } from "react";

export function scrollToWaitlist(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();

  const isMobile = window.matchMedia("(max-width: 639px)").matches;
  const targetId = isMobile ? "waitlist-card" : "cta";
  const target = document.getElementById(targetId);

  if (!target) {
    window.location.hash = "waitlist-form";
    return;
  }

  const scrollNudge = isMobile ? -18 : -88;
  const targetTop = target.getBoundingClientRect().top + window.scrollY + scrollNudge;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });

  window.history.pushState(null, "", "#waitlist-form");
}
