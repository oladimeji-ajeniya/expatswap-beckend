# Expatswap

## Tech Used
- Docker: Linux container runtime
- docker-compose: command line tool that manages multi-container projects
- MongoDB: NoSql Database
- Mocha & Chai: Testing framework and assertion library
- Nodemon: Node process manager, used for fast development
- TypeScript: JavaScript + Types = <3
- ESLint: linting library that enforces code style
- Express.js: HTTP server library that provides a middleware-based architecture
- JWT: Json Web Tokens, used for authorization/authentication purposes
- dotenv: library that imports environment variables from a `.env` file
- Morgan & Winston: Logging middleware and logging library
- bcrypt: cryptographic library used for hashing

## Setup
This app reads its environment variables from a .env file, a .env.example is provided.
The `npm run setup` command will copy the content of the .env.example and replace the SECRET variable with a cryptographically-safe random string.
Moreover, the setup script will also rename the package name in both package.json and package-lock.json

_Note: never add the .env file to git or any other version control system. It's meant to be a local file with custom configurations relative to the machine where the app runs_

## npm run ...

This template provides a set of useful scripts that can be called using the `npm run <script>` syntax.
These scripts are:

- `coverage`: runs tests computing code coverage
- `test`: tests the application using [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai)
- `build`: runs the typescript compiler to build the application
- `start`: starts a node process that will execute this package
- `dev`: starts nodemon in watch mode, this way you can edit your source .ts files without having to rebuild and restart the application manually
- `lint`: runs eslint
- `lint:fix`: runs eslint with the --fix flag
- `setup`: runs the setup.js script described below
- `gen:secret`: regenerates the SECRET inside the .env file

## docker
