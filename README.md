# Getting started with Angular Booking app

An Angular booking app, using **NgRX** framework for state management and RtK-Q for request and caching. The
json-server provides fake
REST API for the backend.

### Tech stack

- **NgRX** framework (store, entity, effects)
- **Redux toolkit query** framework
- json-server
- Tailwindcss
- Angular material
- ng-select
- Angular reactive forms
- Angular router
- date-fns
- country-state-city
- rxjs
- zod for form validation
- **Nx.dev**
- **Angular**

**This app requires Node 14 or higher to work.**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version
15.2.0., [Nx](https://nx.dev/packages/angular) version
15.8.6 and [NgRx framework](https://ngrx.io/docs) for state management.

The booking system mirrors its cousin built using Redux ToolKit/ RTK Query found
here, [Redux booking app](https://github.com/deaspo/crude-app)

## Prerequisite before starting the app

### json-server for full fake REST API install

Install the server: `npm i -g json-server`

Start the json-server on port 4000: `json-server --watch data/db.json --port 4000`

## Development server

Run `npx nx run NGBookingSystem:server` for a dev server. Navigate to `http://localhost:4200/`. The application will
automatically reload if you change any of the source files.

Alternatively use the Nx console tool in VSCode to serve or build the app

## Build

Run `npx nx run NgBookingSystem:build` to build the project. The build artifacts will be stored in the `dist/`
directory.

