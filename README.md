# B&B Elegante - Modern Website with Booking Functionality

![B&B Elegante](images/bnb.webp)

A modern, responsive website for B&B Elegante featuring elegant design, room showcases, and integrated booking functionality.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Room Showcase**: Beautiful presentation of different room types
- **Booking System**: Integrated PHP-based booking functionality
- **Contact Form**: Easy communication with guests
- **Image Optimization**: WebP format for fast loading
- **Progressive Web App**: Service worker for offline capabilities
- **Modern Build System**: PostCSS, Terser, and optimization tools

## 🏗️ Project Structure

```
B&B/
├── api/                 # PHP backend files
│   ├── booking.php     # Booking system logic
│   ├── config.php      # Database configuration
│   └── contact.php     # Contact form handling
├── camere/             # Room images
├── images/             # Website images and icons
├── video/              # Promotional videos
├── index.html          # Main website
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript
├── sw.js              # Service worker
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PHP 7.4+ (for backend functionality)
- Web server (Apache/Nginx)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thedragon689/bb-elegante.git
   cd B&B
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development server**
   ```bash
   npm run dev
   ```
   This will start a live server at `http://localhost:3000`

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run watch` - Watch for file changes
- `npm run lint` - Run ESLint on JavaScript
- `npm run lint:css` - Run Stylelint on CSS
- `npm run format` - Format code with Prettier
- `npm run optimize:images` - Optimize images
- `npm run serve` - Serve production build

## 🎨 Customization

### Colors and Themes
Edit `styles.css` to customize:
- Primary colors
- Typography
- Spacing and layout

### Content
- Update room information in `index.html`
- Modify images in `camere/` and `images/` directories
- Edit booking form fields in `api/booking.php`

## 🔧 Backend Configuration

1. **Database Setup**
   - Configure database connection in `api/config.php`
   - Import database schema if required

2. **Email Configuration**
   - Update SMTP settings in contact forms
   - Configure booking confirmation emails

## 📱 Progressive Web App

The website includes:
- Service worker for offline functionality
- Web app manifest for app-like experience
- Responsive design for all devices

## 🖼️ Image Optimization

Images are optimized using:
- WebP format for modern browsers
- Responsive images with appropriate sizing
- Lazy loading for better performance

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: webdevl73@gmail.com
- Repository: https://github.com/thedragon689/bb-elegante.git

## 🙏 Acknowledgments

- Icons and graphics from various sources
- Built with modern web technologies
- Inspired by elegant B&B experiences

---

**B&B Elegante** - Where luxury meets comfort in every stay. 