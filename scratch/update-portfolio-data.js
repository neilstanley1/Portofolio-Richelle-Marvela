const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, '..', 'src', 'data', 'portfolio.ts');
let content = fs.readFileSync(portfolioPath, 'utf8');

// The updated categories for each project by id
const updatedCategories = {
  "mbelys": ["IoT", "AI / ML", "Cloud", "Systems", "Data / Analytics"],
  "contentbay": ["Software", "Systems", "Web Development"],
  "indobert": ["AI / ML", "NLP / Text Mining", "Data / Analytics"],
  "summarization": ["AI / ML", "NLP / Text Mining", "Data / Analytics"],
  "aqi": ["AI / ML", "Data / Analytics", "Cloud", "Systems"],
  "dgwo": ["Optimization", "AI / ML", "Systems"],
  "orbi": ["AI / ML", "Computer Vision", "Software", "UI/UX"],
  "schola": ["Software", "UI/UX", "Systems"],
  "emotion": ["AI / ML", "NLP / Text Mining", "Data / Analytics"],
  "fruit": ["AI / ML", "Computer Vision", "Data / Analytics"],
  "nail-disease": ["AI / ML", "Computer Vision", "Data / Analytics"],
  "car": ["AI / ML", "Data / Analytics"],
  "youtube": ["Data / Analytics", "NLP / Text Mining", "AI / ML"],
  "flood": ["GIS", "Data / Analytics", "Systems", "Software"],
  "traffic": ["Cloud", "IoT", "AI / ML", "Data / Analytics", "Systems", "Optimization"],
  "bloo": ["IoT", "Cloud", "Systems", "Software"],
  "serenesoul": ["UI/UX", "Software"],
  "jci": ["Software", "UI/UX"],
  "aurame": ["UI/UX", "Software"]
};

// Update each project's categories
for (const [id, cats] of Object.entries(updatedCategories)) {
  const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?categories:\\s*)\\[[^\\]]*\\]`);
  if (!regex.test(content)) {
    console.error(`Could not find categories for ${id}`);
  } else {
    content = content.replace(regex, `$1${JSON.stringify(cats)}`);
    console.log(`Updated categories for ${id}`);
  }
}

// Update areas and add category normalization helpers
const oldAreasRegex = /export const areas = \[[^\]]*\];/;
const newAreasAndHelpers = `export const PROJECT_CATEGORIES = [
\t"ALL",
\t"SOFTWARE",
\t"AI / ML",
\t"NLP / TEXT MINING",
\t"DATA / ANALYTICS",
\t"COMPUTER VISION",
\t"CLOUD",
\t"IoT",
\t"SYSTEMS",
\t"OPTIMIZATION",
\t"GIS",
\t"UI/UX",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export const areas = PROJECT_CATEGORIES;

export function normalizeCategory(cat: string): string {
\tconst c = (cat || "").trim().toUpperCase().replace(/\\s*&\\s*/g, " / ");
\tif (c === "IOT" || c === "INTERNET OF THINGS") return "IOT";
\tif (c === "AI / ML" || c === "AI" || c === "ML" || c === "MACHINE LEARNING" || c === "DEEP LEARNING" || c === "AI/ML") return "AI / ML";
\tif (c === "NLP / TEXT MINING" || c === "NLP" || c === "TEXT MINING" || c === "NLP/TEXT MINING") return "NLP / TEXT MINING";
\tif (c === "DATA / ANALYTICS" || c === "DATA" || c === "ANALYTICS" || c === "DATA SCIENCE" || c === "DATA ANALYSIS") return "DATA / ANALYTICS";
\tif (c === "COMPUTER VISION" || c === "CV" || c === "VISION" || c === "IMAGE CLASSIFICATION") return "COMPUTER VISION";
\tif (c === "CLOUD" || c === "CLOUD ARCHITECTURE" || c === "AWS" || c === "GCP") return "CLOUD";
\tif (c === "SOFTWARE" || c === "SOFTWARE ENGINEERING" || c === "WEB DEVELOPMENT" || c === "FRONTEND" || c === "FULL-STACK" || c === "WEB") return "SOFTWARE";
\tif (c === "UI/UX" || c === "UI / UX" || c === "PRODUCT DESIGN" || c === "WEB DESIGN" || c === "HCI") return "UI/UX";
\tif (c === "SYSTEMS" || c === "SYSTEM ANALYSIS" || c === "SYSTEM ARCHITECTURE" || c === "EMBEDDED" || c === "AUTOMATION") return "SYSTEMS";
\tif (c === "OPTIMIZATION" || c === "MATHEMATICS / OPTIMIZATION" || c === "ALGORITHMS") return "OPTIMIZATION";
\tif (c === "GIS" || c === "WEB GIS") return "GIS";
\treturn c;
}

export function matchesCategory(project: PortfolioProject, category: string): boolean {
\tif (!category || category.trim().toUpperCase() === "ALL") return true;
\tconst target = normalizeCategory(category);

\t// 1. Direct match in project categories
\tif (project.categories && project.categories.some((c) => normalizeCategory(c) === target)) {
\t\treturn true;
\t}

\t// 2. Direct match or part in primaryCategory
\tif (project.primaryCategory) {
\t\tconst normalizedPrimary = normalizeCategory(project.primaryCategory);
\t\tif (normalizedPrimary === target) return true;
\t\tconst parts = project.primaryCategory.split(/[·,/|]/).map(p => normalizeCategory(p.trim()));
\t\tif (parts.includes(target)) return true;
\t}

\t// 3. Match in technologies if directly related to a distinct discipline (e.g. IoT)
\tif (target === "IOT" && project.technologies && project.technologies.some(t => normalizeCategory(t) === "IOT")) {
\t\treturn true;
\t}

\treturn false;
}`;

if (oldAreasRegex.test(content)) {
  content = content.replace(oldAreasRegex, newAreasAndHelpers);
  console.log('Updated areas with PROJECT_CATEGORIES and helper functions');
} else {
  console.error('Could not find old areas array');
}

fs.writeFileSync(portfolioPath, content, 'utf8');
console.log('Successfully updated portfolio.ts');
