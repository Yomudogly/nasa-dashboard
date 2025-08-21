# 🌌 NASA Dashboard

A stunning, interactive web application for visualizing Near-Earth Objects (NEOs) using NASA's NeoWs API. Built with modern web technologies and featuring a beautiful space-themed interface.

![NASA Dashboard](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Fastify](https://img.shields.io/badge/Fastify-4+-green)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

## ✨ Features

### 🚀 **Interactive Space Visualization**

- Large rotating Earth SVG with detailed continents and atmosphere
- Real-time NEO objects floating around Earth with orbital mechanics
- 4 distinct SVG object shapes (asteroid, comet, rocky, metallic)
- 3x scaling animation when objects are highlighted or selected
- Smooth floating animations with varied movement patterns

### 🎨 **Modern UI/UX**

- Glassmorphism design with floating panels
- Deep space theme with custom animations
- Auto-scroll functionality in object lists
- Responsive design optimized for all screen sizes
- Clean, readable object information displays

### ⚡ **High Performance**

- Redis caching for API responses
- Optimized React components with proper state management
- Lazy loading and efficient rendering
- Real-time data updates without page refresh

### 🛠 **Technical Excellence**

- Full TypeScript implementation
- Comprehensive error handling
- Docker containerization
- Modular architecture
- Extensive documentation

## 🏗 Architecture

### Frontend (React + Vite)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS v3 with custom glassmorphism components
- **State Management**: TanStack Query for server state, React hooks for UI state
- **Testing**: Jest + Playwright for comprehensive testing

### Backend (Fastify + Node.js)

- **Framework**: Fastify with TypeScript for high-performance API
- **Caching**: Redis for optimized data storage and retrieval
- **API Integration**: NASA NeoWs API with robust error handling
- **Data Processing**: Real-time transformation and optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Redis (for caching)
- NASA API Key ([Get one here](https://api.nasa.gov/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yomudogly/nasa-dashboard.git
   cd nasa-dashboard
   ```

2. **Set up environment variables**

   ```bash
   # Backend (.env in backend/ folder)
   NASA_API_KEY=your_nasa_api_key_here
   REDIS_URL=redis://localhost:6379
   PORT=3001
   
   # Frontend (.env in frontend/ folder)
   VITE_API_BASE_URL=http://localhost:3001
   ```

3. **Install dependencies**

   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

4. **Start the application**

   ```bash
   # Backend (Terminal 1)
   cd backend && npm run dev
   
   # Frontend (Terminal 2)
   cd frontend && npm run dev
   ```

5. **Open your browser**

   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3001>
   - API Documentation: <http://localhost:3001/docs>

### 🐳 Docker Setup

```bash
# Start all services with Docker Compose
docker-compose up --build

# Or run individual services
docker build -t nasa-dashboard-backend ./backend
docker build -t nasa-dashboard-frontend ./frontend
```

## 📱 Usage

1. **Select a Date**: Use the date picker to choose when to view NEOs
2. **Interactive Visualization**:
   - Hover over objects to highlight them
   - Click objects to select and auto-scroll to details
   - Watch objects scale 3x when selected
3. **Object Information**: View detailed data in the floating side panel
4. **Sort and Filter**: Organize objects by distance, size, or hazard level

## 🛠 Development

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Lint code
```

### Backend Development

```bash
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run test         # Run tests
npm start            # Start production server
```

## 📋 API Documentation

The backend provides a RESTful API with the following endpoints:

- `GET /api/v1/objects` - Fetch Near-Earth Objects
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

Detailed API documentation is available at `/docs` when running the backend.

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# E2E tests
npm run test:e2e
```

## 📁 Project Structure

```md
nasa-dashboard/
├── backend/                 # Fastify API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic and external APIs
│   │   └── types/          # TypeScript type definitions
│   └── Dockerfile
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   ├── pages/          # Page components
│   │   └── lib/            # Utilities and API client
│   └── Dockerfile
├── docs/                   # Project documentation
└── docker-compose.yml     # Multi-service orchestration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NASA NeoWs API](https://api.nasa.gov/) for providing the asteroid data
- [React](https://reactjs.org/) for the frontend framework
- [Fastify](https://www.fastify.io/) for the high-performance backend
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---
