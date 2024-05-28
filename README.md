# JS NOTE REST API with Prisma

this is an app for managing note

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Prisma

### Installing

1. Clone the repository
```bash
git clone https://github.com/MkDierz/js-rest-api-prisma.git
```

2. create env
```bash
DATABASE_URL="postgresql://postgres:username@password:5432/note-api?schema=public"
TOKEN_SECRET=""
TOKEN_AGE=""
REFRESH_TOKEN_SECRET=""
REFRESH_TOKEN_AGE=""
```

3. Install dependencies and setup
```bash
npm install
npx prisma migrate deploy 
or 
npx prisma db push
```

4. Run the application
```bash
npm start
```

For development, you can use:
```bash
npm run dev
```