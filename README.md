# ngx-signal-breadcrumbs

`ngx-signal-breadcrumbs` is an Angular library designed to provide dynamic and reactive breadcrumbs using Angular Signals. It's built to be flexible and easily integrated into your Angular applications, automatically adapting to your routing structure.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Installation

To install the library, run:

```bash
npm install ngx-signal-breadcrumbs
```

## Usage

To use the library, import the `NgxSignalBreadcrumbs` component into your standalone component and add the `<ngx-signal-breadcrumbs />` component to your template.

```typescript
// your-standalone-component.ts
import { Component } from '@angular/core';
import { NgxSignalBreadcrumbs } from 'ngx-signal-breadcrumbs';

@Component({
  standalone: true,
  imports: [NgxSignalBreadcrumbs],
  template: `
    <ngx-signal-breadcrumbs />
    <router-outlet />
  `,
  // ...
})
export class YourStandaloneComponent { }
```

Refer to the library's documentation for advanced usage and customization options.

## Demo

You can see a live demo of the component in action here: [https://carlesra.github.io/ngx-signal-breadcrumbs/home](https://carlesra.github.io/ngx-signal-breadcrumbs)

## Sandbox Demo Application

The `sandbox` project in this workspace serves as a demo application to showcase the features and usage of `ngx-signal-breadcrumbs`. It is a standalone Angular application that demonstrates the use of self-closing tags in its templates.

### Development server

To start a local development server for the `sandbox` application, run:

```bash
ng serve sandbox
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help`
```

### Building

To build the project (both the library and the sandbox application), run:

```bash
ng build
```

To build only the library, run `ng build ngx-signal-breadcrumbs`.
To build only the sandbox application, run `ng build sandbox`.

This will compile your project and store the build artifacts in the `dist/` directory or `docs/` for the sandbox application when configured for GitHub Pages. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner for all projects, use the following command:

```bash
ng test
```
To run tests for a specific project, e.g., `ngx-signal-breadcrumbs`, use `ng test ngx-signal-breadcrumbs`.

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.