"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	ArrowUpRight,
	Database,
	Cpu,
	FileText,
	Layers,
	Sparkles,
	CheckCircle2,
	AlertTriangle,
	GitBranch,
	BarChart3,
	Search,
	Filter,
	Zap,
	BookOpen,
	Code2,
	Terminal,
	ChevronRight,
	ExternalLink,
	ShieldCheck,
} from "lucide-react";
import { type PortfolioProject, projects } from "@/src/data/portfolio";
import {
	ProjectBackButton,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mediaQuery.matches) {
			el.querySelectorAll(".reveal").forEach((r) =>
				r.classList.add("revealed"),
			);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						const delay = target.dataset.delay || "0";
						setTimeout(() => {
							target.classList.add("revealed");
						}, parseInt(delay));
						observer.unobserve(target);
					}
				});
			},
			{ threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
		);

		const revealElements = el.querySelectorAll(".reveal");
		revealElements.forEach((r) => observer.observe(r));

		const timer = setTimeout(() => {
			revealElements.forEach((r) => {
				const rect = r.getBoundingClientRect();
				if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
					const delay = (r as HTMLElement).dataset.delay || "0";
					setTimeout(() => {
						r.classList.add("revealed");
					}, parseInt(delay));
				}
			});
		}, 50);

		return () => {
			clearTimeout(timer);
			observer.disconnect();
		};
	}, []);

	return ref;
}

/* ─────────────────────────────────────────────
   TECHNICAL PIPELINE STEPS DATA
───────────────────────────────────────────── */
const PIPELINE_STEPS = [
	{
		num: "01",
		title: "Dataset Preparation",
		sub: "Google Research AQuaMUSE",
		desc: "Loading query, multi-document, and ground-truth reference summary triplets from the Google AQuaMUSE dataset.",
		tech: "Pandas · JSONL",
	},
	{
		num: "02",
		title: "Web Scraping",
		sub: "Trafilatura + BeautifulSoup Fallback",
		desc: "Hybrid automated web scraper fetching full-text articles from target news URLs with error handling.",
		tech: "trafilatura · BeautifulSoup",
	},
	{
		num: "03",
		title: "Data Cleaning",
		sub: "MD5 URL Cache & 7 Filters",
		desc: "MD5-hashed URL caching to avoid re-scraping. Stripping 404 pages, paywalls, duplicates, and invalid lengths.",
		tech: "Python hashlib · RegEx",
	},
	{
		num: "04",
		title: "Exploratory Data Analysis",
		sub: "Length & Overlap Profiling",
		desc: "Analyzing word distributions, correlation matrix (~0.00), and 57% unigram overlap abstractiveness ratio.",
		tech: "NumPy · Seaborn",
	},
	{
		num: "05",
		title: "Text Preprocessing",
		sub: "Query-Guided Sentence Selection",
		desc: "Extracting highest-scoring relevant sentences to fit BART's strict 1,024-token input window.",
		tech: "NLTK · Tokenizer",
	},
	{
		num: "06",
		title: "Keyword Extraction",
		sub: "RAKE vs KeyBERT MiniLM",
		desc: "Extracting statistical (RAKE co-occurrence) and semantic (KeyBERT MiniLM embedding similarity) keywords.",
		tech: "RAKE · KeyBERT",
	},
	{
		num: "07",
		title: "BART Summarization",
		sub: "BART-large-cnn Model",
		desc: "Feeding 4 input configurations into BART transformer model under 2 hyperparameter settings (8 experiments).",
		tech: "Hugging Face · PyTorch",
	},
	{
		num: "08",
		title: "Evaluation",
		sub: "ROUGE, METEOR, BERTScore",
		desc: "Automated quantitative evaluation comparing generated summaries against ground-truth human references.",
		tech: "ROUGE · BERTScore",
	},
	{
		num: "09",
		title: "Comparative Analysis",
		sub: "Ablation Strategy Assessment",
		desc: "Systematically comparing non-query baseline, full context, RAKE guidance, and KeyBERT semantic guidance.",
		tech: "Ablation Matrix",
	},
];

