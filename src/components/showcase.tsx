"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
	areas,
	projects,
	skills,
	type PortfolioProject,
} from "@/src/data/portfolio";

import { TechIcon } from "./tech-icons";

type Certificate = {
	title: string;
	issuer: string;
	category: string;
	skill: string;
	description: string;
	url: string;
	date?: string;
	previewImage?: string;
	previewLabel: string;
	previewTone: string;
};

export const certificates: Certificate[] = [
	{
		title: "ISO/IEC 27001 Information Security Associate™",
		issuer: "SkillFront",
		category: "CLOUD & SECURITY",
		skill: "Information Security",
		description:
			"Associate certification covering information security principles and ISO/IEC 27001 foundations.",
		url: "https://www.skillfront.com/Badges/45968698887533",
		date: "August 28, 2026",
		previewLabel: "SKILLFRONT",
		previewTone: "skillfront",
	},
	{
		title: "Fundamentals of Deep Learning",
		issuer: "NVIDIA",
		category: "AI / MACHINE LEARNING",
		skill: "Deep Learning",
		description:
			"Certificate of competency for completing NVIDIA Fundamentals of Deep Learning.",
		url: "https://learn.nvidia.com/certificates?id=EvJIWjKYQASFP1I0Dw15WA",
		date: "October 18, 2025",
		previewLabel: "NVIDIA DLI",
		previewTone: "nvidia",
	},
	{
		title: "Data Analysis with Python",
		issuer: "Cognitive Class",
		category: "DATA & ANALYTICS",
		skill: "Python · Data Analysis",
		description:
			"Certificate for completing the Data Analysis with Python course provided through IBM Skills Network.",
		url: "https://courses.cognitiveclass.ai/certificates/8d664565029d43d7a581ad920a2a8376",
		date: "August 13, 2025",
		previewLabel: "COGNITIVE CLASS",
		previewTone: "cognitive",
	},
	{
		title: "Data Analysis Using Python",
		issuer: "IBM",
		category: "DATA & ANALYTICS",
		skill: "Python · Jupyter · Data Analysis",
		description:
			"Credly badge for analyzing data with Python, pandas, SciPy, scikit-learn, and JupyterLab.",
		url: "https://www.credly.com/badges/9e13b8f0-0055-4b90-a70a-7b97f7169d38/linked_in_profile",
		date: "August 13, 2025",
		previewImage:
			"https://images.credly.com/size/340x340/images/f5bb6420-710c-4508-bd1f-df3a9d3fafb0/blob",
		previewLabel: "CREDLY BADGE",
		previewTone: "credly",
	},
	{
		title: "Python (Basic) Certificate",
		issuer: "HackerRank",
		category: "PROGRAMMING",
		skill: "Python",
		description:
			"Skills certification covering Python scalar types, operators, control flow, collections, and classes.",
		url: "https://www.hackerrank.com/certificates/f49ba12a5525",
		previewLabel: "HACKERRANK",
		previewTone: "hackerrank",
	},
	{
		title: "SQL (Basic) Certificate",
		issuer: "HackerRank",
		category: "DATA & ANALYTICS",
		skill: "SQL",
		description:
			"Skills certification covering basic SQL queries, relationships, and aggregators.",
		url: "https://www.hackerrank.com/certificates/13bc86298aab",
		previewLabel: "HACKERRANK",
		previewTone: "hackerrank",
	},
	{
		title: "SQL (Intermediate) Certificate",
		issuer: "HackerRank",
		category: "DATA & ANALYTICS",
		skill: "SQL",
		description:
			"Skills certification covering complex joins, unions, and sub-queries.",
		url: "https://www.hackerrank.com/certificates/40323e7f72e2",
		previewLabel: "HACKERRANK",
		previewTone: "hackerrank",
	},
	{
		title: "AWS Educate Introduction to Generative AI - Training Badge",
		issuer: "Amazon Web Services Training and Certification",
		category: "AI / MACHINE LEARNING",
		skill: "Generative AI · AWS",
		description:
			"Training badge for completing the AWS Educate Introduction to Generative AI assessment.",
		url: "https://www.credly.com/badges/a711da9d-fd85-40e7-a5dc-1cbc9135e3f9/linked_in_profile",
		date: "August 12, 2025",
		previewImage:
			"https://images.credly.com/size/340x340/images/e50c657a-edd9-4c93-b1cf-2b6634b54abf/blob",
		previewLabel: "CREDLY BADGE",
		previewTone: "credly",
	},
	{
		title: "SQL and Relational Databases 101",
		issuer: "Cognitive Class",
		category: "DATA & ANALYTICS",
		skill: "SQL · Databases",
		description:
			"Certificate for completing SQL and Relational Databases 101 through IBM Skills Network.",
		url: "https://courses.cognitiveclass.ai/certificates/7ab0243db3154eb9a2e343372fa4c330",
		date: "August 12, 2025",
		previewLabel: "COGNITIVE CLASS",
		previewTone: "cognitive",
	},
	{
		title: "Foundations: Data, Data, Everywhere",
		issuer: "Google · Coursera",
		category: "DATA & ANALYTICS",
		skill: "Data Analytics",
		description:
			"Google-authorized course covering data ecosystems, analytical thinking, SQL, and data visualization.",
		url: "https://www.coursera.org/account/accomplishments/verify/TOE0Z5GAMR2K",
		date: "August 12, 2025",
		previewImage:
			"https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TOE0Z5GAMR2K/CERTIFICATE_LANDING_PAGE~TOE0Z5GAMR2K.jpeg",
		previewLabel: "COURSERA",
		previewTone: "coursera",
	},
];

