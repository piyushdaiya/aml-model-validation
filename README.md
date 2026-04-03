# AML Model Validation Workbench Demo

[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Component_Primitives-161618?logo=radixui&logoColor=white)](https://www.radix-ui.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Overview

This repository contains a consulting-quality stakeholder demo for an **AML Model Validation Workbench**.

The current demo is intentionally positioned as a **consulting accelerator**, not a bank's internal production platform. It shows how one reusable workbench can support:

- traditional AML model validation
- **GenAI-assisted AML workflow validation** used in AML operations
- multi-client delivery by a consulting practice
- persona-aware executive and working-level views
- a clean path from mock-driven demo to full product build

## Current Demo Status

- **Current status:** consulting-practice demo / phase-1 workbench
- **Original version:** 2025
- **Refreshed:** 2026
- **Framework:** Next.js App Router + TypeScript
- **Database:** PostgreSQL via Prisma
- **Access model in this phase:** login/register enabled, workbench data is primarily mock-driven
- **Validation tracks in scope:**
  - Traditional AML models
  - GenAI-assisted AML workflows

## 2026 Refresh Highlights

This repository was originally created in **2025** and recently refreshed for **2026**.

Key improvements include:

- updated libraries and framework dependencies for a stable 2026 baseline
- Docker-based local setup for **both** the web application and the PostgreSQL database
- persona-aware shared dashboard composition
- one shared validation inventory, testing lab, findings surface, and report shell
- dual-track demo support for traditional AML models and GenAI-assisted AML workflows

## Quick Start

The demo is auth-protected. After startup, begin at:

- `/login` if you already have a user account
- `/register` to create a local demo account

After authentication, the shared stakeholder demo shell starts at `/dashboard`.

## Install and Run the Demo

Two run modes are supported.

### Option 1: Docker Compose

This is the recommended setup for demos because it starts both:

- the Next.js web app
- the PostgreSQL database

From the repository root:

```bash
docker compose up --build
```

Default endpoints:

- Web app: `http://localhost:3000`
- Postgres: `localhost:5433`

Optional port overrides:

```bash
WEB_PORT=3001 POSTGRES_PORT=5434 docker compose up --build
```

### Option 2: Local npm run

Use this when running the app directly on your machine.

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

```bash
npm run build
npm run start
```

## Demo Login Flow

This demo intentionally keeps **login and registration enabled** to show how a future productized application will work.

Important distinction:

- authentication and Prisma-backed user creation are real
- the consulting workbench surfaces are still primarily mock-data driven in this phase

## Shared Route Structure

The dual-track demo uses one shared route structure for both traditional AML models and GenAI workflows:

- `/dashboard`
- `/models`
- `/models/[modelId]`
- `/testing`
- `/findings`
- `/reports/[modelId]`

There is no separate GenAI product area or `/ai-workflows` route.

## What the Demo Is Meant to Show

The demo emphasizes:

- portfolio-level visibility across both AML models and GenAI workflows
- a shared validation inventory with type-aware fields
- believable traditional-model metrics such as precision, recall, ROC-AUC, and false positive rate
- believable GenAI workflow controls such as grounding coverage, citation quality, hallucination risk, and human-review requirements
- findings and remediation tracking across both validation tracks
- report and audit-pack preview suitable for consulting delivery conversations
- persona-aware dashboard emphasis for different stakeholder groups

## What the Demo Is Not Yet

This phase is not a full production system. It does not yet provide:

- full RBAC enforcement
- live backend orchestration for validation runs
- real report generation pipelines
- production workflow engines
- actual client data integrations
- provider-side GenAI evaluation services
- complete audit or document management services

The current phase uses mock/demo data and preserves clean seams for future API and platform integration.

## Supported Demo Content

The current synthetic data set includes:

- 4 client engagements
- traditional AML validation items across:
  - transaction monitoring
  - customer risk
  - sanctions screening / watchlist
- 4 GenAI workflow validation items:
  - `GAI-001 Alert Narrative Assistant`
  - `GAI-002 AML Case Summarization Assistant`
  - `GAI-003 AML Policy Copilot`
  - `GAI-004 Disposition Recommendation Assistant`
- traditional testing scenarios such as sensitivity, stress, ATL, BTL, and adversarial scenarios
- GenAI testing scenarios such as:
  - grounded Q&A
  - hallucination trap
  - missing-context test
  - prompt-injection / instruction-conflict test
  - policy-conflict test
  - unsafe recommendation test
  - stale-guidance test
  - adversarial investigator prompt

## Recommended First Demo Path

1. Open `/register` and create a demo user if needed.
2. Sign in through `/login`.
3. Land on `/dashboard`.
4. Use the **Client Selector** and **Persona Switcher** in the shared shell.
5. Show how the dashboard changes by persona.
6. Move to `/models` and show the shared inventory across traditional models and GenAI workflows.
7. Open one traditional item and one GenAI item from `/models/[modelId]`.
8. For the GenAI item, walk specifically through grounding, safety, testing, findings, and report output.
9. Move through `/testing`, `/findings`, and `/reports/[modelId]`.

## Persona-Aware Experience

The demo keeps a **single shared `/dashboard` route** and changes composition by persona instead of rendering separate dashboards.

Current personas:

- Compliance Officer
- Risk Manager
- Model Owner
- Validator
- Admin

Persona switching changes:

- KPI order
- widget selection and order
- CTA labels and links
- activity feed emphasis
- insight banner text

The persona story includes both traditional AML-model signals and GenAI workflow signals where relevant.

## Demo Narrative

The recommended walkthrough is:

1. **Executive Dashboard**  
   Show portfolio-level status for both traditional AML validation and GenAI workflow validation.

2. **Validation Inventory**  
   Show the consulting firm's shared view of in-scope validation items across clients.

3. **Model Detail / Validation Workspace**  
   Show that one detail route can support traditional tabs and GenAI-specific tabs without fragmenting the experience.

4. **Testing Lab**  
   Show both traditional scenario testing and GenAI prompt / control testing in the same lab.

5. **Findings & Remediation**  
   Show how traditional-model findings and GenAI-workflow findings are managed together.

6. **Report Preview / Audit Pack**  
   Show how traditional validation packs and GenAI workflow validation sections can be delivered from one shared reporting surface.

## Intended Audience

This demo is intended for:

- consulting leadership
- AML practice leads
- engagement managers
- model validators
- compliance stakeholders
- client sponsors and decision-makers

## Related Documents

- [Persona Demo Guide](./PERSONAS_DEMO_GUIDE.md)
- [Demo Walkthrough](./DEMO_WALKTHROUGH.md)
- [Upgrade Notes 2026](./UPGRADE_NOTES_2026.md)
- [MIT License](./LICENSE)

## License

This project is licensed under the [MIT License](./LICENSE). Copyright (c) 2026 Piyush Daiya.
