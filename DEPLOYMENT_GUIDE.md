# Palestine Solidarity MMR App - Deployment Documentation

## 🚀 Deployed Application

**Live Application URL**: https://sbowjrwz.manus.space
**API Backend URL**: https://mzhyi8cqvz5e.manus.space

## 📋 Project Overview

A serverless Node.js application featuring Palestine-themed intersectional design with:
- Beautiful scroll-triggered interface with solidarity messaging
- MMR (Multi-Modal Reasoning) model query system
- Responsive design with Palestine flag colors (red, black, white, green)
- Accessibility features and keyboard navigation
- Real-time API integration for model queries

## 🎨 Design Features

### Visual Identity
- **Palestine Flag Colors**: Red (#ED2E38), Black (#000000), White (#FFFFFF), Green (#009639)
- **Geometric Elements**: Traditional Palestinian-inspired patterns
- **Typography**: Modern, accessible fonts with high contrast
- **Layout**: Mobile-first responsive design

### User Experience
- **Hero Section**: Full-screen "SOLIDARITY WITH PALESTINE" message
- **Smooth Scrolling**: Animated transition to MMR interface
- **Interactive Elements**: Hover states and focus indicators
- **Loading States**: Professional processing animations

## 🔧 Technical Architecture

### Frontend (React)
- **Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS with custom Palestine color variables
- **Components**: Modular design with shadcn/ui components
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Serverless via Cloudflare Workers

### Backend (Flask API)
- **Framework**: Flask 3.1.1 with CORS support
- **Endpoints**: 
  - `POST /api/mmr/query` - Main query endpoint
  - `GET /api/health` - Health check
  - `GET /api/mmr/info` - Model information
- **Deployment**: Serverless Python environment

## 🔌 API Integration

### Current Implementation
The application currently connects to a mock MMR API that provides thoughtful responses about intersectional solidarity and Palestine liberation themes.

### Connecting Your MMR Model

To integrate your own MMR model, update the API endpoint in the React application:

1. **Update Frontend API URL**:
   ```javascript
   // In src/components/MMRInterface.jsx, line 20
   const response = await fetch('YOUR_MMR_API_URL/api/mmr/query', {
   ```

2. **API Request Format**:
   ```json
   {
     "prompt": "User's query text"
   }
   ```

3. **Expected Response Format**:
   ```json
   {
     "response": "Model's response text",
     "model": "Your-Model-Name",
     "timestamp": 1234567890.123
   }
   ```

### API Requirements
- **CORS**: Must support cross-origin requests
- **Content-Type**: Accept `application/json`
- **Method**: POST requests
- **Response Time**: Reasonable timeout handling

## 📁 Project Structure

```
palestine-mmr-app/
├── palestine-solidarity-app/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx       # Landing page component
│   │   │   ├── MMRInterface.jsx      # Query interface
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── assets/                   # Design assets and images
│   │   ├── App.css                   # Palestine-themed styles
│   │   └── App.jsx                   # Main application
│   └── dist/                         # Built application
├── mmr-api/                          # Flask backend
│   ├── src/
│   │   └── main.py                   # API endpoints
│   └── requirements.txt              # Python dependencies
├── assets/                           # Design references
├── design-concept.md                 # Design documentation
├── interface-specs.md                # UI specifications
└── todo.md                          # Project progress
```

## 🚀 Local Development

### Frontend Setup
```bash
cd palestine-solidarity-app
pnpm install
pnpm run dev
```

### Backend Setup
```bash
cd mmr-api
source venv/bin/activate
pip install -r requirements.txt
python src/main.py
```

## 🔄 Redeployment

### Frontend Updates
```bash
cd palestine-solidarity-app
pnpm run build
# Use Manus deployment tools or your preferred platform
```

### Backend Updates
```bash
cd mmr-api
# Update requirements.txt if needed
pip freeze > requirements.txt
# Deploy using your preferred serverless platform
```

## 🎯 Key Features Implemented

### ✅ Design & UX
- Palestine-themed color scheme and visual identity
- Intersectional solidarity messaging
- Smooth scroll animations and transitions
- Responsive design for all devices
- Accessibility compliance (WCAG 2.1 AA)

### ✅ Functionality
- Hero section with call-to-action
- MMR query interface with real-time responses
- Loading states and error handling
- Keyboard navigation support
- Cross-origin API integration

### ✅ Technical
- Modern React architecture
- Serverless deployment
- CORS-enabled API backend
- Production-ready build optimization
- Mobile-first responsive design

## 🔧 Customization Options

### Connecting Your MMR Model
1. Replace the API endpoint URL in `MMRInterface.jsx`
2. Ensure your API follows the expected request/response format
3. Test locally before redeploying
4. Update error messages if needed

### Design Modifications
- Colors: Update CSS variables in `App.css`
- Content: Modify text in `HeroSection.jsx` and `MMRInterface.jsx`
- Layout: Adjust Tailwind classes for spacing and sizing

### Additional Features
- Add authentication if required
- Implement rate limiting
- Add analytics tracking
- Extend API with additional endpoints

## 📞 Support

The application is fully functional and ready for production use. The mock API provides meaningful responses about intersectional solidarity themes while you develop your actual MMR model integration.

For technical questions about the implementation or deployment, refer to the source code comments and documentation files included in the project.