const certificateCategories = [
	"ALL",
	...Array.from(
		new Set(certificates.map((certificate) => certificate.category)),
	),
];

function CertificatePreview({ certificate }: { certificate: Certificate }) {
	return (
		<div
			className={`certificate-art certificate-art-${certificate.previewTone}`}
		>
			{certificate.previewImage ? (
				<img
					src={certificate.previewImage}
					alt={`${certificate.title} preview`}
					loading="lazy"
				/>
			) : (
				<div className="certificate-source-preview">
					<span className="certificate-source-mark">
						{certificate.previewLabel}
					</span>
					<strong>{certificate.title}</strong>
					<small>VERIFICATION SOURCE</small>
				</div>
			)}
		</div>
	);
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
	return (
		<article className="certificate-card reveal is-visible">
			<a
				className="certificate-preview-link"
				href={certificate.url}
				target="_blank"
				rel="noreferrer"
				aria-label={`Verify ${certificate.title}`}
			>
				<CertificatePreview certificate={certificate} />
			</a>
			<div className="certificate-copy">
				<small>{certificate.category}</small>
				<h2>{certificate.title}</h2>
				<p className="certificate-issuer">{certificate.issuer}</p>
				<p className="certificate-description">{certificate.description}</p>
				<div className="certificate-meta">
					{certificate.date && <span>ISSUED {certificate.date}</span>}
					<span>{certificate.skill}</span>
				</div>
				<a
					className="certificate-cta"
					href={certificate.url}
					target="_blank"
					rel="noreferrer"
				>
					VERIFY CREDENTIAL <ArrowUpRight aria-hidden="true" />
				</a>
			</div>
		</article>
	);
}

export function CertificateGrid({ preview = false }: { preview?: boolean }) {
	const [activeCategory, setActiveCategory] = useState("ALL");
	const items = preview
		? certificates.slice(0, 3)
		: activeCategory === "ALL"
			? certificates
			: certificates.filter(
					(certificate) => certificate.category === activeCategory,
				);

	return (
		<>
			{!preview && (
				<div
					className="certificate-controls"
					aria-label="Filter certificates by category"
				>
					{certificateCategories.map((category) => (
						<button
							key={category}
							className={activeCategory === category ? "active" : ""}
							onClick={() => setActiveCategory(category)}
						>
							{category}
						</button>
					))}
				</div>
			)}
			<div
				className={`certificate-grid ${preview ? "certificate-preview-grid" : ""}`}
			>
				{items.map((certificate) => (
					<CertificateCard certificate={certificate} key={certificate.url} />
				))}
			</div>
		</>
	);
}

