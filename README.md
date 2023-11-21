# Table of Contents
# Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Getting Started](#getting-started)
    -   [CI/CD](#cicd)
    -   [Cypress](#cypress)
        -   [Useful Commands](#useful-commands)
    -   [Prisma](#prisma)
        -   [Initial setup](#initial-setup)
        -   [Useful Commands](#useful-commands-1)
        -   [Using data in the application](#using-data-in-the-application)
        -   [TODOs](#todos)
-   [Learn More](#learn-more)
-   [Deploy on Vercel](#deploy-on-vercel)

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

## CI/CD

The CI/CD job rules are as follows:

-   Build job
    -   Run on every push
-   e2e test job
    -   Run on every push
    -   If it's a merge, then it will record the test run and upload it to the cloud

## Cypress

To start using the Cypress framework, run:

```bash
npm run cy:open
```

### Useful Commands

To start running all the end-to-end tests, you can use the following command:

```bash
npm run e2e
```

## Prisma

Although Prisma's DB protocol says `mysql`, it's supported by MariaDB.

### Initial setup

Make a copy of `.env.template` and rename it to `.env`. This file will be used by `/prisma/schema.prisma` to get the Database URL.

```toml
# .env.template
DATABASE_URL="mysql://root:admin@localhost:3306/group6"
```

As we're using MariaDB, some of us will be using the borrowed laptops. The default username and password will be `root` and `comsc` respectively. This will look like so:

```toml
# .env
DATABASE_URL="mysql://root:comsc@localhost:3306/group6"
```

You want to also create a `group6` schema in a locally running MariaDB instance. This can be renamed to anything else, but you should make sure to reflect these changes in the `.env` template at the end of the `DATABASE_URL`.

This can be achieved with:

```sql
CREATE SCHEMA group6;
```

### API documentation
#### Admin Endpoints

| Endpoint | Description | Method | Status Code |
|---|---|---|---|
| `/admin/login` | Return login result | GET | 200 (OK) or 401 (Unauthorized) |
| `/admin/login` | Login to the admin panel | POST | 200 (OK) or 401 (Unauthorized) |
| `/admin/logout` | Logout from the admin panel | GET | 200 (OK) |

#### Breakdown Endpoints

| Endpoint | Description | Method | Status Code |
|---|---|---|---|
| `/breakdown/heat/dwelling` | Get/Post heat breakdown by dwelling type | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/tech` | Get/Post heat breakdown by heating technology | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/total` | Get/Post total heat demand | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/dwelling` | Get/Post energy breakdown by dwelling types | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/tech` | Get/Post energy breakdown by technology | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/total` | Get/Post total energy demand | GET/POST | 200 (OK) or 404 (Not Found) |

#### Half-Hourly Endpoints

| Endpoint | Description | Method | Status Code |
|---|---|---|---|
| `/half-hourly/energy` | Get/Post half-hourly energy data | GET/POST | 200 (OK) or 404 (Not Found) |
| `/half-hourly/gas` | Get/Post half-hourly gas data | GET/POST | 200 (OK) or 404 (Not Found) |

#### Heat Demand Endpoint

| Endpoint | Description | Method | Status Code |
|---|---|---|---|
| `/heat-demand` | Get/Post heat demand data | GET/POST | 200 (OK) or 404 (Not Found) |

### API documentation

#### Admin Endpoints

| Endpoint        | Description                 | Method | Status Code                    |
| --------------- | --------------------------- | ------ | ------------------------------ |
| `/admin/login`  | Return login result         | GET    | 200 (OK) or 401 (Unauthorized) |
| `/admin/login`  | Login to the admin panel    | POST   | 200 (OK) or 401 (Unauthorized) |
| `/admin/logout` | Logout from the admin panel | GET    | 200 (OK)                       |

#### Breakdown Endpoints

| Endpoint                     | Description                                   | Method   | Status Code                 |
| ---------------------------- | --------------------------------------------- | -------- | --------------------------- |
| `/breakdown/heat/dwelling`   | Get/Post heat breakdown by dwelling type      | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/tech`       | Get/Post heat breakdown by heating technology | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/total`      | Get/Post total heat demand                    | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/dwelling` | Get/Post energy breakdown by dwelling types   | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/tech`     | Get/Post energy breakdown by technology       | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/total`    | Get/Post total energy demand                  | GET/POST | 200 (OK) or 404 (Not Found) |

#### Half-Hourly Endpoints

| Endpoint              | Description                      | Method   | Status Code                 |
| --------------------- | -------------------------------- | -------- | --------------------------- |
| `/half-hourly/energy` | Get/Post half-hourly energy data | GET/POST | 200 (OK) or 404 (Not Found) |
| `/half-hourly/gas`    | Get/Post half-hourly gas data    | GET/POST | 200 (OK) or 404 (Not Found) |

#### Heat Demand Endpoint

| Endpoint       | Description               | Method   | Status Code                 |
| -------------- | ------------------------- | -------- | --------------------------- |
| `/heat-demand` | Get/Post heat demand data | GET/POST | 200 (OK) or 404 (Not Found) |

### Useful Commands

During rapid prototyping in development ([ONLY in development](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push)), models within the database may change, and new models may be introduced. This requires the schema to be updated in order for the changes to take effect on the application.

To update the application to use the current `/prisma/schema.prisma`, run:

```bash
npm run db:sync
```

> ❗ IMPORTANT NOTE ❗  
> If you have an instance of Prisma studio currently running, close it before running this command, and then you can `npm run db:see` again to see the new changes

Prisma comes with a [database inspection tool](https://www.prisma.io/studio) which runs locally in your browser. By default, it will run on port 5555, but this will get incrementally larger if multiple instances are running simultaneously.

To get this tool up and running, execute the following command:

```bash
npm run db:see
```

> ❗ IMPORTANT NOTE ❗  
> Make sure to execute `npm run db:sync` before attempting to use Prisma studio **for the first time**

### Using data in the application

To interact with the Prisma Client, see [this guide](https://www.prisma.io/docs/concepts/components/prisma-client#3-importing-prisma-client).

### TODOs

-   [ ] Look into [DB Migrations](https://www.prisma.io/migrate) in prod

<<<<<<< HEAD
=======
# Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> origin/release-2
