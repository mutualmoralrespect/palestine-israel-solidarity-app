# Palestine-Israel Solidarity MMR App - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+ and pip
- Git (for version control)

### 1. Extract and Setup
```bash
# Extract the archive
tar -xzf palestine-israel-solidarity-app.tar.gz
cd palestine-mmr-app/

# Initialize git repository
git init
git add .
git commit -m "Initial commit: Palestine-Israel solidarity MMR application"
```

### 2. Frontend Setup (React)
```bash
cd palestine-solidarity-app/
pnpm install
pnpm run dev  # Development server on http://localhost:5173
pnpm run build  # Production build
```

### 3. Backend Setup (Flask API)
```bash
cd mmr-api/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py  # API server on http://localhost:5000
```

## 📁 Project Structure

```
palestine-mmr-app/
├── README.md                          # This file
├── DEPLOYMENT_GUIDE.md               # Deployment instructions
├── VERSION_CONTROL_PLAN.md           # Version control options
├── palestine-solidarity-app/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeroSection.jsx       # Updated with Palestine-Israel messaging
│   │   │   ├── MMRInterface.jsx      # Query interface
│   │   │   └── MMRInterface-with-state.jsx  # Enhanced with state management
│   │   ├── assets/                   # Images and design assets
│   │   └── App.css                   # Styling with flag colors
├── mmr-api/                          # Flask backend
│   ├── src/main.py                   # API endpoints
│   └── requirements.txt              # Python dependencies
└── assets/                           # Design references and generated images
```

## 🎨 Current Features

### ✅ Completed
- React frontend with responsive design
- Palestine-themed color scheme and styling
- Smooth scroll interface
- MMR query system with real-time responses
- Flask API backend with CORS support
- Complete documentation

### 🔄 In Progress (Ready to Deploy)
- **NEW**: Inclusive Palestine-Israel solidarity messaging
- **NEW**: Intertwined flags banner design
- **NEW**: State management with localStorage and URL persistence
- **NEW**: Session tokens for resumable queries

### 🚀 Ready for Implementation
- Markdown formatting for responses
- API performance optimization
- Advanced filtering and tagging system

## 🔧 Customization

### Update API Endpoint
In `src/components/MMRInterface.jsx`, line 20:
```javascript
const response = await fetch('YOUR_API_URL/api/mmr/query', {
```

### Modify Colors
In `src/App.css`, update CSS variables:
```css
:root {
  --palestine-red: #ED2E38;
  --palestine-green: #009639;
  --israel-blue: #0038B8;
  --peace-white: #FFFFFF;
}
```

### Deploy to GitHub
```bash
# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/palestine-israel-solidarity-app.git
git branch -M main
git push -u origin main
```

## 📞 Support

- **Live Demo**: https://sbowjrwz.manus.space
- **API Backend**: https://mzhyi8cqvz5e.manus.space
- **Documentation**: See DEPLOYMENT_GUIDE.md for detailed deployment instructions

## 🔄 Version Control Best Practices

1. **Commit frequently** with descriptive messages
2. **Use branches** for new features
3. **Tag releases** for stable versions
4. **Keep sensitive data** in environment variables
5. **Document changes** in commit messages

## 🚀 Next Steps

1. **Set up GitHub repository** for version control
2. **Deploy updated version** with new banner and messaging
3. **Optimize API performance** for faster responses
4. **Add advanced features** like voice/player filtering

Your application is ready for production use and further development!

