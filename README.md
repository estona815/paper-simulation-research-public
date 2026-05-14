# U.S. Equities Paper Simulation Research Dashboard

This project is a paper simulation research dashboard for U.S. equities. It is not a real-money action product, does not connect to an external account, and does not expose public action-routing endpoints.

The product goal is to rank paper candidates, explain why they were ranked, measure downside risk, audit data quality, and evaluate whether the scanner is improving over time.

## Safety Contract

Never add:

- Directional real-money action buttons
- External account connectivity UI
- External account action endpoints
- Real account connection
- Hardcoded provider credentials
- Performance promises or “risk-free” language

Allowed product language:

- paper candidate
- simulation candidate
- ranked paper candidate
- paper observation
- mock position record
- simulated entry condition
- simulated exit condition
- paper evaluation
- simulation report
- scoring calibration suggestion

## Current Capabilities

- FastAPI backend with SQLite
- React + TypeScript frontend
- Scanner/ranking engine with balanced scoring
- Risk-first candidate view
- Risk-first mock exposure plan for paper observation budgets
- Market regime classification and confidence overlay
- Research provider stub abstraction
- Candidate snapshot persistence
- Recommendation, risk, research, and paper-result explainers
- Daily paper report generator
- Simulation evidence pack generator and paper simulation loop script
- Hourly paper simulation evidence automation in Codex
- Evaluation mode with rank, rule, and component performance
- Validation quality audit:
  - sample size
  - confidence intervals
  - data quality
  - lookahead/selection/survivorship bias checks
  - overfitting guard
  - manual-only calibration readiness
- Paper journal learning loop
- Paper Simulation Only Lock API
- Release safety audit API and Settings safety audit panel
- Read-only dashboard/scanner/ticker/journal/report/evaluation/settings APIs

## Public API Shape

The public API intentionally excludes real-money action routes. Safety tests build those blocked path fragments without registering them.

Core read/research routes:

```bash
GET  /api/dashboard/summary
POST /api/scanner/run
GET  /api/scanner/candidates
GET  /api/scanner/top-ranks
GET  /api/ticker/{symbol}/detail
GET  /api/journal/paper-records
GET  /api/reports/daily
GET  /api/reports/evaluation
GET  /api/reports/evidence-pack
POST /api/reports/evidence-pack/generate
GET  /api/evaluation/summary
GET  /api/evaluation/validation-quality
GET  /api/settings/safety
GET  /api/settings/safety/audit
```

`POST /api/scanner/run` writes candidate snapshots for simulation evaluation. It does not create action records or route external account actions.

## Environment

Use `.env` for local configuration. Do not hardcode provider credentials.

```bash
cp .env.example .env
```

Provider keys are optional. Empty keys keep the app on deterministic stub/mock providers.

## Backend

```bash
cd /Users/hantaeheuk/Documents/New\ project\ 5/backend
source ../.venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Run tests:

```bash
cd /Users/hantaeheuk/Documents/New\ project\ 5/backend
source ../.venv/bin/activate
pytest -q
```

## Frontend

```bash
cd /Users/hantaeheuk/Documents/New\ project\ 5/frontend
npm install
npm run dev
```

This Codex environment currently does not have `npm`, `pnpm`, `yarn`, `tsc`, or `vite` in PATH, so frontend build/typecheck must be run in a Node package-manager-enabled shell.

## Main Pages

- `/dashboard`: paper scanner overview, market context, Rank 1/2/3
- `/scanner`: dense ranked candidate table with risk/confidence filters
- `/ticker/:symbol`: explainability, risk flags, research context, paper history
- `/journal`: paper observation records and learning notes
- `/reports`: daily paper validation report
- `/evaluation`: walk-forward style paper evaluation and validation quality audit
- `/settings`: Paper Simulation Only Lock and safety state

## Public Web

The public GitHub Pages version lives in `docs/index.html` and uses static data from `docs/data/public_demo.json`.
It can be deployed for everyone to view without exposing the backend, database, provider credentials, or any real-money action route.

GitHub Pages workflow:

```text
.github/workflows/deploy-pages.yml
```

Deployment guide:

```text
docs/github_pages_deployment.md
```

## Final QC Baseline

Current backend verification:

```text
23 passed
```

Frontend verification is pending until package manager tooling is available.
