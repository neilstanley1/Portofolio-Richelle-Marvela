// src/components/project-card.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { type PortfolioProject } from "@/src/data/portfolio";

interface ProjectAssetConfig {
	image?: string;
	alt?: string;
	badge: string;
	accentColor: string;
	bgGradient: string;
}

const PROJECT_CONFIGS: Record<string, ProjectAssetConfig> = {
	contentbay: {
		image: "/projects/contentbay/hero-landing.png",
		alt: "ContentBay Headless CMS Platform UI",
		badge: "API-FIRST CMS",
		accentColor: "#38BDF8",
		bgGradient:
			"linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)",
	},
	mbelys: {
		image: "/projects/mbelys/hero-banner.png",
		alt: "Mbelys IoT Sound Analysis System",
		badge: "IoT · GCP · CNN",
		accentColor: "#C87A58",
		bgGradient:
			"linear-gradient(135deg, rgba(200, 122, 88, 0.25) 0%, rgba(46, 30, 20, 0.95) 100%)",
	},
	aurame: {
		image: "/projects/aurame/mockup-isometric.png",
		alt: "Auramé E-Commerce Platform UX",
		badge: "BEAUTY & E-COMMERCE",
		accentColor: "#E11D48",
		bgGradient:
			"linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(18, 18, 18, 0.95) 100%)",
	},
	indobert: {
		badge: "INDOBERT TRANSFORMER",
		accentColor: "#8B5CF6",
		bgGradient:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	summarization: {
		badge: "BART MULTI-NEWS",
		accentColor: "#B26CFF",
		bgGradient:
			"linear-gradient(135deg, rgba(178, 108, 255, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	aqi: {
		badge: "REAL-TIME STREAMING",
		accentColor: "#10B981",
		bgGradient:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	dgwo: {
		badge: "CVRPTW OPTIMIZER",
		accentColor: "#A855F7",
		bgGradient:
			"linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	orbi: {
		image: "/projects/orbi/dashboard.png",
		alt: "Orbi assistive AI computer vision dashboard",
		badge: "ASSISTIVE AI",
		accentColor: "#3B82F6",
		bgGradient:
			"linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	schola: {
		image: "/projects/schola/home.png",
		alt: "Schola scholarship platform home page",
		badge: "FULL-STACK LARAVEL",
		accentColor: "#A81E2F",
		bgGradient:
			"linear-gradient(135deg, rgba(168, 30, 47, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	flood: {
		image: "/projects/gis/flood-risk-map.png",
		alt: "GIS Banjir Jakarta flood-risk dashboard map",
		badge: "GIS MAP DASHBOARD",
		accentColor: "#06B6D4",
		bgGradient:
			"linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	fillow: {
		badge: "FINANCE APP UX",
		accentColor: "#34D399",
		bgGradient:
			"linear-gradient(135deg, rgba(52, 211, 153, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	serenesoul: {
		image: "/projects/serenesoul/logo.svg",
		alt: "Serene Soul mental health and wellness logo",
		badge: "MENTAL HEALTH UX",
		accentColor: "#C084FC",
		bgGradient:
			"linear-gradient(135deg, rgba(192, 132, 252, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	youtube: {
		badge: "TOPIC MODELING",
		accentColor: "#DF8D31",
		bgGradient:
			"linear-gradient(135deg, rgba(223, 141, 49, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	car: {
		badge: "ANN REGRESSION",
		accentColor: "#059669",
		bgGradient:
			"linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	fruit: {
		image: "/projects/fruit/train-samples.png",
		alt: "Fruit classification training samples",
		badge: "COMPUTER VISION VAE",
		accentColor: "#10B981",
		bgGradient:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	emotion: {
		badge: "CLASSIFIER PIPELINE",
		accentColor: "#EC4899",
		bgGradient:
			"linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	"nail-disease": {
		image: "/projects/nail-disease/nail_augmentation_grid.png",
		alt: "Nail disease classification augmentation samples",
		badge: "MEDICAL COMPUTER VISION",
		accentColor: "#14B8A6",
		bgGradient:
			"linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	jci: {
		image: "/projects/jci/jci_home.png",
		alt: "JCI Drone Innovation website home page",
		badge: "DRONE BRAND WEBSITE",
		accentColor: "#F97316",
		bgGradient:
			"linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
	bloo: {
		image: "/projects/bloo/prototype-showcase.png",
		alt: "BLOO smart agriculture IoT prototype",
		badge: "IoT · SMART FARM",
		accentColor: "#10b981",
		bgGradient:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(7, 18, 12, 0.98) 100%)",
	},
	traffic: {
		image: "/projects/traffic/aws-smart-city-architecture.png",
		alt: "AWS Smart City Traffic Management architecture diagram",
		badge: "SMART CITY CLOUD",
		accentColor: "#3B82F6",
		bgGradient:
			"linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	},
};

const PROJECT_CONTRIBUTIONS: Record<string, string[]> = {
	mbelys: ["ESP32-S3 Firmware", "GCP Cloud Run API", "Firebase Firestore Sync"],
	contentbay: [
		"Requirements & Architecture",
		"Headless CMS Workflows",
		"Next.js & Node.js",
	],
	indobert: [
		"2,276 Article Dataset",
		"Indonesian Sastrawi Pipeline",
		"PyTorch Fine-Tuning",
	],
	summarization: [
		"AQuaMUSE Dataset Prep",
		"RAKE & KeyBERT Guidance",
		"BART Transformer Eval",
	],
	aqi: [
		"OpenWeather Streaming",
		"PySpark Data Ingestion",
		"Random Forest Model",
	],
	dgwo: [
		"Dynamic Grey Wolf Optimizer",
		"Floating 2-opt Search Engine",
		"CVRPTW Benchmark",
	],
	orbi: [
		"YOLOv8 Real-Time Detection",
		"EasyOCR Text-to-Speech",
		"Voice Command Assistant",
	],
	schola: [
		"Laravel Full-Stack Platform",
		"Scholarship Workflow Engine",
		"Document Management UI",
	],
	flood: [
		"ArcGIS REST Feature Layer",
		"Jakarta GeoJSON Filtering",
		"System Vulnerability Map",
	],
	traffic: [
		"Cloud Data Architecture",
		"Kafka Stream Ingestion",
		"BigQuery Integration",
	],
	bloo: [
		"100% IoT Development",
		"ESP32 & Sensors Integration",
		"Firebase Realtime Telemetry",
	],
	fillow: [
		"Digital Wallet UX",
		"Savings Target Tracker",
		"Figma Interactive Prototype",
	],
	serenesoul: [
		"Mental Health UX Research",
		"Mood Journaling Interface",
		"Calm Breathing Flow",
	],
	jci: [
		"Multi-Page UX Flows",
		"Online & Offline Retail",
		"Responsive Frontend Build",
	],
	aurame: [
		"E-Commerce User Journey",
		"Figma Responsive Prototype",
		"Local UMKM Creator Spotlight",
	],
	emotion: [
		"DistilBERT + BiGRU Hybrid",
		"6-Class Emotion NLP",
		"Evaluation Benchmarks",
	],
	fruit: [
		"VAE Latent Space Compaction",
		"FID Metric Benchmarking",
		"PyTorch Model Pipeline",
	],
	car: [
		"Used Car Dataset Prep",
		"TensorFlow Keras ANN",
		"Price Regression Model",
	],
	youtube: [
		"4,281 Comments Scraped",
		"BERTopic & LDA Topic Model",
		"Audience Persona Cluster",
	],
};

function NlpVisual({ type }: { type: "summarization" | "indobert" }) {
	if (type === "summarization") {
		return (
			<div className="nlp-visual nlp-summary">
				<div className="nlp-docs">
					<span>DOC 01</span>
					<span>DOC 02</span>
					<span>DOC 03</span>
				</div>
				<i>→</i>
				<div className="nlp-keywords">
					<b>KEYWORDS</b>
					<span>query</span>
					<span>context</span>
					<span>evidence</span>
				</div>
				<i>→</i>
				<div className="nlp-output">
					<small>BART</small>
					<strong>SUMMARY</strong>
					<em>Multi-document synthesis</em>
				</div>
			</div>
		);
	}
	return (
		<div className="nlp-visual nlp-classifier">
			<div className="nlp-input">
				<small>INDONESIAN NEWS</small>
				<span>“Tim menang dalam pertandingan…”</span>
			</div>
			<i>→</i>
			<div className="nlp-transformer">
				<b>INDOBERT</b>
				<span>Token embeddings</span>
				<span>Transformer layers</span>
			</div>
			<i>→</i>
			<div className="nlp-labels">
				<strong>SPORTS</strong>
				<span>POLITICS</span>
				<span>TECH</span>
			</div>
		</div>
	);
}

function ProjectVisual({
	project,
	config,
}: {
	project: PortfolioProject;
	config: ProjectAssetConfig;
}) {
	if (config.image) {
		return (
			<div className="card-visual-image-wrapper">
				<Image
					src={config.image}
					alt={config.alt || project.title}
					fill
					className="card-visual-img"
					quality={92}
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
				<div className="card-visual-overlay-gradient" />
			</div>
		);
	}

	return (
		<div
			className="card-visual-snippet-wrapper"
			style={{ background: config.bgGradient }}
		>
			<div className="snippet-window-header">
				<div className="snippet-dots">
					<span className="dot-red" />
					<span className="dot-yellow" />
					<span className="dot-green" />
				</div>
				<span className="snippet-filename">
					{project.id === "indobert"
						? "indobert_sequence.py"
						: project.id === "summarization"
							? "bart_multidoc_yake.py"
							: project.id === "aqi"
								? "aqi_spark_streaming.py"
								: project.id === "dgwo"
									? "cvrptw_wolf_optimizer.py"
									: project.id === "orbi"
										? "assistive_yolo_feed.py"
										: project.id === "schola"
											? "scholarship_controller.php"
											: project.id === "flood"
												? "gis_risk_layers.geojson"
												: project.id === "fillow"
													? "wallet_balance_mock.fig"
													: project.id === "serenesoul"
														? "calm_session_log.fig"
														: project.id === "jci"
															? "drone_catalog_spec.fig"
															: project.id === "bloo"
																? "soil_irrigation.ino"
																: project.id === "traffic"
																	? "smart_city_pipeline.tf"
																	: project.id === "emotion"
																		? "distilbert_bigru.py"
																		: project.id === "fruit"
																			? "vae_latent_reconstruction.py"
																			: project.id === "car"
																				? "ann_price_regression.py"
																				: project.id === "youtube"
																					? "comment_lda_topic_model.py"
																					: `${project.id}_system.py`}
				</span>
			</div>

			<div className="snippet-content-body">
				{project.id === "indobert" && <NlpVisual type="indobert" />}
				{project.id === "summarization" && <NlpVisual type="summarization" />}

				{project.id === "aqi" && (
					<div className="telemetry-snippet-box">
						<div className="telemetry-row">
							<span className="telemetry-tag pulse-dot">LIVE STREAM FEED</span>
							<span className="telemetry-val">78 AQI (MODERATE)</span>
						</div>
						<div className="sparkline-bar-group">
							<span style={{ height: "35%" }} />
							<span style={{ height: "55%" }} />
							<span style={{ height: "45%" }} />
							<span style={{ height: "70%" }} />
							<span style={{ height: "60%" }} />
							<span style={{ height: "80%" }} />
							<span style={{ height: "75%" }} />
							<span style={{ height: "90%" }} />
						</div>
					</div>
				)}

				{project.id === "dgwo" && (
					<div className="route-snippet-box">
						<div className="route-header-tag">DGWO ROUTE NETWORK ARCHIVE</div>
						<div className="route-metric-grid">
							<div>
								<small>DISTANCE</small>
								<strong style={{ color: "#EF4444" }}>3,062.2</strong>
							</div>
							<div>
								<small>TW PENALTY</small>
								<strong style={{ color: "#EF4444" }}>6,211</strong>
							</div>
						</div>
						<div className="route-mini-path">
							<span>Depot</span>
							<span className="arrow">→</span>
							<span className="node">N12</span>
							<span className="arrow">→</span>
							<span className="node priority">N38</span>
							<span className="arrow">→</span>
							<span className="node">N55</span>
						</div>
					</div>
				)}

				{project.id === "orbi" && (
					<div className="orbi-feed-box">
						<div className="camera-grid-frame">
							<div className="detection-box">
								<span className="det-label">Crosswalk [30cm]</span>
							</div>
							<div className="detection-box secondary">
								<span className="det-label">Obstacle [Detected]</span>
							</div>
						</div>
						<div className="audio-wave-row">
							<span className="wave-bar" />
							<span className="wave-bar tall" />
							<span className="wave-bar" />
							<span className="wave-bar short" />
							<span className="audio-tts-text">
								&quot;Caution: Crosswalk in 5 meters&quot;
							</span>
						</div>
					</div>
				)}

				{project.id === "schola" && (
					<div className="laravel-snippet-box">
						<div className="db-row">
							<span className="db-key">GET</span>
							<span className="db-val">
								/api/scholarships/search?binus=true
							</span>
						</div>
						<div className="laravel-list">
							<div className="laravel-item">
								<span>🏆 Binus Merit Scholarship</span>
								<small>Open · Full Tuition Covered</small>
							</div>
						</div>
					</div>
				)}

				{project.id === "flood" && (
					<div className="flood-gis-box">
						<div className="gis-hud">
							<span>JAKARTA FLOOD RISK LEVEL</span>
							<span className="gis-warning">SIAGA 2 (WARNING)</span>
						</div>
						<div className="gis-grid-visual">
							<div className="gis-cell flooded">Zone A</div>
							<div className="gis-cell clear">Zone B</div>
							<div className="gis-cell warning">Zone C</div>
							<div className="gis-cell clear">Zone D</div>
						</div>
					</div>
				)}

				{project.id === "fillow" && (
					<div className="figma-mockup-box">
						<div className="wallet-card">
							<span className="card-lbl">FILLOW DIGITAL WALLET</span>
							<strong className="card-balance">$14,820.50</strong>
						</div>
					</div>
				)}

				{project.id === "serenesoul" && (
					<div className="serene-mockup-box">
						<div className="mood-log-strip">
							<span>Mon: 😄</span>
							<span>Tue: 😌</span>
							<span>Wed: 🥱</span>
							<span>Thu: 😌</span>
						</div>
						<div className="pulse-circle-container">
							<div className="pulse-ring" />
							<span className="pulse-center">Breathe In</span>
						</div>
					</div>
				)}

				{project.id === "jci" && (
					<div className="jci-mockup-box">
						<div className="drone-specs-grid">
							<div className="spec-card">
								<span className="spec-lbl">FLIGHT RANGE</span>
								<strong>10.5 KM</strong>
							</div>
							<div className="spec-card">
								<span className="spec-lbl">AIRTIME</span>
								<strong>45 MINS</strong>
							</div>
						</div>
						<div className="drone-product-name">JCI Quadcopter Elite Pro</div>
					</div>
				)}

				{project.id === "bloo" && (
					<div className="bloo-iot-box">
						<div className="iot-stats">
							<div className="stat-unit">
								<span className="stat-lbl">SOIL MOISTURE</span>
								<strong>42%</strong>
							</div>
							<div className="stat-unit">
								<span className="stat-lbl">WATER VALVES</span>
								<strong style={{ color: "#06B6D4" }}>PUMP: ON</strong>
							</div>
						</div>
						<div className="iot-status-bar">
							SENSING ENVIRONMENT CONTINUOUSLY...
						</div>
					</div>
				)}

				{project.id === "traffic" && (
					<div className="traffic-arch-box">
						<div className="flow-arch">
							<span>Telemetry Streams</span>
							<span className="arrow">→</span>
							<span className="hub">Apache Kafka</span>
							<span className="arrow">→</span>
							<span className="db">BigQuery Cloud</span>
						</div>
						<div className="telemetry-bar">TRAFFIC SIGNAL TIMING OPTIMIZER</div>
					</div>
				)}

				{project.id === "emotion" && (
					<div className="emotion-box">
						<div className="emotion-labels">
							<span className="em-lbl joy active">JOY</span>
							<span className="em-lbl sadness">SADNESS</span>
							<span className="em-lbl anger">ANGER</span>
						</div>
						<div className="emotion-stats">
							<span>6-Class Text Classifier (DistilBERT + BiGRU)</span>
						</div>
					</div>
				)}

				{project.id === "fruit" && (
					<div className="vae-box">
						<div className="vae-latent-graph">
							<div
								className="vae-latent-point"
								style={{ top: "20%", left: "30%" }}
							/>
							<div
								className="vae-latent-point"
								style={{ top: "60%", left: "70%" }}
							/>
							<div
								className="vae-latent-point active"
								style={{ top: "40%", left: "45%" }}
							/>
							<span className="graph-label">VAE LATENT SPACE COMPACTION</span>
						</div>
					</div>
				)}

				{project.id === "car" && (
					<div className="car-box">
						<div className="ann-loss-chart">
							<svg viewBox="0 0 160 50" className="chart-svg">
								<polyline
									points="0,5 30,12 60,20 90,32 120,40 160,45"
									fill="none"
									stroke="#059669"
									strokeWidth="1.5"
								/>
							</svg>
							<div className="loss-badge">ANN LOSS CONVERGENCE EPOCHS</div>
						</div>
					</div>
				)}

				{project.id === "youtube" && (
					<div className="youtube-box">
						<div className="lda-topics">
							<span className="topic-badge">Topic 1: AI Learning</span>
							<span className="topic-badge">Topic 2: Career path</span>
							<span className="topic-badge">Topic 3: Toolstack</span>
						</div>
						<div className="comment-meta">
							4,281 Comments BERTopic &amp; LDA Persona Model
						</div>
					</div>
				)}

				{![
					"indobert",
					"summarization",
					"aqi",
					"dgwo",
					"orbi",
					"schola",
					"flood",
					"fillow",
					"serenesoul",
					"jci",
					"bloo",
					"traffic",
					"emotion",
					"fruit",
					"car",
					"youtube",
				].includes(project.id) && (
					<div className="generic-snippet-box">
						<div className="generic-title">{project.title}</div>
						<p className="generic-desc">
							{project.primaryCategory} · System Design
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export function ProjectCard({
	project,
	index,
}: {
	project: PortfolioProject;
	index: number;
}) {
	const numStr = String(index + 1).padStart(2, "0");
	const config = PROJECT_CONFIGS[project.id] || {
		badge: project.primaryCategory.toUpperCase(),
		accentColor: "#A78BFA",
		bgGradient:
			"linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(7, 8, 18, 0.98) 100%)",
	};
	const contributions = PROJECT_CONTRIBUTIONS[project.id] || [
		project.role,
		"System Analysis",
	];

	return (
		<Link
			href={`/projects/${project.id}`}
			className="showcase-project-card reveal is-visible"
			key={project.id}
			style={
				{
					"--card-accent": config.accentColor,
					borderTop: `2px solid ${config.accentColor}`,
				} as React.CSSProperties
			}
		>
			{/* 1. PROJECT VISUAL THUMBNAIL */}
			<div className="showcase-visual-container">
				<ProjectVisual project={project} config={config} />

				<div className="visual-top-meta-overlay">
					<span
						className="visual-overlay-category"
						style={{ color: config.accentColor }}
					>
						{project.primaryCategory}
					</span>
					<div
						className="visual-overlay-badge-pill"
						style={{
							borderColor: `${config.accentColor}44`,
							color: config.accentColor,
						}}
					>
						{config.badge}
					</div>
				</div>
			</div>

			{/* 2. CARD BODY & CONTENT HIERARCHY */}
			<div className="showcase-project-copy-container">
				{/* 2.1 Meta row */}
				<div className="project-meta-row">
					<span
						className="project-meta-label"
						style={{ color: config.accentColor }}
					>
						{numStr} · CASE STUDY
					</span>
					<span className="project-meta-year">{project.year || "2026"}</span>
				</div>

				{/* 2.2 Project Title */}
				<h2 className="project-card-title">
					{project.title}
					{project.id === "mbelys" && (
						<span className="award-badge-pill" title="PKM-KC Funding Recipient">
							🏆 FUNDED
						</span>
					)}
				</h2>

				{/* 2.3 Short Description */}
				<p className="project-card-desc">{project.description}</p>

				{/* 2.4 VISUALLY PROMINENT MY ROLE / CONTRIBUTION */}
				<div
					className="project-card-role-block"
					style={{
						borderColor: `${config.accentColor}33`,
					}}
				>
					<div className="role-block-header">
						<span
							className="role-block-dot"
							style={{ background: config.accentColor }}
						/>
						<span
							className="role-block-label"
							style={{ color: config.accentColor }}
						>
							MY ROLE &amp; CONTRIBUTION
						</span>
					</div>
					<strong className="role-block-title">{project.role}</strong>
					<div className="role-block-chips">
						{contributions.slice(0, 3).map((item) => (
							<span
								key={item}
								className="role-block-chip"
								style={{
									borderColor: `${config.accentColor}30`,
								}}
							>
								<CheckCircle2
									size={11}
									style={{ color: config.accentColor, flexShrink: 0 }}
								/>
								{item}
							</span>
						))}
					</div>
				</div>

				{/* 2.5 Compact Tech Stack Tags */}
				<div className="project-card-tech-stack">
					<small className="tech-stack-label">TECH STACK</small>
					<div className="project-card-tags">
						{project.technologies.slice(0, 4).map((tech) => (
							<span key={tech} className="tech-tag-chip">
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* 2.6 View Project CTA */}
				<div className="project-card-cta-row">
					<span
						className="project-card-cta-btn"
						style={{ color: config.accentColor }}
					>
						VIEW PROJECT <ArrowUpRight className="cta-arrow-icon" size={14} />
					</span>
				</div>
			</div>
		</Link>
	);
}