export const homepageTechDock = [
	{
		category: "ALL",
		label: "ALL TECH",
		items: [
			"Python",
			"PyTorch",
			"React",
			"Google Cloud",
			"Figma",
			"SQL",
			"TensorFlow",
			"Next.js",
			"Pandas",
			"AWS",
			"JavaScript",
			"IndoBERT",
		],
	},
	{
		category: "AI / ML & NLP",
		label: "AI / ML & NLP",
		items: [
			"PyTorch",
			"TensorFlow",
			"Scikit-Learn",
			"BERT",
			"IndoBERT",
			"Hugging Face",
			"Computer Vision",
			"DistilBERT",
		],
	},
	{
		category: "DATA & ANALYTICS",
		label: "DATA & ANALYTICS",
		items: [
			"Python",
			"Pandas",
			"NumPy",
			"SQL",
			"Data Streaming",
			"Topic Modeling",
		],
	},
	{
		category: "SOFTWARE & WEB",
		label: "SOFTWARE & WEB",
		items: [
			"JavaScript",
			"TypeScript",
			"React",
			"Next.js",
			"Flask",
			"Laravel",
			"PHP",
			"C",
			"HTML5",
			"CSS3",
		],
	},
	{
		category: "CLOUD & DEVOPS",
		label: "CLOUD & DEVOPS",
		items: [
			"Google Cloud",
			"AWS",
			"Firebase",
			"IoT",
			"System Architecture",
			"Sensors",
		],
	},
	{
		category: "DESIGN & PRODUCT",
		label: "DESIGN & PRODUCT",
		items: ["Figma", "UI/UX", "Prototyping", "HCI", "Web Design", "Git"],
	},
	{
		category: "DATABASE & GIS",
		label: "DATABASE & GIS",
		items: ["SQL", "Firebase", "ArcGIS", "GeoJSON", "CVRPTW", "Fuzzy Logic"],
	},
];

