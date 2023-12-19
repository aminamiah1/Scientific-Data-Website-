# Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Getting Started](#getting-started)
    -   [CI/CD](#cicd)
    -   [Cypress](#cypress)
        -   [Useful Commands](#useful-commands)
        -   [Custom Commands](#custom-commands)
    -   [Prisma](#prisma)
        -   [Initial setup](#initial-setup)
        -   [Useful Commands](#useful-commands-1)
        -   [Using data in the application](#using-data-in-the-application)
        -   [TODOs](#todos)
    -   [Backend](#backend)
    -   [Admin Log In Steps](#admin-log-in-steps)
    -   [API documentation](#api-documentation)
        -   [Map endpoints](#map-endpoints)
        -   [Admin Endpoints](#admin-endpoints)
        -   [Breakdown Endpoints](#breakdown-endpoints)
        -   [Half-Hourly Endpoints](#half-hourly-endpoints)
        -   [Heat Demand Endpoint](#heat-demand-endpoint)

# Getting Started

To install all dependencies, run:

```bash
npm i
```

If this is your first time cloning the application, or you haven't yet populated the database with some research and spatial data, see [this section](#initial-setup) to get started on preparing your database.

To see the application in its current state, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Admin Sign In
1. Once you click the sign in button, you will be faced with an email input
2. Input, your school, work email (Nathan, if you're seeing this. your email works :) )
3. Then, check your email. click the link and you're in, enjoy :)

## CI/CD

The CI/CD job rules are as follows:

-   build job
    -   Run on every push
-   cypress test job
    -   Run on every push
    -   If it's a merge, then it will record the test run and upload it to the cloud

## Cypress

To start using the Cypress GUI, run:

```bash
npm run cy:open
```

### Useful Commands

Currently, three different test commands exist;

```bash
npm run test:api
npm run test:component
npm run test:e2e
```

And to run all three at once, you can execute:

```bash
npm run test:all
```

If you plan to add any different paths for whatever reason in the `cypress` folder, be sure to update the `.gitlab-ci.yml` and `npm run test:all` script in `package.json` as well with the updated tests so that we know all tests are running.

### Custom Commands

To select an HTML Element for testing specifically for Cypress, use `data-cy`.

Example:

```tsx
<h2 data-cy="main-page-title">Title</h2>
```

Then in the Cypress test file, to select the Element, use:

```tsx
cy.getByTestId("main-page-title"). ... ;
```

## Prisma

Although Prisma's DB protocol says `mysql`, it's supported by MariaDB, as [seen here](https://www.prisma.io/stack).

An important thing to note is that we're attempting to follow a singleton design pattern. If you require access to the database, you can access the Prisma Client via:

```ts
import { db } from "@/app/utils/data";

// ... do stuff
// e.g. db.$disconnect();
```

This has been encouraged through [best practises in a dev environment](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices) and [working with multiple client instances](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client).

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

You want to populate all data before running the application for the first time. This process can take a while (up to 15 minutes).

You can run the following command to start this population process:

```bash
npm run db:populate
```

If you wish to start over, you can start anew with:

```sql
DROP SCHEMA group6;
CREATE SCHEMA group6;
```

And then you can attempt to run the `npm run db:populate` command again. If you run into any issues with this population process, please [open a new issue](https://git.cardiff.ac.uk/c1833364/y3-group-6-team-project/-/issues/new).

### Backend
Run `npx tsx .\src\app\utils\main.ts` to start the NodeJS server. The PORT number is 4001

### API documentation

#### Admin Endpoints

| Endpoint        | Description                 | Method | Status Code                    |
| --------------- | --------------------------- | ------ | ------------------------------ |
| `/admin/login`  | Return login result         | GET    | 200 (OK) or 401 (Unauthorized) |
| `/admin/login`  | Login to the admin panel    | POST   | 200 (OK) or 401 (Unauthorized) |
| `/admin/logout` | Logout from the admin panel | GET    | 200 (OK)                       |

#### Admin Log In Steps

KEY NOTES: 
1. Make sure DATABASE_URL is correct.
2. Make sure .env file is correct.
3. Make sure to execute 'npm run db:sync' before attempting to use Prisma studio for the first time.
4. Make sure you save your database after using prisma studio.
5. for any errors: https://next-auth.js.org/errors 

STEPS: 
1. Add values into .env file
2. Run 'npx prisma studio' into terminal to add your email - just id, name and email.
3. Run npm run dev then go to endpoint.
4. input email, check inbox for the magic link, click and you're in :)

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
-   [ ] Load _all_ CSV files automatically from the research folder, not just a select few
    -   This is required in order to support future dataset uploads.

## Backend

Run `npx tsx .\src\app\utils\main.ts` to start the NodeJS server. The PORT number is 4001

## Admin Log In Steps

KEY NOTES:

1. Make sure DATABASE_URL is correct.
2. Make sure .env file is correct.
3. Make sure to execute 'npm run db:sync' before attempting to use Prisma studio for the first time.
4. Make sure you save your database after using prisma studio.
5. for any errors: https://next-auth.js.org/errors

STEPS:

1. Add values into .env file
2. Run 'npx prisma studio' into terminal to add your email - just id, name and email.
3. Run npm run dev then go to endpoint.
4. input email, check inbox for the magic link, click and you're in :)

## API documentation

### Map endpoints

| Endpoint   | Description         | Method | Status Code |
| ---------- | ------------------- | ------ | ----------- |
| `/api/svg` | Return map SVG data | GET    | 200 (OK)    |

### Admin Endpoints

| Endpoint        | Description                 | Method | Status Code                    |
| --------------- | --------------------------- | ------ | ------------------------------ |
| `/admin/login`  | Return login result         | GET    | 200 (OK) or 401 (Unauthorized) |
| `/admin/login`  | Login to the admin panel    | POST   | 200 (OK) or 401 (Unauthorized) |
| `/admin/logout` | Logout from the admin panel | GET    | 200 (OK)                       |

### Breakdown Endpoints

| Endpoint                     | Description                                   | Method   | Status Code                 |
| ---------------------------- | --------------------------------------------- | -------- | --------------------------- |
| `/breakdown/heat/dwelling`   | Get/Post heat breakdown by dwelling type      | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/tech`       | Get/Post heat breakdown by heating technology | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/heat/total`      | Get/Post total heat demand                    | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/dwelling` | Get/Post energy breakdown by dwelling types   | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/tech`     | Get/Post energy breakdown by technology       | GET/POST | 200 (OK) or 404 (Not Found) |
| `/breakdown/energy/total`    | Get/Post total energy demand                  | GET/POST | 200 (OK) or 404 (Not Found) |

### Half-Hourly Endpoints

| Endpoint              | Description                      | Method   | Status Code                 |
| --------------------- | -------------------------------- | -------- | --------------------------- |
| `/half-hourly/energy` | Get/Post half-hourly energy data | GET/POST | 200 (OK) or 404 (Not Found) |
| `/half-hourly/gas`    | Get/Post half-hourly gas data    | GET/POST | 200 (OK) or 404 (Not Found) |

### Heat Demand Endpoint

| Endpoint       | Description               | Method   | Status Code                 |
| -------------- | ------------------------- | -------- | --------------------------- |
| `/heat-demand` | Get/Post heat demand data | GET/POST | 200 (OK) or 404 (Not Found) |
