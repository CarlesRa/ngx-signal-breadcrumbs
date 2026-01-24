# NGX Signal Breadcrumbs

A modern, reactive breadcrumb navigation component for Angular 19+ using Signals.

[![npm version](https://badge.fury.io/js/ngx-signal-breadcrumbs.svg)](https://www.npmjs.com/package/ngx-signal-breadcrumbs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Reactive with Signals** - Automatically updates on route changes
- 🎨 **Customizable** - CSS variables for easy theming
- ♿ **Accessible** - ARIA labels and semantic HTML
- 📦 **Lightweight** - Minimal dependencies
- 🔧 **TypeScript** - Full type safety
- ✨ **Standalone** - No module imports needed

## Demo

You can see a live demo of the component in action here: [https://carlesra.github.io/ngx-signal-breadcrumbs](https://carlesra.github.io/ngx-signal-breadcrumbs)

### Sandbox Demo Application

The `sandbox` project in this workspace serves as a demo application to showcase the features and usage of `ngx-signal-breadcrumbs`. You can explore the source code to see real-world implementation examples.

## Installation
```bash
npm install ngx-signal-breadcrumbs
```

## Quick Start

### 1. Configure your routes

Add breadcrumb data to your route configuration:
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    data: { breadcrumb: 'Products' },
    children: [
      {
        path: ':id',
        data: {
          breadcrumb: (route) => `Product ${route.params['id']}`
        }
      }
    ]
  }
];
```

### 2. Add the component to your template
```typescript
import { Component } from '@angular/core';
import { SignalBreadcrumbsComponent } from 'ngx-signal-breadcrumbs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignalBreadcrumbsComponent],
  template: `
    <ngx-signal-breadcrumbs />
  `
})
export class AppComponent {}
```

That's it! 🎉

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `showHome` | `boolean` | `true` | Show home icon as first item |
| `separator` | `IconName` | `'chevron-right'` | Icon separator between items |
| `linkColor` | `string` | `'#3b82f6'` | Color for clickable links |
| `linkHoverColor` | `string` | `'#93c5fd'` | Color for links on hover |
| `separatorColor` | `string` | `'#94a3b8'` | Color for separators |

### Route Data Configuration
```typescript
interface BreadcrumbData {
  breadcrumb: string | ((route: ActivatedRouteSnapshot) => string) | null;
}
```

## Examples

### Static breadcrumbs
```typescript
{
  path: 'about',
  data: { breadcrumb: 'About Us' }
}
```

### Dynamic breadcrumbs
```typescript
{
  path: 'user/:id',
  data: {
    breadcrumb: (route: ActivatedRouteSnapshot) => {
      const userId = route.params['id'];
      return `User ${userId}`;
    }
  }
}
```

### Skip breadcrumbs

Set `breadcrumb: null` to exclude a route from the breadcrumb trail:
```typescript
{
  path: '',
  component: ProductListComponent,
  data: { breadcrumb: null }
}
```

### Custom styling
```typescript
<ngx-signal-breadcrumbs
  [showHome]="true"
  [separator]="'chevron-right'"
  [linkColor]="'#3b82f6'"
  [linkHoverColor]="'#93c5fd'"
  [separatorColor]="'#94a3b8'"
/>
```

### CSS Variables

Override these CSS variables for advanced styling:
```css
ngx-signal-breadcrumbs {
  --breadcrumb-link-color: #374151;
  --breadcrumb-link-hover-color: #93c5fd;
  --breadcrumb-separator-color: #9ca3af;
  --breadcrumb-current-color: #6b7280;
}
```

## Advanced Usage

### Query Parameters

Query parameters are automatically preserved in breadcrumb links:
```typescript
// URL: /products/123?filter=active
// Breadcrumb link will preserve: /products?filter=active
```

### Available Separator Icons

The component supports these separator icons:
- `chevron-right` (default)
- `chevron-left`
- `slash-forward`
- `greater-than`

## Requirements

- Angular 19+
- TypeScript 5.0+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Juan Carlos Ramos Moll](https://github.com/CarlesRa)

## Links

- [GitHub Repository](https://github.com/CarlesRa/ngx-signal-breadcrumbs)
- [Live Demo](https://carlesra.github.io/ngx-signal-breadcrumbs)
- [NPM Package](https://www.npmjs.com/package/ngx-signal-breadcrumbs)
- [Report Issues](https://github.com/CarlesRa/ngx-signal-breadcrumbs/issues)