export function ToolsGrid({ preview = false }: { preview?: boolean }) {
	const [activeCategory, setActiveCategory] = useState("ALL");
	const [startIndex, setStartIndex] = useState(0);
	const itemsPerPage = 6;

	const handleCategoryChange = (cat: string) => {
		setActiveCategory(cat);
		setStartIndex(0);
	};

	const currentGroup =
		homepageTechDock.find((g) => g.category === activeCategory) ||
		homepageTechDock[0];

	const canPrev = startIndex > 0;
	const canNext = startIndex + itemsPerPage < currentGroup.items.length;

	const visibleItems = currentGroup.items.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const handleNext = () => {
		if (canNext)
			setStartIndex((prev) =>
				Math.min(prev + itemsPerPage, currentGroup.items.length - itemsPerPage),
			);
	};

	const handlePrev = () => {
		if (canPrev) setStartIndex((prev) => Math.max(0, prev - itemsPerPage));
	};

	const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
	const totalPages = Math.ceil(currentGroup.items.length / itemsPerPage);

	if (preview) {
		return (
			<div className="tech-explorer-container">
				{/* Horizontal Category Tab Strip */}
				<div className="tech-tab-strip">
					{homepageTechDock.map((g) => (
						<button
							key={g.category}
							className={`tech-tab-btn ${activeCategory === g.category ? "active" : ""}`}
							onClick={() => handleCategoryChange(g.category)}
						>
							{g.label}
						</button>
					))}
				</div>

				{/* Section Sub-Header & Dynamic Page Indicators */}
				<div className="tech-dock-header">
					<p className="eyebrow accent">
						{currentGroup.label} — {currentGroup.items.length} TECHNOLOGIES
					</p>
					{currentGroup.items.length > itemsPerPage && (
						<div className="tech-carousel-controls">
							<span className="tech-carousel-indicator">
								{String(currentPage).padStart(2, "0")} —{" "}
								{String(totalPages).padStart(2, "0")}
							</span>
							<div className="tech-dot-indicators" aria-hidden="true">
								{Array.from({ length: totalPages }).map((_, idx) => (
									<button
										key={idx}
										className={`tech-dot ${currentPage === idx + 1 ? "active" : ""}`}
										onClick={() => setStartIndex(idx * itemsPerPage)}
										aria-label={`Page ${idx + 1}`}
									/>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Carousel Grid Wrapper with Flanking Navigation Arrows */}
				<div className="tech-carousel-wrapper">
					{currentGroup.items.length > itemsPerPage && (
						<button
							className="tech-nav-arrow tech-nav-arrow-left"
							onClick={handlePrev}
							disabled={!canPrev}
							aria-label="Previous technologies"
						>
							<ChevronLeft size={20} />
						</button>
					)}

					<div
						className="tech-dock-grid tech-explorer-grid"
						key={`${activeCategory}-${startIndex}`}
					>
						{visibleItems.map((name) => {
							const usedIn = projects.filter((p) =>
								p.technologies.some(
									(tech) =>
										tech.toLowerCase().includes(name.toLowerCase()) ||
										name.toLowerCase().includes(tech.toLowerCase()),
								),
							);
							const isPrimary = [
								"Python",
								"PyTorch",
								"React",
								"Google Cloud",
								"Figma",
								"SQL",
							].includes(name);
							return (
								<Link
									href={`/showcase/projects?tool=${encodeURIComponent(name)}`}
									className={`tech-app-card ${isPrimary ? "tech-card-featured" : ""}`}
									key={name}
									title={`Click to view projects using ${name}`}
								>
									<div className="tech-app-icon-wrap">
										<TechIcon name={name} className="tech-app-svg" />
									</div>
									<span className="tech-app-name">{name}</span>
									<span className="tech-app-badge">
										{usedIn.length ? `${usedIn.length} PROJ` : "CORE"} →
									</span>
								</Link>
							);
						})}
					</div>

					{currentGroup.items.length > itemsPerPage && (
						<button
							className="tech-nav-arrow tech-nav-arrow-right"
							onClick={handleNext}
							disabled={!canNext}
							aria-label="Next technologies"
						>
							<ChevronRight size={20} />
						</button>
					)}
				</div>
			</div>
		);
	}

	const entries = Object.entries(skills);
	return (
		<div className="tools-grid">
			{entries.map(([category, list]) => {
				const names = list.split(" · ");
				return (
					<section className="tool-group reveal is-visible" key={category}>
						<p className="eyebrow accent">{category}</p>
						<div className="tool-cloud">
							{names.map((name) => {
								const usedIn = projects.filter((p) =>
									p.technologies.some(
										(tech) =>
											tech.toLowerCase().includes(name.toLowerCase()) ||
											name.toLowerCase().includes(tech.toLowerCase()),
									),
								);
								return (
									<Link
										href={`/showcase/projects?tool=${encodeURIComponent(name)}`}
										className="tool-chip"
										key={name}
										title={
											usedIn.length
												? `Used in ${usedIn.map((p) => p.title).join(", ")}`
												: undefined
										}
									>
										<span className="tool-logo" aria-hidden="true">
											<TechIcon name={name} className="w-5 h-5" />
										</span>
										<span className="tool-name">{name}</span>
										<small className="tool-context">
											{usedIn.length
												? `Used across ${usedIn.length} project${usedIn.length === 1 ? "" : "s"}`
												: "Core toolkit"}
										</small>
										<ArrowUpRight />
									</Link>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
}

export function ShowcaseNav() {
	return (
		<nav className="showcase-nav" aria-label="Showcase sections">
			<Link href="/showcase/projects">PROJECTS</Link>
			<Link href="/showcase/certificates">CERTIFICATES</Link>
		</nav>
	);
}

import Image from "next/image";

import { ProjectCard } from "./project-card";

export function ProjectArchive() {
	const [active, setActive] = useState("ALL");
	const [query, setQuery] = useState(() =>
		typeof window === "undefined"
			? ""
			: new URLSearchParams(window.location.search).get("tool") || "",
	);
	const filtered = useMemo(
		() =>
			projects.filter(
				(p) =>
					(active === "ALL" ||
						p.categories.some((c) => c.toUpperCase().includes(active)) ||
						p.primaryCategory.toUpperCase().includes(active)) &&
					`${p.title} ${p.description} ${p.technologies.join(" ")}`
						.toLowerCase()
						.includes(query.toLowerCase()),
			),
		[active, query],
	);

	return (
		<>
			<div className="archive-controls showcase-controls">
				<label className="search-box">
					<Search aria-hidden="true" />
					<input
						aria-label="Search projects"
						placeholder="Search projects or technologies"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</label>
				<div className="filter-scroll">
					{areas.map((area) => (
						<button
							key={area}
							className={active === area ? "active" : ""}
							onClick={() => setActive(area)}
						>
							{area}
						</button>
					))}
				</div>
			</div>
			<div className="showcase-count">
				{filtered.length} RESULTS <span>FILTERED BY {active}</span>
			</div>
			<div className="showcase-project-grid">
				{filtered.map((p, index) => (
					<ProjectCard key={p.id} project={p} index={index} />
				))}
			</div>
		</>
	);
}

export function ProjectPipeline({ items }: { items: string[] }) {
	return (
		<div className="pipeline">
			{items.map((item, i) => (
				<div className="pipeline-node" key={item}>
					<span>{String(i + 1).padStart(2, "0")}</span>
					<strong>{item}</strong>
					{i < items.length - 1 && <i>↓</i>}
				</div>
			))}
		</div>
	);
}
