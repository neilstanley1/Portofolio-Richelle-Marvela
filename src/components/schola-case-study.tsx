"use client";

import Image from "next/image";
import {
	Server,
	Code2,
	Database,
	ShieldCheck,
	GitBranch,
	UploadCloud,
	Layout,
	Palette,
	Smartphone,
	Workflow,
	FileText,
	SlidersHorizontal,
	FolderSearch,
	Repeat,
	EyeOff,
	Users,
	CheckCircle2,
	Layers,
	FileCheck,
	ArrowRight,
} from "lucide-react";
import { projects, type PortfolioProject } from "@/src/data/portfolio";
import {
	ProjectBackButton,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

/* ─── Data ─────────────────────────────────────────────── */

const painPoints = [
	{
		num: "01",
		title: "Scattered Information",
		desc: "Scholarship opportunities are fragmented across social media feeds, physical posters, and unofficial messaging groups without a verified central portal.",
		icon: FolderSearch,
	},
	{
		num: "02",
		title: "Repetitive Document Uploads",
		desc: "Students are forced to repeatedly upload identical CVs, transcripts, and certificates for every separate application they submit.",
		icon: Repeat,
	},
	{
		num: "03",
		title: "Zero Progress Visibility",
		desc: "Applicants rarely know where their application stands — whether in administrative screening, document review, interview, or final selection.",
		icon: EyeOff,
	},
	{
		num: "04",
		title: "Asymmetric Provider Management",
		desc: "Scholarship providers lack structured digital dashboards to organize candidate pools, transition applicant stages, and publish real-time outcomes.",
		icon: Users,
	},
];

const journeySteps = [
	{
		step: "01",
		label: "DISCOVER",
		title: "Explore Programs",
		desc: "Search, filter by criteria, and review verified scholarship requirements & deadlines.",
	},
	{
		step: "02",
		label: "APPLY",
		title: "One-Click Submit",
		desc: "Apply directly using pre-saved profile data and stored cloud CV with duplicate protection.",
	},
	{
		step: "03",
		label: "TRACK",
		title: "Live Stage Tracking",
		desc: "Follow application progress across administrative screening, interview, and final review.",
	},
	{
		step: "04",
		label: "COMPLETE",
		title: "Decision & History",
		desc: "Receive transparent outcome updates and maintain an organized history of past submissions.",
	},
];

const rolePillars = [
	{
		number: "01",
		role: "Full-Stack Developer",
		badge: "Core Engineering",
		cls: "schola-role-pillar--dev",
		summary:
			"Engineered the complete web application from backend business logic and database architecture to responsive Blade views and cloud integrations.",
		items: [
			{
				title: "Laravel 11 Backend Architecture",
				desc: "Structured modular controllers, custom middleware pipelines, and strict request validation classes.",
				icon: Server,
			},
			{
				title: "Blade Views & Tailwind CSS",
				desc: "Developed responsive Blade templates with clean typography, dynamic form states, and mobile accessibility.",
				icon: Code2,
			},
			{
				title: "PostgreSQL Database Schema",
				desc: "Architected relational tables, foreign key constraints, indexes, and Eloquent ORM model relationships.",
				icon: Database,
			},
			{
				title: "Multi-Guard Authentication & RBAC",
				desc: "Implemented secure role-based access control with distinct permission boundaries for Students and Providers.",
				icon: ShieldCheck,
			},
			{
				title: "Application Workflow & State Engine",
				desc: "Built dynamic multi-stage application lifecycles with state progression and validation safeguards.",
				icon: GitBranch,
			},
			{
				title: "Supabase Cloud Storage Integration",
				desc: "Connected Supabase S3-compatible storage for secure CV uploads, file validation, and public asset URLs.",
				icon: UploadCloud,
			},
		],
	},
	{
		number: "02",
		role: "UI/UX Designer",
		badge: "Product Design",
		cls: "schola-role-pillar--design",
		summary:
			"Designed a modern, high-trust digital interface prioritizing readability, effortless document management, and clear stage visibility.",
		items: [
			{
				title: "Information Architecture & User Flows",
				desc: "Mapped frictionless journeys from scholarship discovery to submission and provider evaluation.",
				icon: Layout,
			},
			{
				title: "Design System & Visual Identity",
				desc: "Crafted a refined white-and-red palette, high-contrast typography hierarchy, and reusable UI tokens.",
				icon: Palette,
			},
			{
				title: "Responsive Interface Engineering",
				desc: "Optimized mobile-first views for student browsing alongside data-dense desktop provider dashboards.",
				icon: Smartphone,
			},
			{
				title: "One-Time CV Management UX",
				desc: "Designed profile-first document management to eliminate repetitive file uploads for students.",
				icon: FileText,
			},
			{
				title: "Provider Dashboard Usability",
				desc: "Structured applicant review tables, quick filter controls, and intuitive stage transition triggers.",
				icon: SlidersHorizontal,
			},
		],
	},
	{
		number: "03",
		role: "System Analyst",
		badge: "Domain Logic",
		cls: "schola-role-pillar--analyst",
		summary:
			"Formulated functional requirements, data integrity policies, and the business logic governing the scholarship lifecycle.",
		items: [
			{
				title: "Stakeholder Requirements Analysis",
				desc: "Analyzed friction points in conventional manual scholarship processing for both applicants and organizations.",
				icon: FolderSearch,
			},
			{
				title: "Workflow State Machine Specification",
				desc: "Defined exact stage transitions from Submitted → Screening → Interview → Accepted / Rejected.",
				icon: Workflow,
			},
			{
				title: "Duplicate Application Safeguards",
				desc: "Formulated validation logic to prevent concurrent duplicate submissions to the same program.",
				icon: Repeat,
			},
			{
				title: "Data Privacy & Access Boundaries",
				desc: "Defined row-level security concepts ensuring applicant CVs and personal data remain strictly confidential.",
				icon: ShieldCheck,
			},
		],
	},
];

const features = [
	{
		num: "01",
		name: "Scholarship Discovery & Filtering",
		desc: "Search, sort, and filter open opportunities with detailed criteria including academic level, eligibility, requirements, and deadlines.",
		icon: FolderSearch,
	},
	{
		num: "02",
		name: "One-Time CV Profile Upload",
		desc: "Students store their verified CV and portfolio once on their profile, automatically attaching to future applications with zero friction.",
		icon: FileCheck,
	},
	{
		num: "03",
		name: "Structured Application Workflow",
		desc: "Duplicate-prevention validation ensures students submit once per program while tracking custom requirements for each scholarship.",
		icon: GitBranch,
	},
	{
		num: "04",
		name: "Multi-Stage Progress Tracking",
		desc: "Transparent status indicators keep applicants informed through document screening, interviews, and final award decisions.",
		icon: CheckCircle2,
	},
	{
		num: "05",
		name: "Comprehensive Provider Dashboard",
		desc: "Scholarship providers create listings, review incoming applicants, inspect CVs directly, and advance candidates through custom review stages.",
		icon: SlidersHorizontal,
	},
	{
		num: "06",
		name: "Application History & Archival",
		desc: "A centralized dashboard allows students to review historical submissions, current statuses, and past review outcomes.",
		icon: Layers,
	},
	{
		num: "07",
		name: "Multi-Guard Authentication (RBAC)",
		desc: "Independent student and provider authentication guards ensure strict access control and separation of platform privileges.",
		icon: ShieldCheck,
	},
	{
		num: "08",
		name: "Cloud Storage via Supabase",
		desc: "Documents and scholarship branding assets are stored and distributed through Supabase Cloud Storage with optimized URL delivery.",
		icon: UploadCloud,
	},
];

const techStack = [
	"Laravel 11",
	"PHP 8.2",
	"Blade Templates",
	"Tailwind CSS",
	"Vite",
	"PostgreSQL",
	"Supabase Storage",
	"Eloquent ORM",
	"Multi-Guard Auth",
	"RBAC Security",
	"Request Validation",
	"State Machine Tracking",
];

/* ─── Component ─────────────────────────────────────────── */

export function ScholaCaseStudyPage({ project }: { project: PortfolioProject }) {
	const index = projects.findIndex((p) => p.id === "schola");
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return (
		<main
			className="project-page-root case-study schola-case"
			style={
				{
					"--project-accent": "#a81e2f",
					"--project-accent-rgb": "168, 30, 47",
					"--project-title-color": "#a81e2f",
					"--project-kicker-bg": "rgba(168,30,47,0.08)",
					"--project-card-bg": "#ffffff",
					"--project-card-border": "rgba(168, 30, 47, 0.14)",
					"--project-muted": "#574d4b",
					"--project-val-color": "#140f0e",
				} as React.CSSProperties
			}
		>
			{/* ─── HERO SECTION ──────────────────────────────────── */}
			<header className="schola-hero-section">
				<div className="schola-container">
					<ProjectBackButton />

					{/* Top Hero Layout: Title & Lead + Platform Identity Badge */}
					<div className="schola-hero-top">
						{/* Left / Hero Title & Intro */}
						<div className="schola-hero-intro">
							<div className="schola-kicker">
								<span className="schola-kicker-dot" />
								EDUCATION · FULL-STACK WEB PLATFORM
							</div>

							<h1 className="schola-hero-title">SCHOLA</h1>
							<p className="schola-hero-subtitle">
								Scholarship Discovery &amp; Multi-Stage Application Platform
							</p>
							<p className="schola-hero-lead">
								A centralized full-stack web platform connecting ambitious students with scholarship opportunities — featuring one-time CV profile management, multi-stage application tracking, and an end-to-end provider review dashboard.
							</p>
						</div>

						{/* Right / Platform Identity & Tech Badge */}
						<div className="schola-identity-panel">
							<div className="schola-identity-badge-header">
								<div className="schola-identity-logo-wrap">
									<Image
										src="/projects/schola/logo.png"
										alt="Schola - Unlock Your Future Logo"
										width={180}
										height={91}
										className="schola-identity-logo-img"
										priority
									/>
								</div>
								<div className="schola-identity-badge-meta">
									<span className="schola-identity-badge-status">
										<span className="schola-kicker-dot" /> LIVE SYSTEM
									</span>
									<span className="schola-identity-badge-type">Scholarship Platform</span>
								</div>
							</div>

							<div className="schola-identity-specs">
								<div className="schola-spec-row">
									<span className="schola-spec-label">FRAMEWORK</span>
									<span className="schola-spec-val">Laravel 11 · PHP · Blade</span>
								</div>
								<div className="schola-spec-row">
									<span className="schola-spec-label">DATABASE</span>
									<span className="schola-spec-val">PostgreSQL · Eloquent ORM</span>
								</div>
								<div className="schola-spec-row">
									<span className="schola-spec-label">STORAGE</span>
									<span className="schola-spec-val">Supabase Storage API</span>
								</div>
								<div className="schola-spec-row">
									<span className="schola-spec-label">PIPELINE</span>
									<span className="schola-spec-val">Discover → Apply → Track</span>
								</div>
							</div>
						</div>
					</div>

					{/* 4-Column Standard Recruiter Metadata Cards */}
					<div className="schola-hero-meta-grid">
						<div className="schola-meta-card">
							<div className="schola-meta-card-label">01 / ROLE</div>
							<strong className="schola-meta-card-title">Full-Stack Developer</strong>
							<p className="schola-meta-card-detail">Solo Engineering · UI/UX Design · System Analyst</p>
						</div>

						<div className="schola-meta-card">
							<div className="schola-meta-card-label">02 / CONTRIBUTION</div>
							<strong className="schola-meta-card-title">End-to-End Delivery</strong>
							<p className="schola-meta-card-detail">Architecture · Auth · Workflows · Blade Templates</p>
						</div>

						<div className="schola-meta-card">
							<div className="schola-meta-card-label">03 / TECH STACK</div>
							<strong className="schola-meta-card-title">Laravel 11 + Supabase</strong>
							<p className="schola-meta-card-detail">Blade · Tailwind CSS · PostgreSQL · Vite</p>
						</div>

						<div className="schola-meta-card">
							<div className="schola-meta-card-label">04 / CORE FOCUS</div>
							<strong className="schola-meta-card-title">Multi-Stage Workflow</strong>
							<p className="schola-meta-card-detail">One-Time CV Upload · Provider Review · RBAC</p>
						</div>
					</div>
				</div>
			</header>

			{/* ─── 01 THE PROBLEM ───────────────────────────────── */}
			<section className="schola-section schola-problem-section">
				<div className="schola-container">
					<div className="schola-section-split">
						<div className="schola-section-split-left">
							<span className="schola-tag">01 / THE PROBLEM</span>
							<h2 className="schola-section-h2">
								Scholarship processes are fragmented<br />
								and repetitive.
							</h2>
						</div>
						<div className="schola-section-split-right">
							<p>
								Information is scattered across unofficial posters, social media, and disparate forms. This creates broken communication, repeated document submissions, delayed reviews, and zero transparency for students.
							</p>
						</div>
					</div>

					<div className="schola-pain-grid">
						{painPoints.map((pt) => {
							const Icon = pt.icon;
							return (
								<div key={pt.num} className="schola-pain-item">
									<div className="schola-pain-icon-wrap">
										<Icon size={18} strokeWidth={2.2} />
									</div>
									<div className="schola-pain-content">
										<div className="schola-pain-item-header">
											<span className="schola-pain-num">{pt.num}</span>
											<h3 className="schola-pain-title">{pt.title}</h3>
										</div>
										<p className="schola-pain-desc">{pt.desc}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ─── 02 THE SOLUTION ──────────────────────────────── */}
			<section className="schola-section schola-solution-section">
				<div className="schola-container">
					<div className="schola-section-split">
						<div className="schola-section-split-left">
							<span className="schola-tag">02 / THE SOLUTION</span>
							<h2 className="schola-section-h2">
								A centralized platform for the entire{" "}
								<span className="schola-headline-accent">scholarship journey.</span>
							</h2>
						</div>
						<div className="schola-section-split-right">
							<p>
								Schola creates a single trusted environment where students explore opportunities and apply with stored profiles, while scholarship providers manage listings and advance applicant stages seamlessly.
							</p>
						</div>
					</div>

					<div className="schola-journey-grid">
						{journeySteps.map((step, i) => (
							<div key={step.label} className="schola-journey-card">
								<div className="schola-journey-card-top">
									<span className="schola-journey-card-step">{step.step}</span>
									<span className="schola-journey-card-label">{step.label}</span>
								</div>
								<h3 className="schola-journey-card-title">{step.title}</h3>
								<p className="schola-journey-card-desc">{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── 03 WHAT I BUILT / MY ROLE ────────────────────── */}
			<section className="schola-section schola-role-section">
				<div className="schola-container">
					<div className="schola-section-split schola-section-split--mb">
						<div className="schola-section-split-left">
							<span className="schola-tag">03 / WHAT I BUILT &amp; MY ROLE</span>
							<h2 className="schola-section-h2">
								Individual contribution &amp; core architecture.
							</h2>
						</div>
						<div className="schola-section-split-right">
							<p>
								As the sole developer and designer, I led Schola from system requirements and workflow architecture to full-stack Laravel implementation, database modeling, Supabase cloud integrations, and UI/UX design.
							</p>
						</div>
					</div>

					<div className="schola-role-pillar-grid">
						{rolePillars.map((pillar) => (
							<div key={pillar.role} className={`schola-role-pillar ${pillar.cls}`}>
								<div className="schola-role-pillar-header">
									<div className="schola-role-pillar-badge-row">
										<span className="schola-role-pillar-num">{pillar.number}</span>
										<span className="schola-role-pillar-badge">{pillar.badge}</span>
									</div>
									<h3 className="schola-role-pillar-title">{pillar.role}</h3>
									<p className="schola-role-pillar-summary">{pillar.summary}</p>
								</div>

								<div className="schola-role-pillar-items">
									{pillar.items.map((item) => {
										const Icon = item.icon;
										return (
											<div key={item.title} className="schola-role-item-row">
												<div className="schola-role-item-icon">
													<Icon size={16} strokeWidth={2.2} />
												</div>
												<div className="schola-role-item-text">
													<strong className="schola-role-item-title">{item.title}</strong>
													<p className="schola-role-item-desc">{item.desc}</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── 04 PRODUCT SHOWCASE ──────────────────────────── */}
			<section className="schola-section schola-showcase-section">
				<div className="schola-container">
					<div className="schola-section-split schola-section-split--mb">
						<div className="schola-section-split-left">
							<span className="schola-tag">04 / PRODUCT SHOWCASE</span>
							<h2 className="schola-section-h2">
								Engineered for trust &amp; clarity.
							</h2>
						</div>
						<div className="schola-section-split-right">
							<p>
								A structured web experience allowing students to discover scholarships, submit applications with verified profiles, and track live stages with total confidence.
							</p>
						</div>
					</div>

					{/* Hero Showcase Frame */}
					<div className="schola-showcase-hero-frame">
						<div className="schola-showcase-frame-label">Home · Scholarship Landing &amp; Discovery</div>
						<Image
							src="/projects/schola/home.png"
							alt="Schola homepage — scholarship discovery landing page"
							width={1688}
							height={900}
							priority
							className="schola-showcase-img"
						/>
					</div>

					{/* Secondary 2-Column Showcase */}
					<div className="schola-showcase-pair">
						<figure className="schola-showcase-figure">
							<Image
								src="/projects/schola/listing.png"
								alt="Scholarship listing and search page"
								width={1688}
								height={864}
								className="schola-showcase-img"
							/>
							<figcaption>
								<span className="schola-fig-dot" />
								Scholarship discovery, search &amp; filter catalogue
							</figcaption>
						</figure>
						<figure className="schola-showcase-figure">
							<Image
								src="/projects/schola/history.png"
								alt="Application tracking history"
								width={1688}
								height={864}
								className="schola-showcase-img"
							/>
							<figcaption>
								<span className="schola-fig-dot" />
								Multi-stage applicant tracking &amp; status history
							</figcaption>
						</figure>
					</div>

					{/* Profile Wide Showcase */}
					<figure className="schola-showcase-figure schola-showcase-figure--wide">
						<Image
							src="/projects/schola/profile.png"
							alt="Student profile and CV management"
							width={1688}
							height={864}
							className="schola-showcase-img"
						/>
						<figcaption>
							<span className="schola-fig-dot" />
							Student profile &amp; one-time CV cloud storage management
						</figcaption>
					</figure>
				</div>
			</section>

			{/* ─── 05 FEATURE HIGHLIGHTS ────────────────────────── */}
			<section className="schola-section schola-features-section">
				<div className="schola-container">
					<div className="schola-section-split schola-section-split--mb">
						<div className="schola-section-split-left">
							<span className="schola-tag">05 / FEATURE HIGHLIGHTS</span>
							<h2 className="schola-section-h2">
								System features designed for friction-free workflows.
							</h2>
						</div>
						<div className="schola-section-split-right">
							<p>
								Key technical and product capabilities built to streamline discovery, automate repetitive tasks, and empower both students and scholarship providers.
							</p>
						</div>
					</div>

					<div className="schola-feature-grid">
						{features.map((f) => {
							const Icon = f.icon;
							return (
								<div key={f.num} className="schola-feature-card">
									<div className="schola-feature-card-header">
										<div className="schola-feature-card-icon">
											<Icon size={18} strokeWidth={2.2} />
										</div>
										<span className="schola-feature-card-num">{f.num}</span>
									</div>
									<h3 className="schola-feature-card-name">{f.name}</h3>
									<p className="schola-feature-card-desc">{f.desc}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ─── 06 SYSTEM ARCHITECTURE ───────────────────────── */}
			<section className="schola-section schola-arch-section">
				<div className="schola-container">
					<span className="schola-tag">06 / SYSTEM ARCHITECTURE</span>
					<h2 className="schola-section-h2 schola-arch-h2">
						Laravel, PostgreSQL, and Supabase Storage in sync.
					</h2>

					<div className="schola-arch-grid">
						<div className="schola-arch-col">
							<div className="schola-arch-col-label">Application Stack</div>
							<div className="schola-arch-stack">
								{[
									"Student & Provider Views (Blade)",
									"Tailwind CSS Layout Engine",
									"Laravel Web Routes & Middleware",
									"Controllers & Custom Request Validation",
									"Eloquent ORM Database Access",
									"PostgreSQL Relational Storage",
								].map((layer, i) => (
									<div key={layer} className="schola-arch-layer">
										<span className="schola-arch-layer-tag">{String(i + 1).padStart(2, "0")}</span>
										<span className="schola-arch-layer-name">{layer}</span>
									</div>
								))}
							</div>
						</div>

						<div className="schola-arch-connector" aria-hidden="true">
							<span className="schola-arch-connector-line" />
							<span className="schola-arch-connector-label">↔</span>
							<span className="schola-arch-connector-line" />
						</div>

						<div className="schola-arch-col">
							<div className="schola-arch-col-label">Storage &amp; Integration</div>
							<div className="schola-arch-stack">
								{[
									"Student CV Upload Intake",
									"Scholarship Provider Logo Assets",
									"Laravel S3-Compatible File Handler",
									"Supabase Storage Bucket API",
									"Public CDN URL Resolution",
									"Application Review & Inspection",
								].map((layer, i) => (
									<div key={layer} className="schola-arch-layer schola-arch-layer--alt">
										<span className="schola-arch-layer-tag">{String(i + 1).padStart(2, "0")}</span>
										<span className="schola-arch-layer-name">{layer}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="schola-tech-cloud">
						{techStack.map((tag) => (
							<span key={tag} className="schola-tech-tag">
								{tag}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ─── GitHub CTA ───────────────────────────────────── */}
			<ProjectGithubCTA
				githubUrl={project.github}
				demoUrl={project.demo}
				title="Explore the Schola project repository"
				description="View the implementation behind Schola's scholarship platform workflow, application management, and provider experience."
			/>

			{/* ─── Prev / Next ──────────────────────────────────── */}
			<ProjectNavFooter currentId="schola" previous={previous} next={next} className="schola-case-nav" />
		</main>
	);
}
