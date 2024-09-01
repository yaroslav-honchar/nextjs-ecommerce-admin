# Admin Panel For E-Commerce Stores

This is a fullstack application designed to build an admin panel with login functionality and database integration. The
application is built using modern web technologies and libraries to ensure a robust and scalable solution.

## [Demo](https://ecommerce-admin-pi-sage.vercel.app)

Here is the demo of the project. You can login with the following credentials:

**Email**: `yonilav532@amxyy.com`

**Password**: `JFrQ7dkMUwnAX6q`

## Description

The Admin Panel application provides a comprehensive interface for managing various aspects of a store, including
billboards. It features a user-friendly UI, secure authentication, and efficient data management using a database.

## Features

- **Fullstack Application**: Combines frontend and backend technologies for a seamless experience.
- **Authentication**: Secure login functionality using `@clerk/nextjs`.
- **Database Integration**: Utilizes `@prisma/client` for database operations.
- **Admin Panel**: Manage store billboards and other entities through an intuitive interface.
- **Responsive Design**: Built with modern UI libraries for a responsive and accessible design.

## Configuration

First, create a `.env` file in the root directory of the project with the following environment variables:

- The base URL for the API routes. By default, it is set to `http://localhost:3000/api`. You can change it based on your
  deployment environment.
    - `NEXT_PUBLIC_API_URL`: The base URL for the API routes. By default, it is set to `http://localhost:3000/api`. You
      can change it based on your deployment environment.

- Prisma environment variables for database connection. You can configure these based on your database setup.
    - `DATABASE_URL`: The connection URL for the database. I
      used [Mongo Atlas](https://account.mongodb.com/account/login?signedOut=true), you can configure your own database.
- Authorization key for Clerk. You can read more about it [here](https://docs.clerk.dev/setup/authorization).
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
    - `CLERK_SECRET_KEY`
    - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
    - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
    - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
    - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- Cloudinary environment variables for image upload. You can configure these based on your cloudinary setup. You can
  read more about it [here](https://next.cloudinary.dev/installation).
    - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
    - `NEXT_PUBLIC_CLOUDINARY_API_KEY`

## Getting Started

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Run Generation**: Run `npx prisma generate` to run the migrations and create the database schema.
3. **Start Development Server**: Run `npm run dev` to start the development server.
4. **Build for Production**: Run `npm run build` to build the application for production.
5. **Start Production Server**: Run `npm start` to start the production server.

## Scripts

```npm run dev``` Starts the development server.

```npm run build``` Builds the application for production.

```npm run start``` Starts the production server.

```npm run lint``` Runs ESLint to check for linting issues and automatically fixes them.

```npm run format``` Formats the code using Prettier.

```npm run prepare``` Sets up Husky Git hooks.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Lucide React**: Icon library for React.
- **Schadcn ui**: Icon library for React.

### Backend

- **Prisma**: An ORM (Object-Relational Mapping) tool for database management.
- **Next.js API Routes**: For handling server-side logic and API endpoints.

### UI Library

- **Radix UI**: A set of accessible and customizable UI components.
- **React Hook Form**: For managing form state and validation.

### Database Client

- **Prisma Client**: Used for database operations, providing type-safe database queries.

### Development Tools

- **Husky**: Used for managing Git hooks to ensure code quality.
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript and TypeScript code.
- **Prettier**: A code formatter to ensure consistent code style.

## License

This project is licensed under the MIT License.
