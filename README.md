# Tahmid Zalal — Portfolio

A modern, animated, full-stack portfolio built with **Next.js 16 (App Router)**,
**TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Dark-first design with
a light/dark toggle, a working serverless contact form, project case studies,
and an MDX blog.

## Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | Next.js 16 (App Router, React 19)                 |
| Language    | TypeScript                                        |
| Styling     | Tailwind CSS v4 + CSS variables (theme tokens)    |
| Animation   | Framer Motion (scroll reveal, counters, timeline) |
| Theming     | next-themes (class strategy)                      |
| Content     | Typed data files + MDX blog (next-mdx-remote)     |
| Backend     | Serverless route handlers (`app/api/*`)           |
| Email       | Resend                                            |
| Analytics   | Vercel Web Analytics                              |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

Build / preview production:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable             | Purpose                                                        |
| -------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`     | Contact-form email delivery — free key at https://resend.com  |
| `CONTACT_TO_EMAIL`   | Inbox that receives contact submissions                       |
| `CONTACT_FROM_EMAIL` | Verified sender (use `onboarding@resend.dev` for testing)     |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO / sitemap / OG (your real domain)     |
| `GITHUB_TOKEN`       | Optional — raises the rate limit for the live GitHub stats    |

> Without `RESEND_API_KEY`, the contact form still validates and returns success;
> submissions are logged on the server instead of emailed. Wire the key to send
> real email.

## Editing content

All content lives in typed files under [`data/`](data) — no component edits needed:

- [`data/profile.ts`](data/profile.ts) — name, title, summary, socials, résumé path
- [`data/experience.ts`](data/experience.ts) — work/research timeline
- [`data/projects.ts`](data/projects.ts) — projects + case-study detail
- [`data/skills.ts`](data/skills.ts) — categorized skills
- [`data/education.ts`](data/education.ts) — degree + coursework
- [`data/certifications.ts`](data/certifications.ts) — achievements, awards, certs

**Blog posts:** add an `.mdx` file to [`content/blog/`](content/blog) with frontmatter:

```mdx
---
title: "Post title"
description: "One-line summary."
date: "2026-06-01"
tags: ["Tag A", "Tag B"]
published: true
---

Your markdown / MDX here. Code blocks get syntax highlighting.
```

**Résumé:** replace [`public/Tahmid_Zalal_Resume.pdf`](public) (keep the filename, or
update `resumePath` in `data/profile.ts`).

## To personalize / fill in

- [ ] Add a **Resend API key** to send real contact emails
- [ ] Replace the placeholder card in `data/certifications.ts` with real certs/awards
- [ ] Add real **project screenshots** (currently text-only cards)
- [ ] Confirm the **LinkedIn URL** in `data/profile.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your domain before deploying

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new (framework auto-detected as Next.js).
3. Add the environment variables above in **Project → Settings → Environment Variables**.
4. Deploy. The OG image, sitemap (`/sitemap.xml`), and robots (`/robots.txt`) are generated automatically.

## Project structure

```
app/            routes, layout, API handlers, SEO (sitemap/robots/og/icon)
components/      UI primitives, sections, shared components
  sections/     hero, about, experience, skills, certifications, contact
  ui/           section, reveal, button, badge
content/blog/   MDX posts
data/           typed content (single source of truth)
lib/            utils, blog loader, site config
public/         résumé, static assets
legacy/         the original static site (archived)
```
