# Demo Video Refresh Plan

## Objective

Refresh the repository demo video so it matches the current **AML Model Validation Reporting Portal Demo** positioning.

The refreshed asset set must reinforce that:

- this is a secure consulting-hosted reporting and evidence portal
- data and validation execution stay inside the financial institution
- the portal focuses on reporting, evidence review, findings, remediation, and committee-ready outputs
- the same shared experience supports:
  - traditional AML model validation reporting
  - GenAI-assisted AML workflow validation reporting

## What Was Out Of Date

The prior asset package under `public/demo/` still showed:

- `AML Model Validation Accelerator`
- `AML Validation Workbench`
- `Consulting Accelerator`
- `Testing Lab`
- old persona labels such as `Compliance Officer` and `Validator`
- older scene labels and frame names driven by the pre-refresh persona IDs

Those assets no longer matched the current application shell, current personas, or the portal-security story now documented in:

- `README.md`
- `PERSONAS_DEMO_GUIDE.md`
- `DEMO_WALKTHROUGH.md`
- `UPGRADE_NOTES_2026.md`

## Smallest-Change Refresh Approach

Reuse the existing frame-capture workflow and final asset names:

- `public/demo/demo-walkthrough.mp4`
- `public/demo/demo-preview.gif`

Refresh the underlying scene sequence, captions, and frame generation logic rather than introducing a separate media toolchain.

## New Story Arc

1. Secure login
2. Secure registration
3. Dashboard with persona-aware reporting
4. Shared validation inventory
5. Traditional AML detail
6. GenAI detail:
   - Data & Grounding
   - Response Quality
   - Safety & Controls
   - Findings
7. Testing evidence summary
8. Shared findings and remediation
9. Report preview / audit pack
10. Closing message:
    consulting-hosted secure reporting portal, with institution-side data and execution boundaries

## Regeneration Workflow

1. Start PostgreSQL
2. Start the app
3. Launch Chrome with remote debugging on port `9222`
4. Run `node scripts/generate-demo-video.mjs`

The script:

- ensures a demo login user exists
- captures refreshed frames from current routes
- renders the final MP4
- renders the README preview GIF

## Caption Note

The current local `ffmpeg` build in this environment supports the refreshed MP4 and GIF render path but does not expose the `drawtext` filter needed for burned-in caption overlays.

Because of that, the refreshed exported assets use:

- updated portal screens
- updated scene order
- updated closing frame
- separate shot-list and narration documentation for exact caption and talking-point wording

If a future environment includes `drawtext`, the same scene configuration can be extended to burn captions directly into the MP4 and GIF.

## Supporting Files

- `docs/demo-video/SHOT_LIST.md`
- `docs/demo-video/NARRATION.md`
- `scripts/demo-video/scenes.mjs`
- `scripts/demo-video/render-assets.mjs`
- `scripts/generate-demo-video.mjs`
