# Digits

<img src="doc/landing.png">

Digits is a contact management application built with Next.js 14 that allows users to manage their personal contacts with note-taking capabilities. The application features:

- **Multi-user support**: Each user can register and manage their own private contact list
- **Contact Management**: Full CRUD operations for contacts including name, address, image, and description
- **Note System**: Add timestamped notes to contacts to track conversations and interactions  
- **Role-based Access**: Admin users can view all contacts across users for oversight
- **Modern Technology Stack**: Built with Next.js 14, React, TypeScript, PostgreSQL, and Prisma
- **Responsive Design**: Bootstrap 5 React components provide a mobile-friendly interface
- **Form Validation**: Client-side validation using React Hook Form and Yup schemas
- **Authentication**: Secure login and registration using NextAuth.js

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```
$ createdb digits
Password:
$
```

Second, clone this repository to your local machine:

```
$ git clone https://github.com/alfredagbayani22/digits.git
$ cd digits
```

Third, install third party libraries:

```
$ npm install
```

Fourth, create a `.env` file from the `sample.env`. Set the `DATABASE_URL` variable to match your PostgreSQL database that you created in the first step. See the Prisma docs [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgresql).

```
DATABASE_URL="postgresql://username:password@localhost:5432/digits?schema=public"
```

Fifth, run the Prisma migration to set up the PostgreSQL tables:

```
$ npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "digits", schema "public" at "localhost:5432"

Your database is now in sync with your schema.
✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 50ms
```

Then seed the database with the `/config/settings.development.json` data:

```
$ npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts` ...
Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding contact: Philip Johnson
  Adding contact: Henri Casanova
  Adding contact: Kim Binsted

🌱 The seed command has been executed.
```

## Running the system

Once the libraries are installed and the database seeded, you can run the application:

```
$ npm run dev

> nextjs-application-template-1@0.1.0 dev
> next dev

▲ Next.js 14.2.33
- Local:        http://localhost:3000
- Environments: .env

✓ Ready in 1619ms
```

The application will be available at [http://localhost:3000](http://localhost:3000).

You can login using the default accounts:
- **john@foo.com** / changeme (regular user)
- **admin@foo.com** / changeme (admin user)

Alternatively, you can register a new account using the Sign Up option.

## Application Walkthrough

### Landing Page

When you first visit the application, you'll see the landing page with options to sign in or register:

<img src="doc/landing.png">

The application features a clean navigation bar with authentication options and introduces the three main features:
- **Multiple Users**: Each user has their own private contact list
- **Contact Details**: Save names, addresses, and descriptions for each contact  
- **Timestamped Notes**: Add notes to track conversations with contacts

### Sign In Page

Click on the "Login" dropdown and select "Sign in" to access your account:

<img src="doc/signin.png">

### Register Page  

New users can create accounts by selecting "Sign up" from the Login dropdown:

<img src="doc/signup.png">

### List Contacts Page

After logging in, users can view their personal contacts. Each contact displays their name, image, address, and description:

<img src="doc/list-contacts.png">

Regular users can only see contacts they have created or that have been assigned to them.

### Add Contact Page

Users can add new contacts by clicking "Add Contact" in the navigation:

<img src="doc/add-contact.png">

The form includes fields for:
- First Name
- Last Name  
- Address
- Image URL
- Description

### Edit Contact Page

Users can edit existing contacts by clicking the "Edit" button on any contact card:

<img src="doc/edit-contact.png">

### Contact Notes

Users can add notes to contacts for better organization and tracking:

<img src="doc/contact-notes.png">

### Admin Page

Admin users have access to a special admin page that shows all contacts from all users:

<img src="doc/admin.png">

This page provides oversight capabilities for administrators to manage the entire contact database.

## Key Features

- **User Authentication**: Secure login and registration system using NextAuth.js
- **Contact Management**: Full CRUD operations for personal contacts
- **Note System**: Add contextual notes to contacts  
- **Role-Based Access**: Admin users can view all contacts, regular users see only their own
- **Responsive Design**: Built with Bootstrap 5 React for mobile-friendly interface
- **Form Validation**: Client-side validation using React Hook Form and Yup
- **Database Integration**: PostgreSQL with Prisma ORM for reliable data management

## Technology Stack

- **Frontend**: Next.js 14, React, Bootstrap 5, TypeScript
- **Backend**: Next.js API routes, NextAuth.js for authentication  
- **Database**: PostgreSQL with Prisma ORM
- **Form Handling**: React Hook Form with Yup validation
- **Styling**: Bootstrap 5 React components
- **Quality Assurance**: ESLint with Next.js and Airbnb style guides

## Database Schema

The application uses PostgreSQL with three main tables:

- **User**: Stores user accounts with email, hashed password, and role (USER/ADMIN)
- **Contact**: Stores contact information including firstName, lastName, address, image, description, and owner
- **Note**: Stores timestamped notes linked to contacts with contactId, note text, owner, and createdAt timestamp

The schema is defined in `prisma/schema.prisma` and managed through Prisma migrations.

## Project Structure

```
digits/
├── config/                    # Configuration files
│   └── settings.development.json
├── doc/                      # Documentation and screenshots  
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── add/             # Add contact page
│   │   ├── admin/           # Admin dashboard  
│   │   ├── auth/            # Authentication pages
│   │   ├── edit/            # Edit contact page
│   │   └── list/            # List contacts page
│   ├── components/          # Reusable React components
│   │   ├── AddContactForm.tsx
│   │   ├── ContactCard.tsx
│   │   ├── EditContactForm.tsx
│   │   └── Navbar.tsx
│   └── lib/                 # Utility functions and configurations
│       ├── dbActions.ts
│       ├── prisma.ts
│       └── validationSchemas.ts
└── tests/                   # Playwright end-to-end tests
```

## Quality Assurance

The application includes ESLint configuration for code quality:

```
$ npm run lint

> nextjs-application-template-1@0.1.0 lint  
> next lint

✔ No ESLint warnings or errors
```

## Development Notes

- The application uses NextAuth.js for secure authentication with session management
- All forms include client-side validation using React Hook Form and Yup schemas
- The responsive design adapts to mobile devices using Bootstrap 5 breakpoints
- Database operations are handled through Prisma ORM with type safety
- Page access is controlled through role-based authentication middleware
