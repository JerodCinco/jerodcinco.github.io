# Sales Kiosk UI Modernization

## Overview

This project is a portfolio-safe recreation of a tablet-based sales and guest-assistance interface.

The original application supported multiple product and informational experiences using HTML, CSS, JavaScript, and enterprise API integrations.

For this public portfolio version, proprietary branding, internal endpoints, production pricing, attraction information, maps, legal content, and organization-specific assets were removed or replaced with fictional sample content.

The goal was to preserve the frontend architecture and interactive behavior while creating a standalone version that can be reviewed without access to internal systems.

## My Contributions

My primary work focused on the frontend modernization and presentation of the application, including:

- Modernizing page layouts and visual styling
- Improving consistency across navigation and product pages
- Building and refining reusable CSS patterns
- Improving responsive layouts and component spacing
- Updating tables, buttons, pricing displays, and interactive states
- Improving the presentation of Tickets, Premium Access, Memberships, Rentals, and Map experiences
- Documenting existing JavaScript behavior to better understand the application architecture
- Converting the project into a portfolio-safe demonstration using fictional local data and original replacement assets

The production application already contained JavaScript and API-driven functionality. The portfolio version preserves and documents those concepts while replacing private integrations with local demonstration data.

## Technologies

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- JavaScript array filtering
- Template literals
- Dynamic HTML rendering
- Responsive layouts
- Flexbox
- CSS Grid

## Portfolio Architecture

The production application used enterprise APIs to retrieve dynamic product, pricing, exclusion, and operating-hours information.

A simplified production flow looked like:

```text
Enterprise API
     ↓
fetch()
     ↓
HTTP response
     ↓
response.json()
     ↓
Application state
     ↓
Filtering / selection logic
     ↓
Dynamic HTML rendering
     ↓
User interface
```

The portfolio version replaces those private data sources with fictional local datasets:

```text
Fictional Demo Data
     ↓
Application state
     ↓
Filtering / selection logic
     ↓
Dynamic HTML rendering
     ↓
User interface
```

This preserves the frontend behavior while removing dependencies on private infrastructure.

## Pages and Features

### Park Tickets

Demonstrates:

- 2-Park and 3-Park product filtering
- Single-park and Park-to-Park admission states
- Adult and child pricing
- Dynamic table rendering
- Per-day price calculations
- Date selection
- Active control state management

### Premium Access

Demonstrates:

- Multiple access categories
- Unlimited, Standard, Water, and Galaxy product filtering
- Fictional pricing
- Exact category matching
- Dynamic table headings
- Dynamically rendered attraction exclusions
- Date-driven interface controls

The production implementation used separate APIs for pricing data and attraction exclusions. The portfolio version replaces both with fictional local datasets.

### Memberships

Demonstrates:

- 2-Park and 3-Park membership filtering
- Resident and Non-Resident pricing states
- Multiple fictional membership tiers
- Dynamic total, monthly, and initial-payment presentation
- Sample payment-plan presentation
- Active control state management

The same membership record can display different pricing properties depending on the selected customer type.

### Equipment Rentals

Demonstrates:

- Stroller and accessibility rental categories
- Dynamic content switching
- Dynamic table-column creation and removal
- Fictional rental pricing
- Active control highlighting
- Original portfolio-safe product imagery

### Interactive Park Map

Demonstrates:

- A fictional four-park destination
- Category-based attraction exploration
- Dynamic information panels
- Fictional attraction listings
- Fictional operating hours
- Modal information display
- Original portfolio-safe map artwork

The production implementation included individual destination maps and additional overlays. The portfolio version simplifies the experience into a single fictional overview map while preserving the interactive category system.

## Fictional Portfolio Content

All publicly displayed park names, attraction names, membership names, product names, prices, payment amounts, operating hours, maps, logos, rental imagery, and policies are fictional sample content created specifically for this portfolio demonstration.

No production pricing or internal API endpoints are required to run the portfolio version.

## Project Goals

This portfolio version demonstrates continued development in:

- Frontend development
- HTML and CSS
- JavaScript
- UI/UX design
- Responsive interfaces
- Data-driven UI behavior
- Understanding API-based frontend architecture
- Maintaining and modernizing existing applications

## Running the Project

1. Clone or download the repository.
2. Open `main.html` in a modern web browser.
3. Select **Theme Park Experience** to enter the portfolio application.

Because the portfolio version uses local fictional datasets, no API credentials or private network access are required.

## Notes

This repository represents the portfolio-safe version of the project.

Production integrations, proprietary content, internal infrastructure details, and organization-specific assets have intentionally been excluded.
