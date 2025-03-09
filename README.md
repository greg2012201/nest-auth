## NestJS Authentication Project

An example authentication system built with NestJS framework, featuring authentication.

## Features

- User registration and authentication
- User management (CRUD operations)

## Project setup

```bash
$ npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
JWT_SECRET=<your-jwt-secret>
```

## License

This project is [MIT licensed](LICENSE.md).
