# Node Monolith

A production-ready Express.js modular monolith boilerplate CLI.

Generate scalable backend architecture with:

- TypeScript or JavaScript support
- Modular folder structure
- Global error handling
- Async handler
- API Error utility
- CORS support
- Morgan logging
- Environment variables
- Centralized routes
- Production-ready structure

---

# Installation

Run directly using npm:

```bash
npm create node-monolith
```

OR

```bash
npx node-monolith
```

---

# Features

✅ TypeScript support  
✅ JavaScript support  
✅ Modular monolith architecture  
✅ Global error middleware  
✅ Async handler utility  
✅ API Error utility  
✅ Environment setup  
✅ CORS support  
✅ Morgan logging  
✅ Central route management  
✅ Professional scalable structure

---

# CLI Questions

The CLI asks:

- Project name
- TypeScript or JavaScript
- Enable CORS
- Enable Morgan logger
- Enable dotenv
- Enable Docker

---

# Generated Folder Structure

```txt
src/
├── app.ts
├── server.ts
├── routes/
│   └── index.ts
├── middlewares/
│   ├── error.middleware.ts
│   └── asyncHandler.ts
├── utils/
│   └── apiError.ts
├── modules/
│   └── auth/
│       ├── auth.controller.ts
│       ├── auth.route.ts
│       └── auth.service.ts
```

(JavaScript projects generate `.js` files instead.)

---

# Example Usage

```bash
npm create node-monolith my-api
```

OR inside current folder:

```bash
npm create node-monolith .
```

---

# Generated API Structure

```txt
app.ts
   ↓
routes/index.ts
   ↓
modules/*
```

Routes are automatically mounted on:

```txt
/api/v1
```

Example:

```txt
/api/v1/auth/login
```

---

# Included Utilities

## ApiError

```ts
throw new ApiError(
  "Unauthorized",
  401
);
```

---

## Async Handler

```ts
asyncHandler(async (req, res) => {
  // async logic
});
```

---

# Development

```bash
npm install
npm run dev
```

---

# Publish Your Own Version

```bash
npm version patch
npm run build
npm publish
```

---

# License

MIT