import fs from "fs";
import path from "path";

const techDir = path.resolve("public/images/tech");
const brandsDir = path.resolve("public/images/brands");

fs.mkdirSync(techDir, { recursive: true });
fs.mkdirSync(brandsDir, { recursive: true });

// Standard official or minimalist vector representations of top tech logos
const techLogos = {
  "nextjs.svg": `<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="90" cy="90" r="90" fill="#000000"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M149.508 157.086L69.8055 54H54V125.922H66.6852V69.9678L139.914 164.717C143.255 162.378 146.46 159.827 149.508 157.086ZM126 54H113.315V108.647L126 125.025V54Z" fill="url(#next_paint)"/>
    <defs>
      <linearGradient id="next_paint" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="white"/>
        <stop offset="1" stop-color="white" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>`,

  "react.svg": `<svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" stroke-width="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>`,

  "typescript.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#3178c6" d="M0 0h128v128H0z"/>
    <path fill="#ffffff" d="M68.5 76.5h11.2c1.7 4 4.5 6.4 9.4 6.4 4.3 0 7.3-2.1 7.3-5 0-3.6-3.8-4.8-10.3-6.9-9.5-3.1-15.6-7.5-15.6-16.7 0-9.2 7.7-16.3 19.3-16.3 10.1 0 17.5 4.7 20 13.5l-10.7 4.5c-1.3-3.6-3.9-5.4-8.7-5.4-4.2 0-6.8 2-6.8 4.7 0 2.9 3.2 4.1 9.4 6.1 10.3 3.3 16.5 7.6 16.5 17.2 0 10.4-8.3 17.1-20.7 17.1-13.4 0-21.7-6.2-24.3-19.2zm-46-37h36.2v12.4H46.8v41.6H34.4V51.9H22.5V39.5z"/>
  </svg>`,

  "nodejs.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#5fa04e" d="M64 4.5l54.8 31.6v63.3L64 123.5 9.2 99.4V36.1z"/>
    <path fill="#ffffff" d="M64 23.3l38.5 22.2v44.4L64 112.1 25.5 89.9V45.5z"/>
    <path fill="#333333" d="M64 36.6L85.6 49v24.8L64 86.2 42.4 73.8V49z"/>
  </svg>`,

  "python.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#3776ab" d="M63.5 6.2c-29.3 0-27.5 12.7-27.5 12.7l.03 13.1h28.1v3.9H24.3C11 35.9 3.1 44.6 3.1 63.4c0 18.8 8.4 26.6 20.2 26.6h12v-16.8c0-12.7 10.9-23.7 23.7-23.7h27.9c4.3 0 7.7-3.5 7.7-7.8V19s2.1-12.8-31.1-12.8zm-15 8.2a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8z"/>
    <path fill="#ffd43b" d="M64.5 121.8c29.3 0 27.5-12.7 27.5-12.7l-.03-13.1H63.9v-3.9h39.8c13.3 0 21.2-8.7 21.2-27.5 0-18.8-8.4-26.6-20.2-26.6h-12v16.8c0 12.7-10.9 23.7-23.7 23.7H41.1c-4.3 0-7.7 3.5-7.7 7.8v22.7s-2.1 12.8 31.1 12.8zm15-8.2a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8z"/>
  </svg>`,

  "postgresql.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="60" fill="#336791"/>
    <path fill="#ffffff" d="M64 22c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42zm0 14c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14 6.3-14 14-14zm0 60c-13.3 0-24.8-7.3-30.8-18 4.5-5.6 13.9-9.5 24.8-10.6 1.9 2.7 3.8 4.6 6 4.6s4.1-1.9 6-4.6c10.9 1.1 20.3 5 24.8 10.6-6 10.7-17.5 18-30.8 18z"/>
  </svg>`,

  "flutter.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#02569b" d="M78.6 14.8L28.8 64.6l15.5 15.5 65.3-65.3H78.6z"/>
    <path fill="#0175c2" d="M78.6 64.6L54.7 88.5l15.5 15.5 39.4-39.4H78.6z"/>
    <path fill="#29b6f6" d="M70.2 104l15.5 15.5h31L85.7 88.5 70.2 104z"/>
    <path fill="#02569b" d="M85.7 88.5L70.2 104l13.6 13.6 15.5-15.5-13.6-13.6z" opacity=".2"/>
  </svg>`,

  "tailwind.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#38bdf8" d="M64 36c-17.6 0-28.8 8.8-33.6 26.4 6.4-8 14.4-11.2 24-9.6 5.5.9 9.4 4.9 13.8 9.3C71.3 69.4 80.2 78 98 78c17.6 0 28.8-8.8 33.6-26.4-6.4 8-14.4 11.2-24 9.6-5.5-.9-9.4-4.9-13.8-9.3C86.7 44.6 77.8 36 64 36zm-34 26C12.4 62 1.2 70.8-3.6 88.4c6.4-8 14.4-11.2 24-9.6 5.5.9 9.4 4.9 13.8 9.3C41.3 95.4 50.2 104 68 104c17.6 0 28.8-8.8 33.6-26.4-6.4 8-14.4 11.2-24 9.6-5.5-.9-9.4-4.9-13.8-9.3C70.7 70.6 61.8 62 48 62h-18z"/>
  </svg>`,

  "docker.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#2496ed" d="M124.6 55.4c-2.4-1.8-7.8-1.5-12.1-.2-.8-6.1-5-10.7-10.5-12.3-.5-.1-1-.3-1.6-.3-1.4 0-2.8.4-4.1 1-1.3-.8-2.8-1.3-4.4-1.3-4.5 0-8.3 3.3-9.1 7.7H72V39H58v11H45V39H31v11H18V39H4v25.2C1.5 68.2 0 73.4 0 78.8 0 102 21.5 116 57 116c39.6 0 66.8-18.7 70.3-46.7.2-1.7.3-3.4.3-5.2 0-3.3-1.1-6.4-3-8.7zM31 63H18V52h13v11zm14 0H33V52h12v11zm14 0H47V52h12v11zm14 0H61V52h12v11zm14 0H75V52h12v11z"/>
  </svg>`,

  "aws.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#232f3e" d="M0 0h128v128H0z"/>
    <path fill="#ff9900" d="M38.5 83.2c-15.8 4.7-26 1.8-26.6 1.6-.6-.2-.9-.8-.7-1.4.2-.6.8-.9 1.4-.7.6.2 10.3 3 25.1-1.4 1.4-.4 2.8.9 2.4 2.3-.3 1.1-1 1.4-1.6 1.6zm70.2-3.1c-1.3-1.7-4.3-1-6.4-.3-11.4 3.9-23.7 6.1-36.3 6.1-17.4 0-33.8-4.2-47.5-11.7-.8-.4-1.8-.2-2.3.6-.4.8-.2 1.8.6 2.3 14.4 7.9 31.7 12.3 50 12.3 13.2 0 26.1-2.3 38.1-6.4 1.3-.4 2.8-.7 3.8-1.5.8-.6 1.3-1.4 1-2.4-.2-.8-.7-1.3-1-1.6z"/>
    <path fill="#ffffff" d="M42 41h10.4l12.8 32h-8.8l-2.7-7.2h-13l-2.7 7.2h-8.8L42 41zm8.8 18.2l-4.4-12.4-4.4 12.4h8.8zm31-18.2h8.7v24.8c0 2.4.5 4.1 1.6 5.1 1.1 1 2.8 1.5 5.1 1.5 2.2 0 3.9-.5 5-1.5 1.1-1 1.6-2.7 1.6-5.1V41h8.7v24.6c0 5-1.5 8.9-4.5 11.5-3 2.6-7.3 4-12.8 4-5.6 0-9.8-1.4-12.8-4-3-2.6-4.5-6.5-4.5-11.5V41z"/>
  </svg>`,

  "openai.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="64" fill="#10a37f"/>
    <path fill="#ffffff" d="M101.4 56.6a24.8 24.8 0 0 0-2.3-17.7 25.6 25.6 0 0 0-19.1-13.2 24.9 24.9 0 0 0-22.3-5.2 25.5 25.5 0 0 0-16.7 16 25 25 0 0 0-14.7 10.7 25.5 25.5 0 0 0-2.4 22.9 24.8 24.8 0 0 0 2.3 17.7 25.6 25.6 0 0 0 19.1 13.2 24.9 24.9 0 0 0 22.3 5.2 25.5 25.5 0 0 0 16.7-16 25 25 0 0 0 14.7-10.7 25.5 25.5 0 0 0 2.4-22.9zM64 74a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"/>
  </svg>`,

  "redis.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#d82c20" d="M16 22l48-18 48 18v84l-48 18-48-18V22z"/>
    <path fill="#a32118" d="M64 4l48 18v84l-48 18V4z"/>
    <ellipse cx="64" cy="64" rx="28" ry="14" fill="#ffffff" opacity=".9"/>
    <path fill="#d82c20" d="M52 64a12 6 0 1 0 24 0 12 6 0 1 0-24 0z"/>
  </svg>`,

  "mongodb.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#13aa52" d="M64 2c-3.1 5.3-24.6 37.1-24.6 62.7 0 25.3 18.6 47.9 23.3 53.4.9 1.1 1.9 2.5 1.3 5.2.9-1.2 2-3.1 2.7-4.4 7.6-13.8 21.9-33.1 21.9-54.2C88.6 39.1 67.1 7.3 64 2z"/>
    <path fill="#116149" d="M64 2v122c-.9 1.2-2 3.1-2.7 4.4 7.6-13.8 21.9-33.1 21.9-54.2C83.2 46.3 67.1 11.4 64 2z"/>
  </svg>`,

  "graphql.svg": `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#e10098" d="M64 8.5L16 36.2v55.5L64 119.5l48-27.8V36.2L64 8.5zm0 14.1l36 20.8v41.6L64 105.7 28 85V43.4L64 22.6z"/>
    <circle cx="64" cy="8.5" r="8" fill="#e10098"/>
    <circle cx="16" cy="36.2" r="8" fill="#e10098"/>
    <circle cx="16" cy="91.7" r="8" fill="#e10098"/>
    <circle cx="64" cy="119.5" r="8" fill="#e10098"/>
    <circle cx="112" cy="91.7" r="8" fill="#e10098"/>
    <circle cx="112" cy="36.2" r="8" fill="#e10098"/>
  </svg>`
};

// Clean, high-contrast, modern brand logos for partners
const brandLogos = {
  "himalayan-edu.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#ff4d1f"/>
    <path d="M12 36L20 22L28 36M16 31h8" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    <text x="50" y="32" fill="#ffffff" font-size="16" font-weight="700" font-family="sans-serif">Himalayan</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">EDUCATION</text>
  </svg>`,

  "vidyavriddhi.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#3b82f6"/>
    <path d="M20 18L30 25L20 32L10 25Z" fill="#ffffff"/>
    <path d="M14 28V36C14 38 20 42 20 42C20 42 26 38 26 36V28" stroke="#ffffff" stroke-width="2"/>
    <text x="50" y="32" fill="#ffffff" font-size="15" font-weight="700" font-family="sans-serif">Vidyavriddhi</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">EDTECH PLATFORM</text>
  </svg>`,

  "raam-group.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#e11d48"/>
    <circle cx="20" cy="30" r="10" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M16 26L24 34M24 26L16 34" stroke="#ffffff" stroke-width="2"/>
    <text x="50" y="32" fill="#ffffff" font-size="16" font-weight="800" font-family="sans-serif">RAAM</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="600" font-family="sans-serif">AUTOMOTIVE</text>
  </svg>`,

  "smartshakti.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#10b981"/>
    <path d="M22 18L14 31H22L18 42L28 28H20L22 18Z" fill="#ffffff"/>
    <text x="50" y="32" fill="#ffffff" font-size="16" font-weight="700" font-family="sans-serif">SmartShakti</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">CRM &amp; LEADS</text>
  </svg>`,

  "collegeduniya.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#f59e0b"/>
    <circle cx="20" cy="30" r="9" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M20 21V30L26 34" stroke="#ffffff" stroke-width="2"/>
    <text x="50" y="32" fill="#ffffff" font-size="15" font-weight="700" font-family="sans-serif">CollegeDuniya</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">PORTAL</text>
  </svg>`,

  "geniefolks.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#8b5cf6"/>
    <circle cx="20" cy="27" r="5" fill="#ffffff"/>
    <path d="M12 40C12 35 15 33 20 33C25 33 28 35 28 40" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    <text x="50" y="32" fill="#ffffff" font-size="16" font-weight="700" font-family="sans-serif">Geniefolks</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">COMMUNITY</text>
  </svg>`,

  "northline.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#0284c7"/>
    <path d="M12 35L20 20L28 35H12Z" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="50" y="32" fill="#ffffff" font-size="15" font-weight="700" font-family="sans-serif">Northline</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">LOGISTICS APP</text>
  </svg>`,

  "sector4.svg": `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="10" rx="10" fill="#64748b"/>
    <rect x="14" y="24" width="12" height="12" rx="3" stroke="#ffffff" stroke-width="2.5"/>
    <text x="50" y="32" fill="#ffffff" font-size="16" font-weight="700" font-family="sans-serif">Sector 4</text>
    <text x="50" y="45" fill="#a0a0a0" font-size="11" font-weight="500" font-family="sans-serif">VENTURES</text>
  </svg>`
};

for (const [name, content] of Object.entries(techLogos)) {
  fs.writeFileSync(path.join(techDir, name), content.trim());
}

for (const [name, content] of Object.entries(brandLogos)) {
  fs.writeFileSync(path.join(brandsDir, name), content.trim());
}

console.log(`Generated ${Object.keys(techLogos).length} tech SVGs and ${Object.keys(brandLogos).length} brand SVGs!`);
