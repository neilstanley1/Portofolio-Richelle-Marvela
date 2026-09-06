"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	ArrowUpRight,
	TrendingUp,
	Database,
	Cpu,
	Layers,
	GitBranch,
	Sliders,
	Sparkles,
	AlertTriangle,
	CheckCircle2,
	Maximize2,
	X,
	FileSpreadsheet,
	Binary,
	Zap,
	Info,
	ChevronRight,
	Workflow,
	LineChart,
	Target,
	Gauge,
	Activity,
	BarChart2,
	PieChart,
	Table2,
	Scale,
	RefreshCw,
	Search,
	Check,
	ShieldAlert,
	HelpCircle,
	Clock,
	Compass,
	Code2,
} from "lucide-react";
import { type PortfolioProject, projects } from "@/src/data/portfolio";
import {
	ProjectContainer,
	ProjectBackButton,
	ProjectMetaGrid,
	ProjectSection,
	ProjectCard,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal() {
	const ref = useRef<HTMLElement | null>(null);
	useEffect(() => {
		const root = ref.current;
		if (!root) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches) {
			root
				.querySelectorAll(".reveal")
				.forEach((el) => el.classList.add("revealed"));
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("revealed");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.05 },
		);
		root.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	}, []);
	return ref;
}

/* ─────────────────────────────────────────────────────────────
   DATASET SCHEMA & SUMMARY CONSTANTS
───────────────────────────────────────────────────────────── */
interface ColumnInfo {
	name: string;
	type: string;
	nonNull: string;
	cardinality: string;
	role: "Target" | "Predictor" | "Dropped";
	category:
		| "Target"
		| "Vehicle Attribute"
		| "Location"
		| "Commercial"
		| "Identifier";
	transformation: string;
	notes: string;
}

const DATASET_COLUMNS: ColumnInfo[] = [
	{
		name: "selling_price",
		type: "float64",
		nonNull: "4,199 (1 missing)",
		cardinality: "Continuous",
		role: "Target",
		category: "Target",
		transformation: "Dropped 1 missing row; target of regression",
		notes:
			"Primary prediction target. Right-skewed distribution ranging from 299.99 to 95,000+.",
	},
	{
		name: "name",
		type: "object → float64",
		nonNull: "4,200",
		cardinality: "32 brands → 15 + Other",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation:
			'Group low frequencies into "Other", Target Encoded on Train split',
		notes:
			"Maruti, Hyundai, Tata, Ford, Chevrolet top volume. Strong brand prestige pricing signal.",
	},
	{
		name: "year",
		type: "int64 → dropped",
		nonNull: "4,200",
		cardinality: "1994 – 2020",
		role: "Dropped",
		category: "Vehicle Attribute",
		transformation: "Transformed into age = 2025 - year; original year dropped",
		notes:
			"Older vehicles experience steep exponential & non-linear price depreciation.",
	},
	{
		name: "age",
		type: "int64 → float64",
		nonNull: "4,199",
		cardinality: "5 – 31 years",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "Engineered from 2025 - year, scaled with MinMaxScaler",
		notes:
			"Direct linear and non-linear correlation with vehicle mechanical wear and market depreciation.",
	},
	{
		name: "mileage",
		type: "object → float64",
		nonNull: "4,200",
		cardinality: "Continuous (kmpl / km/kg)",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "Comma replaced with dot, cast to float, MinMaxScaler",
		notes:
			'Fuel efficiency rating. Stored as messy string in raw dataset (e.g., "22,00").',
	},
	{
		name: "engine",
		type: "int64 → float64",
		nonNull: "4,200",
		cardinality: "624 – 3604 CC",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "MinMaxScaler normalized",
		notes:
			"Displacement volume. Strong positive correlation (+0.46) with vehicle market tier.",
	},
	{
		name: "max_power",
		type: "float64",
		nonNull: "4,200",
		cardinality: "32.8 – 400.0 BHP",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "MinMaxScaler normalized",
		notes:
			"Brake Horsepower. Strongest single numeric predictor of vehicle price (+0.75 correlation).",
	},
	{
		name: "torque",
		type: "object → 2 features",
		nonNull: "4,200",
		cardinality: "Messy text",
		role: "Dropped",
		category: "Vehicle Attribute",
		transformation:
			"Regex extracted into torque_clean (Nm) & torque_rpm_clean (RPM)",
		notes:
			"Highly heterogeneous strings with multiple RPM ranges and kgm/Nm unit mixtures.",
	},
	{
		name: "torque_clean",
		type: "float64",
		nonNull: "4,199",
		cardinality: "48.0 – 620.0 Nm",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation:
			"Parsed Nm value, kgm * 9.80665 converted, median imputed, MinMaxScaler",
		notes:
			"Peak rotational force. Direct physical metric of vehicle pulling power and premium capability.",
	},
	{
		name: "torque_rpm_clean",
		type: "float64",
		nonNull: "4,199",
		cardinality: "1000 – 5000 RPM",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation:
			"Extracted RPM or midpoint of range, median imputed, MinMaxScaler",
		notes:
			"Engine speed at peak torque. Differentiates low-end diesel grunt from high-revving petrol.",
	},
	{
		name: "seats",
		type: "int64 → float64",
		nonNull: "4,200",
		cardinality: "2, 4, 5, 7, 8, 9, 10",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "MinMaxScaler normalized",
		notes:
			"Passenger capacity. Differentiates sports hatchbacks, family sedans, and large commercial vans.",
	},
	{
		name: "Region",
		type: "object → 3 dummy cols",
		nonNull: "4,200",
		cardinality: "4 categories",
		role: "Predictor",
		category: "Location",
		transformation:
			"One-hot encoded (Central, East, South, West; drop_first=True)",
		notes:
			"Broad regional market dynamics across Central (1312), East (1020), West (1014), South (854).",
	},
	{
		name: "State or Province",
		type: "object → float64",
		nonNull: "4,200",
		cardinality: "49 states",
		role: "Predictor",
		category: "Location",
		transformation:
			"Target Encoded on Train split; test set mapped with median fallback",
		notes:
			"State-level economic variations, tax structures, and used-car market density.",
	},
	{
		name: "City",
		type: "object → float64",
		nonNull: "4,200",
		cardinality: "1,187 cities",
		role: "Predictor",
		category: "Location",
		transformation:
			'Cities < 10 records grouped to "Other", then Target Encoded on Train',
		notes:
			"Extreme cardinality. Grouping rare cities prevents severe variance and memory explosion.",
	},
	{
		name: "fuel",
		type: "object → 4 dummy cols",
		nonNull: "4,200",
		cardinality: "5 categories",
		role: "Predictor",
		category: "Commercial",
		transformation:
			"One-hot encoded (Diesel, Petrol, CNG, LPG, Electric; drop_first=True)",
		notes:
			"Fuel type significantly influences running costs and resale demand.",
	},
	{
		name: "seller_type",
		type: "object → 2 dummy cols",
		nonNull: "4,200",
		cardinality: "3 categories",
		role: "Predictor",
		category: "Commercial",
		transformation:
			"One-hot encoded (Individual, Dealer, Trustmark Dealer; drop_first=True)",
		notes:
			"Dealer warranties and certified inspections command measurable market premiums over peer-to-peer.",
	},
	{
		name: "transmission",
		type: "object → 1 dummy col",
		nonNull: "4,200",
		cardinality: "2 categories",
		role: "Predictor",
		category: "Vehicle Attribute",
		transformation: "One-hot encoded (Manual vs Automatic; drop_first=True)",
		notes:
			"Automatic transmissions systematically price higher than manual counterparts.",
	},
	{
		name: "owner",
		type: "object → 4 dummy cols",
		nonNull: "4,200",
		cardinality: "5 categories",
		role: "Predictor",
		category: "Commercial",
		transformation:
			"One-hot encoded (First, Second, Third, Fourth & Above, Test Drive; drop_first=True)",
		notes:
			"Vehicle history and multi-hand depreciation directly discount used valuation.",
	},
	{
		name: "Sales_ID",
		type: "int64 → dropped",
		nonNull: "4,200",
		cardinality: "Unique ID",
		role: "Dropped",
		category: "Identifier",
		transformation: "Dropped prior to model training",
		notes:
			"Database transaction primary key with zero causal relationship to vehicle valuation.",
	},
];

