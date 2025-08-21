# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## NASA Dashboard Frontend

A React-based frontend application for visualizing near-Earth objects (NEOs) from NASA's API.

### Technology Stack

- **React 18+** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling with glassmorphism effects
- **TanStack Query** for server state management
- **Headless UI** for accessible components
- **Heroicons** for icons
- **Date-fns** for date manipulation

### Features

- **Interactive Visualization**: Space-themed 3D visualization of near-Earth objects
- **Date Selection**: Pick any date to view NEOs for that day
- **Sorting Options**: Sort objects by closest approach distance, size, or hazard status
- **Glassmorphism UI**: Modern, space-themed design with transparency effects
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Data**: Fetches live data from NASA's NeoWs API via our backend

### Development

#### Prerequisites

- Node.js 18+ and npm

#### Installation

```bash
npm install
```

#### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

#### Building for Production

```bash
npm run build
```

#### Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

#### Linting

```bash
npm run lint
```

## Project Structure

```md
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (buttons, inputs, etc.)
├── features/           # Feature-based modules
│   └── neo/           # Near-Earth Object related components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and API client
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── __tests__/         # Test files
```

### Environment Variables

Create a `.env.local` file in the root of the frontend directory:

```env
VITE_API_URL=http://localhost:3001
```

### API Integration

The frontend communicates with our Fastify backend server which provides:

- `/api/v1/objects?date=YYYY-MM-DD` - Fetch NEOs for a specific date

The API responses are cached and transformed by the backend for optimal performance.

### Component Architecture

#### Core Components

- **DashboardPage**: Main page component orchestrating the entire dashboard
- **ObjectList**: Displays a list of NEOs with sorting and filtering
- **ObjectVisualization**: 3D space visualization of objects
- **ObjectListItem**: Individual NEO item with hover effects
- **DatePicker**: Date selection component

#### Custom Hooks

- **useNearEarthObjects**: TanStack Query hook for fetching NEO data
- Integrates caching, error handling, and loading states

### Styling

The application uses Tailwind CSS with a custom space theme:

- **Colors**: Deep space blues, cosmic purples, and bright accent colors
- **Effects**: Glassmorphism with backdrop blur and transparency
- **Typography**: Clean, modern fonts optimized for readability
- **Animations**: Smooth hover effects and transitions

### Performance

- **Code Splitting**: Lazy loading of route components
- **Bundle Optimization**: Vite's optimized build process
- **Caching**: TanStack Query handles intelligent caching
- **Image Optimization**: Optimized assets and icons

### Browser Support

- Modern browsers with ES2020+ support
- Chrome, Firefox, Safari, Edge (latest versions)

### Development Guidelines

- Use TypeScript for all new code
- Follow React hooks patterns
- Implement proper error boundaries
- Write tests for critical functionality
- Maintain component isolation and reusability

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
