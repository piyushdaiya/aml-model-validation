import type {
  GenAIValidationWorkflow,
  GroundingStatus,
  HumanReviewRequirement,
  ModelStatus,
  RiskLevel,
  TraditionalValidationModel,
  ValidationItem,
  ValidationModel,
  ValidationTrack,
  ValidationType,
} from "@/lib/demo-data/types"

export const validationModels: ValidationModel[] = [
  {
    id: "cash-velocity-v32",
    clientId: "northstar-bank",
    name: "Cash Structuring Velocity Monitor",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    type: "Transaction Monitoring",
    owner: "Northstar TMU",
    stage: "Testing",
    status: "Needs Attention",
    riskLevel: "Critical",
    version: "3.2",
    lastValidatedOn: "2025-10-28",
    nextReadoutDate: "2026-04-08",
    summary:
      "Rules-based scenario identifying rapid cash aggregation behavior across branch and ATM channels.",
    progressPercent: 72,
    openFindings: 4,
    milestones: [
      { label: "Planning Memo", dueDate: "2026-03-12", status: "Complete" },
      { label: "Data Validation", dueDate: "2026-03-20", status: "Complete" },
      { label: "ATL Testing", dueDate: "2026-03-29", status: "In Progress" },
      { label: "Steering Readout", dueDate: "2026-04-08", status: "Pending" },
    ],
    tags: ["Board-visible", "High alert volume", "BTL focus"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-03-01",
    methodologyNote:
      "Focus area is below-the-line threshold calibration and false-positive concentration in commercial cash-intensive segments.",
    metrics: {
      precision: 0.27,
      recall: 0.81,
      rocAuc: 0.74,
      falsePositiveRate: 0.68,
    },
    atlCoverage: 96,
    btlCoverage: 83,
  },
  {
    id: "wire-escalation-v21",
    clientId: "northstar-bank",
    name: "Cross-Border Wire Escalation",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    type: "Transaction Monitoring",
    owner: "Northstar Surveillance Analytics",
    stage: "Report Assembly",
    status: "On Track",
    riskLevel: "High",
    version: "2.1",
    lastValidatedOn: "2025-11-06",
    nextReadoutDate: "2026-04-10",
    summary:
      "Scenario family covering nested cross-border wires, rapid beneficiary changes, and jurisdiction clustering.",
    progressPercent: 88,
    openFindings: 2,
    milestones: [
      { label: "Scoping", dueDate: "2026-03-04", status: "Complete" },
      { label: "Scenario Testing", dueDate: "2026-03-19", status: "Complete" },
      { label: "Findings Review", dueDate: "2026-03-27", status: "In Progress" },
      { label: "Audit Pack", dueDate: "2026-04-10", status: "Pending" },
    ],
    tags: ["Cross-border", "Jurisdictional risk"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-02-17",
    methodologyNote:
      "Primary challenge points center on jurisdiction tagging quality and reproducibility of watchlist enrichment.",
    metrics: {
      precision: 0.42,
      recall: 0.76,
      rocAuc: 0.82,
      falsePositiveRate: 0.36,
    },
    atlCoverage: 99,
    btlCoverage: 91,
  },
  {
    id: "customer-risk-v5",
    clientId: "harbor-credit",
    name: "Customer Risk Rating Engine",
    track: "Traditional AML Model",
    validationType: "Customer Risk Model",
    type: "Customer Risk",
    owner: "Harbor Compliance Optimization",
    stage: "Findings Drafted",
    status: "On Track",
    riskLevel: "High",
    version: "5.0",
    lastValidatedOn: "2025-09-14",
    nextReadoutDate: "2026-04-15",
    summary:
      "Weighted customer risk scoring combining geography, occupation, transaction profile, and product usage.",
    progressPercent: 79,
    openFindings: 3,
    milestones: [
      { label: "Conceptual Review", dueDate: "2026-03-10", status: "Complete" },
      { label: "Challenger Testing", dueDate: "2026-03-24", status: "Complete" },
      { label: "Management Responses", dueDate: "2026-04-02", status: "In Progress" },
      { label: "Committee Deck", dueDate: "2026-04-15", status: "Pending" },
    ],
    tags: ["Scoring", "Segmentation drift"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-02-28",
    methodologyNote:
      "Validation emphasizes conceptual soundness, segmentation drift, and challenger scorecard reasonability.",
    metrics: {
      precision: 0.58,
      recall: 0.69,
      rocAuc: 0.86,
      falsePositiveRate: 0.21,
    },
    atlCoverage: 93,
    btlCoverage: 78,
  },
  {
    id: "sanctions-screening-v14",
    clientId: "summit-payments",
    name: "Real-Time Sanctions Screening",
    track: "Traditional AML Model",
    validationType: "Sanctions Screening Model",
    type: "Sanctions & Watchlist",
    owner: "Summit Payments Risk Engineering",
    stage: "Planning",
    status: "On Track",
    riskLevel: "Critical",
    version: "1.4",
    lastValidatedOn: "2025-12-05",
    nextReadoutDate: "2026-04-21",
    summary:
      "Low-latency sanctions and PEP screening engine for customer onboarding and transaction interception.",
    progressPercent: 41,
    openFindings: 1,
    milestones: [
      { label: "Scoping Interviews", dueDate: "2026-03-26", status: "In Progress" },
      { label: "Data Extract Signoff", dueDate: "2026-04-03", status: "Pending" },
      { label: "Testing Design", dueDate: "2026-04-11", status: "Pending" },
      { label: "Client Readout", dueDate: "2026-04-21", status: "Pending" },
    ],
    tags: ["Fintech", "Low latency", "Scoping"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-01-29",
    methodologyNote:
      "Current phase positions the accelerator for a full validation workplan and evidence collection cadence.",
    metrics: {
      precision: 0.63,
      recall: 0.91,
      rocAuc: 0.89,
      falsePositiveRate: 0.17,
    },
    atlCoverage: 62,
    btlCoverage: 40,
  },
  {
    id: "private-client-monitor-v27",
    clientId: "atlas-private-bank",
    name: "Private Client Activity Monitor",
    track: "Traditional AML Model",
    validationType: "Transaction Monitoring Model",
    type: "Transaction Monitoring",
    owner: "Atlas Wealth Surveillance",
    stage: "Ready for Readout",
    status: "Completed",
    riskLevel: "High",
    version: "2.7",
    lastValidatedOn: "2026-01-18",
    nextReadoutDate: "2026-03-31",
    summary:
      "High-touch behavioral monitoring for private banking clients with bespoke scenario overlays.",
    progressPercent: 97,
    openFindings: 1,
    milestones: [
      { label: "Evidence Pack", dueDate: "2026-03-18", status: "Complete" },
      { label: "Partner QA", dueDate: "2026-03-24", status: "Complete" },
      { label: "Client Readout", dueDate: "2026-03-31", status: "In Progress" },
      { label: "Regulator Binder", dueDate: "2026-04-03", status: "Pending" },
    ],
    tags: ["Private banking", "Executive ready"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-01-12",
    methodologyNote:
      "Readout is positioned as a regulator- and audit-friendly narrative with explicit remediation sequencing.",
    metrics: {
      precision: 0.49,
      recall: 0.79,
      rocAuc: 0.84,
      falsePositiveRate: 0.29,
    },
    atlCoverage: 98,
    btlCoverage: 89,
  },
  {
    id: "watchlist-fuzzy-match-v9",
    clientId: "atlas-private-bank",
    name: "Watchlist Fuzzy Match Resolver",
    track: "Traditional AML Model",
    validationType: "Sanctions Screening Model",
    type: "Sanctions & Watchlist",
    owner: "Atlas Screening Operations",
    stage: "Testing",
    status: "Escalated",
    riskLevel: "Critical",
    version: "0.9",
    lastValidatedOn: "2025-11-22",
    nextReadoutDate: "2026-04-04",
    summary:
      "Name-matching and transliteration resolution workflow supporting sanctions screening triage.",
    progressPercent: 64,
    openFindings: 5,
    milestones: [
      { label: "Algorithm Walkthrough", dueDate: "2026-03-13", status: "Complete" },
      { label: "Adversarial Testing", dueDate: "2026-03-25", status: "In Progress" },
      { label: "Escalation Memo", dueDate: "2026-03-28", status: "Pending" },
      { label: "Risk Committee", dueDate: "2026-04-04", status: "Pending" },
    ],
    tags: ["Fuzzy matching", "Escalated", "Evidence gap"],
    humanReviewRequirement: "Required",
    groundingStatus: "Not Applicable",
    lastPromptSetUpdate: "2026-02-05",
    methodologyNote:
      "Escalation is tied to reproducibility concerns and inconsistent evidence retention across retests.",
    metrics: {
      precision: 0.34,
      recall: 0.88,
      rocAuc: 0.71,
      falsePositiveRate: 0.59,
    },
    atlCoverage: 84,
    btlCoverage: 74,
  },
  {
    id: "gai-001-alert-narrative-assistant",
    clientId: "northstar-bank",
    name: "GAI-001 Alert Narrative Assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    type: "GenAI Workflow",
    owner: "Northstar Alert Operations",
    stage: "Testing",
    status: "Needs Attention",
    riskLevel: "High",
    version: "1.3",
    lastValidatedOn: "2026-02-26",
    nextReadoutDate: "2026-04-09",
    summary:
      "GenAI workflow that drafts first-pass alert narratives for investigator review using case context and approved policy references.",
    progressPercent: 68,
    openFindings: 3,
    milestones: [
      { label: "Prompt Pack Approval", dueDate: "2026-03-14", status: "Complete" },
      { label: "Grounding Validation", dueDate: "2026-03-26", status: "In Progress" },
      { label: "Safety Controls Review", dueDate: "2026-04-01", status: "Pending" },
      { label: "Governance Readout", dueDate: "2026-04-09", status: "Pending" },
    ],
    tags: ["GenAI", "Narrative drafting", "Human-in-the-loop"],
    humanReviewRequirement: "Required",
    groundingStatus: "Partial",
    lastPromptSetUpdate: "2026-03-18",
    workflowCode: "GAI-001",
    workflowPurpose:
      "Generate consistent first-draft alert narratives to accelerate investigator triage without authorizing final alert disposition.",
    approvedUsageBoundaries: [
      "Draft narrative support for Level 1 and Level 2 investigators",
      "Summarization of grounded case facts and prior analyst notes",
      "Suggested next-step language subject to human confirmation",
    ],
    prohibitedActions: [
      "Final disposition decisions",
      "Direct SAR filing recommendations without reviewer signoff",
      "Use of unapproved external content or unsupported policy statements",
    ],
    humanInLoopRole:
      "Investigators must verify citations, adjust narrative tone, and approve all escalation language before use in case records.",
    providerModelName: "Azure OpenAI GPT-4.1",
    providerInfo: "Hosted in the client-aligned tenant with retrieval over approved AML case, policy, and disposition repositories.",
    promptPackVersion: "prompt-pack-1.3.2",
    promptVersionHistory: [
      {
        version: "1.3.2",
        updatedAt: "2026-03-18",
        changeSummary: "Tightened recommendation language and expanded citation instructions.",
        approvedBy: "Compliance Design Authority",
      },
      {
        version: "1.3.0",
        updatedAt: "2026-02-22",
        changeSummary: "Added multi-source citation formatting for narrative outputs.",
        approvedBy: "Validation PMO",
      },
    ],
    approvedDataSources: [
      "Alert event payload",
      "Case management notes",
      "Approved AML policy excerpts",
      "Disposition taxonomy reference set",
    ],
    retrievalGroundingCoverage: 82,
    sourceFreshness: "Policy and disposition libraries refreshed daily; case notes are near real-time.",
    citationGroundingQuality:
      "Strong grounding for case facts, but recommendation paragraphs still show occasional unsupported policy paraphrasing.",
    accessControlAssumptions: [
      "Workflow is restricted to approved investigator groups",
      "Prompt context excludes SAR narrative drafts and privileged legal notes",
    ],
    responseQuality: {
      factualityScore: 88,
      completenessScore: 84,
      citationCoverage: 79,
      consistencyScore: 81,
      investigatorUsefulnessScore: 86,
    },
    safetyControls: {
      hallucinationRate: 0.08,
      refusalQuality: "Generally declines unsupported requests but can over-answer when prompt history is long.",
      escalationBehavior: "Escalates severe-risk recommendations inconsistently when policy context is incomplete.",
      sensitiveDataLeakageChecks: "No direct leakage observed; redaction checks need stronger regression coverage.",
      policyBoundaryCompliance: "Mostly compliant with approved usage boundaries; residual unsupported language remains.",
    },
    hallucinationRisk: "High",
    policyAdherence: "Moderate",
    citationAccuracy: 81,
    escalationBehavior: "Watch",
    privacyHandling: "PII masking is applied before answer generation; manual reviewer confirmation remains mandatory.",
    auditability: "Prompt version, retrieved snippets, and answer text are captured for replay in the demo evidence seam.",
    deploymentRecommendation: "Proceed only for draft-narrative support with required human review and prompt-pack approval controls.",
    residualRisks: [
      "Unsupported recommendation phrasing under long-context prompts",
      "Partial citation coverage for policy rationale",
    ],
  },
  {
    id: "gai-002-case-summarization-assistant",
    clientId: "harbor-credit",
    name: "GAI-002 AML Case Summarization Assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    type: "GenAI Workflow",
    owner: "Harbor Investigations Office",
    stage: "Findings Drafted",
    status: "On Track",
    riskLevel: "High",
    version: "2.0",
    lastValidatedOn: "2026-03-02",
    nextReadoutDate: "2026-04-12",
    summary:
      "Workflow that condenses multi-day AML investigations into decision-ready case summaries for management review.",
    progressPercent: 76,
    openFindings: 2,
    milestones: [
      { label: "Use-Case Approval", dueDate: "2026-03-08", status: "Complete" },
      { label: "Response Quality Testing", dueDate: "2026-03-29", status: "Complete" },
      { label: "Control Validation", dueDate: "2026-04-04", status: "In Progress" },
      { label: "Partner Review", dueDate: "2026-04-12", status: "Pending" },
    ],
    tags: ["GenAI", "Summarization", "Case management"],
    humanReviewRequirement: "Required",
    groundingStatus: "Strong",
    lastPromptSetUpdate: "2026-03-16",
    workflowCode: "GAI-002",
    workflowPurpose:
      "Prepare concise, grounded case summaries for reviewer efficiency without changing the underlying investigator conclusion authority.",
    approvedUsageBoundaries: [
      "Case summarization for existing investigations",
      "Highlighting missing evidence for reviewer follow-up",
      "Consolidating case chronology from approved repositories",
    ],
    prohibitedActions: [
      "Recommending case closure without human analyst judgment",
      "Introducing external legal interpretations",
    ],
    humanInLoopRole:
      "Investigators verify source chronology, approve any escalation language, and confirm that omitted evidence is intentional.",
    providerModelName: "Anthropic Claude 3.7 Sonnet",
    providerInfo: "Vendor model accessed through the client accelerator sandbox with retrieval constrained to approved investigation data stores.",
    promptPackVersion: "prompt-pack-2.0.1",
    promptVersionHistory: [
      {
        version: "2.0.1",
        updatedAt: "2026-03-16",
        changeSummary: "Improved chronology prompts and strengthened omission warnings.",
        approvedBy: "Model Governance Council",
      },
    ],
    approvedDataSources: [
      "Case notes",
      "Investigation task history",
      "Approved policy references",
      "Disposition memo archive",
    ],
    retrievalGroundingCoverage: 91,
    sourceFreshness: "Case and task data refresh every 15 minutes; policy references refresh nightly.",
    citationGroundingQuality: "Citations are consistently available for chronology and source notes, with minor gaps in policy footnotes.",
    accessControlAssumptions: [
      "Reviewer entitlements mirror the underlying case-management platform",
      "Prompt context excludes privileged escalation notes until reviewer unlock",
    ],
    responseQuality: {
      factualityScore: 92,
      completenessScore: 89,
      citationCoverage: 87,
      consistencyScore: 90,
      investigatorUsefulnessScore: 91,
    },
    safetyControls: {
      hallucinationRate: 0.04,
      refusalQuality: "Correctly refuses unsupported requests in most test scenarios.",
      escalationBehavior: "Appropriately routes uncertain or incomplete cases back to reviewers.",
      sensitiveDataLeakageChecks: "Redaction control performance is strong under standard scenarios.",
      policyBoundaryCompliance: "Outputs remain within approved summarization boundaries.",
    },
    hallucinationRisk: "Moderate",
    policyAdherence: "Strong",
    citationAccuracy: 89,
    escalationBehavior: "Strong",
    privacyHandling: "Sensitive data masking aligns to current investigator-view rules.",
    auditability: "Prompt and retrieval records are consistently retained with reviewer overrides.",
    deploymentRecommendation: "Suitable for controlled reviewer-assist deployment with ongoing prompt-governance checks.",
    residualRisks: ["Minor citation omissions for long chronology summaries"],
  },
  {
    id: "gai-003-policy-copilot",
    clientId: "summit-payments",
    name: "GAI-003 AML Policy Copilot",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    type: "GenAI Workflow",
    owner: "Summit Policy Governance",
    stage: "Planning",
    status: "Needs Attention",
    riskLevel: "Critical",
    version: "0.8",
    lastValidatedOn: "2026-02-18",
    nextReadoutDate: "2026-04-18",
    summary:
      "Internal GenAI copilot that answers AML policy and procedure questions for operations teams using approved guidance and control libraries.",
    progressPercent: 48,
    openFindings: 4,
    milestones: [
      { label: "Scope Confirmation", dueDate: "2026-03-12", status: "Complete" },
      { label: "Grounding Architecture Review", dueDate: "2026-03-31", status: "In Progress" },
      { label: "Policy Freshness Testing", dueDate: "2026-04-08", status: "Pending" },
      { label: "Steering Readout", dueDate: "2026-04-18", status: "Pending" },
    ],
    tags: ["GenAI", "Policy Q&A", "Grounding required"],
    humanReviewRequirement: "Escalation Only",
    groundingStatus: "Limited",
    lastPromptSetUpdate: "2026-03-11",
    workflowCode: "GAI-003",
    workflowPurpose:
      "Answer internal AML operations questions quickly using grounded policy references while escalating ambiguous or stale-policy cases.",
    approvedUsageBoundaries: [
      "Internal operations policy Q&A",
      "Reference to approved procedural excerpts",
      "Escalation to compliance when source freshness is uncertain",
    ],
    prohibitedActions: [
      "Interpretive legal advice",
      "Binding procedural approvals",
      "Answers without source support when freshness is unknown",
    ],
    humanInLoopRole:
      "Escalation to policy owners is required for ambiguous guidance, outdated sources, or questions with control implications.",
    providerModelName: "Azure OpenAI GPT-4o",
    providerInfo: "Prompted with retrieval over policy libraries, standards, and procedure repositories in the demo sandbox.",
    promptPackVersion: "prompt-pack-0.8.4",
    promptVersionHistory: [
      {
        version: "0.8.4",
        updatedAt: "2026-03-11",
        changeSummary: "Added stale-guidance warning language and stronger escalation instructions.",
        approvedBy: "Policy Steering Group",
      },
    ],
    approvedDataSources: [
      "AML policy library",
      "Procedure repository",
      "Control standard catalogue",
    ],
    retrievalGroundingCoverage: 67,
    sourceFreshness: "Policy library is refreshed nightly, but procedure updates lag by up to five business days.",
    citationGroundingQuality: "Answers cite top-level policy well, but some procedural references point to stale sections.",
    accessControlAssumptions: [
      "Operations users see only policies relevant to their region and function",
      "No legal-advisory documents are exposed to the assistant",
    ],
    responseQuality: {
      factualityScore: 76,
      completenessScore: 72,
      citationCoverage: 69,
      consistencyScore: 71,
      investigatorUsefulnessScore: 78,
    },
    safetyControls: {
      hallucinationRate: 0.12,
      refusalQuality: "Improved but still inconsistent when the user requests direct policy interpretation.",
      escalationBehavior: "Escalation triggers fire for some stale-policy prompts but not reliably for procedural conflicts.",
      sensitiveDataLeakageChecks: "Low risk due to policy-only context, though role-based retrieval controls remain assumptions.",
      policyBoundaryCompliance: "Boundary compliance is uneven under instruction-conflict prompts.",
    },
    hallucinationRisk: "Critical",
    policyAdherence: "Moderate",
    citationAccuracy: 71,
    escalationBehavior: "Partial",
    privacyHandling: "No customer data should be present; validation assumes enforcement through retrieval controls.",
    auditability: "Prompt and answer logs are retained, but source freshness stamps are not consistently surfaced to the user.",
    deploymentRecommendation: "Do not expand beyond tightly controlled pilot use until grounding freshness and escalation behavior improve.",
    residualRisks: [
      "Stale policy references under procedure-change scenarios",
      "Inconsistent escalation during instruction-conflict prompts",
    ],
  },
  {
    id: "gai-004-disposition-recommendation-assistant",
    clientId: "atlas-private-bank",
    name: "GAI-004 Disposition Recommendation Assistant",
    track: "GenAI Workflow",
    validationType: "GenAI Workflow",
    type: "GenAI Workflow",
    owner: "Atlas Financial Crime Operations",
    stage: "Testing",
    status: "Escalated",
    riskLevel: "Critical",
    version: "0.6",
    lastValidatedOn: "2026-02-21",
    nextReadoutDate: "2026-04-05",
    summary:
      "Assistant that proposes draft alert disposition rationales and escalation paths for investigator review in private-banking AML operations.",
    progressPercent: 57,
    openFindings: 5,
    milestones: [
      { label: "Use-Case Challenge Session", dueDate: "2026-03-09", status: "Complete" },
      { label: "Adversarial Prompt Testing", dueDate: "2026-03-27", status: "In Progress" },
      { label: "Human Review Control Signoff", dueDate: "2026-04-01", status: "Pending" },
      { label: "Risk Committee Packet", dueDate: "2026-04-05", status: "Pending" },
    ],
    tags: ["GenAI", "Disposition assist", "Escalated"],
    humanReviewRequirement: "Required",
    groundingStatus: "At Risk",
    lastPromptSetUpdate: "2026-03-20",
    workflowCode: "GAI-004",
    workflowPurpose:
      "Offer draft recommendation language and escalation pathways to support private-banking investigators, subject to mandatory reviewer approval.",
    approvedUsageBoundaries: [
      "Draft recommendation support only",
      "Highlight grounded case facts relevant to disposition",
      "Escalate uncertain, high-risk, or unsupported outputs",
    ],
    prohibitedActions: [
      "Autonomous disposition",
      "Final case closure language without human approval",
      "Use of unsupported relationship or wealth-source assumptions",
    ],
    humanInLoopRole:
      "Senior investigators must review every answer, validate supporting evidence, and confirm the escalation path before any workflow action.",
    providerModelName: "OpenAI o4-mini",
    providerInfo: "Pilot configuration in the consulting accelerator sandbox with retrieval over private-bank case facts and approved procedures.",
    promptPackVersion: "prompt-pack-0.6.5",
    promptVersionHistory: [
      {
        version: "0.6.5",
        updatedAt: "2026-03-20",
        changeSummary: "Added stronger refusal instructions for unsupported disposition recommendations.",
        approvedBy: "Risk Committee Working Group",
      },
    ],
    approvedDataSources: [
      "Case summary records",
      "Private-banking risk procedures",
      "Disposition taxonomy",
      "Escalation playbooks",
    ],
    retrievalGroundingCoverage: 61,
    sourceFreshness: "Core procedures refresh nightly; relationship-manager annotations can lag by one business day.",
    citationGroundingQuality: "Material gaps remain for escalation rationale and source attribution in complex cases.",
    accessControlAssumptions: [
      "Pilot is limited to private-bank investigators with approved case entitlements",
      "Relationship-manager notes require additional masking before retrieval",
    ],
    responseQuality: {
      factualityScore: 71,
      completenessScore: 75,
      citationCoverage: 58,
      consistencyScore: 67,
      investigatorUsefulnessScore: 73,
    },
    safetyControls: {
      hallucinationRate: 0.15,
      refusalQuality: "Refusals improve under obvious unsupported prompts but weaken during adversarial investigator prompts.",
      escalationBehavior: "Escalation is inconsistent, especially when risk indicators conflict with incomplete case notes.",
      sensitiveDataLeakageChecks: "Redaction gaps remain for relationship-manager free text in negative tests.",
      policyBoundaryCompliance: "Boundary adherence is not reliable enough for broad pilot expansion.",
    },
    hallucinationRisk: "Critical",
    policyAdherence: "Partial",
    citationAccuracy: 63,
    escalationBehavior: "At Risk",
    privacyHandling: "Current redaction controls are not yet strong enough for unattended prompt expansion.",
    auditability: "Replay artifacts exist, but unsupported recommendation paths still need clearer audit annotations.",
    deploymentRecommendation: "Hold deployment beyond a narrow validator sandbox until adversarial and redaction issues are remediated.",
    residualRisks: [
      "Unsafe recommendation language under conflicting investigator prompts",
      "Sensitive-data redaction gaps",
      "Weak citation grounding for escalation logic",
    ],
  },
]

export function isTraditionalValidationModel(model: ValidationItem): model is TraditionalValidationModel {
  return model.track === "Traditional AML Model"
}

export function isGenAIWorkflow(model: ValidationItem): model is GenAIValidationWorkflow {
  return model.track === "GenAI Workflow"
}

export function getValidationModels(): ValidationModel[] {
  return validationModels
}

export function getValidationModel(modelId: string): ValidationModel | undefined {
  return validationModels.find((model) => model.id === modelId)
}

export function getModelsForClient(clientId: string): ValidationModel[] {
  return validationModels.filter((model) => model.clientId === clientId)
}

export function getModelCountsByStatus(models: ValidationModel[]): Record<ModelStatus, number> {
  return {
    "On Track": models.filter((model) => model.status === "On Track").length,
    "Needs Attention": models.filter((model) => model.status === "Needs Attention").length,
    Escalated: models.filter((model) => model.status === "Escalated").length,
    Completed: models.filter((model) => model.status === "Completed").length,
  }
}

export function getModelCountsByType(models: ValidationModel[]): Record<ValidationType, number> {
  return {
    "Transaction Monitoring Model": models.filter((model) => model.validationType === "Transaction Monitoring Model")
      .length,
    "Customer Risk Model": models.filter((model) => model.validationType === "Customer Risk Model").length,
    "Sanctions Screening Model": models.filter((model) => model.validationType === "Sanctions Screening Model")
      .length,
    "GenAI Workflow": models.filter((model) => model.validationType === "GenAI Workflow").length,
  }
}

export function getModelCountsByTrack(models: ValidationModel[]): Record<ValidationTrack, number> {
  return {
    "Traditional AML Model": models.filter((model) => model.track === "Traditional AML Model").length,
    "GenAI Workflow": models.filter((model) => model.track === "GenAI Workflow").length,
  }
}

export function getHighRiskModelCount(models: ValidationModel[]): number {
  return models.filter((model) => model.riskLevel === "High" || model.riskLevel === "Critical").length
}

export function getGroundingCounts(models: ValidationModel[]): Record<GroundingStatus, number> {
  return {
    "Not Applicable": models.filter((model) => model.groundingStatus === "Not Applicable").length,
    Strong: models.filter((model) => model.groundingStatus === "Strong").length,
    Partial: models.filter((model) => model.groundingStatus === "Partial").length,
    Limited: models.filter((model) => model.groundingStatus === "Limited").length,
    "At Risk": models.filter((model) => model.groundingStatus === "At Risk").length,
  }
}

export function getHumanReviewCounts(models: ValidationModel[]): Record<HumanReviewRequirement, number> {
  return {
    Required: models.filter((model) => model.humanReviewRequirement === "Required").length,
    "Escalation Only": models.filter((model) => model.humanReviewRequirement === "Escalation Only").length,
    Optional: models.filter((model) => model.humanReviewRequirement === "Optional").length,
  }
}

export function sortModelsByRisk(models: ValidationModel[]): ValidationModel[] {
  const order: Record<RiskLevel, number> = {
    Low: 0,
    Moderate: 1,
    High: 2,
    Critical: 3,
  }

  return [...models].sort((left, right) => order[right.riskLevel] - order[left.riskLevel])
}