/* ─────────────────────────────────────────────────────────────
   OUTLIER ANALYSIS CONSTANTS
───────────────────────────────────────────────────────────── */
const OUTLIER_DATA = [
	{
		feature: "max_power",
		outlierCount: 307,
		iqrBounds: "Q1: 67.0 | Q3: 102.0 | IQR: 35.0 | Upper: 154.5 BHP",
		image: "/projects/car-price/boxplot_max_power.png",
		impact:
			"High-end performance and luxury vehicles generate extreme power spikes that require bounded scaling.",
		handling:
			"Preserved in dataset; normalized via MinMaxScaler to maintain continuous luxury price separation.",
	},
	{
		feature: "engine",
		outlierCount: 592,
		iqrBounds: "Q1: 1197 | Q3: 1582 | IQR: 385 | Upper: 2159.5 CC",
		image: "/projects/car-price/boxplot_engine.png",
		impact:
			"Large displacement SUVs (2.5L to 3.5L) represent high-value segment outliers.",
		handling:
			"Retained without arbitrary clipping to allow ANN to capture displacement premium.",
	},
	{
		feature: "selling_price",
		outlierCount: 330,
		iqrBounds: "Q1: 2700 | Q3: 7900 | IQR: 5200 | Upper: 15700",
		image: "/projects/car-price/boxplot_selling_price.png",
		impact:
			"Right-skewed target variable with luxury vehicles reaching 95,000+.",
		handling:
			"Target kept in true scale; evaluated via MAE and RMSE to monitor high-end error penalties.",
	},
	{
		feature: "year",
		outlierCount: 77,
		iqrBounds: "Q1: 2012 | Q3: 2017 | IQR: 5 | Lower: 2004.5",
		image: "/projects/car-price/boxplot_year.png",
		impact:
			"Vintage and older models (>20 years) have distinct bottomed-out valuation floors.",
		handling:
			"Transformed into vehicle age to stabilize linear learning gradients.",
	},
	{
		feature: "seats",
		outlierCount: 830,
		iqrBounds: "Q1: 5 | Q3: 5 | IQR: 0 | Bounds: 5 seats",
		image: "/projects/car-price/boxplot_seats.png",
		impact:
			"Because standard sedans are overwhelmingly 5-seaters, 7-seat SUVs and 10-seat vans trigger IQR alarms.",
		handling:
			"Valid structural vehicle attribute, fully retained for commercial and MPV segmentation.",
	},
];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export function CarPriceCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const containerRef = useReveal();
	const [selectedColCategory, setSelectedColCategory] = useState<string>("All");
	const [activeOutlierIndex, setActiveOutlierIndex] = useState<number>(0);
	const [lightboxImg, setLightboxImg] = useState<{
		src: string;
		caption: string;
	} | null>(null);

	const filteredColumns =
		selectedColCategory === "All"
			? DATASET_COLUMNS
			: DATASET_COLUMNS.filter((c) => c.category === selectedColCategory);

	return (
		<div ref={containerRef as any} className="project-page-root car-case-page">
			{/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
			<section className="project-hero-section">
				<ProjectContainer>
					<ProjectBackButton />

					<div className="project-hero-grid">
						<div className="project-hero-content reveal">
							<div className="car-hero-kicker">
								<span className="car-hero-kicker-dot" />
								MACHINE LEARNING&nbsp; · &nbsp;REGRESSION&nbsp; · &nbsp;2026
							</div>
							<h1 className="project-hero-title">Car Price Prediction</h1>
							<p className="project-hero-subtitle">
								Artificial Neural Network for Used Car Price Estimation
							</p>
							<p className="project-hero-desc">
								An end-to-end machine learning project that predicts used car
								selling prices from vehicle specifications, ownership
								information, and location-related features.
							</p>

							<div className="car-tech-chips" aria-label="Project technologies">
								{[
									"Python",
									"Pandas",
									"Scikit-learn",
									"TensorFlow",
									"Keras",
									"ANN Regression",
								].map((tech) => (
									<span key={tech} className="car-tech-chip">
										{tech}
									</span>
								))}
							</div>

							<ProjectMetaGrid
								items={[
									{ label: "ROLE", value: "Machine Learning / Data Science" },
									{
										label: "MODEL",
										value: "Artificial Neural Network (3 Hidden Layers)",
									},
									{
										label: "FRAMEWORK",
										value: "TensorFlow · Keras · Scikit-Learn",
									},
									{
										label: "DATASET",
										value: "4,200 Records · 16 Raw Columns · 24 Tensors",
									},
								]}
							/>

							<div className="project-hero-actions">
								<a
									href="https://github.com/RichelleMarvela/Car-Price-Prediction.git"
									target="_blank"
									rel="noreferrer"
									className="project-github-button"
								>
									<GitBranch size={16} /> VIEW GITHUB <ArrowUpRight size={16} />
								</a>
							</div>
						</div>

						{/* HERO VISUAL HUD */}
						<div className="project-hero-visual-slot reveal">
							<div className="car-hero-hud-frame">
								<div className="car-hud-header">
									<div className="car-hud-badge">
										<Activity size={14} className="text-amber-400" />
										<span>REGRESSION PIPELINE HUD</span>
									</div>
									<span className="car-hud-status">
										STATUS: MODEL TRAINED & EVALUATED
									</span>
								</div>

								<div className="car-hud-flow">
									<div className="car-hud-step">
										<span className="car-hud-step-num">01</span>
										<div className="car-hud-step-info">
											<strong>RAW CAR DATA</strong>
											<span>4,200 × 16 Features</span>
										</div>
									</div>
									<div className="car-hud-arrow">↓</div>
									<div className="car-hud-step">
										<span className="car-hud-step-num">02</span>
										<div className="car-hud-step-info">
											<strong>FEATURE ENGINEERING</strong>
											<span>Regex Torque, Age, Target Encoding</span>
										</div>
									</div>
									<div className="car-hud-arrow">↓</div>
									<div className="car-hud-step">
										<span className="car-hud-step-num">03</span>
										<div className="car-hud-step-info">
											<strong>ANN REGRESSION</strong>
											<span>512 → 256 → 128 (Sigmoid + BatchNorm)</span>
										</div>
									</div>
									<div className="car-hud-arrow">↓</div>
									<div className="car-hud-step active">
										<span className="car-hud-step-num">04</span>
										<div className="car-hud-step-info">
											<strong>PREDICTED SELLING PRICE</strong>
											<span>MAE: 1,822.50 · R²: 0.8634</span>
										</div>
									</div>
								</div>

								<div className="car-hud-stats-grid">
									<div className="car-hud-stat">
										<span className="car-stat-label">R² ACCURACY</span>
										<strong className="car-stat-val text-emerald-400">
											86.34%
										</strong>
										<span className="car-stat-sub">From -49.3% Baseline</span>
									</div>
									<div className="car-hud-stat">
										<span className="car-stat-label">TEST MAE</span>
										<strong className="car-stat-val text-amber-300">
											1,822.50
										</strong>
										<span className="car-stat-sub">-69.7% Error Drop</span>
									</div>
									<div className="car-hud-stat">
										<span className="car-stat-label">BATCH NORMALIZATION</span>
										<strong className="car-stat-val text-cyan-300">
											3 Layers
										</strong>
										<span className="car-stat-sub">Vanishing Gradient Fix</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ProjectContainer>
			</section>

			{/* ─────────────────────────────────────────────────────────────
          01 — PROJECT OVERVIEW
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="01"
				title="Predicting Used Car Prices from Real-World Features"
				lead="Used car valuation is governed by complex, nonlinear interactions between mechanical wear, physical specifications, brand tier, and local market geography."
			>
				<div className="car-overview-grid reveal">
					<div className="car-overview-card problem">
						<div className="overview-card-header">
							<AlertTriangle size={20} className="text-rose-400" />
							<h3>The Real-World Valuation Challenge</h3>
						</div>
						<p>
							Manual or simple linear estimation of used-car prices frequently
							fails because vehicle depreciation is not monotonic. Factors like
							power-to-weight, engine displacement, ownership transfers, fuel
							type, and regional market density interact in non-linear ways.
						</p>
						<ul className="car-bullet-list">
							<li>
								<strong>Messy, Unstructured String Attributes:</strong> Critical
								features such as torque and mileage were stored as heterogeneous
								strings with mixed units (e.g., <code>113Nm@ 4200rpm</code>,{" "}
								<code>22,00 kmpl</code>, <code>48@ 3,000+/-500(NM@ rpm)</code>).
							</li>
							<li>
								<strong>High Cardinality Spatial Variables:</strong> Over 1,187
								unique cities and 49 states introducing severe sparsity risks if
								naive one-hot encoding were applied.
							</li>
							<li>
								<strong>Skewed Outliers & Non-linear Curves:</strong> High-end
								luxury cars and extreme power spikes that distort unregularized
								regression models.
							</li>
						</ul>
					</div>

					<div className="car-overview-card approach">
						<div className="overview-card-header">
							<CheckCircle2 size={20} className="text-emerald-400" />
							<h3>The End-to-End Machine Learning Solution</h3>
						</div>
						<p>
							Rather than training a superficial model, this project implements
							a rigorous, leakage-free data science pipeline from raw data
							auditing and custom regex parsing to deep neural architecture
							tuning.
						</p>
						<ul className="car-bullet-list">
							<li>
								<strong>Strict Data Leakage Prevention:</strong> Train/test
								splitting executed before target encoding, ensuring out-of-fold
								median mapping for unseen test categories.
							</li>
							<li>
								<strong>Custom Regex Feature Extraction:</strong> Deconstructed
								multi-format torque and mileage strings into physical
								engineering units (Nm and RPM).
							</li>
							<li>
								<strong>Deep ANN Stabilization:</strong> Overcame vanishing
								gradients in 3-layer Sigmoid architectures using Batch
								Normalization, Dropout, and dynamic learning rate scheduling.
							</li>
						</ul>
					</div>
				</div>

				{/* 4 Value Highlights */}
				<div className="car-highlights-grid reveal">
					<div className="car-highlight-item">
						<div className="highlight-icon">
							<Database size={20} className="text-cyan-400" />
						</div>
						<h4>4,200 Raw Records</h4>
						<p>
							16 heterogeneous features audited, cleaned, and engineered without
							synthetic data fabrication.
						</p>
					</div>

					<div className="car-highlight-item">
						<div className="highlight-icon">
							<Sliders size={20} className="text-amber-400" />
						</div>
						<h4>Leakage-Free Encoding</h4>
						<p>
							Target encoding calculated strictly on the training partition with
							fallback imputation for testing.
						</p>
					</div>

					<div className="car-highlight-item">
						<div className="highlight-icon">
							<Cpu size={20} className="text-purple-400" />
						</div>
						<h4>Sigmoid ANN Tuning</h4>
						<p>
							Retained 3-layer Sigmoid constraints while unlocking high accuracy
							via Batch Normalization.
						</p>
					</div>

					<div className="car-highlight-item">
						<div className="highlight-icon">
							<TrendingUp size={20} className="text-emerald-400" />
						</div>
						<h4>0.8634 R² Score</h4>
						<p>
							Dramatically boosted predictive power from -0.4933 (baseline) to
							86.34% explained variance.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          02 — DATASET SNAPSHOT
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="02"
				title="Dataset Architecture & Feature Breakdown"
				lead="Comprehensive inspection of the 4,200 records, examining missing values, categorical cardinalities, and numerical scales."
				className="car-dataset-section"
				alt
			>
				<div className="car-stat-banner reveal">
					<div className="car-stat-card">
						<span className="stat-number">4,200</span>
						<span className="stat-name">TOTAL ROWS</span>
						<span className="stat-desc">Raw dataset volume</span>
					</div>
					<div className="car-stat-card">
						<span className="stat-number">16</span>
						<span className="stat-name">COLUMNS</span>
						<span className="stat-desc">10 Categorical · 6 Numeric</span>
					</div>
					<div className="car-stat-card">
						<span className="stat-number">1</span>
						<span className="stat-name">MISSING TARGET</span>
						<span className="stat-desc">Dropped row (4,199 usable)</span>
					</div>
					<div className="car-stat-card">
						<span className="stat-number">0</span>
						<span className="stat-name">DUPLICATES</span>
						<span className="stat-desc">Verified unique records</span>
					</div>
					<div className="car-stat-card">
						<span className="stat-number">24</span>
						<span className="stat-name">FINAL TENSORS</span>
						<span className="stat-desc">After One-Hot & Target Enc.</span>
					</div>
				</div>

				{/* Column Filter & Table */}
				<div className="car-table-wrapper reveal">
					<div className="car-table-toolbar">
						<span className="toolbar-title">
							<FileSpreadsheet size={16} /> Dataset Feature Inventory (4,200 ×
							16)
						</span>
						<div className="toolbar-filters">
							{[
								"All",
								"Target",
								"Vehicle Attribute",
								"Location",
								"Commercial",
								"Identifier",
							].map((cat) => (
								<button
									key={cat}
									className={`filter-chip ${selectedColCategory === cat ? "active" : ""}`}
									onClick={() => setSelectedColCategory(cat)}
								>
									{cat}
								</button>
							))}
						</div>
					</div>

					<div className="car-schema-table-container">
						<table className="car-schema-table">
							<thead>
								<tr>
									<th>COLUMN</th>
									<th>RAW TYPE</th>
									<th>CARDINALITY / RANGE</th>
									<th>CATEGORY</th>
									<th>PREPROCESSING / TRANSFORMATION</th>
									<th>NOTES</th>
								</tr>
							</thead>
							<tbody>
								{filteredColumns.map((col) => (
									<tr
										key={col.name}
										className={`role-${col.role.toLowerCase()}`}
									>
										<td className="font-mono text-cyan-300 font-semibold">
											{col.name}
										</td>
										<td>
											<span className="type-badge">{col.type}</span>
										</td>
										<td>{col.cardinality}</td>
										<td>
											<span className="category-badge">{col.category}</span>
										</td>
										<td>{col.transformation}</td>
										<td className="text-slate-400 text-xs">{col.notes}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          03 — EXPLORATORY DATA ANALYSIS (EDA)
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="03"
				title="Exploratory Data Analysis & Statistical Audits"
				lead="Evaluating target skewness, feature inter-correlations, and quantitative IQR outlier boundaries before initiating modeling."
			>
				<div className="car-eda-grid reveal">
					{/* Target Distribution Card */}
					<div className="car-eda-visual-card">
						<div className="eda-card-header">
							<div>
								<span className="eda-badge">TARGET DISTRIBUTION</span>
								<h3>Selling Price Distribution (Right-Skewed)</h3>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/target_distribution.png",
										caption:
											"Target Variable Distribution: Right-skewed selling prices with luxury high-end tails.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="eda-img-frame">
							<Image
								src="/projects/car-price/target_distribution.png"
								alt="Distribusi Selling Price"
								width={800}
								height={500}
								className="eda-chart-img"
							/>
						</div>
						<p className="eda-caption">
							<strong>Finding:</strong> The distribution of{" "}
							<code>selling_price</code> exhibits strong positive skewness. The
							majority of vehicles trade between 2,000 and 8,000 units, while
							luxury and executive tiers extend past 50,000 to 95,000.
						</p>
					</div>

					{/* Correlation Heatmap Card */}
					<div className="car-eda-visual-card">
						<div className="eda-card-header">
							<div>
								<span className="eda-badge">CORRELATION MATRIX</span>
								<h3>Multivariate Correlation Heatmap</h3>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/correlation_heatmap.png",
										caption:
											"Correlation Heatmap: Max Power (+0.75), Engine (+0.46), and Torque (+0.54) correlate strongly with price.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="eda-img-frame">
							<Image
								src="/projects/car-price/correlation_heatmap.png"
								alt="Correlation Heatmap"
								width={800}
								height={640}
								className="eda-chart-img"
							/>
						</div>
						<p className="eda-caption">
							<strong>Key Correlations:</strong> <code>max_power</code> is the
							strongest linear predictor (+0.75), followed by{" "}
							<code>torque_clean</code> (+0.54) and <code>engine</code> (+0.46).
							Vehicle age exerts a steady depreciation drag.
						</p>
					</div>
				</div>

				{/* Quantitative IQR Outlier Audit */}
				<div className="car-outlier-section reveal">
					<div className="outlier-section-header">
						<div>
							<span className="section-eyebrow">STATISTICAL INTEGRITY</span>
							<h3>IQR Outlier Analysis & Handling Strategy</h3>
							<p>
								Calculated using standard Interquartile Range thresholds:{" "}
								<code>Q1 - 1.5×IQR</code> to <code>Q3 + 1.5×IQR</code>. Outliers
								reflect legitimate domain variance rather than measurement
								errors.
							</p>
						</div>
					</div>

					<div className="car-outlier-interactive-grid">
						<div className="outlier-nav-list">
							{OUTLIER_DATA.map((item, idx) => (
								<button
									key={item.feature}
									className={`outlier-nav-btn ${activeOutlierIndex === idx ? "active" : ""}`}
									onClick={() => setActiveOutlierIndex(idx)}
								>
									<div className="outlier-btn-top">
										<span className="font-mono">{item.feature}</span>
										<span className="outlier-count-badge">
											{item.outlierCount} outliers
										</span>
									</div>
									<small className="outlier-bounds-text">
										{item.iqrBounds.split("|")[0]}
									</small>
								</button>
							))}
						</div>

						<div className="outlier-detail-display">
							{(() => {
								const cur = OUTLIER_DATA[activeOutlierIndex];
								return (
									<div className="outlier-card">
										<div className="outlier-card-top">
											<div>
												<h4>
													Feature Outlier:{" "}
													<code className="text-cyan-300">{cur.feature}</code>
												</h4>
												<span className="outlier-bounds-full">
													{cur.iqrBounds}
												</span>
											</div>
											<button
												className="zoom-btn"
												onClick={() =>
													setLightboxImg({
														src: cur.image,
														caption: `Boxplot Outlier Detection for ${cur.feature} (${cur.outlierCount} outliers detected).`,
													})
												}
											>
												<Maximize2 size={16} />
											</button>
										</div>

										<div className="outlier-chart-wrapper">
											<Image
												src={cur.image}
												alt={`Boxplot ${cur.feature}`}
												width={600}
												height={400}
												className="outlier-chart-img"
											/>
										</div>

										<div className="outlier-explanation-grid">
											<div className="outlier-exp-item">
												<strong>Domain Impact:</strong>
												<p>{cur.impact}</p>
											</div>
											<div className="outlier-exp-item">
												<strong>Engineering Strategy:</strong>
												<p>{cur.handling}</p>
											</div>
										</div>
									</div>
								);
							})()}
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          04 — DATA CLEANING & UNIT NORMALIZATION
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="04"
				title="Data Cleaning & Unit Standardization"
				lead="Transforming messy, mixed-format string values into robust, model-ready numerical and categorical structures."
				alt
			>
				<div className="car-transformations-grid reveal">
					<div className="car-trans-card">
						<div className="trans-header">
							<span className="trans-num">01</span>
							<h4>Missing Target Dropping</h4>
						</div>
						<div className="trans-body">
							<div className="trans-compare">
								<div className="trans-box before">
									<span className="box-label">RAW STATE</span>
									<code>selling_price: 1 NaN value</code>
								</div>
								<div className="trans-arrow">→</div>
								<div className="trans-box after">
									<span className="box-label">ACTION</span>
									<code>df.dropna(subset=['selling_price'])</code>
								</div>
							</div>
							<p>
								Regression targets cannot be synthetically imputed without
								distorting ground truth. The single missing row was safely
								removed (4,200 → 4,199).
							</p>
						</div>
					</div>

					<div className="car-trans-card">
						<div className="trans-header">
							<span className="trans-num">02</span>
							<h4>Mileage Comma Parsing</h4>
						</div>
						<div className="trans-body">
							<div className="trans-compare">
								<div className="trans-box before">
									<span className="box-label">RAW STATE</span>
									<code>"22,00", "19,09" (object)</code>
								</div>
								<div className="trans-arrow">→</div>
								<div className="trans-box after">
									<span className="box-label">ACTION</span>
									<code>.str.replace(',', '.').astype(float)</code>
								</div>
							</div>
							<p>
								European decimal comma notation was converted to standard float
								points to restore continuous numerical calculation.
							</p>
						</div>
					</div>

					<div className="car-trans-card">
						<div className="trans-header">
							<span className="trans-num">03</span>
							<h4>Complex Torque Regex Decomposition</h4>
						</div>
						<div className="trans-body">
							<div className="trans-compare">
								<div className="trans-box before">
									<span className="box-label">RAW STATE</span>
									<code>"113Nm@ 4200rpm", "48@ 3000(kgm)"</code>
								</div>
								<div className="trans-arrow">→</div>
								<div className="trans-box after">
									<span className="box-label">ACTION</span>
									<code>torque_clean (Nm) + torque_rpm_clean</code>
								</div>
							</div>
							<p>
								Custom regex parser normalized <code>kgm → Nm (* 9.80665)</code>
								, computed range midpoints for RPMs, and imputed missing values
								with median.
							</p>
						</div>
					</div>

					<div className="car-trans-card">
						<div className="trans-header">
							<span className="trans-num">04</span>
							<h4>Vehicle Age Linearization</h4>
						</div>
						<div className="trans-body">
							<div className="trans-compare">
								<div className="trans-box before">
									<span className="box-label">RAW STATE</span>
									<code>year = 2018, 2012, 1994...</code>
								</div>
								<div className="trans-arrow">→</div>
								<div className="trans-box after">
									<span className="box-label">ACTION</span>
									<code>age = 2025 - year; drop(year)</code>
								</div>
							</div>
							<p>
								Age provides direct linear alignment with mechanical wear,
								distance traveled, and market depreciation curves.
							</p>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          05 — FEATURE ENGINEERING & PREPROCESSING
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="05"
				title="Feature Engineering & Leakage-Free Preprocessing"
				lead="Building a watertight preprocessing pipeline that prevents data leakage through strict train/test split isolation and cardinality-based encoding."
			>
				{/* Visual Pipeline Flowchart */}
				<div className="car-pipeline-flow reveal">
					<div className="pipeline-step">
						<div className="pipe-icon-frame">
							<Database size={20} />
						</div>
						<span className="pipe-title">Raw Dataset</span>
						<small>4,200 × 16 Features</small>
					</div>

					<span className="pipe-arrow">→</span>

					<div className="pipeline-step">
						<div className="pipe-icon-frame">
							<Sparkles size={20} />
						</div>
						<span className="pipe-title">String Parsing & Age</span>
						<small>Torque, Mileage, Age</small>
					</div>

					<span className="pipe-arrow">→</span>

					<div className="pipeline-step highlight">
						<div className="pipe-icon-frame">
							<Scale size={20} />
						</div>
						<span className="pipe-title">80:20 Train/Test Split</span>
						<small>3,359 Train · 840 Test</small>
					</div>

					<span className="pipe-arrow">→</span>

					<div className="pipeline-step">
						<div className="pipe-icon-frame">
							<Binary size={20} />
						</div>
						<span className="pipe-title">Target & One-Hot Enc.</span>
						<small>Trained ONLY on Train Split</small>
					</div>

					<span className="pipe-arrow">→</span>

					<div className="pipeline-step">
						<div className="pipe-icon-frame">
							<Sliders size={20} />
						</div>
						<span className="pipe-title">MinMaxScaler</span>
						<small>10 Numeric/Target Cols</small>
					</div>

					<span className="pipe-arrow">→</span>

					<div className="pipeline-step final">
						<div className="pipe-icon-frame">
							<Cpu size={20} />
						</div>
						<span className="pipe-title">24-Dim Tensor</span>
						<small>Model-Ready Feed</small>
					</div>
				</div>

				{/* Encoding Breakdown Grid */}
				<div className="car-encoding-grid reveal">
					<div className="encoding-card high-card">
						<div className="enc-header">
							<span className="enc-tag">HIGH CARDINALITY</span>
							<h4>Target Mean Encoding (Leakage-Free)</h4>
						</div>
						<p>
							Applied to variables with vast category spaces to compress
							dimensionality without sparse matrix explosions:
						</p>
						<ul className="enc-list">
							<li>
								<strong>
									Vehicle Brand (<code>name</code>):
								</strong>{" "}
								Top 15 brands preserved (Maruti, Hyundai, Tata, etc.); rare
								brands grouped into <code>'Other'</code> prior to encoding.
							</li>
							<li>
								<strong>State or Province (49 states):</strong> Encoded against
								training target mean.
							</li>
							<li>
								<strong>City (1,187 cities):</strong> Cities with frequency &lt;
								10 grouped into <code>'Other'</code>, then target encoded.
							</li>
						</ul>
						<div className="code-callout">
							<small>LEAKAGE PREVENTION RULE:</small>
							<code>mapping = train_df.groupby(col)[target].mean()</code>
							<code>
								test_encoded =
								test_df[col].map(mapping).fillna(train_encoded.median())
							</code>
						</div>
					</div>

					<div className="encoding-card low-card">
						<div className="enc-header">
							<span className="enc-tag">LOW CARDINALITY</span>
							<h4>One-Hot Dummy Encoding (drop_first=True)</h4>
						</div>
						<p>
							Applied to discrete nominal features to represent categories
							orthogonally without collinearity:
						</p>
						<ul className="enc-list">
							<li>
								<strong>Region (4):</strong> Central, East, West, South.
							</li>
							<li>
								<strong>Fuel Type (5):</strong> Petrol, Diesel, CNG, LPG,
								Electric.
							</li>
							<li>
								<strong>Seller Type (3):</strong> Individual, Dealer, Trustmark
								Dealer.
							</li>
							<li>
								<strong>Transmission (2):</strong> Manual vs Automatic.
							</li>
							<li>
								<strong>Owner History (5):</strong> First, Second, Third, Fourth
								& Above, Test Drive Car.
							</li>
						</ul>
						<div className="code-callout">
							<small>FEATURE SCALING (MinMaxScaler):</small>
							<code>
								all_numeric =
								['mileage','engine','max_power','seats','torque_clean','torque_rpm_clean','age','name','State','City']
							</code>
							<code>
								scaler.fit_transform(X_train) / scaler.transform(X_test)
							</code>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          06 — ARTIFICIAL NEURAL NETWORK (ANN) ARCHITECTURE
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="06"
				title="Artificial Neural Network (ANN) Architecture"
				lead="Designing a deep, regularized regression neural network with 3 hidden layers and Sigmoid activations."
				alt
			>
				<div className="car-ann-diagram-wrapper reveal">
					<div className="ann-diagram-header">
						<span className="diagram-title">
							<Cpu size={16} /> Sequential Deep Neural Architecture (24 Inputs →
							1 Output)
						</span>
						<span className="diagram-badge">TENSORFLOW / KERAS</span>
					</div>

					<div className="ann-layers-container">
						{/* Input Layer */}
						<div className="ann-layer-box input">
							<span className="layer-type">INPUT TENSOR</span>
							<strong>24 FEATURES</strong>
							<span className="layer-sub">10 Scaled Numeric + 14 One-Hot</span>
						</div>

						<span className="ann-connect-arrow">→</span>

						{/* Hidden Layer 1 */}
						<div className="ann-layer-box hidden">
							<span className="layer-type">HIDDEN LAYER 1</span>
							<strong>Dense(512)</strong>
							<span className="layer-sub">activation='sigmoid'</span>
							<div className="layer-reg-tags">
								<span className="reg-tag">BatchNorm</span>
								<span className="reg-tag">Dropout(0.2)</span>
							</div>
						</div>

						<span className="ann-connect-arrow">→</span>

						{/* Hidden Layer 2 */}
						<div className="ann-layer-box hidden">
							<span className="layer-type">HIDDEN LAYER 2</span>
							<strong>Dense(256)</strong>
							<span className="layer-sub">activation='sigmoid'</span>
							<div className="layer-reg-tags">
								<span className="reg-tag">BatchNorm</span>
								<span className="reg-tag">Dropout(0.2)</span>
							</div>
						</div>

						<span className="ann-connect-arrow">→</span>

						{/* Hidden Layer 3 */}
						<div className="ann-layer-box hidden">
							<span className="layer-type">HIDDEN LAYER 3</span>
							<strong>Dense(128)</strong>
							<span className="layer-sub">activation='sigmoid'</span>
							<div className="layer-reg-tags">
								<span className="reg-tag">BatchNorm</span>
								<span className="reg-tag">Dropout(0.1)</span>
							</div>
						</div>

						<span className="ann-connect-arrow">→</span>

						{/* Output Layer */}
						<div className="ann-layer-box output">
							<span className="layer-type">OUTPUT LAYER</span>
							<strong>Dense(1)</strong>
							<span className="layer-sub">activation='linear'</span>
							<span className="output-badge">SELLING PRICE</span>
						</div>
					</div>

					{/* Hyperparameters Callout Grid */}
					<div className="ann-params-grid">
						<div className="param-item">
							<span className="param-label">OPTIMIZER</span>
							<strong className="param-val">Adam (lr=0.0007)</strong>
							<span className="param-desc">Smooth, stable descent</span>
						</div>
						<div className="param-item">
							<span className="param-label">LOSS FUNCTION</span>
							<strong className="param-val">MSE (Mean Squared Error)</strong>
							<span className="param-desc">Penalizes large variance</span>
						</div>
						<div className="param-item">
							<span className="param-label">METRIC</span>
							<strong className="param-val">MAE (Mean Absolute Error)</strong>
							<span className="param-desc">
								Direct interpretable price delta
							</span>
						</div>
						<div className="param-item">
							<span className="param-label">EARLY STOPPING</span>
							<strong className="param-val">Patience = 15</strong>
							<span className="param-desc">Restores best weights</span>
						</div>
						<div className="param-item">
							<span className="param-label">ADAPTIVE LR</span>
							<strong className="param-val">ReduceLROnPlateau</strong>
							<span className="param-desc">factor=0.5, patience=5</span>
						</div>
					</div>
				</div>

				{/* 3 Reasons Why ANN */}
				<div className="car-why-ann-grid reveal">
					<div className="why-card">
						<div className="why-icon">
							<Workflow size={20} className="text-cyan-400" />
						</div>
						<h4>Non-Linear Multi-Factor Dynamics</h4>
						<p>
							Vehicle pricing exhibits complex threshold behavior (e.g., luxury
							brands retain value differently over age compared to budget fleet
							models). Neural network hidden layers capture these multi-way
							interactions.
						</p>
					</div>

					<div className="why-card">
						<div className="why-icon">
							<Binary size={20} className="text-purple-400" />
						</div>
						<h4>Mixed Continuous & Encoded Inputs</h4>
						<p>
							The architecture maps both continuous physical measures (power,
							engine, torque) and discrete categorical embeddings onto a unified
							latent pricing manifold.
						</p>
					</div>

					<div className="why-card">
						<div className="why-icon">
							<Target size={20} className="text-emerald-400" />
						</div>
						<h4>Continuous Price Regression</h4>
						<p>
							The linear output node outputs an unbounded continuous price
							estimate, allowing calibrated predictions across both entry-level
							commuter cars and high-end luxury models.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          07 — TRAINING PROCESS & LOSS CONVERGENCE
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="07"
				title="Training Convergence & Vanishing Gradient Resolution"
				lead="Analyzing how Batch Normalization and adaptive learning rates prevented saturation and enabled steady multi-epoch convergence."
			>
				<div className="car-training-compare-grid reveal">
					{/* Baseline Training Curve */}
					<div className="train-curve-card">
						<div className="curve-header">
							<div className="flex items-center gap-2">
								<span className="curve-tag baseline">BASELINE ANN</span>
								<h4>Unregularized Sigmoid (Loss Stagnation)</h4>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/baseline_loss_curve.png",
										caption:
											"Baseline Sigmoid ANN: Vanishing gradients cause flat loss curve with zero meaningful learning.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="curve-img-frame">
							<Image
								src="/projects/car-price/baseline_loss_curve.png"
								alt="Baseline Loss Curve"
								width={800}
								height={500}
								className="train-chart-img"
							/>
						</div>
						<div className="curve-analysis">
							<div className="analysis-pill text-rose-300">
								<AlertTriangle size={14} /> Vanishing Gradient Saturated at Loss
								~110,000,000
							</div>
							<p>
								Without normalization, stacked Sigmoid activations compressed
								signals into saturated tails (gradients approaching 0). The
								model barely learned, producing an invalid negative R²
								(-0.4933).
							</p>
						</div>
					</div>

					{/* Tuned Training Curve */}
					<div className="train-curve-card tuned">
						<div className="curve-header">
							<div className="flex items-center gap-2">
								<span className="curve-tag tuned">OPTIMIZED TUNED ANN</span>
								<h4>Sigmoid + BatchNorm + Dropout + Adaptive LR</h4>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/tuned_loss_curve.png",
										caption:
											"Optimized Sigmoid ANN: BatchNorm keeps activations centered, achieving smooth continuous loss reduction.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="curve-img-frame">
							<Image
								src="/projects/car-price/tuned_loss_curve.png"
								alt="Tuned Loss Curve"
								width={800}
								height={500}
								className="train-chart-img"
							/>
						</div>
						<div className="curve-analysis">
							<div className="analysis-pill text-emerald-300">
								<CheckCircle2 size={14} /> Loss Plunged Smoothly across 162
								Epochs
							</div>
							<p>
								Batch Normalization recentered intermediate layer activations
								around zero mean, allowing Sigmoid derivatives to remain active.
								Train and validation losses tracked closely without overfitting.
							</p>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          08 — MODEL EVALUATION: BASELINE VS TUNED
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="08"
				title="Quantitative Evaluation & Benchmark Comparison"
				lead="Rigorous side-by-side performance evaluation on the unseen 840-sample test set."
				alt
			>
				<div className="car-eval-table-card reveal">
					<div className="eval-table-header">
						<h3>Test Set Regression Metrics (840 Test Samples)</h3>
						<span className="eval-note">
							Exact measurements from 2B.ipynb test execution
						</span>
					</div>

					<div className="eval-table-container">
						<table className="car-eval-table">
							<thead>
								<tr>
									<th>MODEL ARCHITECTURE</th>
									<th>MAE (Mean Absolute Error)</th>
									<th>RMSE (Root Mean Squared Error)</th>
									<th>R² SCORE (Explained Variance)</th>
									<th>VERDICT</th>
								</tr>
							</thead>
							<tbody>
								<tr className="row-baseline">
									<td>
										<strong>Baseline ANN</strong>
										<small>
											Dense(512-256-128, Sigmoid), lr=0.001, No Norm
										</small>
									</td>
									<td className="font-mono text-rose-400">6,009.4054</td>
									<td className="font-mono text-rose-400">10,452.0669</td>
									<td className="font-mono text-rose-400">-0.4933</td>
									<td>
										<span className="status-badge failed">
											Severely Underfit
										</span>
									</td>
								</tr>
								<tr className="row-tuned">
									<td>
										<strong>Optimized Tuned ANN</strong>
										<small>
											Sigmoid + BatchNorm + Dropout(0.2-0.1) + ReduceLR
										</small>
									</td>
									<td className="font-mono text-emerald-400 font-bold">
										1,822.5018
									</td>
									<td className="font-mono text-emerald-400 font-bold">
										3,161.5642
									</td>
									<td className="font-mono text-emerald-400 font-bold">
										0.8634 (86.34%)
									</td>
									<td>
										<span className="status-badge optimal">
											Optimal & Generalizable
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="eval-delta-grid">
						<div className="delta-card">
							<span className="delta-label">MAE REDUCTION</span>
							<strong className="delta-val text-emerald-400">-69.7%</strong>
							<p>
								Absolute error plunged from 6,009 down to 1,822, vastly
								tightening prediction precision.
							</p>
						</div>
						<div className="delta-card">
							<span className="delta-label">RMSE REDUCTION</span>
							<strong className="delta-val text-emerald-400">-69.8%</strong>
							<p>
								Root Mean Squared Error fell by over 7,290 units, drastically
								minimizing severe outlier errors.
							</p>
						</div>
						<div className="delta-card">
							<span className="delta-label">VARIANCE EXPLAINED (R²)</span>
							<strong className="delta-val text-cyan-400">+135.7% Jump</strong>
							<p>
								Transitioned from negative baseline variance into robust 86.34%
								total market explanation.
							</p>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          09 — PREDICTED VS ACTUAL VISUALIZATION
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="09"
				title="Predicted vs Actual Price Alignment"
				lead="Visualizing scatter plots against the 45-degree diagonal reference line (y = x) on the holdout test partition."
			>
				<div className="car-pred-scatter-grid reveal">
					{/* Baseline Scatter */}
					<div className="pred-scatter-card">
						<div className="scatter-header">
							<div>
								<span className="scatter-badge baseline">BASELINE SCATTER</span>
								<h4>Baseline Prediction vs Actual</h4>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/baseline_pred_actual.png",
										caption:
											"Baseline Scatter: Predictions fail to track the actual selling price, showing broad horizontal dispersion.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="scatter-img-frame">
							<Image
								src="/projects/car-price/baseline_pred_actual.png"
								alt="Baseline Predicted vs Actual"
								width={600}
								height={600}
								className="pred-chart-img"
							/>
						</div>
						<p className="scatter-desc">
							<strong>Observation:</strong> Points form a diffuse cloud that
							does not adhere to the red diagonal reference line. Predictions
							stay pinned near the mean, unable to capture high-value vehicles.
						</p>
					</div>

					{/* Tuned Scatter */}
					<div className="pred-scatter-card tuned">
						<div className="scatter-header">
							<div>
								<span className="scatter-badge tuned">
									OPTIMIZED TUNED SCATTER
								</span>
								<h4>Tuned Prediction vs Actual (High Linear Fidelity)</h4>
							</div>
							<button
								className="zoom-btn"
								onClick={() =>
									setLightboxImg({
										src: "/projects/car-price/tuned_pred_actual.png",
										caption:
											"Tuned Scatter: Predictions cluster tightly along the y=x diagonal line across all price brackets.",
									})
								}
							>
								<Maximize2 size={16} />
							</button>
						</div>
						<div className="scatter-img-frame">
							<Image
								src="/projects/car-price/tuned_pred_actual.png"
								alt="Tuned Predicted vs Actual"
								width={600}
								height={600}
								className="pred-chart-img"
							/>
						</div>
						<p className="scatter-desc">
							<strong>Observation:</strong> Data points cluster tightly along
							the diagonal reference line across commuter, mid-range, and luxury
							price brackets, demonstrating excellent model calibration.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          10 — WHAT THE MODEL LEARNS (DOMAIN RELATIONSHIPS)
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="10"
				title="Domain Valuation Dynamics Learned by the Network"
				lead="Key physical, commercial, and geographical relationships represented within the engineered feature space."
				alt
			>
				<div className="car-domain-grid reveal">
					<div className="domain-card">
						<div className="domain-icon">
							<Clock size={20} className="text-amber-400" />
						</div>
						<h4>Vehicle Age & Depreciation</h4>
						<p>
							Linearized age captures non-linear depreciation where initial
							steep value drops gradually plateau as vehicles reach functional
							utility baselines.
						</p>
					</div>

					<div className="domain-card">
						<div className="domain-icon">
							<Gauge size={20} className="text-cyan-400" />
						</div>
						<h4>Engine Displacement & Power (BHP)</h4>
						<p>
							<code>max_power</code> (+0.75 correlation) and <code>engine</code>{" "}
							(+0.46) serve as primary anchors differentiating luxury and sports
							segments from economy platforms.
						</p>
					</div>

					<div className="domain-card">
						<div className="domain-icon">
							<Activity size={20} className="text-emerald-400" />
						</div>
						<h4>Torque & RPM Dynamics</h4>
						<p>
							Physical torque output (Nm) at specified RPM separates high-towing
							diesel utility vehicles from higher-revving urban runabouts.
						</p>
					</div>

					<div className="domain-card">
						<div className="domain-icon">
							<Sparkles size={20} className="text-purple-400" />
						</div>
						<h4>Brand Tier & Market Perception</h4>
						<p>
							Target encoding of top automotive brands (Maruti, Hyundai, Tata,
							Ford, Chevrolet) embeds brand equity and aftermarket demand into
							the neural manifold.
						</p>
					</div>

					<div className="domain-card">
						<div className="domain-icon">
							<Compass size={20} className="text-rose-400" />
						</div>
						<h4>Geographical Pricing Discrepancies</h4>
						<p>
							State and regional target encodings capture local economic
							conditions, regional taxes, and used car demand differentials
							across urban hubs.
						</p>
					</div>

					<div className="domain-card">
						<div className="domain-icon">
							<ShieldAlert size={20} className="text-blue-400" />
						</div>
						<h4>Ownership Multi-Hand Discount</h4>
						<p>
							One-hot ownership features reflect standard market depreciation
							penalties for 2nd, 3rd, and 4th+ owner vehicles compared to
							certified dealer units.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          11 — COMPLETE END-TO-END PIPELINE SUMMARY
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="11"
				title="End-to-End Pipeline Architecture"
				lead="A unified overview of the machine learning pipeline from raw CSV ingestion to calibrated price output."
			>
				<div className="car-e2e-card reveal">
					<div className="e2e-flow-list">
						<div className="e2e-item">
							<span className="e2e-step-tag">01</span>
							<div className="e2e-content">
								<strong>Data Ingestion & Integrity Audit</strong>
								<p>
									Audited 4,200 records across 16 columns; dropped 1 missing
									target row; confirmed 0 duplicates.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">02</span>
							<div className="e2e-content">
								<strong>Exploratory Data Analysis (EDA)</strong>
								<p>
									Analyzed right-skewed target distribution, computed
									correlation matrix, quantified IQR outliers.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">03</span>
							<div className="e2e-content">
								<strong>Feature Cleaning & Unit Standardization</strong>
								<p>
									Converted comma mileage to float; parsed multi-format torque
									strings into clean Nm and RPM.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">04</span>
							<div className="e2e-content">
								<strong>Feature Engineering & 80:20 Partitioning</strong>
								<p>
									Engineered vehicle age (2025 - year); partitioned dataset into
									3,359 train and 840 test records.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">05</span>
							<div className="e2e-content">
								<strong>Leakage-Free Categorical Encoding</strong>
								<p>
									Target encoded high-cardinality brand/state/city strictly on
									train data; one-hot encoded low-cardinality.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">06</span>
							<div className="e2e-content">
								<strong>MinMaxScaler Normalization</strong>
								<p>
									Scaled all 10 continuous and target-encoded features onto [0,
									1] range to avoid gradient explosions.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">07</span>
							<div className="e2e-content">
								<strong>Deep ANN Regression Training</strong>
								<p>
									Trained 512 → 256 → 128 Sigmoid network with BatchNorm,
									Dropout, EarlyStopping, and ReduceLROnPlateau.
								</p>
							</div>
						</div>

						<div className="e2e-item">
							<span className="e2e-step-tag">08</span>
							<div className="e2e-content">
								<strong>Evaluation & Quantitative Validation</strong>
								<p>
									Evaluated on test set, validating 86.34% R² and 1,822.50 MAE
									with tightly clustered diagonal scatter.
								</p>
							</div>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          12 — TECH STACK
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="12"
				title="Technology & Tooling Stack"
				lead="Libraries and frameworks utilized across data manipulation, neural modeling, and evaluation."
				alt
			>
				<div className="car-tech-grid reveal">
					<div className="tech-card">
						<div className="tech-icon-frame">
							<Code2 size={24} className="text-cyan-400" />
						</div>
						<h4>Python</h4>
						<p>
							Core programming language for end-to-end data manipulation and
							modeling.
						</p>
					</div>

					<div className="tech-card">
						<div className="tech-icon-frame">
							<Cpu size={24} className="text-orange-400" />
						</div>
						<h4>TensorFlow & Keras</h4>
						<p>
							Sequential ANN modeling, custom layer stacking, callbacks, and
							gradient descent.
						</p>
					</div>

					<div className="tech-card">
						<div className="tech-icon-frame">
							<Sliders size={24} className="text-blue-400" />
						</div>
						<h4>Scikit-Learn</h4>
						<p>
							Train-test splitting, MinMaxScaler, and regression evaluation
							metrics (MAE, RMSE, R²).
						</p>
					</div>

					<div className="tech-card">
						<div className="tech-icon-frame">
							<Database size={24} className="text-emerald-400" />
						</div>
						<h4>Pandas & NumPy</h4>
						<p>
							DataFrame restructuring, string parsing, regex transformations,
							and array computations.
						</p>
					</div>

					<div className="tech-card">
						<div className="tech-icon-frame">
							<LineChart size={24} className="text-purple-400" />
						</div>
						<h4>Matplotlib & Seaborn</h4>
						<p>
							Statistical distribution plotting, correlation heatmaps, boxplots,
							and loss curves.
						</p>
					</div>

					<div className="tech-card">
						<div className="tech-icon-frame">
							<FileSpreadsheet size={24} className="text-amber-400" />
						</div>
						<h4>Jupyter Notebook</h4>
						<p>
							Interactive experimentation, iterative model training, and cell
							validation.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          13 — MY ROLE & CONTRIBUTIONS
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="13"
				title="My Role & Contributions"
				lead="Specific machine learning and data science tasks performed throughout the project lifecycle."
				className="car-role-section"
			>
				<div className="car-role-grid reveal">
					<div className="role-item">
						<span className="role-num">01</span>
						<h4>Exploratory Data Analysis</h4>
						<p>
							Audited data distributions, identified 1 missing target value,
							computed correlation matrices, and detected numerical outliers
							using the IQR rule.
						</p>
					</div>

					<div className="role-item">
						<span className="role-num">02</span>
						<h4>Data Cleaning & Parsing</h4>
						<p>
							Constructed robust regex parsers for complex torque and mileage
							strings, standardized unit systems, and removed irrelevant
							identifier columns.
						</p>
					</div>

					<div className="role-item">
						<span className="role-num">03</span>
						<h4>Feature Engineering</h4>
						<p>
							Derived vehicle age from production year, decomposed torque into
							Nm and RPM components, and grouped low-frequency categories to
							reduce sparsity.
						</p>
					</div>

					<div className="role-item">
						<span className="role-num">04</span>
						<h4>Leakage-Free Encoding</h4>
						<p>
							Isolated target encoding calculations strictly to the training
							split, preventing data leakage into the test set.
						</p>
					</div>

					<div className="role-item">
						<span className="role-num">05</span>
						<h4>ANN Architecture & Tuning</h4>
						<p>
							Integrated Batch Normalization, Dropout, and learning rate
							schedules into a 3-layer Sigmoid ANN, overcoming severe vanishing
							gradient issues.
						</p>
					</div>

					<div className="role-item">
						<span className="role-num">06</span>
						<h4>Comprehensive Evaluation</h4>
						<p>
							Evaluated models across MAE, RMSE, and R² scores, validated
							learning curves, and confirmed prediction calibration via scatter
							plots.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          14 — CHALLENGES & SOLUTIONS
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="14"
				title="Technical Challenges & Engineering Solutions"
				lead="Overcoming real-world data science roadblocks through disciplined experimentation."
				alt
			>
				<div className="car-challenges-grid reveal">
					<div className="challenge-card">
						<div className="challenge-header">
							<span className="challenge-tag">CHALLENGE 01</span>
							<h4>Vanishing Gradients in Deep Sigmoid Layers</h4>
						</div>
						<p>
							<strong>Problem:</strong> The baseline model with 3 stacked
							Sigmoid layers failed to learn, resulting in flat loss stagnation
							and a negative R² score (-0.4933).
						</p>
						<div className="solution-box">
							<strong>Solution:</strong> Incorporated Batch Normalization before
							each activation layer to keep inputs centered in the active
							non-saturated gradient region, paired with ReduceLROnPlateau.
						</div>
					</div>

					<div className="challenge-card">
						<div className="challenge-header">
							<span className="challenge-tag">CHALLENGE 02</span>
							<h4>Heterogeneous Torque String Formatting</h4>
						</div>
						<p>
							<strong>Problem:</strong> Torque values mixed kgm and Nm units,
							single RPM points, and RPM ranges (e.g., <code>1750-3000rpm</code>
							).
						</p>
						<div className="solution-box">
							<strong>Solution:</strong> Built a regex extraction pipeline that
							converted kgm to Nm (× 9.80665) and calculated midpoint RPMs for
							ranges.
						</div>
					</div>

					<div className="challenge-card">
						<div className="challenge-header">
							<span className="challenge-tag">CHALLENGE 03</span>
							<h4>Extreme High-Cardinality Location Sparsity</h4>
						</div>
						<p>
							<strong>Problem:</strong> 1,187 unique cities and 49 states would
							cause extreme dimension explosion if one-hot encoded.
						</p>
						<div className="solution-box">
							<strong>Solution:</strong> Grouped cities with frequency &lt; 10
							into <code>'Other'</code> and applied target mean encoding
							calculated strictly on training data.
						</div>
					</div>

					<div className="challenge-card">
						<div className="challenge-header">
							<span className="challenge-tag">CHALLENGE 04</span>
							<h4>Outlier Sensitivity & High Luxury Skew</h4>
						</div>
						<p>
							<strong>Problem:</strong> Luxury vehicle prices extended past
							95,000, creating heavy skew that could dominate MSE loss.
						</p>
						<div className="solution-box">
							<strong>Solution:</strong> Preserved authentic outliers while
							applying MinMaxScaler across all numerical inputs to stabilize
							backpropagation bounds.
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          15 — LIMITATIONS & FUTURE ROADMAP
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="15"
				title="Project Limitations & Future Directions"
				lead="Critical self-evaluation of dataset boundaries and roadmap for production maturation."
			>
				<div className="car-limits-roadmap-grid reveal">
					<div className="limits-column">
						<div className="col-header">
							<AlertTriangle size={20} className="text-amber-400" />
							<h3>Dataset Limitations</h3>
						</div>
						<ul className="limits-list">
							<li>
								<strong>Sample Size Boundary:</strong> 4,200 records represent a
								regional slice; larger continental datasets are needed for
								broader generalization.
							</li>
							<li>
								<strong>Missing Maintenance & Accident History:</strong> The
								dataset lacks granular service records, crash damage, and tire
								wear, which strongly influence used car market value.
							</li>
							<li>
								<strong>Static Market Timing:</strong> Predictions reflect a
								single time snapshot and do not account for inflation, macro
								interest rates, or seasonal automotive demand spikes.
							</li>
						</ul>
					</div>

					<div className="roadmap-column">
						<div className="col-header">
							<TrendingUp size={20} className="text-emerald-400" />
							<h3>Future Engineering Roadmap</h3>
						</div>
						<div className="roadmap-steps">
							<div className="road-step">
								<span className="road-num">01</span>
								<div>
									<strong>Tree-Based Model Benchmarking</strong>
									<p>
										Compare ANN performance against XGBoost, LightGBM, and
										CatBoost ensembles.
									</p>
								</div>
							</div>
							<div className="road-step">
								<span className="road-num">02</span>
								<div>
									<strong>SHAP & Interpretability</strong>
									<p>
										Apply SHAPley values to quantify exact feature attributions
										for individual vehicle predictions.
									</p>
								</div>
							</div>
							<div className="road-step">
								<span className="road-num">03</span>
								<div>
									<strong>K-Fold Cross-Validation</strong>
									<p>
										Implement 5-fold stratified CV to verify consistency across
										different sample distributions.
									</p>
								</div>
							</div>
							<div className="road-step">
								<span className="road-num">04</span>
								<div>
									<strong>Real-Time API Deployment</strong>
									<p>
										Containerize preprocessing pipeline and weights into a
										FastAPI endpoint with ONNX runtime.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          16 — OUTCOME & IMPACT
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection
				num="16"
				title="Project Outcomes & Key Takeaways"
				lead="A concise synthesis of what was accomplished and validated across this regression pipeline."
				alt
			>
				<div className="car-outcome-banner reveal">
					<p className="outcome-statement">
						"This project demonstrates an end-to-end regression workflow, from
						raw vehicle data and exploratory analysis to feature engineering,
						neural-network modeling, and quantitative evaluation."
					</p>

					<div className="outcome-cards-grid">
						<div className="outcome-card">
							<div className="outcome-tag">DATA ENGINEERING</div>
							<h3>Messy to Model-Ready</h3>
							<p>
								Audited 4,200 records, cleaned complex torque/mileage strings,
								and engineered leakage-free target encodings.
							</p>
						</div>

						<div className="outcome-card">
							<div className="outcome-tag">NEURAL OPTIMIZATION</div>
							<h3>Sigmoid Architecture Tuning</h3>
							<p>
								Overcame vanishing gradient failure via Batch Normalization and
								adaptive LR, surging R² from -0.49 to 0.8634.
							</p>
						</div>

						<div className="outcome-card">
							<div className="outcome-tag">VALIDATION</div>
							<h3>Quantitative Precision</h3>
							<p>
								Reduced test MAE by 69.7% (down to 1,822.50) with tight linear
								clustering along the ideal diagonal line.
							</p>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          GITHUB CTA & NAVIGATION FOOTER
      ───────────────────────────────────────────────────────────── */}
			<ProjectGithubCTA
				title="Explore the Code & Experiments"
				description="Inspect the complete Jupyter notebook (2B.ipynb), preprocessing functions, neural network architectures, and training logs on GitHub."
				githubUrl="https://github.com/RichelleMarvela/Car-Price-Prediction.git"
				buttonLabel="VIEW GITHUB"
			/>

			<ProjectNavFooter currentId={project.id} />

			{/* ─────────────────────────────────────────────────────────────
          LIGHTBOX MODAL
      ───────────────────────────────────────────────────────────── */}
			{lightboxImg && (
				<div
					className="car-lightbox-overlay"
					onClick={() => setLightboxImg(null)}
				>
					<div
						className="car-lightbox-content"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="car-lightbox-close"
							onClick={() => setLightboxImg(null)}
						>
							<X size={20} />
						</button>
						<div className="car-lightbox-image-wrap">
							<Image
								src={lightboxImg.src}
								alt="Enlarged visualization"
								width={1200}
								height={800}
								className="car-lightbox-img"
							/>
						</div>
						{lightboxImg.caption && (
							<p className="car-lightbox-caption">{lightboxImg.caption}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
