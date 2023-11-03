Table of Contents
=================

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Cypress](#cypress)
  - [Prisma](#prisma)
    - [Initial setup](#initial-setup)
    - [Useful Commands](#useful-commands)
    - [Using data in the application](#using-data-in-the-application)
    - [TODOs](#todos)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

# Getting Started

To install all dependencies, run:

```bash
npm i
```

To see the application in its current state, run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Cypress

To start using the Cypress framework, run:

```bash
npm run cy:open
```

## Prisma

Although Prisma's DB protocol says `mysql`, it's supported by MariaDB.

### Initial setup
Make a copy of `.env.template` and rename it to `.env`.  This file will be used by `/prisma/schema.prisma` to get the Database URL.

```toml
# .env.template
DATABASE_URL="mysql://root:admin@localhost:3306/group6"
```

As we're using MariaDB, some of us will be using the borrowed laptops.  The default username and password will be `root` and `comsc` respectively.  This will look like so:
```toml
# .env
DATABASE_URL="mysql://root:comsc@localhost:3306/group6"
```

You want to also create a `group6` schema in a locally running MariaDB instance.  This can be renamed to anything else, but you should make sure to reflect these changes in the `.env` template at the end of the `DATABASE_URL`.

This can be achieved with:
```sql
CREATE SCHEMA group6;
```

### Useful Commands
During rapid prototyping in development ([ONLY in development](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push)), models within the database may change, and new models may be introduced.  This requires the schema to be updated in order for the changes to take effect on the application.

To update the application to use the current `/prisma/schema.prisma`, run:
```bash
npm run db:sync
```

> ❗ IMPORTANT NOTE ❗  
> If you have an instance of Prisma studio currently running, close it before running this command, and then you can `npm run db:see` again to see the new changes 

Prisma comes with a [database inspection tool](https://www.prisma.io/studio) which runs locally in your browser.  By default, it will run on port 5555, but this will get incrementally larger if multiple instances are running simultaneously.

To get this tool up and running, execute the following command:
```bash
npm run db:see
```

> ❗ IMPORTANT NOTE ❗  
> Make sure to execute `npm run db:sync` before attempting to use Prisma studio **for the first time**

### Using data in the application
To interact with the Prisma Client, see [this guide](https://www.prisma.io/docs/concepts/components/prisma-client#3-importing-prisma-client).

### TODOs
- [ ] Look into [DB Migrations](https://www.prisma.io/migrate) in prod

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
