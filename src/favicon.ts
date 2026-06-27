function getEnvironment(): "localhost" | "non-prod" | "prod" {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "localhost";
  if (host.includes("alexs-projects") || host.includes("staging") || host.includes("dev"))
    return "non-prod";
  return "prod";
}

function emojiFavicon(emoji: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">${emoji}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function sunFavicon(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <circle cx="16" cy="12" r="6" fill="${color}"/>
  <g stroke="${color}" stroke-width="2" stroke-linecap="round">
    <line x1="16" y1="2" x2="16" y2="4"/>
    <line x1="16" y1="20" x2="16" y2="22"/>
    <line x1="6" y1="12" x2="8" y2="12"/>
    <line x1="24" y1="12" x2="26" y2="12"/>
    <line x1="8.9" y1="4.9" x2="10.3" y2="6.3"/>
    <line x1="21.7" y1="17.7" x2="23.1" y2="19.1"/>
    <line x1="8.9" y1="19.1" x2="10.3" y2="17.7"/>
    <line x1="21.7" y1="6.3" x2="23.1" y2="4.9"/>
  </g>
  <path d="M8 27 Q10 23 16 23 Q22 23 24 27" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function setFavicon(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/svg+xml";
  link.href = href;
}

function applyFavicon() {
  const env = getEnvironment();

  if (env === "localhost") {
    setFavicon(emojiFavicon("💻"));
    return;
  }

  if (env === "non-prod") {
    setFavicon(emojiFavicon("🚧"));
    return;
  }

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setFavicon(sunFavicon(isDark ? "#ffffff" : "#1c1a17"));
}

export function initFavicon() {
  applyFavicon();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyFavicon);
}
