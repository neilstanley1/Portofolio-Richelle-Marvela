"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	ArrowUpRight,
	GitBranch,
	BrainCircuit,
	SearchCheck,
	Sparkles,
	Database,
	Cpu,
} from "lucide-react";
import { projects, type PortfolioProject } from "@/src/data/portfolio";
import {
	ProjectBackButton,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

function useReveal() {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("revealed");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.06 },
		);

		root.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	}, []);

	return ref;
}

const emotionLabels = [
	["joy", "JOY", "#4d8cdf"],
	["sadness", "SADNESS", "#5db58a"],
	["anger", "ANGER", "#c86f4d"],
	["fear", "FEAR", "#8c6ad9"],
	["love", "LOVE", "#d9698d"],
	["surprise", "SURPRISE", "#e0a93b"],
];

const pipeline = [
	["DATASET", "Text samples labeled across six emotion classes"],
	["CLEANING", "Normalization, filtering, and text preparation"],
	["TOKENIZATION", "Transformers-ready token sequence generation"],
	["MODEL", "DistilBERT + BiGRU classification pipeline"],
	["EVALUATION", "Loss, metrics, and confusion analysis"],
];

const tech = [
	"Python",
	"PyTorch",
	"Transformers",
	"DistilBERT",
	"BiGRU",
	"scikit-learn",
	"Pandas",
	"NumPy",
	"NLTK",
	"TensorBoard",
];

function Meta({ label, value }: { label: string; value: string }) {
	return (
		<div className="aquamuse-meta-item">
			<span className="meta-label">{label}</span>
			<strong className="meta-val">{value}</strong>
		</div>
	);
}

