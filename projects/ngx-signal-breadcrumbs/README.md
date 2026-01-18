# NGX Signal Breadcrumbs

A modern, reactive breadcrumb navigation component for Angular 19+ using Signals.

## Features

- 🚀 **Reactive with Signals** - Automatically updates on route changes
- 🎨 **Customizable** - CSS variables for easy theming
- ♿ **Accessible** - ARIA labels and semantic HTML
- 📦 **Lightweight** - Minimal dependencies
- 🔧 **TypeScript** - Full type safety
- ✨ **Standalone** - No module imports needed

## Installation
```bash
npm install ngx-signal-breadcrumbs
```

## Usage

### 1. Configure your routes

Add breadcrumb data to your route configuration:
```typescript
import { Routes } from '@angular/router';
import { BreadcrumbLabel } from 'ngx-signal-breadcrumbs';

export const routes: Routes = [
  {
    path: 'products',
    data: { breadcrumb: 'Products' }, // Static breadcrumb
    children: [
      {
        path: ':id',
        data: {
          // Dynamic breadcrumb
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

## Customization

### Skip breadcrumbs

Set `breadcrumb: null` to skip a route in the breadcrumb trail:
```typescript
{
  path: '',
  component: ProductListComponent,
  data: { breadcrumb: null } // Won't appear in breadcrumbs
}
```

### Component Inputs
```typescript
<ngx-signal-breadcrumbs
  [showHome]="true"
  [separator]="'chevron-right'"
  [linkColor]="'#3b82f6'"
  [separatorColor]="'#94a3b8'"
/>
```

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `showHome` | `boolean` | `true` | Show home icon as first item |
| `separator` | `string` | `'chevron-right'` | Icon separator between items |
| `linkColor` | `string` | `'#374151'` | Color for clickable links |
| `separatorColor` | `string` | `'#9ca3af'` | Color for separators |

### CSS Variables

Override these CSS variables for custom styling:
```css
ngx-signal-breadcrumbs {
  --breadcrumb-link-color: #1e40af;
  --breadcrumb-separator-color: #d1d5db;
  --breadcrumb-current-color: #6b7280;
  --breadcrumb-hover-color: #1e3a8a;
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

### With query parameters
Query parameters are automatically preserved in breadcrumb links.

## License

MIT

## Author

Juan Carlos Ramos Moll (CarlesRa)