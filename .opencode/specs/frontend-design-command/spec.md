# Spec: Integrated Design Command Orchestration

## Overview
This specification defines the `/design` command, which orchestrates the `@apex-ui-ux-designer` agent and a suite of specialized design skills to create high-quality, distinctive frontend interfaces and visual assets.

## Objective
To provide a unified workflow for frontend design that leverages:
- `@frontend-design`: For bold aesthetic direction and UI principles.
- `@theme-factory`: For professional color and typography systems.
- `@algorithmic-art`: For generative and interactive p5.js assets.
- `@canvas-design`: For high-fidelity static visual assets (PDF/PNG).
- `@artifacts-builder`: For complex, multi-component React prototypes.

## Command Definition: `/design`

### Trigger
- User command: `/design [prompt]`
- Keywords: "design", "ui", "ux", "visual", "aesthetic", "interface"

### Orchestration Logic (Context Engineering)

The `@apex-ui-ux-designer` acts as the **Design Lead**, following this sequence:

1.  **Aesthetic Definition (Phase 1)**:
    -   Invoke `frontend-design` to establish a "Bold Aesthetic" (e.g., Brutalist, Minimalist, Retro-futuristic).
    -   Define the "Tone" and "Unforgettable" element.

2.  **Theming (Phase 2)**:
    -   Invoke `theme-factory` to pick or create a theme that aligns with the aesthetic.
    -   Establish CSS variables for colors and font pairings.

3.  **Asset Generation (Phase 3 - Parallel)**:
    -   **Static Assets**: If the prompt implies branding, posters, or static visuals, invoke `canvas-design`.
    -   **Generative Assets**: If the prompt implies dynamic backgrounds, hero sections, or interactive patterns, invoke `algorithmic-art`.

4.  **Implementation (Phase 4)**:
    -   **Standalone Prototypes**: If the user wants a demo or a complex interactive tool, use `artifacts-builder` to bundle a React/shadcn/ui app.
    -   **Integrated Components**: If the user wants components for the main app, implement directly in `src/components/` using the established theme and assets.

## Skill Selection Guide (Decision Matrix)

| Skill | Use Case | Output |
| :--- | :--- | :--- |
| **frontend-design** | Setting the visual tone, UI principles, bold choices. | Conceptual direction, CSS patterns. |
| **theme-factory** | Color palettes, typography systems, visual consistency. | CSS variables, font pairings. |
| **algorithmic-art** | Generative backgrounds, interactive data viz, particle systems. | p5.js interactive HTML. |
| **canvas-design** | Posters, logos, static infographics, branding. | PDF, PNG. |
| **artifacts-builder** | Complex dashboards, multi-page prototypes, standalone demos. | Bundled React HTML. |

## Implementation Strategy

### 1. Command Registration
Create `.opencode/commands/design.md` to define the command behavior and droid mapping.

### 2. Agent Instructions
Update `@apex-ui-ux-designer` instructions to include the orchestration logic and skill usage.

### 3. Validation
- Ensure all skills are called with their required templates (e.g., `viewer.html` for p5.js).
- Verify that themes are applied consistently across all generated assets.
- Check for "AI slop" avoidance (no generic gradients, Inter font, etc.).

## Acceptance Criteria
- [ ] Command `/design` is recognized and triggers the orchestration.
- [ ] `@apex-ui-ux-designer` correctly identifies which skills to use based on the prompt.
- [ ] Parallel execution is used for asset generation when applicable.
- [ ] Output is distinctive, high-quality, and follows the "Bold Aesthetic" principle.
- [ ] All generated code follows the project's stack (Bun, React 19, Tailwind v4).
