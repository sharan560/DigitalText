# Handwritten to Digital Text Converter

A modern React frontend for converting handwritten notes to digital text using OCR technology.

## Features

✨ **Core Features:**
- 📤 Drag & drop image upload (JPG, PNG)
- 🤖 AI-powered OCR text extraction
- ✏️ Editable text output
- 📋 Copy text to clipboard
- 📥 Download as text file
- 🕐 Conversion history with quick access
- 🌙 Dark mode toggle
- 📱 Fully responsive design

## Tech Stack

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Language:** TypeScript

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with dark mode toggle
│   ├── Footer.tsx      # Footer with social links
│   ├── ImageUploader.tsx   # Drag-drop image upload component
│   ├── ResultPanel.tsx     # Text output with copy/download buttons
│   ├── LoadingSpinner.tsx  # Loading animation
│   └── HistorySidebar.tsx  # Recent conversions sidebar
├── pages/              # Full-page components
│   ├── LandingPage.tsx # Hero landing page
│   └── ConverterPage.tsx   # Main converter interface
├── context/            # React Context providers
│   ├── ThemeContext.tsx    # Dark mode management
│   └── HistoryContext.tsx  # Conversion history management
├── utils/              # Utility functions
│   ├── api.ts         # API integration
│   └── pdfGenerator.ts    # Export utilities
├── App.tsx            # Main app routing
└── main.tsx           # React DOM entry point
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Integration

The app expects a backend API endpoint:

```
POST /api/ocr
Content-Type: multipart/form-data

Body:
- image: File (JPG/PNG)

Response:
{
  "text": "extracted text from image"
}
```

## Usage

1. **Landing Page:** Click "Try Now" to navigate to the converter
2. **Upload Image:** Drag & drop or click to select a handwritten image
3. **Convert:** Click "Convert to Text" to extract text
4. **Edit & Export:** Edit the text and copy it or download as a file
5. **History:** Click the History button to access previous conversions

## Features in Detail

### Upload & Preview
- Supports JPG and PNG formats
- Shows image preview before conversion
- Clear button to remove selected image

### Text Processing
- Real-time text editing
- Word count and character count display
- Syntax highlighting (can be extended)

### Export Options
- **Copy:** One-click copy to clipboard with toast notification
- **Download:** Save extracted text as a file
- **Clear:** Reset the output

### History Management
- Automatically saves last 10 conversions
- Click to reload previous conversions
- Quick remove from history
- Clear all history option
- Persisted with localStorage

### Dark Mode
- Toggle dark/light theme
- Preference saved to localStorage
- Smooth transitions between modes

### Responsive Design
- Mobile: Single column layout
- Tablet: Optimized 2-column layout
- Desktop: Full 2-column layout with sidebar

## Customization

### Colors & Theming
Edit the Tailwind colors in `tailwind.config.js`:

```js
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // Add theme customization here
}
```

### API Base URL
Update in `src/utils/api.ts`:

```ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 12+)

## Performance

- Lazy component loading with Vite
- Optimized bundle size with tree-shaking
- Smooth animations with Framer Motion
- Efficient re-renders with React hooks

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast dark mode option
- Screen reader friendly

## Future Enhancements

- 🎨 Multiple theme options
- 📊 Conversion statistics Dashboard
- 🔐 User authentication & cloud sync
- 🌐 Multi-language support
- 📄 PDF/Word document export
- 🎯 Advanced text formatting options
- 🔍 OCR accuracy improvement with training
- 🎤 Voice output for extracted text

## Troubleshooting

### Port Already in Use
The app will automatically try the next available port (5173, 5174, 5175...)

### API Connection Issues
1. Ensure backend is running on the configured URL
2. Check CORS headers in backend
3. Verify API endpoint is correct

### Tailwind Styles Not Loading
```bash
# Clear cache and reinstall
rm -rf node_modules .vite
npm install
```

## Development

```bash
# Run with TypeScript type checking
npm run build

# Format code (if prettier configured)
npm run format

# Run linter (if eslint configured)
npm run lint
```

## License

MIT License - feel free to use for personal and commercial projects

## Support

For issues and feature requests, please create an issue on the repository.

---

**Built for students & digital note conversion** ✨
