/** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tahmid-portfolio.vercel.app";
