# FactLearning

**Learn Programming. Build Real Skills.**

A full-stack online learning platform for programming education, supporting 16+ languages from Basic to Advanced levels.

## Features

- 🔐 **Authentication** — Register, Login, Logout with 1-hour session expiration
- 📚 **16 Programming Languages** — Java, Python, Go, PHP, Laravel, Vue, React, Next.js, Nuxt.js, Node.js, Rust, C#, Flutter, React Native, Flask, Django
- 🎯 **Structured Learning** — Basic → Intermediate → Advanced paths
- 📝 **Quizzes** — Multiple choice, true/false, multiple answer
- 💪 **Exercises** — Hands-on practice with progress tracking
- 🏆 **Gamification** — XP, levels, streaks, achievements
- 📜 **Certificates** — Auto-generated on course completion
- ⚙️ **Admin Dashboard** — Manage users, courses, lessons
- 🌙 **Dark/Light Theme** — Responsive design for all devices
- 🔒 **Security** — Server-side auth, password hashing, CSRF protection

## Tech Stack

| Technology   | Version |
| ------------ | ------- |
| Next.js      | 16.x    |
| React        | 19.x    |
| TypeScript   | 5.x     |
| Tailwind CSS | 4.x     |
| Prisma       | 7.x     |
| PostgreSQL   | Neon    |
| bcryptjs     | 3.x     |
| Zod          | 4.x     |

## Architecture

```
factlearn/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login, Register
│   │   ├── (platform)/      # Dashboard, Courses, Learning, etc.
│   │   ├── admin/           # Admin management
│   │   ├── api/             # API routes
│   │   └── playground/      # Code playground
│   ├── components/          # Reusable UI components
│   ├── lib/
│   │   ├── actions/         # Server actions
│   │   ├── services/        # Business logic
│   │   ├── validations/     # Zod schemas
│   │   ├── db.ts            # Database connection
│   │   ├── auth.ts          # Authentication
│   │   └── utils.ts         # Utilities
│   └── generated/prisma/    # Prisma client
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
├── middleware.ts             # Route protection
└── netlify.toml             # Deployment config
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
AUTH_SECRET="Fq8!vN3#xR7@kL2$wP9&mT5^zC6*eH4"
AUTH_URL="http://localhost:3000"
```

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. Seed the database
npm run db:seed

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test Accounts

| Role         | Email                       | Password    |
| ------------ | --------------------------- | ----------- |
| Admin        | admin@factlearning.com      | password123 |
| Instructor   | instructor@factlearning.com | password123 |
| Demo Student | demo@factlearning.com       | password123 |

## Scripts

| Script                | Description              |
| --------------------- | ------------------------ |
| `npm run dev`         | Start development server |
| `npm run build`       | Production build         |
| `npm run start`       | Start production server  |
| `npm run lint`        | Run ESLint               |
| `npm run typecheck`   | TypeScript check         |
| `npm run db:generate` | Generate Prisma client   |
| `npm run db:migrate`  | Run migrations           |
| `npm run db:push`     | Push schema to DB        |
| `npm run db:seed`     | Seed database            |
| `npm run db:studio`   | Open Prisma Studio       |

## Netlify Deployment

1. Push to GitHub
2. Import repository in Netlify
3. Configure environment variables:
   - `DATABASE_URL` — Your Neon PostgreSQL URL
   - `AUTH_SECRET` — Random secret string
4. Deploy

## Security

- Passwords hashed with bcrypt (12 rounds)
- Session tokens stored in HttpOnly cookies
- Server-side authentication on all protected routes
- CSRF protection via SameSite cookies
- SQL injection prevention via Prisma ORM
- XSS protection via Content Security Policy
- Session expiration: 1 hour (3600 seconds)

## License

MIT
