import type { ReportPack } from "@/lib/demo-data/types"

export const reportPacks: ReportPack[] = [
  {
    modelId: "cash-velocity-v32",
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
    title: "Harbor Credit Union | Customer Risk Rating Engine | Validation Pack",
    reportOwner: "M. Donovan",
    exportFormats: ["PowerPoint", "Word", "PDF"],
    sections: [
      {
        id: "overview",
        title: "Steering Committee Summary",
        status: "Ready",
        narrative:
          "The accelerator package positions the client for a structured readout on model reasonability, segmentation, and governance enhancements.",
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
          "Evidence persistence controls must be hardened before the workbench can support a full internal-audit or regulator replay standard.",
      },
    ],
  },
]

export function getReportPack(modelId: string): ReportPack | undefined {
  return reportPacks.find((report) => report.modelId === modelId)
}
