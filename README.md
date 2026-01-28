# RealEstate Client (React + Vite)

Frontend (web client) for the **RealEstate** system. This project provides the UI for end-users to browse real estate listings, view property details, and interact with the backend API.

> Backend repo: `RealEstate-Server` (API)  
> This client is built with **React** and **Vite** (fast dev server + production build).

---

## Tech Stack

- **React** (UI)
- **Vite** (dev server/build tool)
- **JavaScript** (as used in this repo)
- **ESLint** (code quality)

> If your project uses additional libraries (e.g., Axios, React Router, Redux/Zustand, Tailwind, AntD/MUI), add them in this section after checking `package.json`.

---

## Prerequisites

- **Node.js**: v18+ recommended (v16+ usually works for Vite)
- **npm** (or yarn/pnpm)

Check versions:
```bash
node -v
npm -v
```

---

## Setup & Run Locally

### 1) Clone
```bash
git clone https://github.com/MCK564/RealEstate-Client.git
cd RealEstate-Client
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure environment (important)
Vite reads environment variables from `.env` files (e.g., `.env`, `.env.local`).  
Create a `.env.local` file at project root:

```env
# Example (adjust to your backend)
VITE_API_BASE_URL=http://localhost:8080
```

**Notes**
- In Vite, **all exposed env vars must start with `VITE_`**.
- If your backend uses WebSocket, file upload, OAuth, etc., you may need more variables.

Suggested extra env keys (only keep the ones your code actually uses):
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_APP_NAME=RealEstate
```

### 4) Start dev server
```bash
npm run dev
```

Then open the URL printed in terminal (usually):
- `http://localhost:5173`

---

## Available Scripts

Typical Vite scripts (confirm in `package.json`):

```bash
npm run dev       # start dev server
npm run build     # build for production
npm run preview   # preview production build locally
npm run lint      # lint (if configured)
```

---

## Project Structure (typical)

Your repo contains these top-level folders (as shown on GitHub): citeturn1view0

```
RealEstate-Client/
  public/          # static assets
  src/             # React source code
  index.html
  vite.config.js
  package.json
```

Common `src/` structure (adjust to match your code):
```
src/
  assets/
  components/
  pages/
  services/        # API calls (axios/fetch)
  routes/
  hooks/
  utils/
  main.jsx
  App.jsx
```

---

## Connect to Backend (RealEstate-Server)

1. Start the backend server first.
2. Make sure CORS is enabled on the backend for the client origin:
   - e.g., `http://localhost:5173` (Vite dev)
3. Set `VITE_API_BASE_URL` to your backend address.

Example API call pattern (illustrative):
```js
fetch(`${import.meta.env.VITE_API_BASE_URL}/api/...`)
```

---

## Build & Deployment

### Build
```bash
npm run build
```
Output will be in:
- `dist/`

### Deploy options
- **Vercel**
- **Netlify**
- **GitHub Pages** (with Vite config)
- Any static hosting (Nginx, S3 + CloudFront, etc.)

**Important**: set the same environment variables on your hosting provider (e.g., `VITE_API_BASE_URL`).

---

## Troubleshooting

### Blank page / API errors
- Confirm backend is running.
- Check `VITE_API_BASE_URL`.
- Open browser DevTools → Network tab to see failing requests.
- Ensure backend CORS allows the client origin.

### Port conflicts
- Vite default is `5173`. Change by:
```bash
npm run dev -- --port 3000
```

### Node version issues
- Use Node 18+ to reduce toolchain issues.

---

## Contributing

1. Fork the repo
2. Create a branch: `feature/your-feature`
3. Commit and open a Pull Request

---

## License

Add a license if you plan to open-source this project.
