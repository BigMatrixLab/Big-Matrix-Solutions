# Dosemetric — Product Case Study

> Source material for the `/project/dosemetric` showcase page (`src/pages/projects/ProjectDosemetric.jsx`).

## Overview

Dosemetric is a web application for the Radiation Oncology Department at Labaid Cancer Hospital. It manages the daily, weekly and monthly quality assurance checks run on the department's linear accelerators: who performs each section, when it is due, what was measured, and who verified it. Technologists fill in the checks, medical physicists review and sign them off, and administrators plan the schedule and maintain the forms.

The core design decision is that every QA form is versioned data rather than a fixed screen. The department's three standard QA documents are built in, a form builder lets administrators adapt them without code changes, and each assignment is pinned to the form version it was issued with, so changing a form never alters past records.

## At a glance

| | |
|---|---|
| **Product** | Dosemetric |
| **Category** | Medical Physics / Radiotherapy QA |
| **Client** | Labaid Cancer Hospital & Super Speciality Center |
| **Timeline** | May 2026 – October 2026 |
| **Users** | Radiotherapy technologists, medical physicists, department administrators |
| **Platform** | Web app (desktop and mobile), self-hosted |
| **Stack** | React 19 · TanStack Start · Tailwind CSS · FastAPI · SQLAlchemy · SQLite · Docker |
| **Built-in forms** | Daily (5 sections), weekly (4 sections), monthly (17 sections) |
| **Status** | In development |

## The problem

A radiotherapy department checks each linear accelerator every working day, week and month, from door interlocks and lasers to beam output, flatness and symmetry for every energy, MLC leaf positions and CBCT image quality. Each value must be compared against a reference and tolerance, then signed off by a physicist other than the person who measured it. Without a shared system, that work depends on individual discipline and is hard to audit.

- **Manual tolerance checks.** Every reading must be compared against its reference and limit by hand, across dozens of checks per session.
- **Unclear ownership.** Sections are split between staff, and it is hard to see who is responsible for which check on which day.
- **Late discovery of missed checks.** A skipped daily check tends to surface after the fact rather than when the deadline passes.
- **Scattered history.** Past measurements are difficult to collect into a series that shows drift over months.

## What we built

We built a full-stack application with three connected parts. A form layer holds the department's built-in daily, weekly and monthly QA documents and a drag-and-drop builder for custom forms, both stored as versioned schemas. A scheduling layer turns a published form version into assignments: specific sections, given to specific staff, on specific dates, with a deadline and optional supervisors. A workflow layer takes each assignment through draft, submission, verification or rejection, sends in-app notifications at each step, and flags anything past its deadline.

Each role gets its own dashboard and navigation: technologists see their tasks, physicists a review queue, administrators the calendar, forms, users and analytics. On submission, the server also stores every numeric reading in a time-series table keyed by form, section and variable, ready for trend analysis.

## Key features

### Digitised QA forms

- **Department forms built in.** The daily, weekly and monthly forms cover 26 sections, including safety interlocks, lasers, the telemeter, Winston–Lutz isocentre size, MLC picket fence and transmission, couch movements, electron and photon output, profiles and PDD, and CBCT HU constancy.
- **Live tolerance flags.** Each measurement is checked against its reference and limit as it is typed, in millimetres or percent, and shows pass or fail with the deviation.
- **Autosaved drafts.** Work in progress saves to the server, so a session can be resumed on another device.
- **Print-ready export.** A completed form prints as a formatted QA document or saves as a PDF from the browser.

### Form builder and versioning

- **Eight field types.** Checklist items, pass/fail, measurements with unit and tolerance, measurement tables, short text, notes, dropdowns and dates.
- **Drag-and-drop layout.** Sections and fields can be reordered with a mouse or the keyboard.
- **Immutable versions.** Edits happen on a single draft and are published as a numbered version with a change note. Versions in use cannot be deleted, and a form in use is archived instead of removed.

### Scheduling and assignment

- **Section-level assignment.** A staff-by-section matrix shows which technologist covers which part of a form, with coverage per row.
- **Yearly plans.** One action generates a year of assignments: daily QA on weekdays, weekly QA on Mondays and monthly QA on the first of the month.
- **Overdue detection.** The server scans every five minutes, marks late assignments overdue and notifies the assignee and administrators once.

### Review and sign-off

- **Separation of duties.** Only a physicist, administrator or named supervisor can verify a submission, and never the person who submitted it.
- **Reject with a reason.** Rejected work returns to the technologist with the reviewer's comment shown above the form.
- **Role-scoped sign-off.** Assignee, supervisor and coordinator each add a typed signature and remarks in their own slot only.

### Dashboards and notifications

- **Role-specific dashboards.** Counts for pending, overdue, awaiting verification and completed work, tailored to each role.
- **Programme analytics.** Completion by month, overdue trend, volume by QA type and status distribution, with week, month, year and custom ranges.
- **In-app notifications.** Alerts for new assignments, submissions, verifications, rejections and overdue work, with an unread badge on desktop and mobile.

## How it works

1. **Prepare the form.** An administrator uses a built-in QA form or publishes a new version from the form builder.
2. **Assign the work.** In a three-step wizard, the administrator picks a form (assignments are pinned to its current default version), maps staff to sections, sets the deadline and supervisors, and issues one-off assignments or a full-year plan. Each technologist is notified.
3. **Perform the checks.** The technologist opens the task from their dashboard, enters measurements and sees each value flagged against its tolerance. Drafts save automatically.
4. **Submit.** The submission locks the responses, stores every numeric reading as a time-series point and notifies the physicists.
5. **Review.** A physicist opens the review queue, inspects the form and verifies it or rejects it with a reason. The technologist is notified either way.
6. **Track the programme.** Missed deadlines are flagged overdue automatically, and administrators follow completion and overdue trends on the calendar and analytics pages.

## Technology

| Layer | Choice | Why |
|---|---|---|
| Frontend | React 19, TanStack Start, Tailwind CSS 4, Recharts, dnd-kit | Server-rendered app with typed routes, charts and keyboard-accessible drag-and-drop |
| Backend | FastAPI, Pydantic 2, Python 3.13 | Typed request validation and generated API documentation |
| Data | SQLite via SQLAlchemy 2, Alembic | A single database file that is easy to back up for one department; migrations run on startup |
| Infrastructure | Docker Compose: nginx, Node SSR, FastAPI | One command to deploy on a single self-hosted server |
| Testing | pytest | 18 backend tests covering sessions, user rules, form versioning and the QA workflow |

Built-in and custom forms share one storage model, one JSON document per assignment section, so both run through the same submission, review and time-series pipeline. Every endpoint checks the session and write operations check the user's role on the server, the browser only talks to a same-origin API behind the reverse proxy, and state-changing requests must carry a custom header that blocks cross-site form posts.

## Our role

- Digitising the department's daily, weekly and monthly QA documents into structured form schemas
- Product design and UI for desktop and mobile
- Backend API, data model and workflow engine
- Migration of data from an earlier version of the application
- Containerised deployment setup

## What's next

- Password-based or single sign-on authentication and HTTPS before production use (planned)
- Trend charts driven by the time-series data captured from real submissions (planned)
- Filtering trends and reports by individual machine (planned)
