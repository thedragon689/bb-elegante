#!/bin/bash

# B&B Elegante Website Setup Script

echo "🚀 Setting up B&B Elegante Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create dist directory
echo "📁 Creating build directory..."
mkdir -p dist

# Build the project
echo "🔨 Building the project..."
npm run build

# Start development server
echo "🌐 Starting development server..."
echo "📱 The website is now available at: http://localhost:3000"
echo "🔧 Development mode with live reload enabled"
echo ""
echo "📋 Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run watch   - Watch for changes"
echo "  npm run lint    - Lint JavaScript"
echo "  npm run format  - Format code"
echo ""
echo "✅ Setup complete! Happy coding! 🎉"

npm run dev 