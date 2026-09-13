export type PortfolioProject = {
	id: string;
	contribution?: string[];
	stack?: { label: string; items: string[] }[];
	gallery?: {
		src?: string;
		caption: string;
		layout?: "wide" | "half" | "third";
	}[];
	title: string;
	primaryCategory: string;
	categories: string[];
	technologies: string[];
	role: string;
	year?: string;
	description: string;
	details?: string[];
	github?: string;
	demo?: string;
	figma?: string;
	featured?: boolean;
	visual: "signal" | "grid" | "route" | "map" | "mobile" | "archive";
};

export const projects: PortfolioProject[] = [
	{
		id: "mbelys",
		title: "MBELYS",
		primaryCategory: "IoT · ML · Cloud",
		categories: ["IoT","AI / ML","Cloud","Systems","Data / Analytics"],
		technologies: ["GCP", "Firebase", "IoT", "Machine Learning"],
		role: "Team Member · System Analyst / Developer",
		year: "2025",
		description:
			"IoT-based goat sound analysis system for stress and reproductive activity detection.",
		details: [
			"Designed system architecture and workflow across IoT, machine learning, mobile application, and cloud services.",
			"Handled the Google Cloud integration and prediction data flow into Firebase.",
		],
		featured: true,
		visual: "signal",
	},
	{
		id: "contentbay",
		title: "ContentBay",
		primaryCategory: "Software Engineering",
		categories: ["Software","Systems","Web Development"],
		technologies: ["Web", "System Analysis"],
		role: "Developer & System Analyst",
		description:
			"Contributed to requirements understanding, system workflows, and web application development.",
		github: "https://github.com/DavinTanaya/ContentBay",
		demo: "https://contentbay.tech/",
		featured: true,
		visual: "grid",
	},
	{
		id: "indobert",
		title: "IndoBERT News Classification",
		primaryCategory: "AI · NLP",
		categories: ["AI / ML","NLP / Text Mining","Data / Analytics"],
		technologies: [
			"IndoBERT",
			"PyTorch",
			"HuggingFace Transformers",
			"Sastrawi",
			"NLTK",
		],
		role: "AI / NLP Developer",
		description:
			"Fine-tuned IndoBERT for Indonesian football and sports news classification across 2,276 articles and five classes.",
		details: [
			"Sources included Detik, Kompas, and Liputan6.",
			"Explored preprocessing, tokenization, fine-tuning, evaluation, and model comparison.",
		],
		github:
			"https://github.com/RichelleMarvela/IndoBERT-News-Classification.git",
		featured: true,
		visual: "archive",
	},
	{
		id: "summarization",
		title: "AQuaMUSE — Multi-Doc Summarization",
		primaryCategory: "NLP · Text Mining",
		categories: ["AI / ML","NLP / Text Mining","Data / Analytics"],
		technologies: ["AQuaMUSE", "BART-large-cnn", "RAKE", "KeyBERT", "PyTorch"],
		role: "ML Researcher",
		description:
			"Query-Based Multi-Document News Summarization with Keyword-Guided Abstractive Summarization.",
		details: [
			"Investigated whether statistical (RAKE) and semantic (KeyBERT MiniLM) keyword guidance improves BART-large-cnn abstractive summarization quality.",
			"Evaluated 8 experimental configurations across ROUGE, METEOR, and BERTScore metrics.",
		],
		github:
			"https://github.com/RichelleMarvela/QueryBased-Multinews-Aquamuse.git",
		featured: true,
		visual: "grid",
	},
	{
		id: "aqi",
		title: "Real-Time AQI Prediction",
		primaryCategory: "Data · Streaming",
		categories: ["AI / ML","Data / Analytics","Cloud","Systems"],
		technologies: ["Python", "Data Streaming", "Machine Learning"],
		role: "Data / ML Developer",
		description:
			"Real-time air quality prediction system built around streaming data, processing, monitoring, and ML integration.",
		github: "https://github.com/RichelleMarvela/real-time-aqi-prediction.git",
		featured: true,
		visual: "signal",
	},
	{
		id: "dgwo",
		title: "DGWO-F2OPT",
		primaryCategory: "Optimization · AI",
		categories: ["Optimization","AI / ML","Systems"],
		technologies: ["Grey Wolf Optimization", "Fuzzy Logic", "CVRPTW", "2-opt"],
		role: "Optimization Researcher",
		description:
			"Multi-objective humanitarian vehicle routing under flood disaster conditions with dynamic constraints.",
		details: [
			"Combines dynamic non-dominated Pareto archive, floating 2-opt local search, and Mamdani fuzzy logic.",
			"Benchmark: CVRPLIB A-n80-k10. Reported adjusted distance: 3,062.2 units; time-window penalty: 6,211.",
		],
		github: "https://github.com/RichelleMarvela/DGWO-Routing-Optimizer.git",
		featured: true,
		visual: "route",
	},
	{
		id: "orbi",
		title: "ORBI",
		primaryCategory: "AI · Accessibility",
		categories: ["AI / ML","Computer Vision","Software","UI/UX"],
		technologies: ["Python", "Flask", "OCR", "TTS", "Object Detection"],
		role: "Independent Developer",
		description:
			"AI assistive web application for visually impaired users with object detection, text recognition, text-to-speech, and location tracking.",
		github:
			"https://github.com/RichelleMarvela/Orbi-Assistive-AI-for-the-Visually-Impaired.git",
		featured: true,
		visual: "signal",
	},
	{
		id: "schola",
		title: "Schola",
		primaryCategory: "Full-Stack Web",
		categories: ["Software","UI/UX","Systems"],
		technologies: ["Laravel", "PHP", "JavaScript", "CSS"],
		role: "Full-Stack Developer / UI/UX",
		description:
			"Scholarship finder platform for discovering opportunities, applications, and provider information.",
		github: "https://github.com/RichelleMarvela/schola_lec.git",
		demo: "https://schola-lec-pzg9.vercel.app",
		visual: "grid",
	},
	{
		id: "emotion",
		title: "6-Class Emotion Classification",
		primaryCategory: "AI · NLP",
		categories: ["AI / ML","NLP / Text Mining","Data / Analytics"],
		technologies: ["DistilBERT", "BiGRU", "PyTorch"],
		role: "ML Researcher",
		description:
			"Text classification system for six emotion categories, comparing transformer and recurrent approaches.",
		github:
			"https://github.com/RichelleMarvela/6-Class-Emotion-Classifications.git",
		visual: "archive",
	},
	{
		id: "fruit",
		title: "Fruit & Rotten Fruit Classification",
		primaryCategory: "AI · Computer Vision",
		categories: ["AI / ML","Computer Vision","Data / Analytics"],
		technologies: [
			"PyTorch",
			"Torchvision",
			"Variational Autoencoders (VAE)",
			"Inception-v3 (FID)",
			"CUDA",
			"Computer Vision",
		],
		role: "ML / Computer Vision Researcher",
		year: "2024",
		description:
			"A computer vision and generative deep learning study modeling fresh vs. rotten fruit degradation through Variational Autoencoders (VAEs) with β-warmup scheduling, latent space distribution analysis, and Fréchet Inception Distance (FID) evaluation.",
		details: [
			"Conducted extensive dataset auditing across 5,219+ fruit images spanning 6 fresh and rotten classes (apples, bananas, oranges).",
			"Engineered custom EnsureRGB pipelines and normalized extreme resolution outliers from up to 8,256×6,000 px down to uniform 100×100 px.",
			"Designed and trained both a baseline VAE (3 Conv2D + 2 MaxPool) and an enhanced VAE with encoder BatchNorm2d, lightweight dropout (p=0.05), and a dynamic β-warmup KL annealing schedule.",
			"Benchmarked generative fidelity and feature distribution realism across all 6 classes using pretrained Inception-v3 Fréchet Inception Distance (FID), achieving a mean FID improvement to 441.63.",
		],
		github:
			"https://github.com/RichelleMarvela/Fruit-and-Rotten-Fruit-Classification.git",
		featured: true,
		visual: "signal",
	},
	{
		id: "nail-disease",
		title: "Nail Disease Classification",
		primaryCategory: "AI · Computer Vision",
		categories: ["AI / ML","Computer Vision","Data / Analytics"],
		technologies: [
			"PyTorch",
			"EfficientNet-B0",
			"Torchvision",
			"Scikit-learn",
			"Transfer Learning",
			"CUDA",
		],
		role: "Machine Learning / Deep Learning Researcher",
		year: "2024",
		description:
			"An image classification project using EfficientNet-B0 transfer learning to classify five nail conditions from digital images, with a focus on class imbalance, augmentation, and rigorous model evaluation.",
		details: [
			"Engineered stratified 70/15/15 train/val/test data splits across 2,205 images spanning 5 clinical classes, isolating an extreme 0.95% minority class (Acral Lentiginous Melanoma with only 21 samples).",
			"Implemented targeted 10x augmentation transforms (RandomRotation ±30°, Flips, ColorJitter, RandomResizedCrop) expanding minority class training samples from 21 to 231.",
			"Fine-tuned an ImageNet-pretrained EfficientNet-B0 backbone with frozen feature extraction, custom Dropout (p=0.2), and Adam optimization with early stopping at epoch 67.",
			"Achieved 94.26% validation accuracy and 0.94 weighted F1 on 331 unseen test images, analyzing macro vs. class-level trade-offs on the severe minority class.",
		],
		github:
			"https://github.com/RichelleMarvela/Nail-Disease-Classification-with-EfficientNet-B0.git",
		featured: true,
		visual: "signal",
	},
	{
		id: "car",
		title: "Car Price Prediction",
		primaryCategory: "Machine Learning · Regression",
		categories: ["AI / ML","Data / Analytics"],
		technologies: [
			"Python",
			"TensorFlow",
			"Keras",
			"Scikit-Learn",
			"Pandas",
			"NumPy",
		],
		role: "Machine Learning / Data Science",
		description:
			"An end-to-end machine learning regression pipeline predicting used car selling prices using an Artificial Neural Network, comprehensive feature engineering, and leakage-free encoding.",
		details: [
			"Trained a deep Artificial Neural Network with 3 hidden layers, Batch Normalization, and Dropout, boosting R² from -0.49 to 0.8634.",
			"Constructed custom regex parsers for complex torque and mileage string attributes and implemented target encoding strictly on train splits.",
		],
		github: "https://github.com/RichelleMarvela/Car-Price-Prediction.git",
		featured: true,
		visual: "grid",
	},
	{
		id: "youtube",
		title: "YouTube AI Education Analysis",
		primaryCategory: "Data · NLP",
		categories: ["Data / Analytics","NLP / Text Mining","AI / ML"],
		technologies: ["Python", "NLTK", "TF-IDF", "LDA", "BERTopic", "KMeans"],
		role: "Data Analyst",
		description:
			"NLP analysis of Indonesian YouTube comments using topic modeling, clustering, and persona analysis.",
		details: [
			"Analyzed 4,281 comments from five YouTube videos about AI in education.",
			"Identified discussion personas around human roles, optimism toward AI, and responses to speakers.",
		],
		github:
			"https://github.com/RichelleMarvela/YouTube-AI-Education-Analysis.git",
		visual: "archive",
	},
	{
		id: "flood",
		title: "GIS Banjir Jakarta",
		primaryCategory: "GIS · Data Analysis · System Analysis",
		categories: ["GIS","Data / Analytics","Systems","Software"],
		technologies: ["ArcGIS", "GeoJSON", "Web GIS"],
		role: "System Analyst · GIS/Data Handling",
		description:
			"Team Web GIS project consolidating flood-risk, waterway, population, and weather-related data for Jakarta.",
		github: "https://github.com/DeanFebrio/project_gis.git",
		demo: "https://project-gis-six.vercel.app/",
		visual: "map",
	},
	{
		id: "traffic",
		title: "AWS Smart City Traffic Management System",
		primaryCategory: "Cloud Architecture · AWS",
		categories: ["Cloud","IoT","AI / ML","Data / Analytics","Systems","Optimization"],
		technologies: ["AWS", "IoT", "Streaming", "AI/ML", "Big Data"],
		role: "Cloud Architecture / System Design",
		description:
			"Proposed AWS cloud architecture for realtime traffic monitoring, AI incident detection, smart signal optimization, emergency response, analytics, and cost-aware operations.",
		details: [
			"Designed seven architecture layers spanning IoT edge devices, streaming ingestion, AI processing, storage, analytics, application delivery, and security operations.",
			"Mapped traffic-management requirements to AWS services and documented the realtime data flow from sensors to intelligent traffic decisions.",
			"Estimated projected AWS workload cost and analyzed cost drivers, trade-offs, and potential optimization opportunities.",
		],
		visual: "grid",
	},
	{
		id: "bloo",
		title: "BLOO",
		primaryCategory: "IoT · Smart Agriculture",
		categories: ["IoT","Cloud","Systems","Software"],
		technologies: [
			"ESP32",
			"Firebase",
			"DHT22",
			"Soil Moisture",
			"Raindrop Sensor",
			"Servo",
			"Relay",
		],
		role: "IoT Developer · Embedded Systems",
		year: "2025",
		description:
			"A smart agriculture IoT system that monitors environmental conditions and automatically controls irrigation and a protective roof through ESP32 and Firebase.",
		details: [
			"Designed and implemented the complete IoT system 100% independently using ESP32 as the primary microcontroller.",
			"Integrated DHT22, soil moisture probe, rain sensor plate, relay-driven water pump, SG90 servo roof mechanism, and 16x2 LCD status display.",
			"Programmed autonomous sensor threshold logic and two-way Firebase Realtime Database telemetry and mobile remote control.",
		],
		github: "https://github.com/DeanFebrio/Bloo---SmartFarm",
		featured: true,
		visual: "signal",
	},
	{
		id: "serenesoul",
		title: "Serene Soul",
		primaryCategory: "UI/UX · Mental Health",
		categories: ["UI/UX","Software"],
		technologies: [
			"Figma",
			"User Research",
			"HCI",
			"Prototyping",
			"Design System",
		],
		role: "Product Designer",
		year: "2024",
		description:
			"Calming mental health mobile application designed to make self-assessment, mood tracking, and professional consultation accessible, private, and stigma-free.",
		details: [
			"Conducted user research with 8 respondents (100% interest) targeting young people aged 15–25 across Indonesia.",
			"Designed end-to-end mobile user flows combining self-assessment, daily mood tracking, habit formation, and online psychologist discovery.",
			"Developed a calming, approachable healthcare design system with soft pastel tones, friendly mascots, and high-contrast typography.",
		],
		figma: "https://bit.ly/SereneSoul-Prototype",
		featured: true,
		visual: "mobile",
	},
	{
		id: "jci",
		title: "JCI — Drone Innovation",
		primaryCategory: "Web Design · Frontend",
		categories: ["Software","UI/UX"],
		technologies: [
			"Figma",
			"HTML5",
			"CSS3",
			"JavaScript",
			"Google Maps Embed",
			"Poppins",
		],
		role: "UI/UX Designer · Frontend Developer",
		year: "2024",
		description:
			"Designed and developed a responsive multi-page website for JCI, a fictional drone brand focused on product discovery, community engagement, retail access, and customer support.",
		details: [
			"Designed end-to-end multi-page user flows and high-fidelity interface layouts across Home, Product, Store (Online/Offline), Forum, and Contact in Figma.",
			"Built an interactive Figma prototype to validate user journeys, mobile app promotional sections, category switching, and inquiry workflows.",
			"Translated approved designs into a responsive multi-page web implementation utilizing semantic HTML5, centralized CSS3 variables/Grid/Flexbox, and vanilla JavaScript.",
		],
		github: "https://github.com/RichelleMarvela/JCI-Drone-Website.git",
		figma:
			"https://www.figma.com/design/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=0-1&t=TTAxipLSmkXdGxXN-1",
		demo: "https://www.figma.com/proto/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=54-87&p=f&t=msEjp0SxyaS2HFks-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=134%3A1478",
		featured: true,
		visual: "grid",
	},
	{
		id: "aurame",
		title: "Aurame",
		primaryCategory: "UI/UX · E-Commerce",
		categories: ["UI/UX","Software"],
		technologies: ["Figma", "Web Design"],
		role: "Product Designer",
		description:
			"UMKM e-commerce website design focused on product presentation, digital marketing, accessibility, and purchase flow.",
		figma: "https://bit.ly/Aurame-ecommerceUMKM",
		visual: "mobile",
	},
];

