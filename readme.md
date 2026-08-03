# Draw Together

A community drawing platform built with Node.js, Express, Prisma and PostgreSQL.

Draw Together allows users to create drawings directly in the browser, share them with the community, discover artwork from other members, and interact through a simple featured membership system.

**Live Demo**

https://your-url.onrender.com

---

## Preview

_Dashboard_

(screenshot)

_Drawing Canvas_

(screenshot)

_Community Feed_

(screenshot)

---

## Features

### Drawing

- Browser-based HTML5 canvas
- Adjustable brush size
- Custom color picker
- Eraser
- Undo
- Responsive canvas
- Create and edit drawings

### Community

- Community feed
- Like drawings without refreshing the page
- Featured artists
- Featured drawing carousel
- Community rankings

### Accounts

- Authentication with Passport.js
- Profile management
- Password, email and username updates
- Featured membership
- Account deletion

### User Experience

- Responsive layout
- Light and dark themes
- Custom SVG icon system
- Mobile friendly
- Custom error pages

---

## Built With

### Backend

- Node.js
- Express
- Prisma
- PostgreSQL (Neon)

### Frontend

- EJS
- Vanilla JavaScript
- HTML5 Canvas
- CSS

### Authentication

- Passport.js
- Express Session
- Prisma Session Store

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/JavedanCode/draw-together.git
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npm run generate
```

Create a `.env`

```env
DATABASE_URL=
SECRET=
MEMBER_CODE=
NODE_ENV=development
```

Push the schema

```bash
npm run db:push
```

Start the server

```bash
npm start
```

---

## Author

**Mohammad Mahdi Javedan**

GitHub: https://github.com/JavedanCode
