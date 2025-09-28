# BusinessIQ Analytics Platform

A modern React-based business analytics platform that helps local businesses analyze their data and gain actionable insights through AI-powered analysis using Google Gemini.

## Features

- **Dashboard**: Overview of business metrics and recent uploads
- **Analytics**: Interactive charts and visualizations with AI-generated insights and recommendations
- **Data Upload**: Easy file upload with business type selection and AI-powered data processing
- **AI-Powered Analysis**: Google Gemini integration for intelligent business insights
- **Dynamic Chart Generation**: Automatic chart type selection based on data content
- **Modern UI**: Beautiful, responsive design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env.local
```
Edit `.env.local` and add your Google Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

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
- **Recharts** - Data visualization and charts
- **Google Gemini AI** - AI-powered data analysis
- **Vite** - Build tool

## Features Overview

### Dashboard
- Key performance metrics overview
- Recent data uploads
- Quick insights panel
- Clear All Data functionality for MVP testing

### Analytics
- Interactive charts and visualizations (Bar, Line, Pie charts)
- AI-generated business insights and recommendations
- Dynamic chart type selection based on data content
- Data export capabilities
- Real-time data visualization with Recharts

### Upload Flow
- Drag-and-drop file upload
- Business type selection (Restaurant, Retail, Service)
- AI-powered data analysis with Google Gemini
- Data preview and processing steps
- Real-time progress tracking
- Automatic step progression

### AI Integration
- Google Gemini API for intelligent data analysis
- Structured JSON output for consistent data processing
- Automatic insight and recommendation generation
- Smart chart type detection based on content
- Data cleaning and validation

## API Configuration

### Google Gemini Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Supported Data Formats

- CSV files with business data
- Automatic data cleaning and validation
- Support for various business types (Restaurant, Retail, Service)

## Customization

The app uses a modular component structure, making it easy to customize:

- Modify colors and themes in `src/index.css`
- Add new business types in upload components
- Extend analytics with additional chart types
- Add new dashboard widgets
- Customize AI prompts in `src/services/geminiService.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
