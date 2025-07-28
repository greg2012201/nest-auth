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

# Google OAuth Configuration
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Dropbox OAuth Configuration
DROPBOX_CLIENT_ID=<your-dropbox-app-key>
DROPBOX_CLIENT_SECRET=<your-dropbox-app-secret>
DROPBOX_CALLBACK_URL=http://localhost:3000/auth/dropbox/callback

# JWT Configuration
JWT_SECRET=<your-jwt-secret>
JWT_STATE_SECRET=<your-jwt-state-secret>
```


## License

This project is [MIT licensed](LICENSE.md).
