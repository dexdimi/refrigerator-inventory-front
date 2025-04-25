# FridgeFrontend

An **Angular 19** single-page application for managing fridge items, talking to a Spring Boot “fridge-service” API.  
Features include paginated item lists, CRUD operations, and dynamic lookups for units and categories.

---

## Prerequisites

- Node.js >= 18  
- npm >= 9 
- Java >= 23 & Spring Boot “fridge-service” running on `http://localhost:8080`  

---

## Development server

To start a local development server, run:

```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Getting Started

### 1. **Clone the repo**  
```bash
git clone https://github.com/<YOUR_ORG>/fridge-frontend.git
cd fridge-frontend
```
### 2. Install dependencies

```bash
npm install
```
### 3. Run with API proxy

```bash
npm start
```
This runs ng serve --proxy-config proxy.conf.json, forwarding /api/** to your backend.

### 4. Open in browser
Navigate to http://localhost:4200 — the app will reload on file changes.

---

## Folder Structure
```
src/
└── app/
    └──  fridge/           
        ├── components/          # Feature folder: components, services, models
        ├── lookup/              # Lookup service
        ├── models/              # Fridge idem and Page Dto classes
        ├── fridge.config.ts     # Standalone bootstrap config
        └── fridge.routes.ts     # Root routing
```
---

## Scripts
```
npm start       # Start dev server with proxy

npm run build   # Build for production into dist/

npm test        # Run unit tests with Karma

npm run e2e     #Launch end-to-end tests (you’ll need to install a framework)
```
---