/* ─────────────────────────────────────────────
   EXPERIMENT MATRIX DATA
───────────────────────────────────────────── */
const EXPERIMENTS = [
	{
		code: "EXP-A1",
		group: "Group A: No Query Baseline",
		config: "No-Query Baseline (Doc Only)",
		hyperparams: "Setting 1 (Beam Search = 4, Len Penalty = 1.0)",
		inputPayload: "[Document Text Only] → BART-large-cnn",
		badge: "Baseline",
	},
	{
		code: "EXP-A2",
		group: "Group A: No Query Baseline",
		config: "No-Query Baseline (Doc Only)",
		hyperparams: "Setting 2 (Beam Search = 6, Len Penalty = 2.0)",
		inputPayload: "[Document Text Only] → BART-large-cnn",
		badge: "Baseline",
	},
	{
		code: "EXP-B1",
		group: "Group B: Full Context",
		config: "Full-Context Baseline",
		hyperparams: "Setting 1 (Beam Search = 4, Len Penalty = 1.0)",
		inputPayload: "Query: {query} \nDoc: {full_document} → BART",
		badge: "Full Context",
	},
	{
		code: "EXP-B2",
		group: "Group B: Full Context",
		config: "Full-Context Baseline",
		hyperparams: "Setting 2 (Beam Search = 6, Len Penalty = 2.0)",
		inputPayload: "Query: {query} \nDoc: {full_document} → BART",
		badge: "Full Context",
	},
	{
		code: "EXP-C1",
		group: "Group C: RAKE Keywords",
		config: "RAKE Keyword Guidance",
		hyperparams: "Setting 1 (Beam Search = 4, Len Penalty = 1.0)",
		inputPayload:
			"Query: {query} \nKeywords [RAKE]: {keywords} \nDoc: {selected_sentences}",
		badge: "Statistical",
	},
	{
		code: "EXP-C2",
		group: "Group C: RAKE Keywords",
		config: "RAKE Keyword Guidance",
		hyperparams: "Setting 2 (Beam Search = 6, Len Penalty = 2.0)",
		inputPayload:
			"Query: {query} \nKeywords [RAKE]: {keywords} \nDoc: {selected_sentences}",
		badge: "Statistical",
	},
	{
		code: "EXP-D1",
		group: "Group D: KeyBERT MiniLM",
		config: "KeyBERT MiniLM Guidance",
		hyperparams: "Setting 1 (Beam Search = 4, Len Penalty = 1.0)",
		inputPayload:
			"Query: {query} \nKeywords [KeyBERT]: {keywords} \nDoc: {selected_sentences}",
		badge: "Semantic",
	},
	{
		code: "EXP-D2",
		group: "Group D: KeyBERT MiniLM",
		config: "KeyBERT MiniLM Guidance",
		hyperparams: "Setting 2 (Beam Search = 6, Len Penalty = 2.0)",
		inputPayload:
			"Query: {query} \nKeywords [KeyBERT]: {keywords} \nDoc: {selected_sentences}",
		badge: "Semantic",
	},
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function AquamuseCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const mainRef = useReveal();

	// Find index for navigation
	const projIndex = projects.findIndex(
		(p) => p.id === "summarization" || p.id === "aquamuse",
	);
	const previous =
		projects[(projIndex - 1 + projects.length) % projects.length];
	const next = projects[(projIndex + 1) % projects.length];

	// Interactive tab state for Keyword Extraction comparison
	const [activeKeywordTab, setActiveKeywordTab] = useState<"rake" | "keybert">(
		"rake",
	);

	// Interactive step state for Pipeline Flow
	const [activeStep, setActiveStep] = useState<number>(0);

	return (
		<main
			className="project-page-root case-study case-aquamuse"
			ref={mainRef as React.RefObject<HTMLElement>}
			style={
				{
					"--project-accent": "#b26cff",
					"--project-accent-rgb": "178, 108, 255",
					"--project-title-color": "#ffffff",
					"--project-card-bg": "rgba(178, 108, 255, 0.03)",
					"--project-card-border": "rgba(178, 108, 255, 0.15)",
				} as React.CSSProperties
			}
		>
			{/* ─────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────── */}
			<header className="aquamuse-hero-section">
				<div className="aquamuse-container">
					<ProjectBackButton />

					<div className="aquamuse-hero-content">
						<div className="aquamuse-kicker reveal" data-delay="0">
							<span className="aquamuse-kicker-dot" />
							NLP · TEXT MINING · MACHINE LEARNING
						</div>

						<h1 className="aquamuse-hero-title reveal" data-delay="80">
							AQuaMUSE
						</h1>

						<p className="aquamuse-hero-subtitle reveal" data-delay="140">
							Query-Based Multi-Document News Summarization with Keyword-Guided
							Abstractive Summarization
						</p>

						<p className="aquamuse-hero-lead reveal" data-delay="200">
							An experimental NLP comparative study investigating whether
							statistical (RAKE) and semantic (KeyBERT MiniLM) keyword
							extraction methods provide contextual guidance that improves
							abstractive text summarization quality using{" "}
							<strong>BART-large-cnn</strong>.
						</p>

						{/* Recruiter-First Metadata Grid */}
						<div className="aquamuse-meta-grid reveal" data-delay="260">
							<div className="aquamuse-meta-item">
								<span className="meta-label">ROLE</span>
								<strong className="meta-val">ML Researcher</strong>
							</div>
							<div className="aquamuse-meta-item">
								<span className="meta-label">RESPONSIBILITIES</span>
								<strong className="meta-val">
									Data Scraping · Preprocessing · BART Inference · Evaluation
								</strong>
							</div>
							<div className="aquamuse-meta-item">
								<span className="meta-label">TECH STACK</span>
								<strong className="meta-val">
									BART-large-cnn · PyTorch · KeyBERT · RAKE
								</strong>
							</div>
							<div className="aquamuse-meta-item">
								<span className="meta-label">DATASET & MODEL</span>
								<strong className="meta-val">
									Google AQuaMUSE · BART Transformer
								</strong>
							</div>
						</div>
					</div>

					{/* Hero Visual Mockup Terminal / Flow Frame */}
					<div className="aquamuse-hero-visual-frame reveal" data-delay="320">
						<div className="terminal-window">
							<div className="terminal-header">
								<div className="terminal-dots">
									<span className="dot dot-red" />
									<span className="dot dot-yellow" />
									<span className="dot dot-green" />
								</div>
								<span className="terminal-title">
									AQuaMUSE Pipeline Terminal — Multi-Doc Query Summarizer
								</span>
								<span className="terminal-status">CUDA: Active</span>
							</div>
							<div className="terminal-body">
								<div className="terminal-row">
									<span className="terminal-prompt">USER_QUERY &gt;</span>
									<span className="terminal-text text-accent">
										&quot;What are the economic and structural impacts of
										renewable energy transition initiatives in Europe?&quot;
									</span>
								</div>
								<div className="terminal-grid-3">
									<div className="term-card">
										<div className="term-card-label">INPUT DOCUMENTS</div>
										<div className="term-card-val">
											Google AQuaMUSE (Multi-Doc)
										</div>
										<div className="term-card-sub">
											Average: 972 words | Max: 4,705 words
										</div>
									</div>
									<div className="term-card highlight-purple">
										<div className="term-card-label">KEYWORD EXTRACTION</div>
										<div className="term-card-val">RAKE vs KeyBERT MiniLM</div>
										<div className="term-card-sub">
											Contextual Guidance Tokens
										</div>
									</div>
									<div className="term-card highlight-blue">
										<div className="term-card-label">BART TRANSFORMER</div>
										<div className="term-card-val">
											BART-large-cnn (1,024 Tokens)
										</div>
										<div className="term-card-sub">
											Query-Guided Sentence Selection
										</div>
									</div>
								</div>
								<div className="terminal-output-box">
									<div className="term-out-header">
										<Sparkles size={14} className="text-purple" />
										<span>
											GENERATED ABSTRACTIVE SUMMARY OUTPUT (Ablation
											Configuration)
										</span>
									</div>
									<p className="term-out-text">
										&quot;European energy transition policies are driving
										significant infrastructure shifts toward renewable sources.
										While structural investments face grid synchronization
										challenges, key renewable initiatives accelerate regional
										carbon reduction targets and foster technological
										independence.&quot;
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* ─────────────────────────────────────────────
          01 — OVERVIEW
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-grid-2col">
						<div>
							<span className="aquamuse-tag reveal" data-delay="0">
								01 / OVERVIEW
							</span>
							<h2 className="reveal" data-delay="80">
								Investigating Contextual Guidance in News Summarization
							</h2>
						</div>
						<div>
							<p className="reveal" data-delay="140">
								The primary objective of <strong>AQuaMUSE</strong> is to
								investigate whether keyword extraction methods can provide
								contextual guidance that improves abstractive text summarization
								quality.
							</p>
							<p className="reveal" data-delay="200">
								The project compares four distinct input configurations —
								ranging from a non-query baseline to full context, RAKE
								statistical keywords, and KeyBERT semantic MiniLM keywords —
								using the <strong>BART-large-cnn</strong> architecture across
								multiple hyperparameter settings.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          02 — RESEARCH PROBLEM & MOTIVATION
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							02 / RESEARCH PROBLEM
						</span>
						<h2 className="reveal" data-delay="80">
							RESEARCH MOTIVATION &amp; CORE QUESTION
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Addressing a critical gap in query-guided text summarization
							research through a structured ablation study.
						</p>
					</div>

					<div className="aquamuse-grid-2col" style={{ marginTop: "2.5rem" }}>
						<div className="aquamuse-card reveal" data-delay="180">
							<div className="card-badge">THE RESEARCH GAP</div>
							<h3>Limited Investigation in News Domains</h3>
							<p>
								Most existing work on query-based summarization focuses heavily
								on dialogue systems or conversational search engines. There has
								been limited investigation into how different keyword extraction
								strategies — specifically statistical versus semantic
								transformer-based methods — influence abstractive summarization
								quality on multi-document news articles.
							</p>
						</div>

						<div className="aquamuse-card reveal" data-delay="240">
							<div className="card-badge">THE ABLATION METHOD</div>
							<h3>Comparative Experimental Study</h3>
							<p>
								This project addresses this gap through a systematic ablation
								study comparing four input configurations under controlled
								experimental conditions. Rather than claiming a groundbreaking
								discovery, this work presents a rigourous experimental
								investigation into model behavior under keyword guidance.
							</p>
						</div>
					</div>

					{/* Research Question Banner */}
					<div className="research-question-box reveal" data-delay="300">
						<div className="rq-icon-wrap">
							<BookOpen size={24} className="text-purple" />
						</div>
						<div className="rq-content">
							<span className="rq-label">CORE RESEARCH QUESTION</span>
							<blockquote className="rq-quote">
								&ldquo;How does keyword extraction method affect the performance
								of query-guided abstractive multi-document news
								summarization?&rdquo;
							</blockquote>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          03 — DATASET & DATA PROCESSING
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							03 / DATASET &amp; DATA PIPELINE
						</span>
						<h2 className="reveal" data-delay="80">
							GOOGLE RESEARCH AQuaMUSE &amp; DATA SCRAPING
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Hybrid web scraping with fallback handling, URL caching, and
							rigorous filtering criteria.
						</p>
					</div>

					{/* Scraping Architecture Cards */}
					<div className="scraping-grid">
						<div className="scraping-card reveal" data-delay="100">
							<div className="scraping-header">
								<span className="scraping-step-num">PRIMARY SCRAPER</span>
								<span className="scraping-tech-tag">trafilatura</span>
							</div>
							<h3>Trafilatura Main Parser</h3>
							<p>
								Serves as the primary extraction library for retrieving clean
								body text, news article content, and structural metadata from
								scraped web links.
							</p>
						</div>

						<div className="scraping-card reveal" data-delay="180">
							<div className="scraping-header">
								<span className="scraping-step-num">FALLBACK HANDLER</span>
								<span className="scraping-tech-tag">BeautifulSoup</span>
							</div>
							<h3>BeautifulSoup Fallback</h3>
							<p>
								Handles edge cases where primary parsing fails or encounters
								unconventional DOM layouts, ensuring high extraction coverage
								across news sources.
							</p>
						</div>

						<div className="scraping-card reveal" data-delay="260">
							<div className="scraping-header">
								<span className="scraping-step-num">ITERATIVE CACHING</span>
								<span className="scraping-tech-tag">MD5 Hashing</span>
							</div>
							<h3>MD5 URL Caching System</h3>
							<p>
								Implements an MD5-hashed URL caching mechanism to avoid
								re-scraping identical web pages during iterative experimental
								runs.
							</p>
						</div>
					</div>

					{/* Dataset Statistics before/after */}
					<div
						className="dataset-stats-box reveal"
						data-delay="200"
						style={{ marginTop: "3rem" }}
					>
						<div className="ds-box-header">
							<h3>DATASET CLEANING &amp; FILTERING NUMBERS</h3>
							<span className="ds-note-badge">
								Note: Numbers represent dataset filtering, not model accuracy
							</span>
						</div>

						<div className="ds-stats-grid">
							<div className="ds-stat-card">
								<span className="ds-stat-num">5,020</span>
								<span className="ds-stat-label">ORIGINAL TRAINING DOCS</span>
								<span className="ds-stat-sub">Raw AQuaMUSE Google Dataset</span>
							</div>

							<div className="ds-stat-arrow">→</div>

							<div className="ds-stat-card highlight">
								<span className="ds-stat-num">4,703</span>
								<span className="ds-stat-label">CLEAN TRAINING DOCS</span>
								<span className="ds-stat-sub">
									After applying strict filtering criteria
								</span>
							</div>

							<div className="ds-stat-divider" />

							<div className="ds-stat-card">
								<span className="ds-stat-num">410</span>
								<span className="ds-stat-label">VALIDATION SET</span>
								<span className="ds-stat-sub">
									Cleaned validation instances
								</span>
							</div>

							<div className="ds-stat-card">
								<span className="ds-stat-num">516</span>
								<span className="ds-stat-label">TEST SET</span>
								<span className="ds-stat-sub">
									Cleaned benchmark test instances
								</span>
							</div>
						</div>

						{/* Cleaning criteria list */}
						<div className="cleaning-criteria-wrapper">
							<h4 className="criteria-title">
								DATASET CLEANING CRITERIA IMPLEMENTED:
							</h4>
							<div className="criteria-grid">
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Document length constrained between
									50 and 5,000 words
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Query-based duplicate removal
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Removal of scraping errors and
									malformed DOM payloads
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Removal of 404 / error pages and
									paywalls
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Filtering out restricted login
									pages
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Removal of documents identical to
									the query text
								</div>
								<div className="criteria-item">
									<CheckCircle2 size={15} /> Removal of empty or oversized
									content entries
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          04 — EXPLORATORY DATA ANALYSIS (EDA)
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							04 / EXPLORATORY DATA ANALYSIS
						</span>
						<h2 className="reveal" data-delay="80">
							EXPLORATORY DATA ANALYSIS FINDINGS
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Statistical profiling of document length, query distribution,
							length correlation, and abstractiveness.
						</p>
					</div>

					<div className="eda-metrics-grid">
						<div className="eda-card reveal" data-delay="80">
							<div className="eda-card-top">
								<FileText className="eda-icon text-purple" size={20} />
								<span className="eda-metric-tag">AVG LENGTH</span>
							</div>
							<div className="eda-metric-val">~972</div>
							<div className="eda-metric-unit">Words per Document</div>
							<p className="eda-desc">
								Average document length in the cleaned dataset before
								truncation.
							</p>
						</div>

						<div className="eda-card reveal" data-delay="140">
							<div className="eda-card-top">
								<AlertTriangle className="eda-icon text-orange" size={20} />
								<span className="eda-metric-tag">MAX LENGTH</span>
							</div>
							<div className="eda-metric-val">4,705</div>
							<div className="eda-metric-unit">Words (Upper Limit)</div>
							<p className="eda-desc">
								Maximum document length requiring sentence-level selection.
							</p>
						</div>

						<div className="eda-card reveal" data-delay="200">
							<div className="eda-card-top">
								<Search className="eda-icon text-blue" size={20} />
								<span className="eda-metric-tag">QUERY LENGTH</span>
							</div>
							<div className="eda-metric-val">15–20</div>
							<div className="eda-metric-unit">Words per Query</div>
							<p className="eda-desc">
								Consistently compact user queries providing summary target
								focus.
							</p>
						</div>

						<div className="eda-card reveal" data-delay="260">
							<div className="eda-card-top">
								<BarChart3 className="eda-icon text-green" size={20} />
								<span className="eda-metric-tag">CORRELATION</span>
							</div>
							<div className="eda-metric-val">~0.00</div>
							<div className="eda-metric-unit">Length Correlation</div>
							<p className="eda-desc">
								Approximately zero correlation between query, document, and
								target summary lengths.
							</p>
						</div>
					</div>

					{/* Abstractiveness Gauge Card */}
					<div
						className="abstractiveness-card reveal"
						data-delay="240"
						style={{ marginTop: "2.5rem" }}
					>
						<div className="abs-left">
							<div className="abs-percentage-badge">~57%</div>
							<div className="abs-title-group">
								<h3>Unigram Overlap Ratio (Abstractiveness Indicator)</h3>
								<p>
									Statistical analysis revealed approximately{" "}
									<strong>57% unigram overlap</strong> between reference
									summaries and source document content.
								</p>
							</div>
						</div>
						<div className="abs-right">
							<div className="abs-bar-wrapper">
								<div className="abs-bar-header">
									<span>Extractive Characteristics</span>
									<span>Abstractive Characteristics</span>
								</div>
								<div className="abs-bar-track">
									<div className="abs-bar-fill" style={{ width: "57%" }} />
								</div>
								<div className="abs-bar-labels">
									<span>43% Novel N-grams</span>
									<span>57% Unigram Overlap</span>
								</div>
							</div>
							<p className="abs-insight-note">
								<strong>Key EDA Insight:</strong> The ~57% unigram overlap
								indicates that the AQuaMUSE dataset possesses a balanced hybrid
								nature — retaining key factual terminology from source documents
								while requiring abstractive rephrasing for fluent summary
								generation.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          05 — METHODOLOGY / MAIN PIPELINE
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							05 / METHODOLOGY
						</span>
						<h2 className="reveal" data-delay="80">
							TECHNICAL PROCESSING PIPELINE
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							End-to-end 9-step workflow from data acquisition to metric
							comparative analysis.
						</p>
					</div>

					{/* Interactive Pipeline Step Selector */}
					<div
						className="aquamuse-pipeline-interactive reveal"
						data-delay="200"
					>
						<div className="pipeline-steps-grid">
							{PIPELINE_STEPS.map((step, idx) => (
								<div
									key={step.num}
									className={`pipeline-step-node ${activeStep === idx ? "step-node-active" : ""}`}
									onClick={() => setActiveStep(idx)}
								>
									<span className="node-num">{step.num}</span>
									<strong className="node-title">{step.title}</strong>
									<span className="node-sub">{step.sub}</span>
									{idx < PIPELINE_STEPS.length - 1 && (
										<span className="node-arrow">→</span>
									)}
								</div>
							))}
						</div>

						{/* Detailed step viewer */}
						<div className="pipeline-detail-card">
							<div className="pd-header">
								<span className="pd-step-tag">
									STEP {PIPELINE_STEPS[activeStep].num} DETAILS
								</span>
								<span className="pd-tech-tag">
									{PIPELINE_STEPS[activeStep].tech}
								</span>
							</div>
							<h3>
								{PIPELINE_STEPS[activeStep].title} —{" "}
								{PIPELINE_STEPS[activeStep].sub}
							</h3>
							<p>{PIPELINE_STEPS[activeStep].desc}</p>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          06 — KEYWORD EXTRACTION (RAKE vs KeyBERT)
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							06 / KEYWORD EXTRACTION
						</span>
						<h2 className="reveal" data-delay="80">
							RAKE vs KEYBERT MINILM COMPARISON
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Evaluating statistical co-occurrence vs transformer semantic
							embedding keyword extraction.
						</p>
					</div>

					{/* Interactive Tab Switcher */}
					<div className="keyword-tab-switcher reveal" data-delay="180">
						<button
							type="button"
							className={`kw-tab-btn ${activeKeywordTab === "rake" ? "tab-active" : ""}`}
							onClick={() => setActiveKeywordTab("rake")}
						>
							RAKE (Statistical)
						</button>
						<button
							type="button"
							className={`kw-tab-btn ${activeKeywordTab === "keybert" ? "tab-active" : ""}`}
							onClick={() => setActiveKeywordTab("keybert")}
						>
							KeyBERT MiniLM (Semantic)
						</button>
					</div>

					{/* Side by Side Comparison Grid */}
					<div className="keyword-comp-grid">
						{/* RAKE Card */}
						<div
							className={`kw-card ${activeKeywordTab === "rake" ? "kw-card-active" : ""} reveal`}
							data-delay="200"
						>
							<div className="kw-card-header">
								<span className="kw-badge">STATISTICAL APPROACH</span>
								<h3>RAKE</h3>
								<span className="kw-full-name">
									Rapid Automatic Keyword Extraction
								</span>
							</div>

							<div className="kw-flow-chain">
								<span>Statistical</span>
								<span>→</span>
								<span>Co-occurrence</span>
								<span>→</span>
								<span className="kw-target">Keywords</span>
							</div>

							<ul className="kw-bullets">
								<li>
									<CheckCircle2 size={14} className="text-purple" />{" "}
									<strong>Co-occurrence Graph:</strong> Evaluates word frequency
									and degree ratios in text adjacency graphs.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-purple" />{" "}
									<strong>Zero Pretraining:</strong> Does not require a
									pretrained language model or neural network weights.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-purple" />{" "}
									<strong>High Velocity:</strong> Extremely fast compute
									execution time suitable for high-volume pipelines.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-purple" />{" "}
									<strong>Focus:</strong> Captures statistically frequent phrase
									combinations.
								</li>
							</ul>
						</div>

						{/* KeyBERT Card */}
						<div
							className={`kw-card ${activeKeywordTab === "keybert" ? "kw-card-active" : ""} reveal`}
							data-delay="260"
						>
							<div className="kw-card-header">
								<span className="kw-badge highlight-blue">
									SEMANTIC TRANSFORMER
								</span>
								<h3>KeyBERT MiniLM</h3>
								<span className="kw-full-name">
									paraphrase-MiniLM-L6-v2 Embeddings
								</span>
							</div>

							<div className="kw-flow-chain">
								<span>Semantic Embedding</span>
								<span>→</span>
								<span>Similarity</span>
								<span>→</span>
								<span className="kw-target">Keywords</span>
							</div>

							<ul className="kw-bullets">
								<li>
									<CheckCircle2 size={14} className="text-blue" />{" "}
									<strong>Contextual Embeddings:</strong> Uses{" "}
									<code>paraphrase-MiniLM-L6-v2</code> sentence transformer
									model.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-blue" />{" "}
									<strong>Cosine Similarity:</strong> Ranks keywords by semantic
									vector proximity to the full document representation.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-blue" />{" "}
									<strong>Semantic Awareness:</strong> Identifies conceptual
									synonyms even without direct word repetitions.
								</li>
								<li>
									<CheckCircle2 size={14} className="text-blue" />{" "}
									<strong>Lightweight Footprint:</strong> Efficient transformer
									encoder tailored for sentence embeddings.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          07 — MODEL & TOKEN LIMIT CHALLENGE
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							07 / MODEL &amp; TOKEN LIMITATION
						</span>
						<h2 className="reveal" data-delay="80">
							BART-large-cnn &amp; TOKEN LIMIT CHALLENGE
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Overcoming BART&apos;s 1,024-token bottleneck when processing
							multi-document news articles.
						</p>
					</div>

					<div className="token-challenge-box reveal" data-delay="200">
						<div className="tc-grid">
							<div className="tc-left">
								<div className="tc-badge">
									<AlertTriangle size={14} /> TECHNICAL BOTTLENECK
								</div>
								<h3>1,024 Token Capacity vs 4,705 Word Articles</h3>
								<p>
									<strong>BART-large-cnn</strong> has a maximum positional input
									constraint of <strong>1,024 tokens</strong>. However, the
									average news document in the dataset spans ~972 words, with
									maximum lengths reaching 4,705 words across multi-document
									clusters.
								</p>
								<p>
									Directly truncating long documents destroys critical
									query-relevant facts. To solve this, a{" "}
									<strong>Query-Guided Sentence Selection</strong> strategy
									extracts the most query-focused sentences to construct a
									dense, high-signal payload within BART&apos;s token limit.
								</p>
							</div>

							<div className="tc-right">
								<div className="tc-flow-title">
									QUERY-GUIDED SELECTION PIPELINE
								</div>
								<div className="tc-flow-vertical">
									<div className="tc-flow-step">
										<span className="step-tag">INPUT</span>
										<strong>Long News Document (~972 – 4,705 words)</strong>
									</div>
									<div className="tc-flow-arrow">↓</div>
									<div className="tc-flow-step highlight-purple">
										<span className="step-tag">PROCESSING</span>
										<strong>
											Relevant Sentence Selection &amp; Query Alignment
										</strong>
									</div>
									<div className="tc-flow-arrow">↓</div>
									<div className="tc-flow-step highlight-blue">
										<span className="step-tag">PAYLOAD</span>
										<strong>Query-Guided Context (&lt; 1,024 Tokens)</strong>
									</div>
									<div className="tc-flow-arrow">↓</div>
									<div className="tc-flow-step highlight-green">
										<span className="step-tag">GENERATION</span>
										<strong>BART-large-cnn Abstractive Summary</strong>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          08 — EXPERIMENT DESIGN MATRIX
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							08 / EXPERIMENT DESIGN
						</span>
						<h2 className="reveal" data-delay="80">
							8 EXPERIMENTS ABLATION MATRIX
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							4 Input Configurations × 2 Hyperparameter Settings = 8
							Experimental Runs.
						</p>
					</div>

					<div className="exp-matrix-grid">
						{EXPERIMENTS.map((exp, idx) => (
							<div
								key={exp.code}
								className="exp-card reveal"
								data-delay={`${idx * 60}`}
							>
								<div className="exp-card-top">
									<span className="exp-code">{exp.code}</span>
									<span
										className={`exp-badge ${exp.badge.toLowerCase().replace(/\s+/g, "-")}`}
									>
										{exp.badge}
									</span>
								</div>
								<div className="exp-group">{exp.group}</div>
								<h4 className="exp-config">{exp.config}</h4>
								<div className="exp-payload-box">
									<Code2 size={13} className="text-purple" />
									<code>{exp.inputPayload}</code>
								</div>
								<div className="exp-hyperparams">
									<strong>Hyperparameter:</strong> {exp.hyperparams}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          09 — EVALUATION FRAMEWORK
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							09 / EVALUATION METRICS
						</span>
						<h2 className="reveal" data-delay="80">
							QUANTITATIVE EVALUATION FRAMEWORK
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Measuring n-gram overlap, harmonic precision-recall, and
							contextual embedding similarity.
						</p>
					</div>

					<div className="eval-metrics-grid">
						<div className="eval-card reveal" data-delay="80">
							<div className="eval-card-header">
								<span className="eval-tag">N-GRAM OVERLAP</span>
								<h3>ROUGE Metrics</h3>
							</div>
							<p className="eval-desc">
								Evaluates n-gram recall and precision overlap between generated
								summaries and ground-truth references.
							</p>
							<div className="eval-sub-list">
								<div className="eval-sub-item">
									<strong>ROUGE-1:</strong> Unigram overlap (word-level recall)
								</div>
								<div className="eval-sub-item">
									<strong>ROUGE-2:</strong> Bigram overlap (phrase fluency)
								</div>
								<div className="eval-sub-item">
									<strong>ROUGE-L:</strong> Longest Common Subsequence (sentence
									structure)
								</div>
							</div>
						</div>

						<div className="eval-card reveal" data-delay="160">
							<div className="eval-card-header">
								<span className="eval-tag highlight-purple">HARMONIC MEAN</span>
								<h3>METEOR Score</h3>
							</div>
							<p className="eval-desc">
								Evaluates summary quality based on the harmonic mean of unigram
								precision and recall, incorporating exact matches, stemming,
								synonyms, and paraphrasing.
							</p>
							<div className="eval-feature-pill">
								Extends beyond exact word matching via WordNet synonym lookup.
							</div>
						</div>

						<div className="eval-card reveal" data-delay="240">
							<div className="eval-card-header">
								<span className="eval-tag highlight-blue">
									CONTEXTUAL EMBEDDINGS
								</span>
								<h3>BERTScore</h3>
							</div>
							<p className="eval-desc">
								Computes similarity scores using contextualized token embeddings
								from BERT models rather than exact surface-level matches.
							</p>
							<div className="eval-feature-pill">
								Captures semantic preservation even when summaries rephrase
								facts.
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          10 — RESULTS & COMPARATIVE FRAMEWORK
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							10 / RESULTS &amp; ANALYSIS
						</span>
						<h2 className="reveal" data-delay="80">
							COMPARATIVE ASSESSMENT FRAMEWORK
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Evaluating how keyword guidance impacts summary quality across 8
							experimental configurations.
						</p>
					</div>

					<div className="results-framework-box reveal" data-delay="200">
						<div className="rf-grid">
							<div className="rf-item">
								<span className="rf-num">01</span>
								<h4>Query Focus &amp; Relevance</h4>
								<p>
									Measuring whether keyword-guided inputs prevent model drift
									when generating summaries from multi-document clusters.
								</p>
							</div>
							<div className="rf-item">
								<span className="rf-num">02</span>
								<h4>Statistical vs Semantic Impact</h4>
								<p>
									Comparing whether statistical co-occurrence (RAKE) or
									transformer semantic embeddings (KeyBERT) yield better
									contextual guidance.
								</p>
							</div>
							<div className="rf-item">
								<span className="rf-num">03</span>
								<h4>Hyperparameter Sensitivity</h4>
								<p>
									Analyzing beam search width and length penalty interactions
									across different keyword input payloads.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          11 — TECHNICAL CHALLENGES
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							11 / TECHNICAL CHALLENGES
						</span>
						<h2 className="reveal" data-delay="80">
							ENGINEERING CHALLENGES OVERCOME
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							Key technical hurdles in data collection, token constraints, and
							model evaluation.
						</p>
					</div>

					<div className="challenges-grid">
						<div className="challenge-card reveal" data-delay="80">
							<div className="challenge-num">CHALLENGE 01</div>
							<h3>1,024-Token Context Limit Bottleneck</h3>
							<p>
								Multi-document news clusters often exceed 4,000 words. Feeding
								uncompressed text truncates essential facts. Solved via
								query-guided sentence selection to prioritize high-signal
								content before feeding into BART.
							</p>
						</div>

						<div className="challenge-card reveal" data-delay="140">
							<div className="challenge-num">CHALLENGE 02</div>
							<h3>Web Scraping Reliability &amp; Fallbacks</h3>
							<p>
								News websites feature non-standard DOM structures, paywalls, and
								broken links. Engine built using <code>trafilatura</code> as
								primary extractor with <code>BeautifulSoup</code> fallback
								handling.
							</p>
						</div>

						<div className="challenge-card reveal" data-delay="200">
							<div className="challenge-num">CHALLENGE 03</div>
							<h3>Dataset Cleaning &amp; Paywall Removal</h3>
							<p>
								Raw scraping contained 404 pages, login forms, duplicate
								queries, and empty payloads. Designed a 7-stage filter pipeline
								cleaning 5,020 raw items down to 4,703 high-quality training
								instances.
							</p>
						</div>

						<div className="challenge-card reveal" data-delay="260">
							<div className="challenge-num">CHALLENGE 04</div>
							<h3>Extractive vs Abstractive Balance</h3>
							<p>
								Navigating the dataset&apos;s ~57% unigram overlap to ensure
								keyword extractors guide BART without forcing verbatim copying
								or hallucinated information.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          12 — TECHNICAL CONTRIBUTION
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							12 / TECHNICAL CONTRIBUTION
						</span>
						<h2 className="reveal" data-delay="80">
							PROJECT CONTRIBUTIONS
						</h2>
						<p className="aquamuse-lead-desc reveal" data-delay="140">
							End-to-end engineering deliverables implemented in this
							comparative NLP project.
						</p>
					</div>

					<div className="contribution-grid">
						{[
							"Built an end-to-end multi-document news summarization pipeline",
							"Implemented hybrid web scraping with fallback handling (trafilatura + BeautifulSoup)",
							"Implemented URL-based MD5 hashing and caching for iterative data collection",
							"Performed dataset cleaning and exploratory analysis on AQuaMUSE",
							"Implemented statistical (RAKE) and semantic (KeyBERT MiniLM) keyword extraction",
							"Designed an ablation study matrix with 8 experimental configurations",
							"Fine-tuned and evaluated BART-large-cnn abstractive summarization",
							"Evaluated generated summaries using ROUGE, METEOR, and BERTScore",
						].map((contrib, i) => (
							<div
								key={i}
								className="contrib-card reveal"
								data-delay={`${i * 50}`}
							>
								<CheckCircle2 className="contrib-icon text-purple" size={18} />
								<span>{contrib}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─────────────────────────────────────────────
          13 — TECH STACK
      ───────────────────────────────────────────── */}
			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal" data-delay="0">
							13 / TECH STACK
						</span>
						<h2 className="reveal" data-delay="80">
							TECHNOLOGY ARCHITECTURE
						</h2>
					</div>

					<div className="aquamuse-stack-grid">
						{[
							{
								cat: "CORE ML & TRANSFORMERS",
								badges: [
									"Python",
									"PyTorch",
									"Hugging Face Transformers",
									"BART-large-cnn",
								],
							},
							{
								cat: "KEYWORD EXTRACTION",
								badges: ["RAKE", "KeyBERT", "paraphrase-MiniLM-L6-v2"],
							},
							{
								cat: "DATA & SCRAPING",
								badges: [
									"trafilatura",
									"BeautifulSoup",
									"Pandas",
									"NumPy",
									"hashlib (MD5 Cache)",
								],
							},
							{
								cat: "EVALUATION & COMPUTE",
								badges: ["ROUGE", "METEOR", "BERTScore", "GPU / CUDA"],
							},
						].map((block, idx) => (
							<div
								key={block.cat}
								className="stack-block reveal"
								data-delay={`${idx * 70}`}
							>
								<span className="stack-cat">{block.cat}</span>
								<div className="stack-badges">
									{block.badges.map((b) => (
										<span key={b} className="tech-badge">
											{b}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Standardized GitHub CTA */}
			<ProjectGithubCTA
				githubUrl={project.github}
				title="Explore the AQuaMUSE Codebase"
				description="View the repository, preprocessing scripts, scraping pipeline, and experiment notebooks on GitHub."
				buttonLabel="GITHUB REPOSITORY"
			/>

			{/* Standardized Project Navigation Footer */}
			<ProjectNavFooter
				currentId="summarization"
				previous={previous}
				next={next}
			/>
		</main>
	);
}
