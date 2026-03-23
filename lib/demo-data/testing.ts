import type { EvidenceItem, TestingWorkspace } from "@/lib/demo-data/types"

export const evidenceItems: EvidenceItem[] = [
  {
    id: "ev-001",
    title: "Source-to-Report Lineage Matrix",
    category: "Data Validation",
    owner: "Data QA Pod",
    updatedAt: "2026-03-22",
    note: "Maps extraction fields to staging logic, scenario inputs, and report exhibits.",
  },
  {
    id: "ev-002",
    title: "ATL Reconciliation Workbook",
    category: "Testing",
    owner: "Validation Analytics",
    updatedAt: "2026-03-23",
    note: "Compares generated alerts against source-system replay outputs for top scenarios.",
  },
  {
    id: "ev-003",
    title: "BTL Scenario Tuning Log",
    category: "Testing",
    owner: "Scenario Specialists",
    updatedAt: "2026-03-21",
    note: "Captures threshold changes, directional impacts, and reviewer signoff.",
  },
  {
    id: "ev-004",
    title: "Management Response Tracker",
    category: "Governance",
    owner: "Engagement Manager",
    updatedAt: "2026-03-20",
    note: "Tracks owner commitments, due dates, and closure evidence expected for findings.",
  },
  {
    id: "ev-005",
    title: "Adversarial Name Matching Deck",
    category: "Testing",
    owner: "Model Risk Advisory",
    updatedAt: "2026-03-23",
    note: "Documents transliteration edge cases, fuzzy thresholds, and observed breaks in reproducibility.",
  },
]

