# Page Table of Contents

The portfolio supports an optional, reusable table of contents for long project and case-study pages.

The implementation consists of:

- `_includes/page-toc.html`
- `assets/js/page-toc.js`
- shared styles in `assets/main.scss`

The table of contents is generated from the rendered page structure rather than maintained as a separate manual navigation list.

## Behavior

When enabled, the component:

- discovers eligible `h2` headings inside `.post-content`;
- creates anchor links for those sections;
- highlights the section currently visible in the viewport;
- keeps previously visited links neutral;
- changes links to the accent color on hover;
- displays the current section in the accent color, bold, with a vertical indicator;
- remains fixed to the left side of the viewport on wide screens;
- switches to an inline `On this page` disclosure on narrower screens;
- supports smooth anchor scrolling;
- disables smooth scrolling when the user prefers reduced motion;
- rebuilds generated navigation lists on initialization so repeated execution does not duplicate entries;
- forces the final navigation item active when the user reaches the absolute bottom of the page, including when the final section is too short to enter the normal observer region.

The component intentionally tracks `h2` headings rather than `h1`.

A page should have one primary `h1`, normally generated from the page title. Major article sections should use `h2`, while subsections should use `h3`.

## Enabling the Table of Contents

Add the following property to the page front matter:

```yaml
toc: true
```

Example:

```yaml
---
layout: page
title: SecApp
subtitle: Security Operations and Exposure Management Platform
status: Work in progress
toc: true
permalink: /projects/mockco/security-operations-platform/
---
```

Place the reusable include after the page introduction and before the first major section:

```liquid
{% include page-toc.html %}
```

Example:

```markdown
Introductory page content.

{% include page-toc.html %}

## Architecture
```

The include location determines where the inline disclosure appears on smaller screens. It does not control the desktop sidebar position.

## Excluding a Section

Add the `toc-ignore` class to an `h2` when the section should remain on the page but should not appear in the generated navigation:

```markdown
## Relationship to MockCo
{: .toc-ignore }
```

Use this sparingly. Exclusions are appropriate for secondary closing sections such as:

- relationship to a broader project;
- appendices;
- minor next-step notes;
- supporting references.

Primary reader destinations should remain visible in the table of contents.

## Heading Requirements

Use stable and descriptive `h2` headings.

Preferred:

```markdown
## Current Implementation
## Key Decisions
## Boundaries and Tradeoffs
```

Avoid headings that are:

- excessively long;
- duplicated on the same page;
- meaningful only in surrounding context;
- used purely for visual styling.

If a heading does not already have an ID, `page-toc.js` generates one from its visible text.

Explicit Markdown heading IDs may be used when a stable public fragment identifier is required:

```markdown
## Production-Controlled Promotion
{: #production-controlled-promotion }
```

## Responsive Behavior

The current breakpoint is:

```text
1280px
```

Above the breakpoint:

- the desktop table of contents is shown;
- it remains fixed near the left side of the viewport;
- it does not move with the centered article column.

At and below the breakpoint:

- the fixed sidebar is hidden;
- the inline `On this page` disclosure is shown;
- the article retains its normal width.

Page-specific diagrams or layouts should not be implemented in the reusable TOC styles. Use a page-specific class when a particular figure needs different sizing or positioning.

For example, SecApp uses:

```html
architecture-figure--secapp
```

That class is specific to the SecApp architecture figure and is not part of the general TOC interface.

## Validation

After enabling the TOC on a page, run:

```powershell
jekyll build
```

Confirm the generated page contains:

```text
page-toc--desktop
page-toc--mobile
data-page-toc-list
page-toc.js
```

Example:

```powershell
$generated = ".\_site\projects\mockco\security-operations-platform\index.html"

Select-String `
    -Path $generated `
    -Pattern `
        'page-toc--desktop',
        'page-toc--mobile',
        'data-page-toc-list',
        'page-toc.js'
```

Then review the page at:

- a wide desktop viewport;
- just above and below the 1280px breakpoint;
- a mobile viewport.

Confirm:

- all expected `h2` sections appear;
- excluded sections do not appear;
- the current section is highlighted correctly;
- visited links remain neutral;
- hover styling works;
- anchor jumps leave headings visible below the site header;
- the sidebar does not overlap figures or article content;
- the inline disclosure does not compress tables or diagrams.

Finally run:

```powershell
git diff --check
git status --short
```

## Usage Summary

For each eligible page:

1. Add `toc: true` to front matter.
2. Insert `{% include page-toc.html %}` after the introduction.
3. Structure major sections as `h2`.
4. Add `{: .toc-ignore }` only to secondary sections that should not appear.
5. Build and visually review desktop and mobile behavior.