export function EmotionCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const ref = useReveal();
	const index = projects.findIndex((p) => p.id === "emotion");
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return (
		<main
			className="project-page-root case-study case-aquamuse emotion-case"
			ref={ref as React.RefObject<HTMLElement>}
			style={
				{
					"--project-accent": "#ec4899",
					"--project-accent-rgb": "236, 72, 153",
					"--project-title-color": "#ffffff",
					"--project-card-bg": "rgba(236, 72, 153, 0.03)",
					"--project-card-border": "rgba(236, 72, 153, 0.15)",
				} as React.CSSProperties
			}
		>
			<header className="aquamuse-hero-section">
				<div className="aquamuse-container">
					<ProjectBackButton />

					<div className="aquamuse-hero-content">
						<div className="aquamuse-kicker reveal">
							<span className="aquamuse-kicker-dot" />
							AI · NLP · TEXT CLASSIFICATION
						</div>

						<h1 className="aquamuse-hero-title reveal">
							6-Class Emotion Classification
						</h1>
						<p className="aquamuse-hero-subtitle reveal">
							Multiclass emotion detection using transformer and recurrent
							modeling for short-form text.
						</p>
						<p className="aquamuse-hero-lead reveal">
							A text-classification project designed to detect six emotional
							states from short written expressions using a hybrid NLP pipeline
							built around DistilBERT and BiGRU.
						</p>

						<div className="aquamuse-meta-grid reveal">
							<Meta label="ROLE" value="ML Researcher" />
							<Meta
								label="RESPONSIBILITIES"
								value="DistilBERT + BiGRU Architecture · Training · Evaluation"
							/>
							<Meta
								label="TECH STACK"
								value="DistilBERT · BiGRU · PyTorch · Transformers"
							/>
							<Meta
								label="TASK & CLASSES"
								value="Short-Text NLP · 6 Emotion Categories"
							/>
						</div>
					</div>

					<div className="aquamuse-hero-visual-frame reveal">
						<div className="emotion-hero-visual">
							<div className="emotion-visual-header">
								<span>
									<Sparkles size={14} /> TEXT → EMOTION SIGNAL
								</span>
								<small>6-CLASS NLP MODEL</small>
							</div>

							<div className="emotion-word-cloud">
								{[
									"happy",
									"sad",
									"angry",
									"afraid",
									"love",
									"surprise",
									"feel",
									"need",
									"family",
									"hurt",
									"wish",
									"hope",
									"today",
									"mind",
									"thought",
									"kind",
									"afraid",
									"care",
								].map((word, index) => (
									<span
										key={`${word}-${index}`}
										style={{ fontSize: `${0.8 + (index % 5) * 0.18}rem` }}
									>
										{word}
									</span>
								))}
							</div>

							<div className="emotion-class-blocks">
								{emotionLabels.map(([key, label, color]) => (
									<div
										key={key}
										className="emotion-chip"
										style={{ borderColor: color, color }}
									>
										{label}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-grid-2col">
						<div>
							<span className="aquamuse-tag reveal">01 / THE PROBLEM</span>
							<h2 className="reveal">
								Emotion recognition from text is nuanced and context-dependent.
							</h2>
						</div>
						<div>
							<p className="reveal">
								Short text often carries layered emotional signals. Words can be
								ambiguous, sarcastic, or emotionally mixed, which makes emotion
								classification more challenging than simple topic detection.
							</p>
							<p className="reveal">
								This project explores how a transformer-based model can capture
								the semantic context behind text and classify it into six
								emotional categories with clearer intent.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">02 / MY ROLE</span>
						<h2 className="reveal">
							AI / ML engineer building the emotion-classification pipeline.
						</h2>
					</div>

					<div className="emotion-role-grid reveal">
						{[
							[
								"System design",
								"Defined the model approach and data handling flow for multiclass emotion recognition.",
							],
							[
								"Data preprocessing",
								"Prepared and normalized text to support consistent transformer and sequence modeling inputs.",
							],
							[
								"Model development",
								"Implemented the DistilBERT + BiGRU architecture and trained the classification model.",
							],
							[
								"Evaluation",
								"Assessed model behavior using training diagnostics and classification metrics.",
							],
						].map(([title, text], index) => (
							<article key={title} className="emotion-role-card">
								<span>{String(index + 1).padStart(2, "0")}</span>
								<h3>{title}</h3>
								<p>{text}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">
							03 / DATA & PREPROCESSING
						</span>
						<h2 className="reveal">
							Structured text data into a clean multiclass training flow.
						</h2>
					</div>

					<div className="emotion-stat-grid reveal">
						{[
							["Label count", "6 classes"],
							["Model input", "Text sequences"],
							["Representation", "Transformer + recurrent encoder"],
							["Objective", "Multiclass emotion classification"],
						].map(([label, value]) => (
							<div key={label} className="emotion-stat-box">
								<strong>{value}</strong>
								<span>{label}</span>
							</div>
						))}
					</div>

					<div className="emotion-prep reveal">
						<div className="emotion-raw-box">
							<small>RAW TEXT</small>
							<p>
								“I feel broken and overwhelmed, but also hopeful for tomorrow.”
							</p>
						</div>
						<div className="emotion-arrow">→</div>
						<div className="emotion-raw-box">
							<small>PREPROCESSING</small>
							<p>
								clean text, normalize casing, tokenize, prepare model-ready
								sequences
							</p>
						</div>
						<div className="emotion-arrow">→</div>
						<div className="emotion-raw-box highlight-box">
							<small>MODEL INPUT</small>
							<p>DistilBERT contextual embeddings + BiGRU sequence encoding</p>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">04 / MODEL ARCHITECTURE</span>
						<h2 className="reveal">
							A hybrid transformer-recurrent classifier.
						</h2>
					</div>

					<div className="emotion-architecture reveal">
						{[
							"TEXT INPUT",
							"PREPROCESSING",
							"DISTILBERT",
							"BiGRU",
							"CLASSIFICATION HEAD",
							"6 EMOTION CLASSES",
						].map((step, index) => (
							<div key={step} className="emotion-arch-node">
								<b>{String(index + 1).padStart(2, "0")}</b>
								<strong>{step}</strong>
							</div>
						))}
					</div>

					<div className="emotion-class-list reveal">
						{emotionLabels.map(([key, label, color]) => (
							<span
								key={key}
								className="emotion-class-pill"
								style={{ borderColor: color, color }}
							>
								{label}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">
							05 / TRAINING & EVALUATION
						</span>
						<h2 className="reveal">
							Monitored learning behavior and classification quality.
						</h2>
					</div>

					<div className="emotion-eval reveal">
						<div className="emotion-chart-card">
							<h3>Training vs Validation Loss</h3>
							<div className="emotion-line-plot">
								<span className="emotion-line blue" />
								<span className="emotion-line orange" />
							</div>
						</div>

						<div className="emotion-metric-card">
							<h3>Evaluation Focus</h3>
							<ul>
								<li>
									<SearchCheck size={16} /> Accuracy
								</li>
								<li>
									<SearchCheck size={16} /> Precision
								</li>
								<li>
									<SearchCheck size={16} /> Recall
								</li>
								<li>
									<SearchCheck size={16} /> F1-score
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">06 / RESULTS</span>
						<h2 className="reveal">
							The model translates context into emotion labels.
						</h2>
					</div>

					<div className="emotion-results-grid reveal">
						<div className="emotion-result-card emphasis">
							<b>PROJECT OUTCOME</b>
							<h3>
								6-class emotion classification model for short-form, textual
								emotion understanding.
							</h3>
							<p>
								The work demonstrates a practical NLP approach for contextual
								emotion detection, pairing Transformer-based embeddings with a
								recurrent sequence model to improve classification over raw
								text-only baselines.
							</p>
						</div>
						<div className="emotion-result-card">
							<b>KEY ADVANTAGE</b>
							<p>
								Captures nuanced affective context in text and classifies it
								into six distinct emotional states.
							</p>
						</div>
						<div className="emotion-result-card">
							<b>APPLICATION</b>
							<p>
								Useful for sentiment-aware systems, conversational analysis, and
								human-centered text understanding.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">07 / TECHNOLOGY STACK</span>
						<h2 className="reveal">
							Text, modeling, and evaluation built in Python.
						</h2>
					</div>

					<div className="yt-stack reveal">
						{tech.map((tool) => (
							<b key={tool}>{tool}</b>
						))}
					</div>

				</div>
			</section>

			<ProjectGithubCTA
				githubUrl={project.github}
				title="Explore the Emotion Classifier Repository"
				description="View the model implementation, training workflow, DistilBERT + BiGRU pipeline, and evaluation setup."
				buttonLabel="GITHUB REPOSITORY"
			/>

			<ProjectNavFooter currentId="emotion" previous={previous} next={next} />
		</main>
	);
}
