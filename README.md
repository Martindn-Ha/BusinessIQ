# BusinessIQ - Analytics Platform

A modern React-based business analytics platform that helps businesses analyze their data and gain actionable insights through AI-powered analysis.

## Features

- **Dashboard**: Overview of business metrics and recent uploads
- **Analytics**: Detailed charts and visualizations with AI-generated insights
- **Data Upload**: Easy file upload with business type selection and data processing
- **Modern UI**: Beautiful, responsive design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── analytics/          # Analytics components
│   └── upload/             # Upload flow components
├── pages/                  # Main page components
├── entities/               # Data models and API layer
├── utils/                  # Utility functions
├── App.jsx                 # Main app component with routing
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool

## Features Overview

### Dashboard
- Key performance metrics overview
- Recent data uploads
- Quick insights panel

### Analytics
- Interactive charts and visualizations
- AI-generated business insights
- Data export capabilities

### Upload Flow
- Drag-and-drop file upload
- Business type selection (Restaurant, Retail, Service)
- Data preview and processing steps
- Real-time progress tracking

## Customization

The app uses a modular component structure, making it easy to customize:

- Modify colors and themes in `src/index.css`
- Add new business types in upload components
- Extend analytics with additional chart types
- Add new dashboard widgets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
