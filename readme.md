# Draw Together

A community drawing platform built with Node.js, Express, Prisma and PostgreSQL.

Draw Together allows users to create drawings directly in the browser, share them with the community, discover artwork from other members, and interact through a simple featured membership system.

**Live Demo**

https://draw-together-d0j5.onrender.com/

---

## Preview

_Dashboard_

<img width="1547" height="817" alt="image" src="https://github.com/user-attachments/assets/1c14bf22-da4c-423b-b804-8eac17abfeed" />

_Featured Drawings_

<img width="1425" height="843" alt="Screenshot 2026-08-03 160912" src="https://github.com/user-attachments/assets/ca99e0c4-03b9-4c02-883a-0ee009cd6214" />

_Drawing Canvas_

<img width="1521" height="877" alt="image" src="https://github.com/user-attachments/assets/42f0db03-f967-44cf-8943-5eabfbe2dbf9" />

_Community Feed_

<img width="1725" height="717" alt="Screenshot 2026-08-03 160925" src="https://github.com/user-attachments/assets/2370d7e4-242b-4f3a-aeda-224aaaa25864" />

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

**JavedanCode**

GitHub: https://github.com/JavedanCode
