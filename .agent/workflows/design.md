---
description: Orchestrates high-quality frontend design using specialized skills
---

# Command: /design

## Universal Description
**INTELLIGENT DESIGN ORCHESTRATION** - Multi-skill parallel execution for distinctive, production-grade frontend interfaces and visual assets. Leverages `@frontend-design`, `@theme-factory`, `@algorithmic-art`, `@canvas-design`, and `@artifacts-builder` to deliver cohesive, bold, and unforgettable UI/UX solutions.

## Purpose
To provide a unified entry point for all design-related tasks, ensuring that every interface is built with a clear aesthetic point-of-view, professional theming, and high-quality visual assets, while avoiding generic "AI slop".

## Orchestration Workflow

### Phase 1: Aesthetic Discovery
- **Agent**: `@apex-ui-ux-designer`
- **Skill**: `@frontend-design`
- **Action**: Define the "Bold Aesthetic" (Brutalist, Minimalist, etc.), Tone, and "Unforgettable" element.

### Phase 2: Theming & Identity
- **Agent**: `@apex-ui-ux-designer`
- **Skill**: `@theme-factory` + `@ui-ux-pro-max`
- **Action**: Pick or create a theme (colors/fonts) that matches the aesthetic. Define CSS variables.

### Phase 3: Asset Generation (Parallel)
- **Static Visuals**: Invoke `@canvas-design` for posters, logos, or branding.
- **Generative Art**: Invoke `@algorithmic-art` for interactive backgrounds or patterns.

### Phase 4: Implementation
- **Standalone**: Use `@artifacts-builder` for prototypes/demos.
- **Integrated**: Implement in `src/` using React 19 + Tailwind v4 + shadcn/ui.

## Skill Selection Guide

| If the user wants... | Use Skill... | Why? |
| :--- | :--- | :--- |
| **A new look/feel** | `frontend-design` | Sets the conceptual and aesthetic foundation. |
| **Consistent colors/fonts** | `theme-factory` | Ensures professional and cohesive styling. |
| **Interactive patterns** | `algorithmic-art` | Creates living, generative p5.js assets. |
| **Static posters/logos** | `canvas-design` | Produces high-fidelity PDF/PNG assets. |
| **A complex prototype** | `artifacts-builder` | Bundles a full React app into a single HTML. |

## Safety & Quality Rules
- **NEVER** use generic Inter/Arial fonts or purple gradients by default.
- **ALWAYS** use `templates/viewer.html` for p5.js art.
- **ALWAYS** ensure Portuguese interface for user-facing text.
- **ALWAYS** validate WCAG 2.1 AA compliance.
- **ALWAYS** use `bun` for any package operations.

## Usage Examples
- `/design "Crie uma dashboard brutalista para métricas de vendas"`
- `/design "Identidade visual minimalista para clínica de estética"`
- `/design "Background generativo de partículas para a landing page"`