export const PROJECT_CATEGORIES = [
	"ALL",
	"SOFTWARE",
	"AI / ML",
	"NLP / TEXT MINING",
	"DATA / ANALYTICS",
	"COMPUTER VISION",
	"CLOUD",
	"IoT",
	"SYSTEMS",
	"OPTIMIZATION",
	"GIS",
	"UI/UX",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export const areas = PROJECT_CATEGORIES;

export function normalizeCategory(cat: string): string {
	const c = (cat || "").trim().toUpperCase().replace(/\s*&\s*/g, " / ");
	if (c === "IOT" || c === "INTERNET OF THINGS") return "IOT";
	if (c === "AI / ML" || c === "AI" || c === "ML" || c === "MACHINE LEARNING" || c === "DEEP LEARNING" || c === "AI/ML") return "AI / ML";
	if (c === "NLP / TEXT MINING" || c === "NLP" || c === "TEXT MINING" || c === "NLP/TEXT MINING") return "NLP / TEXT MINING";
	if (c === "DATA / ANALYTICS" || c === "DATA" || c === "ANALYTICS" || c === "DATA SCIENCE" || c === "DATA ANALYSIS") return "DATA / ANALYTICS";
	if (c === "COMPUTER VISION" || c === "CV" || c === "VISION" || c === "IMAGE CLASSIFICATION") return "COMPUTER VISION";
	if (c === "CLOUD" || c === "CLOUD ARCHITECTURE" || c === "AWS" || c === "GCP") return "CLOUD";
	if (c === "SOFTWARE" || c === "SOFTWARE ENGINEERING" || c === "WEB DEVELOPMENT" || c === "FRONTEND" || c === "FULL-STACK" || c === "WEB") return "SOFTWARE";
	if (c === "UI/UX" || c === "UI / UX" || c === "PRODUCT DESIGN" || c === "WEB DESIGN" || c === "HCI") return "UI/UX";
	if (c === "SYSTEMS" || c === "SYSTEM ANALYSIS" || c === "SYSTEM ARCHITECTURE" || c === "EMBEDDED" || c === "AUTOMATION") return "SYSTEMS";
	if (c === "OPTIMIZATION" || c === "MATHEMATICS / OPTIMIZATION" || c === "ALGORITHMS") return "OPTIMIZATION";
	if (c === "GIS" || c === "WEB GIS") return "GIS";
	return c;
}

export function matchesCategory(project: PortfolioProject, category: string): boolean {
	if (!category || category.trim().toUpperCase() === "ALL") return true;
	const target = normalizeCategory(category);

	// 1. Direct match in project categories
	if (project.categories && project.categories.some((c) => normalizeCategory(c) === target)) {
		return true;
	}

	// 2. Direct match or part in primaryCategory
	if (project.primaryCategory) {
		const normalizedPrimary = normalizeCategory(project.primaryCategory);
		if (normalizedPrimary === target) return true;
		const parts = project.primaryCategory.split(/[·,/|]/).map(p => normalizeCategory(p.trim()));
		if (parts.includes(target)) return true;
	}

	// 3. Match in technologies if directly related to a distinct discipline (e.g. IoT)
	if (target === "IOT" && project.technologies && project.technologies.some(t => normalizeCategory(t) === "IOT")) {
		return true;
	}

	return false;
}
export interface ExperienceItem {
	organization: string;
	role: string;
	period: string;
	current?: boolean;
	description: string;
	tags?: string[];
}

export const experienceItems: ExperienceItem[] = [
	{
		organization: "ContentBay",
		role: "Developer & System Analyst",
		period: "2026 — Present",
		current: true,
		description:
			"Contributed to requirements understanding, system workflows, and web application development for the platform.",
		tags: ["Software Engineering", "Systems", "Web"],
	},
	{
		organization: "MBELYS",
		role: "Team Member — PKM-KC Funded Project",
		period: "2025",
		current: false,
		description:
			"Designed system architecture and data pipelines for an IoT-based goat sound analysis system detecting stress and reproductive activity.",
		tags: ["IoT", "ML", "GCP", "Firebase", "System Architecture"],
	},
	{
		organization: "SASC",
		role: "Scholarship Mentor & Tutor",
		period: "2024 — Present",
		current: true,
		description:
			"Mentoring students from different majors and supporting sustained academic progress.",
		tags: ["Mentorship", "Academic Support", "Peer Tutoring"],
	},
	{
		organization: "SASC",
		role: "Scholarship Tutor — Scientific Computing",
		period: "2025",
		current: false,
		description:
			"Assisted students with Python programming and scientific computing problem solving.",
		tags: ["Python", "Scientific Computing", "Problem Solving"],
	},
	{
		organization: "MATIC 2025",
		role: "Head of Publication & Documentation",
		period: "2024 — 2025",
		current: false,
		description:
			"Led publication and documentation activities, coordinating visual identity and event media coverage.",
		tags: ["Creative Direction", "Documentation", "Team Leadership"],
	},
	{
		organization: "HIMMAT Welcoming Party",
		role: "Publication & Documentation Staff",
		period: "2024",
		current: false,
		description:
			"Designed event communication materials and visual presentation assets.",
		tags: ["Visual Design", "Media", "Event Operations"],
	},
];

export const experience = [
	[
		"ContentBay",
		"Developer & System Analyst",
		"Contributed to development and system analysis for the platform.",
	],
	[
		"MBELYS",
		"Team Member — PKM-KC Funded Project",
		"2025 · IoT · ML · GCP · Firebase · System Architecture",
	],
	[
		"MATIC 2025",
		"Head of Publication & Documentation",
		"Led publication/documentation activities and coordinated visual materials.",
	],
	[
		"HIMMAT Welcoming Party",
		"Publication & Documentation Staff",
		"Designed event communication materials.",
	],
	[
		"SASC",
		"Scholarship Tutor — Scientific Computing",
		"2025 · Assisted students with Python programming and scientific computing problem solving.",
	],
	[
		"SASC",
		"Scholarship Mentor & Tutor",
		"2024 — Present · Mentoring students from different majors and supporting academic progress.",
	],
];

export const skills = {
	SOFTWARE: "Python · JavaScript · C · PHP · HTML · CSS",
	WEB: "Flask · Laravel · Full-Stack Development · REST/API · Responsive Web",
	"AI / ML":
		"Machine Learning · Deep Learning · Computer Vision · Model Evaluation · Hyperparameter Tuning",
	NLP: "BERT · IndoBERT · DistilBERT · BiLSTM · BiGRU · Text Classification · Topic Modeling",
	DATA: "Python · Pandas · NumPy · SQL · Data Analysis · Data Visualization",
	CLOUD: "Google Cloud Platform · AWS · Firebase",
	SYSTEMS: "System Analysis · System Architecture · IoT · Data Streaming",
	OPTIMIZATION:
		"VRP · CVRPTW · Fuzzy Logic · Grey Wolf Optimization · Multi-Objective Optimization",
	DESIGN: "Figma · UI/UX · HCI · Prototyping",
};
export const social = {
	github: "https://github.com/RichelleMarvela",
	linkedin: "https://www.linkedin.com/in/richelle-marvela-0b32b02b8/",
	email: "mailto:richellemarvela27@gmail.com",
};
