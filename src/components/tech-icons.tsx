import React from 'react'

interface TechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className = 'w-5 h-5 inline-block' }: TechIconProps) {
  const normalized = name.toLowerCase().trim()

  // Python
  if (normalized.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.87 2c-5.02 0-4.7 2.18-4.7 2.18l.01 2.26h4.77v.68H5.29S2 6.75 2 11.84c0 5.09 2.87 4.9 2.87 4.9h1.72v-2.42c0-2.74 2.37-2.6 2.37-2.6h4.63s2.25.04 2.25-2.18V4.49S16.14 2 11.87 2zm-2.58 1.49a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB"/>
        <path d="M12.13 22c5.02 0 4.7-2.18 4.7-2.18l-.01-2.26h-4.77v-.68h6.66S22 17.25 22 12.16c0-5.09-2.87-4.9-2.87-4.9h-1.72v2.42c0 2.74-2.37 2.6-2.37 2.6h-4.63s-2.25-.04-2.25 2.18v5.05S7.86 22 12.13 22zm2.58-1.49a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B"/>
      </svg>
    )
  }

  // JavaScript / JS
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M11.2 17.3c0 1.5-.9 2.1-2.3 2.1-1.3 0-2.1-.6-2.5-1.5l1.4-.8c.2.5.6.8 1.1.8.5 0 .8-.2.8-.8V10h1.5v7.3zm7.4-.3c0 1.8-1.1 2.5-2.8 2.5-1.6 0-2.6-.8-3.1-1.8l1.4-.8c.4.7 1 1.2 1.8 1.2.7 0 1.2-.3 1.2-.9 0-.6-.4-.8-1.4-1.3l-.5-.2c-1.4-.6-2.3-1.4-2.3-2.7 0-1.6 1.2-2.5 2.7-2.5 1.3 0 2.2.6 2.7 1.5l-1.3.8c-.3-.5-.7-.8-1.4-.8-.6 0-1 .3-1 .8 0 .5.3.7 1.2 1.1l.5.2c1.7.7 2.5 1.4 2.5 2.9z" fill="#000"/>
      </svg>
    )
  }

  // C language
  if (normalized === 'c' || normalized.includes('c language')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.5c-.8.6-1.8.9-2.9.9-2.7 0-4.9-2.1-4.9-4.9s2.2-4.9 4.9-4.9c1.1 0 2.1.3 2.9.9l1.1-1.6C15.7 6.1 14.2 5.5 12.5 5.5 8.9 5.5 6 8.4 6 12s2.9 6.5 6.5 6.5c1.7 0 3.2-.6 4.4-1.4l-1.1-1.6z" fill="#A8B9CC"/>
      </svg>
    )
  }

  // PHP
  if (normalized.includes('php')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" fill="#777BB4" opacity="0.2"/>
        <path d="M5.5 9h2.2c1.1 0 1.8.6 1.8 1.5s-.7 1.5-1.8 1.5H6.5v2H5.5V9zm1 1v1h1.2c.5 0 .8-.2.8-.5s-.3-.5-.8-.5H6.5zm5.5-1h1v2h1.5v-2h1v5h-1v-2H13v2h-1V9zm6.5 0h2.2c1.1 0 1.8.6 1.8 1.5s-.7 1.5-1.8 1.5H19.5v2h-1V9zm1 1v1h1.2c.5 0 .8-.2.8-.5s-.3-.5-.8-.5H19.5z" fill="#777BB4"/>
      </svg>
    )
  }

  // HTML / HTML5
  if (normalized.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 3l1.6 18L12 22l7.4-1L21 3H3zm14.8 4.5l-.3 3.6h-7.3l.2 2.3h6.9l-.6 6.3-4.7 1.3-4.7-1.3-.3-3.7h2.2l.1 1.7 2.7.7 2.7-.7.3-3h-7.2l-.7-7.2h10.8z" fill="#E34F26"/>
      </svg>
    )
  }

  // CSS / CSS3
  if (normalized.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3 3l1.6 18L12 22l7.4-1L21 3H3zm14.8 4.5h-10l.2 2.3h9.6l-.6 6.3-5 1.4-5-1.4-.3-3.7h2.2l.1 1.7 3 .8 3-.8.3-3.2h-6.7l-.7-7.2h10.2z" fill="#1572B6"/>
      </svg>
    )
  }

  // Flask
  if (normalized.includes('flask')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M16 2v2h-1v4.5l4.6 7.7c.8 1.3.9 2.8.2 4.1-.7 1.3-2.1 2.1-3.6 2.1H7.8c-1.5 0-2.9-.8-3.6-2.1-.7-1.3-.6-2.8.2-4.1L9 8.5V4H8V2h8zm-3.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#000000" className="dark:fill-white"/>
      </svg>
    )
  }

  // Laravel
  if (normalized.includes('laravel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FF2D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  // React / Full-Stack
  if (normalized.includes('react') || normalized.includes('full-stack')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
      </svg>
    )
  }

  // PyTorch / Deep Learning
  if (normalized.includes('pytorch') || normalized.includes('deep learning')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.5 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5 13.5c-3-2.5-4-6.5-2.5-10.5L9.5 7c-1 3 0 6 2 8l-2 2zm6-4c-2 2-5 2.5-7.5 1l2-2c1.5 1 3.5.5 4.5-.5l1 1.5z" fill="#EE4C2C"/>
      </svg>
    )
  }

  // TensorFlow / Keras / ANN
  if (normalized.includes('tensorflow') || normalized.includes('keras') || normalized.includes('ann')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l-7 4v12l4-2.3v-5l3 1.7v7.6l4-2.3V8.3l3-1.7V4L12 2zm-1 8.5L8.5 9 11 7.5v3z" fill="#FF6F00"/>
      </svg>
    )
  }

  // Machine Learning / AI
  if (normalized.includes('machine learning') || normalized.includes('ai')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#9C5CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="15" x2="23" y2="15"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="15" x2="4" y2="15"/>
      </svg>
    )
  }

  // BERT / IndoBERT / DistilBERT / NLP
  if (normalized.includes('bert') || normalized.includes('nlp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#FFD21E" opacity="0.3"/>
        <path d="M7 8h10M7 12h10M7 16h6" stroke="#FF9D00" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }

  // Pandas
  if (normalized.includes('pandas')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M7 4h2v16H7V4zm8 0h2v16h-2V4zm-4 4h2v8h-2V8z" fill="#150458"/>
      </svg>
    )
  }

  // NumPy
  if (normalized.includes('numpy')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm12 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" fill="#013243"/>
      </svg>
    )
  }

  // SQL / Data Analysis / Database
  if (normalized.includes('sql') || normalized.includes('data analysis') || normalized.includes('database')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="8" ry="3"/>
        <path d="M4 5v6c0 1.65 3.58 3 8 3s8-1.35 8-3V5M4 11v6c0 1.65 3.58 3 8 3s8-1.35 8-3v-6"/>
      </svg>
    )
  }

  // GCP / Google Cloud
  if (normalized.includes('gcp') || normalized.includes('google cloud')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
      </svg>
    )
  }

  // AWS
  if (normalized.includes('aws') || normalized.includes('amazon')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M6.7 13.6c-1.7 0-3-.5-3-1.8 0-1.7 1.7-2.2 3.6-2.2.8 0 1.5.1 2 .2v1c-.5-.2-1.1-.3-1.8-.3-1.1 0-2 .3-2 1.1 0 .6.5.9 1.4.9.8 0 1.6-.3 2.1-.8v1.1c-.6.5-1.5.8-2.3.8zm6.4.2L11 6.8h1.7l1.4 5.3 1.4-5.3h1.6l-2.1 7c-.3.9-.8 1.3-1.7 1.3-.2 0-.5 0-.7-.1v-1.1c.2 0 .4.1.5.1.5 0 .8-.2.9-.6zM3 18.5c4 2.5 10.5 3.1 16 0 .3-.2.6 0 .4.3-.7 1-4.8 2.7-10 2.7S2.5 20 1.9 19c-.3-.4 0-.6.4-.4z" fill="#FF9900"/>
      </svg>
    )
  }

  // Firebase
  if (normalized.includes('firebase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M3.8 17.7L6.6 2.5a.7.7 0 011.3-.2l2.6 4.9 3.3-6.2a.7.7 0 011.3.1l4.4 16.6-9 5a1 1 0 01-1 0l-8.7-5z" fill="#FFA000"/>
        <path d="M12.4 7.2L10.5 3.6a.7.7 0 00-1.3.2L6.6 17.7l5.8-10.5z" fill="#F57C00"/>
        <path d="M3.8 17.7l8.2 4.6a1 1 0 001 0l8.2-4.6-2.8-10.6-14.6 10.6z" fill="#FFCA28"/>
      </svg>
    )
  }

  // Figma / Design / UI/UX / Prototyping
  if (normalized.includes('figma') || normalized.includes('ui/ux') || normalized.includes('design') || normalized.includes('prototyping')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
        <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
      </svg>
    )
  }

  // IoT / Sensors / Microcontroller
  if (normalized.includes('iot') || normalized.includes('sensor') || normalized.includes('microcontroller')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8">
        <rect x="6" y="6" width="12" height="12" rx="2"/>
        <line x1="9" y1="1" x2="9" y2="6"/>
        <line x1="15" y1="1" x2="15" y2="6"/>
        <line x1="9" y1="18" x2="9" y2="23"/>
        <line x1="15" y1="18" x2="15" y2="23"/>
        <line x1="1" y1="9" x2="6" y2="9"/>
        <line x1="1" y1="15" x2="6" y2="15"/>
        <line x1="18" y1="9" x2="23" y2="9"/>
        <line x1="18" y1="15" x2="23" y2="15"/>
      </svg>
    )
  }

  // Docker
  if (normalized.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M13.98 11.08h2.12v2.12h-2.12v-2.12zm-3.04 0h2.12v2.12h-2.12v-2.12zm-3.04 0h2.12v2.12H7.9v-2.12zm-3.04 0h2.12v2.12H4.86v-2.12zm9.12-3.04h2.12v2.12h-2.12V8.04zm-3.04 0h2.12v2.12h-2.12V8.04zm-3.04 0h2.12v2.12H7.9V8.04zm6.08-3.04h2.12v2.12h-2.12V5zm1.52 10.96c-.47-.32-1.42-.52-2.38-.45-.48.04-.95.18-1.38.4-.76.4-1.4 1.05-1.8 1.83-.39.77-.5 1.66-.3 2.53.37 1.6 1.76 2.76 3.4 2.84 2.22.1 4.12-1.5 4.38-3.7.12-1.04-.15-2.07-.76-2.92-.3-.41-.7-.78-1.18-.53z" fill="#2496ED"/>
      </svg>
    )
  }

  // GIS / ArcGIS / GeoJSON
  if (normalized.includes('gis') || normalized.includes('geojson') || normalized.includes('arcgis')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.8">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  }

  // Systems / System Architecture
  if (normalized.includes('system') || normalized.includes('architecture') || normalized.includes('streaming')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#B46DFF" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="4" rx="1"/>
        <rect x="2" y="10" width="20" height="4" rx="1"/>
        <rect x="2" y="17" width="20" height="4" rx="1"/>
        <circle cx="6" cy="5" r="1" fill="#B46DFF"/>
        <circle cx="6" cy="12" r="1" fill="#B46DFF"/>
        <circle cx="6" cy="19" r="1" fill="#B46DFF"/>
      </svg>
    )
  }

  // Next.js
  if (normalized.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1"/>
        <path d="M14.9 16.5L9.5 9v7.5H8V7.5h1.8l5.3 7.4V7.5h1.5v9h-1.7z" fill="#fff"/>
      </svg>
    )
  }

  // Git / GitHub
  if (normalized.includes('git') || normalized.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M2.6 10.6L11.4 1.8c.8-.8 2.1-.8 2.9 0l7.9 7.9c.8.8.8 2.1 0 2.9l-8.8 8.8c-.8.8-2.1.8-2.9 0L2.6 13.5c-.8-.8-.8-2.1 0-2.9z" fill="#F05032"/>
        <circle cx="10.5" cy="10.5" r="1.8" fill="#fff"/>
        <circle cx="16.5" cy="10.5" r="1.8" fill="#fff"/>
        <circle cx="10.5" cy="16.5" r="1.8" fill="#fff"/>
        <path d="M10.5 12.3v2.4M12.3 10.5h2.4" stroke="#fff" strokeWidth="1.2"/>
      </svg>
    )
  }

  // Scikit-Learn
  if (normalized.includes('scikit') || normalized.includes('sklearn')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 19h18L12 3z" fill="#F7931E" opacity="0.8"/>
        <circle cx="12" cy="12" r="4" fill="#3499CD"/>
      </svg>
    )
  }

  // Hugging Face
  if (normalized.includes('hugging') || normalized.includes('transformer')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#FFD21E"/>
        <path d="M9 10a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-6.5 4a3.5 3.5 0 007 0h-7z" fill="#000"/>
      </svg>
    )
  }

  // Jupyter
  if (normalized.includes('jupyter')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#F37626" strokeWidth="1.8" transform="rotate(-30 12 12)"/>
        <circle cx="6" cy="6" r="1.5" fill="#767676"/>
        <circle cx="18" cy="18" r="1.5" fill="#767676"/>
      </svg>
    )
  }

  // TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M11.5 17.5c0 1.5-.9 2.1-2.3 2.1-1.3 0-2.1-.6-2.5-1.5l1.4-.8c.2.5.6.8 1.1.8.5 0 .8-.2.8-.8V10h1.5v7.5zm7.4-.3c0 1.8-1.1 2.5-2.8 2.5-1.6 0-2.6-.8-3.1-1.8l1.4-.8c.4.7 1 1.2 1.8 1.2.7 0 1.2-.3 1.2-.9 0-.6-.4-.8-1.4-1.3l-.5-.2c-1.4-.6-2.3-1.4-2.3-2.7 0-1.6 1.2-2.5 2.7-2.5 1.3 0 2.2.6 2.7 1.5l-1.3.8c-.3-.5-.7-.8-1.4-.8-.6 0-1 .3-1 .8 0 .5.3.7 1.2 1.1l.5.2c1.7.7 2.5 1.4 2.5 2.9z" fill="#fff"/>
      </svg>
    )
  }

  // PostgreSQL
  if (normalized.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15.5v-3.5h2v-2h-2V9.5c1 0 2-.5 2-1.5S14 6.5 13 6.5s-2 .5-2 1.5v4H9v2h2v3.5h2z" fill="#336791"/>
      </svg>
    )
  }

  // MySQL
  if (normalized.includes('mysql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 00-9-9zm-2 12H8v-4h2v4zm4 0h-2v-6h2v6z" fill="#00758F"/>
      </svg>
    )
  }

  // Default Fallback Icon (Generic Tech Chip)
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
