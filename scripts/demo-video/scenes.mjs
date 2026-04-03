export const FRAME_SIZE = {
  width: 1440,
  height: 900,
}

export const OUTPUT_SIZE = {
  width: 1200,
  height: 750,
}

export const VIDEO_OUTPUTS = {
  mp4: "public/demo/demo-walkthrough.mp4",
  gif: "public/demo/demo-preview.gif",
}

export const RAW_FRAME_DIR = "public/demo/frames"

export const SCENES = [
  {
    id: "01-login",
    route: "/login",
    waitForText: "AML Validation Reporting Portal",
    durationSeconds: 1.4,
    caption: "Secure portal access for consulting and client stakeholders.",
  },
  {
    id: "02-register",
    route: "/register",
    waitForText: "Create an account",
    durationSeconds: 1.4,
    caption: "Registration reinforces controlled access to sensitive reporting and evidence.",
  },
  {
    id: "03-dashboard-partner",
    route: "/dashboard",
    waitForText: "Executive Dashboard",
    durationSeconds: 1.8,
    caption: "One reporting dashboard adapts by persona without creating separate products.",
    state: {
      selectedClientId: "northstar-bank",
      personaId: "consulting-partner",
      selectedModelId: "gai-001-alert-narrative-assistant",
    },
  },
  {
    id: "04-dashboard-compliance",
    route: "/dashboard",
    waitForText: "Executive Dashboard",
    durationSeconds: 1.8,
    caption:
      "The new persona set spans Consulting Partner, Engagement Lead, Validation Lead, Client Compliance Sponsor, Client Model Sponsor, and Platform Admin.",
    state: {
      selectedClientId: "northstar-bank",
      personaId: "client-compliance-sponsor",
      selectedModelId: "gai-001-alert-narrative-assistant",
    },
  },
  {
    id: "05-inventory",
    route: "/models",
    waitForText: "Validation Inventory",
    durationSeconds: 1.8,
    caption: "Shared validation inventory covers both traditional AML reporting items and GenAI workflow reporting items.",
    state: {
      selectedClientId: "northstar-bank",
      personaId: "engagement-lead",
      selectedModelId: "cash-velocity-v32",
    },
  },
  {
    id: "06-traditional-detail",
    route: "/models/cash-velocity-v32",
    waitForText: "Validation Detail / Evidence Summary",
    durationSeconds: 1.8,
    caption: "Traditional AML items keep familiar validation reporting sections and committee-ready evidence summaries.",
    state: {
      selectedClientId: "northstar-bank",
      personaId: "validation-lead",
      selectedModelId: "cash-velocity-v32",
    },
  },
  {
    id: "07-genai-grounding",
    route: "/models/gai-004-disposition-recommendation-assistant",
    waitForText: "Validation Detail / Evidence Summary",
    durationSeconds: 1.8,
    caption: "GenAI reporting starts with workflow boundaries, approved sources, grounding coverage, and source freshness.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "validation-lead",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
    afterNavigate: {
      type: "click-tab",
      label: "Data & Grounding",
      waitForText: "Data & Grounding",
    },
  },
  {
    id: "08-genai-response-quality",
    route: "/models/gai-004-disposition-recommendation-assistant",
    waitForText: "Validation Detail / Evidence Summary",
    durationSeconds: 1.8,
    caption: "Response-quality reporting highlights factuality, completeness, citation coverage, and investigator usefulness.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "validation-lead",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
    afterNavigate: {
      type: "click-tab",
      label: "Response Quality",
      waitForText: "Response Quality",
    },
  },
  {
    id: "09-genai-safety",
    route: "/models/gai-004-disposition-recommendation-assistant",
    waitForText: "Validation Detail / Evidence Summary",
    durationSeconds: 1.8,
    caption: "Safety and control reporting makes hallucination, escalation behavior, and privacy gaps visible without executing the workflow here.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "client-compliance-sponsor",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
    afterNavigate: {
      type: "click-tab",
      label: "Safety & Controls",
      waitForText: "Safety & Controls",
    },
  },
  {
    id: "10-testing-evidence",
    route: "/testing",
    waitForText: "Testing Evidence",
    durationSeconds: 1.8,
    caption: "Testing evidence summarizes prompts, retrieved evidence, expected answers, pass-fail outcomes, and reviewer notes.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "validation-lead",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
  },
  {
    id: "11-genai-findings",
    route: "/models/gai-004-disposition-recommendation-assistant",
    waitForText: "Validation Detail / Evidence Summary",
    durationSeconds: 1.8,
    caption: "GenAI workflow findings stay attached to the same reporting record for grounded remediation and audit replay.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "engagement-lead",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
    afterNavigate: {
      type: "click-tab",
      label: "Findings",
    },
  },
  {
    id: "12-findings",
    route: "/findings",
    waitForText: "Findings & Remediation",
    durationSeconds: 1.8,
    caption: "One findings and remediation surface combines traditional-model issues and GenAI control issues.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "engagement-lead",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
  },
  {
    id: "13-report-preview",
    route: "/reports/gai-004-disposition-recommendation-assistant",
    waitForText: "Report Preview / Audit Pack",
    durationSeconds: 2,
    caption: "Committee-ready packs present workflow boundaries, testing results, residual risks, and deployment recommendations.",
    state: {
      selectedClientId: "atlas-private-bank",
      personaId: "consulting-partner",
      selectedModelId: "gai-004-disposition-recommendation-assistant",
    },
  },
  {
    id: "14-closing",
    route: {
      type: "html",
      waitForText: "Consulting-hosted secure reporting portal",
      html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>AML Validation Reporting Portal Demo</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at top left, rgba(148, 163, 184, 0.22), transparent 30%),
          linear-gradient(180deg, #0f172a 0%, #111827 100%);
        color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .frame {
        width: 1120px;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 32px;
        background: rgba(15, 23, 42, 0.76);
        padding: 56px 64px;
        box-shadow: 0 24px 80px rgba(15, 23, 42, 0.35);
      }
      .eyebrow {
        margin: 0;
        font-size: 15px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #cbd5e1;
      }
      h1 {
        margin: 20px 0 18px;
        font-size: 52px;
        line-height: 1.08;
      }
      p {
        margin: 0;
        max-width: 900px;
        font-size: 24px;
        line-height: 1.6;
        color: #e2e8f0;
      }
      ul {
        margin: 28px 0 0;
        padding-left: 24px;
        display: grid;
        gap: 14px;
        font-size: 22px;
        line-height: 1.45;
        color: #f8fafc;
      }
      strong {
        color: #fde68a;
      }
    </style>
  </head>
  <body>
    <section class="frame">
      <p class="eyebrow">AML Model Validation Reporting Portal Demo</p>
      <h1>Consulting-hosted secure reporting portal</h1>
      <p>
        Secure reporting and evidence visibility for AML validation work, while
        <strong>data and validation execution remain inside the financial institution</strong>.
      </p>
      <ul>
        <li>Traditional AML model validation reporting</li>
        <li>GenAI-assisted AML workflow validation reporting</li>
        <li>Findings, remediation, audit packs, and committee-ready outputs</li>
      </ul>
    </section>
  </body>
</html>`,
    },
    durationSeconds: 2.4,
    caption: "Consulting-hosted portal. Institution-side data and execution stay inside the bank.",
  },
]
