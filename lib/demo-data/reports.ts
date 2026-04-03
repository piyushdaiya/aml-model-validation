import type { ReportPack } from "@/lib/demo-data/types"

export const reportPacks: ReportPack[] = [
  {
    modelId: "cash-velocity-v32",
    track: "Traditional AML Model",
    title: "Northstar Bank | Cash Structuring Velocity Monitor | Validation Audit Pack",
    reportOwner: "A. Patel",
    exportFormats: ["PowerPoint", "PDF", "Evidence ZIP"],
    sections: [
      {
        id: "overview",
        title: "Executive Summary",
        status: "Ready",
        narrative:
          "This pack summarizes the current validation status, principal testing outcomes, and steering-committee decisions required for threshold calibration.",
      },
      {
        id: "conceptual",
        title: "Conceptual Soundness",
        status: "Ready",
        narrative:
          "Scenario design remains directionally appropriate for cash structuring detection, with recommended segmentation overlays for commercial activity.",
      },
      {
        id: "data",
        title: "Data Validation",
        status: "Under Review",
        narrative:
          "Lineage is strong overall, though beneficiary enrichment completeness remains a notable dependency for select populations.",
      },
      {
        id: "testing",
        title: "Testing Results",
        status: "Ready",
        narrative:
          "Above-the-line testing achieved 96% alignment, while below-the-line stress testing identified a material false-positive concentration under holiday conditions.",
      },
      {
        id: "findings",
        title: "Findings & Remediation",
        status: "Under Review",
        narrative:
          "Open critical remediation centers on segmented threshold logic, governance signoff, and additional BTL evidence for commercial cash-heavy clients.",
      },
      {
        id: "audit",
        title: "Audit Trail & Evidence Index",
        status: "Ready",
        narrative:
          "Supporting workpapers and signoff logs are indexed for audit-ready replay and partner quality review.",
      },
    ],
  },
  {
    modelId: "customer-risk-v5",
    track: "Traditional AML Model",
    title: "Harbor Credit Union | Customer Risk Rating Engine | Validation Pack",
    reportOwner: "M. Donovan",
    exportFormats: ["PowerPoint", "Word", "PDF"],
    sections: [
      {
        id: "overview",
        title: "Steering Committee Summary",
        status: "Ready",
        narrative:
          "The reporting package positions the client for a structured readout on model reasonability, segmentation, and governance enhancements.",
      },
      {
        id: "conceptual",
        title: "Methodology Challenge",
        status: "Ready",
        narrative:
          "Weighting logic is broadly supportable, though uplift assumptions for high-net-worth segments require stronger written rationale.",
      },
      {
        id: "testing",
        title: "Challenger & Drift Results",
        status: "Under Review",
        narrative:
          "Challenger scorecard testing supports the current design while highlighting segment-specific recalibration opportunities.",
      },
      {
        id: "remediation",
        title: "Management Responses",
        status: "Drafted",
        narrative:
          "Management response language is being aligned to due dates, owners, and governance signoff expectations before finalization.",
      },
    ],
  },
  {
    modelId: "watchlist-fuzzy-match-v9",
    track: "Traditional AML Model",
    title: "Atlas Private Bank | Watchlist Fuzzy Match Resolver | Escalation Pack",
    reportOwner: "S. Ibrahim",
    exportFormats: ["PowerPoint", "PDF", "Evidence ZIP"],
    sections: [
      {
        id: "overview",
        title: "Executive Escalation Note",
        status: "Ready",
        narrative:
          "This report frames the current fuzzy-match resolver as a high-priority remediation case before wider production confidence is established.",
      },
      {
        id: "testing",
        title: "Adversarial Testing",
        status: "Ready",
        narrative:
          "Adversarial transliteration testing produced repeatability concerns and elevated false-positive volatility in non-Latin test sets.",
      },
      {
        id: "audit",
        title: "Evidence Gaps",
        status: "Under Review",
        narrative:
          "Evidence persistence controls must be hardened before the portal can support a full internal-audit or regulator replay standard.",
      },
    ],
  },
  {
    modelId: "gai-001-alert-narrative-assistant",
    track: "GenAI Workflow",
    title: "Northstar Bank | GAI-001 Alert Narrative Assistant | Validation Pack",
    reportOwner: "A. Patel",
    exportFormats: ["PowerPoint", "PDF", "Evidence ZIP"],
    sections: [
      {
        id: "executive",
        title: "Executive Summary",
        status: "Ready",
        narrative:
          "This report frames the GenAI assistant as a reusable investigator-support workflow with strong productivity upside but material recommendation-boundary controls still in flight.",
      },
      {
        id: "genai-validation",
        title: "GenAI Workflow Validation",
        status: "Under Review",
        narrative:
          "The validation package assesses intended use, workflow boundaries, grounding architecture, response quality, safety controls, human review controls, deployment recommendation, and residual risks.",
      },
      {
        id: "testing",
        title: "Response Quality & Safety Testing",
        status: "Under Review",
        narrative:
          "Grounded replay outcomes are promising, but hallucination traps and instruction-conflict prompts still surface unsupported recommendation language.",
      },
      {
        id: "findings",
        title: "Findings & Remediation",
        status: "Drafted",
        narrative:
          "Remediation is focused on citation enforcement, recommendation-boundary hardening, and clearer refusal patterns before any client pilot expansion.",
      },
      {
        id: "audit",
        title: "Audit Trail",
        status: "Ready",
        narrative:
          "Prompt versions, retrieved evidence, test scenarios, and reviewer assumptions are indexed to support replay and governance review.",
      },
    ],
  },
  {
    modelId: "gai-002-case-summarization-assistant",
    track: "GenAI Workflow",
    title: "Harbor Credit Union | GAI-002 AML Case Summarization Assistant | Validation Pack",
    reportOwner: "M. Donovan",
    exportFormats: ["PowerPoint", "PDF", "Word"],
    sections: [
      {
        id: "executive",
        title: "Executive Summary",
        status: "Ready",
        narrative:
          "This workflow demonstrates a credible GenAI use case for AML operations, with disciplined grounding and human-review controls already visible in the portal.",
      },
      {
        id: "genai-validation",
        title: "GenAI Workflow Validation",
        status: "Ready",
        narrative:
          "Intended use, approved boundaries, grounding architecture, response-quality testing, safety controls, and human-review design are documented in a client-ready structure.",
      },
      {
        id: "testing",
        title: "Response Quality Testing",
        status: "Under Review",
        narrative:
          "The summarization assistant performs strongly on chronology fidelity and reviewer usefulness, with only minor long-form citation gaps remaining.",
      },
      {
        id: "residual-risk",
        title: "Residual Risks & Recommendation",
        status: "Drafted",
        narrative:
          "Residual risks are limited to citation completeness for long chronology outputs, making this a candidate for controlled deployment with active prompt governance.",
      },
    ],
  },
  {
    modelId: "gai-003-policy-copilot",
    track: "GenAI Workflow",
    title: "Summit Payments | GAI-003 AML Policy Copilot | Validation Pack",
    reportOwner: "J. Holmes",
    exportFormats: ["PowerPoint", "PDF"],
    sections: [
      {
        id: "executive",
        title: "Executive Summary",
        status: "Ready",
        narrative:
          "The policy copilot shows the reporting portal can communicate GenAI operations assurance effectively, but stale-guidance and escalation weaknesses still limit deployment readiness.",
      },
      {
        id: "genai-validation",
        title: "GenAI Workflow Validation",
        status: "Under Review",
        narrative:
          "The report covers intended use, workflow boundaries, grounding architecture, response quality, safety testing, human review controls, and deployment recommendation.",
      },
      {
        id: "grounding",
        title: "Grounding Architecture & Freshness",
        status: "Under Review",
        narrative:
          "The main blocker is source freshness: procedure updates do not propagate reliably enough for safe production policy Q&A.",
      },
      {
        id: "findings",
        title: "Findings & Deployment Recommendation",
        status: "Drafted",
        narrative:
          "Deployment should remain tightly limited until stale-policy handling and conflict-driven escalation controls are remediated and retested.",
      },
    ],
  },
  {
    modelId: "gai-004-disposition-recommendation-assistant",
    track: "GenAI Workflow",
    title: "Atlas Private Bank | GAI-004 Disposition Recommendation Assistant | Escalation Pack",
    reportOwner: "S. Ibrahim",
    exportFormats: ["PowerPoint", "PDF", "Evidence ZIP"],
    sections: [
      {
        id: "executive",
        title: "Executive Escalation Note",
        status: "Ready",
        narrative:
          "This pack positions the workflow as an escalated GenAI validation case due to unsafe recommendation behavior, prompt-version control gaps, and sensitive-data redaction risk.",
      },
      {
        id: "genai-validation",
        title: "GenAI Workflow Validation",
        status: "Ready",
        narrative:
          "The validation narrative documents intended use, human review boundaries, grounding weaknesses, response-quality performance, safety-control failures, and residual deployment risk.",
      },
      {
        id: "safety",
        title: "Safety & Control Testing",
        status: "Under Review",
        narrative:
          "Unsafe recommendation prompts and adversarial investigator prompts still produce unacceptable outputs for an operations setting.",
      },
      {
        id: "audit",
        title: "Audit Trail & Control Evidence",
        status: "Under Review",
        narrative:
          "Prompt-version control evidence, redaction regression packs, and reviewer replay annotations remain incomplete and are central to the escalation story.",
      },
    ],
  },
]

export function getReportPack(modelId: string): ReportPack | undefined {
  return reportPacks.find((report) => report.modelId === modelId)
}
