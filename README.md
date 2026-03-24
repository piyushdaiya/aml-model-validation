# AML Model Validation Workbench Demo

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Component_Primitives-161618?logo=radixui&logoColor=white)](https://www.radix-ui.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

## Overview

This repository contains a **phase-1 stakeholder demo** for an **AML Model Validation Workbench** designed for a consulting company's AML model validation practice.

The purpose of this demo is to help consulting leadership, engagement leads, and client-facing teams evaluate a larger effort to build a full AML Model Validation product/application that can support repeatable delivery across multiple client engagements.

This is intentionally positioned as a **consulting accelerator demo**, not yet as a bank's internal production platform.

## Current Demo Status

- **Current status:** consulting-practice demo / phase-1 UI accelerator
- **Original version:** 2025
- **Refreshed:** 2026
- **Framework:** Next.js App Router + TypeScript
- **Database:** PostgreSQL via Prisma
- **Access model in this phase:** login/register enabled, demo data elsewhere is mock-driven

## Background

This solution was **originally created in 2025** and has been **updated recently for 2026** to better support current demo, development, and deployment expectations.

### 2026 refresh highlights

- **Updated libraries for 2026**
  - dependency refresh and modernization work for a more current development baseline
  - alignment work to reduce outdated or conflicting packages
  - cleaner path for future UI and platform updates

- **Docker-based local environment**
  - Docker support for the **web application**
  - Docker support for the **database**
  - improved consistency for demos, onboarding, and local development

These updates are intended to make the demo easier to run, easier to explain, and easier to evolve into a larger product effort.

## Quick Start

The demo is protected by login. After startup, open:

- `/login` if you already have a user account
- `/register` to create a local demo account

Once authenticated, the app routes to the shared stakeholder demo shell starting from `/dashboard`.

## Demo Video

[![Demo Video Preview](./public/demo/demo-preview.gif)](./public/demo/demo-walkthrough.mp4)

Download or open the short demo video here:

- [demo-walkthrough.mp4](./public/demo/demo-walkthrough.mp4)

## Install And Run The Demo

Two run modes are supported.

### Option 1: Docker Compose (recommended for demos)

This starts both:

- the Next.js web app
- the PostgreSQL database

From the repository root:

```bash
docker compose up --build
```

Default endpoints:

- Web app: `http://localhost:3000`
- Postgres: `localhost:5433`

Notes:

- Postgres is mapped to host port `5433` by default to avoid conflicts with an existing local Postgres on `5432`.
- You can override ports if needed:

```bash
WEB_PORT=3001 POSTGRES_PORT=5434 docker compose up --build
```

### Option 2: Local npm run

Use this if you want to run the app directly on your machine instead of inside Docker.

#### Prerequisites

- Node.js 20+
- npm
- PostgreSQL running locally or remotely
- a `.env` file with at least:
  - `DATABASE_URL`
  - `JWT_SECRET`

#### Commands

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Then open:

- `http://localhost:3000/login`
- or `http://localhost:3000/register`

### Production-style verification

If you want to verify the app in a production-style mode outside Docker:

```bash
npm run build
npm run start
```

## Demo Login Flow

This branch intentionally keeps **login and registration enabled** to show how the future application will work.

Important distinction:

- authentication and Prisma-backed user creation are real
- the consulting dashboard, models, testing, findings, and reporting surfaces are still primarily mock-data driven in this phase

## Recommended First Demo Path

1. Open `/register` and create a demo user if needed.
2. Sign in through `/login`.
3. Land on `/dashboard`.
4. Use the **Client Selector** and **Persona Switcher** in the shared shell.
5. Walk through `/models`, `/testing`, `/findings`, and `/reports/[modelId]`.

## Demo Focus

This demo is focused on the **front-end experience and consulting workflow narrative**.

It is designed to answer the following questions for internal decision-makers:

- Can this become a reusable accelerator for the firm's AML model validation practice?
- Can the consulting team show a repeatable validation methodology across multiple clients and models?
- Can the experience support different stakeholder perspectives without requiring a full production build on day one?
- Does the UI suggest a credible path toward a broader product/application investment?

## What the demo is meant to show

The demo emphasizes:

- portfolio-level visibility for AML model validation work
- a model inventory and governance-oriented operating view
- believable data validation, performance evaluation, and testing results
- findings and remediation tracking
- audit/report preview suitable for consulting delivery conversations
- persona-aware dashboard emphasis for different stakeholder groups

## What the demo is not yet

This phase is **not** a full production system. It does **not** yet aim to provide:

- full RBAC enforcement
- live backend orchestration for model validation runs
- real report generation pipelines
- production-grade workflow engines
- actual client data integrations
- complete audit or document management services

The current phase uses **mock/demo data** and preserves clean seams for future API and platform integration.

## Intended Audience

This demo is intended for:

- consulting leadership
- AML practice leads
- engagement managers
- model validators
- compliance stakeholders
- client sponsors and decision-makers

## Demo Narrative

The recommended walkthrough is:

1. **Executive Dashboard**  
   Show portfolio-level status for active AML validation engagements.

2. **Model Inventory**  
   Show the consulting firm's structured view of in-scope models across clients.

3. **Model Detail / Validation Workspace**  
   Show how a specific model is reviewed across governance, data validation, performance, testing, findings, and audit evidence.

4. **Testing Lab**  
   Show scenario-based validation rigor including threshold testing, sensitivity analysis, stress testing, and adversarial scenarios.

5. **Findings & Remediation**  
   Show how validation output is translated into action-oriented consulting recommendations.

6. **Report Preview / Audit Pack**  
   Show how consulting work can become a reusable regulator- and auditor-friendly deliverable.

## Key Screens in the Phase-1 Demo

- `/login`
- `/register`
- `/dashboard`
- `/models`
- `/models/[modelId]`
- `/testing`
- `/findings`
- `/reports/[modelId]`

## Persona-Aware Experience

The demo is built so different personas can see different dashboard emphasis while sharing the same core app shell and underlying demo data.

Current persona targets:

- Compliance Officer
- Risk Manager
- Model Owner
- Validator
- Admin

Each persona should see different KPI ordering, widget emphasis, calls to action, and activity feed prioritization.

The current implementation keeps a **single shared `/dashboard` route** and changes composition by persona instead of rendering separate dashboards.

## Demo Data Assumptions

This demo uses synthetic but believable data such as:

- multiple client engagements
- AML models across transaction monitoring, customer risk, and sanctions/watchlist screening
- performance metrics such as precision, recall, ROC-AUC, false positive rate
- data-quality indicators such as completeness, drift, benchmark variance, and source freshness
- findings with severity, likelihood, owner, due date, and recommendation
- report sections aligned to conceptual soundness, testing, findings, remediation, and audit trail

## Related Documents

- [Persona Demo Guide](./PERSONAS_DEMO_GUIDE.md)
- [Demo Walkthrough](./DEMO_WALKTHROUGH.md)
- [Upgrade Notes 2026](./UPGRADE_NOTES_2026.md)

## Architecture / Delivery Notes

This repository is currently optimized for **demo and development velocity**.

### Current implementation posture

- UI-first demo scope
- mock-data driven experience
- Prisma-backed auth/register flow
- future API seams preserved in code structure
- Docker support for app and database

### Near-term evolution path

Possible next phases include:

- real API integration
- actual validation workflow orchestration
- role-aware access control
- report generation/export services
- persistent findings/remediation data
- client onboarding and practice configuration features

## Why this matters for a consulting practice

A strong AML model validation practice needs more than analytical outputs. It also needs:

- repeatable workflow
- visible governance
- evidence packaging
- stakeholder-specific views
- scalable delivery patterns across client engagements

This demo is intended to show the shape of that capability before a larger engineering investment is approved.