export const testingWorkspaces: TestingWorkspace[] = [
  {
    modelId: "cash-velocity-v32",
    dataChecks: [
      { name: "Branch cash feed completeness", stream: "Completeness", status: "Pass", result: "99.4% complete", owner: "Data QA Pod" },
      { name: "Beneficiary enrichment coverage", stream: "Integrity", status: "Watch", result: "12% null concentration in commercial segment", owner: "Data QA Pod" },
      { name: "Scenario parameter lineage", stream: "Lineage", status: "Pass", result: "Fully traceable to production config", owner: "Validation Analytics" },
      { name: "Cash amount distribution drift", stream: "Drift", status: "Fail", result: "Commercial deposit skew exceeds baseline tolerance", owner: "Validation Analytics" },
    ],
    thresholdControls: [
      { label: "Velocity window", value: 21, min: 7, max: 30, unit: "days" },
      { label: "Aggregation floor", value: 9500, min: 5000, max: 15000, unit: "USD" },
      { label: "Commercial segment multiplier", value: 12, min: 0, max: 20, unit: "%" },
    ],
    scenarios: [
      {
        id: "scenario-cash-sens",
        modelId: "cash-velocity-v32",
        name: "Shortened aggregation window",
        kind: "Sensitivity",
        hypothesis: "A tighter aggregation window improves recall but drives false-positive saturation.",
        objective: "Test precision-recall elasticity under steering-committee candidate thresholds.",
        status: "Watch",
        passRate: 73,
        reproducibilityScore: 92,
        observations: ["Recall increases 6 points", "False positives cluster in cash-intensive MSBs", "Control overlay may be needed for commercial carve-outs"],
        evidenceIds: ["ev-002", "ev-003"],
      },
      {
        id: "scenario-cash-stress",
        modelId: "cash-velocity-v32",
        name: "Holiday cash-volume stress",
        kind: "Stress",
        hypothesis: "Seasonal cash spikes create unstable alert inflation without risk segmentation.",
        objective: "Assess alert load and analyst triage stress under peak-volume conditions.",
        status: "Fail",
        passRate: 48,
        reproducibilityScore: 87,
        observations: ["Alert volume exceeds operating threshold by 32%", "Commercial carve-out underperforms", "Escalate to governance for threshold exception"],
        evidenceIds: ["ev-001", "ev-003"],
      },
      {
        id: "scenario-cash-atl",
        modelId: "cash-velocity-v32",
        name: "Replay against production alerts",
        kind: "Above-the-Line",
        hypothesis: "Replay output should align to production for priority branches and commercial customers.",
        objective: "Establish regulator-friendly reproducibility evidence for production scenario behavior.",
        status: "Pass",
        passRate: 96,
        reproducibilityScore: 98,
        observations: ["Strong alignment across priority segments", "Minor variance tied to enrichment timing only"],
        evidenceIds: ["ev-002"],
      },
    ],
    resultSeries: [
      { label: "Baseline", baselinePrecision: 0.27, simulatedPrecision: 0.27, baselineRecall: 0.81, simulatedRecall: 0.81, baselineAlerts: 5100, simulatedAlerts: 5100 },
      { label: "Scenario A", baselinePrecision: 0.27, simulatedPrecision: 0.24, baselineRecall: 0.81, simulatedRecall: 0.85, baselineAlerts: 5100, simulatedAlerts: 6240 },
      { label: "Scenario B", baselinePrecision: 0.27, simulatedPrecision: 0.29, baselineRecall: 0.81, simulatedRecall: 0.78, baselineAlerts: 5100, simulatedAlerts: 4720 },
    ],
  },
  {
    modelId: "customer-risk-v5",
    dataChecks: [
      { name: "Customer score feature completeness", stream: "Completeness", status: "Pass", result: "97.8% complete", owner: "Data QA Pod" },
      { name: "Occupation hierarchy lineage", stream: "Lineage", status: "Watch", result: "Manual mapping override in 2 segments", owner: "Model Risk Advisory" },
      { name: "Risk distribution drift by geography", stream: "Drift", status: "Watch", result: "Higher concentration in LATAM private clients", owner: "Validation Analytics" },
    ],
    thresholdControls: [
      { label: "High-risk score cutoff", value: 74, min: 50, max: 90, unit: "pts" },
      { label: "PEP weight uplift", value: 18, min: 0, max: 25, unit: "%" },
    ],
    scenarios: [
      {
        id: "scenario-crr-challenger",
        modelId: "customer-risk-v5",
        name: "Challenger scorecard backtest",
        kind: "Below-the-Line",
        hypothesis: "Alternative weights will reduce score concentration while preserving prioritization.",
        objective: "Demonstrate reasonability of current weighting methodology to model governance.",
        status: "Pass",
        passRate: 89,
        reproducibilityScore: 95,
        observations: ["Current scorecard remains directionally sound", "Segment-specific recalibration recommended"],
        evidenceIds: ["ev-001", "ev-004"],
      },
    ],
    resultSeries: [
      { label: "Retail", baselinePrecision: 0.58, simulatedPrecision: 0.61, baselineRecall: 0.69, simulatedRecall: 0.67, baselineAlerts: 1800, simulatedAlerts: 1650 },
      { label: "SME", baselinePrecision: 0.58, simulatedPrecision: 0.56, baselineRecall: 0.69, simulatedRecall: 0.72, baselineAlerts: 1120, simulatedAlerts: 1240 },
      { label: "Private", baselinePrecision: 0.58, simulatedPrecision: 0.53, baselineRecall: 0.69, simulatedRecall: 0.76, baselineAlerts: 420, simulatedAlerts: 540 },
    ],
  },
  {
    modelId: "watchlist-fuzzy-match-v9",
    dataChecks: [
      { name: "Watchlist ingestion integrity", stream: "Integrity", status: "Pass", result: "No dropped records in test sample", owner: "Validation Analytics" },
      { name: "Alias transliteration consistency", stream: "Drift", status: "Fail", result: "Threshold instability across non-Latin characters", owner: "Model Risk Advisory" },
      { name: "Case evidence retention", stream: "Lineage", status: "Fail", result: "Retest outputs missing attachment references", owner: "Engagement Manager" },
    ],
    thresholdControls: [
      { label: "Fuzzy match threshold", value: 84, min: 70, max: 95, unit: "score" },
      { label: "Alias expansion depth", value: 4, min: 1, max: 8, unit: "rules" },
    ],
    scenarios: [
      {
        id: "scenario-watchlist-adv",
        modelId: "watchlist-fuzzy-match-v9",
        name: "Adversarial transliteration sweep",
        kind: "Adversarial",
        hypothesis: "Current thresholds are not stable under transliteration and alias chaining edge cases.",
        objective: "Create a regulator-defensible rationale for remediation of fuzzy matching logic.",
        status: "Fail",
        passRate: 44,
        reproducibilityScore: 71,
        observations: ["Material threshold volatility observed", "Evidence persistence fails in repeated test runs", "Escalation warranted before client readout"],
        evidenceIds: ["ev-005", "ev-004"],
      },
    ],
    resultSeries: [
      { label: "Latin", baselinePrecision: 0.34, simulatedPrecision: 0.39, baselineRecall: 0.88, simulatedRecall: 0.82, baselineAlerts: 640, simulatedAlerts: 520 },
      { label: "Cyrillic", baselinePrecision: 0.34, simulatedPrecision: 0.28, baselineRecall: 0.88, simulatedRecall: 0.84, baselineAlerts: 640, simulatedAlerts: 790 },
      { label: "Arabic", baselinePrecision: 0.34, simulatedPrecision: 0.22, baselineRecall: 0.88, simulatedRecall: 0.91, baselineAlerts: 640, simulatedAlerts: 920 },
    ],
  },
]

export function getEvidenceItems(): EvidenceItem[] {
  return evidenceItems
}

export function getEvidenceForIds(evidenceIds: string[]): EvidenceItem[] {
  return evidenceItems.filter((item) => evidenceIds.includes(item.id))
}

export function getTestingWorkspace(modelId: string): TestingWorkspace | undefined {
  return testingWorkspaces.find((workspace) => workspace.modelId === modelId)
}
