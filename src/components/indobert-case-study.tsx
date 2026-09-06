"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	ArrowUpRight,
	BarChart3,
	BrainCircuit,
	Database,
	FileText,
	GitBranch,
	SearchCheck,
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
			(entries) =>
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("revealed");
						observer.unobserve(entry.target);
					}
				}),
			{ threshold: 0.06 },
		);
		root.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	}, []);
	return ref;
}

const labels = [
	["Liga Indonesia", 367, "#6385ab"],
	["Liga Inggris", 376, "#df8d31"],
	["Liga Italia", 386, "#63a053"],
	["Liga Spanyol", 386, "#d56a68"],
	["Non-Sepak Bola", 761, "#82afad"],
];
const tech = [
	"Python",
	"PyTorch",
	"HuggingFace Transformers",
	"IndoBERT",
	"Sastrawi",
	"NLTK",
	"Pandas",
	"Scikit-learn",
	"BeautifulSoup",
	"trafilatura",
	"CUDA",
];

function NlpHeroVisual() {
	return (
		<div className="indo-network">
			<div className="indo-source">
				<span>INDONESIAN NEWS</span>
				<p>“Persija menghadapi lawan…”</p>
				<p>“Manchester United menang…”</p>
				<small>raw news fragments</small>
			</div>
			<i aria-hidden="true">→</i>
			<div className="indo-transformer">
				<b>INDOBERT</b>
				<small>indobenchmark / indobert-base-p1</small>
				<div className="indo-nodes">
					{Array.from({ length: 15 }).map((_, i) => (
						<em key={i} />
					))}
				</div>
				<small>contextual token embeddings</small>
			</div>
			<i aria-hidden="true">→</i>
			<div className="indo-classes">
				<strong>5 CLASSIFICATIONS</strong>
				<div>
					{[
						"Liga Inggris",
						"Liga Italia",
						"Liga Spanyol",
						"Liga Indonesia",
						"Non-Sepak Bola",
					].map((x) => (
						<span key={x}>{x}</span>
					))}
				</div>
			</div>
		</div>
	);
}

export function IndobertCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const ref = useReveal();
	const index = projects.findIndex((p) => p.id === "indobert");
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return (
		<main
			className="project-page-root case-study case-aquamuse indobert-case"
			ref={ref as React.RefObject<HTMLElement>}
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
			<header className="aquamuse-hero-section">
				<div className="aquamuse-container">
					<ProjectBackButton />

					<div className="aquamuse-hero-content">
						<div className="aquamuse-kicker reveal">
							<span className="aquamuse-kicker-dot" />
							AI · NLP · TEXT CLASSIFICATION
						</div>
						<h1 className="aquamuse-hero-title reveal">
							IndoBERT News Classification
						</h1>
						<p className="aquamuse-hero-subtitle reveal">
							Fine-tuned IndoBERT for Indonesian football and sports news
							classification across 2,276 articles and five classes.
						</p>
						<p className="aquamuse-hero-lead reveal">
							An Indonesian NLP classification workflow that transforms
							sports-news text into relevant football-league categories using a
							fine-tuned transformer model.
						</p>
						<div className="aquamuse-meta-grid reveal">
							<Meta label="ROLE" value="AI / NLP Developer" />
							<Meta
								label="RESPONSIBILITIES"
								value="Scraping · Sastrawi Normalization · Fine-Tuning"
							/>
							<Meta
								label="TECH STACK"
								value="IndoBERT · PyTorch · HuggingFace · Sastrawi"
							/>
							<Meta
								label="DATASET & TASK"
								value="2,276 Articles · 5 Categories"
							/>
						</div>
					</div>

					<div className="aquamuse-hero-visual-frame reveal">
						<div className="terminal-window">
							<div className="terminal-header">
								<div className="terminal-dots">
									<span className="dot dot-red" />
									<span className="dot dot-yellow" />
									<span className="dot dot-green" />
								</div>
								<span className="terminal-title">
									Indonesian News → Tokenization → IndoBERT → Classification
								</span>
								<span className="terminal-status">CUDA READY</span>
							</div>
							<NlpHeroVisual />
						</div>
					</div>
				</div>
			</header>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-grid-2col">
						<div>
							<span className="aquamuse-tag reveal">01 / PROJECT OVERVIEW</span>
							<h2 className="reveal">What I built.</h2>
						</div>
						<div>
							<p className="reveal">
								I fine-tuned IndoBERT to automatically classify Indonesian
								sports news into Liga Inggris, Liga Italia, Liga Spanyol, Liga
								Indonesia, and Non-Sepak Bola.
							</p>
							<p className="reveal">
								The workflow covers collection, cleaning, Indonesian-language
								preprocessing, transformer fine-tuning, and evaluation of the
								resulting classifications.
							</p>
						</div>
					</div>
					<div className="indo-flow reveal">
						{[
							["NEWS ARTICLE", "Source text"],
							["TEXT CLEANING", "Normalize text"],
							["NLP PREPROCESSING", "Indonesian language"],
							["TOKENIZATION", "Model-ready input"],
							["INDOBERT", "Context-aware model"],
							["CLASSIFICATION", "Five categories"],
						].map(([x, detail], i) => (
							<React.Fragment key={x}>
								<span>
									<b>0{i + 1}</b>
									<strong>{x}</strong>
									<small>{detail}</small>
								</span>
								{i < 5 && <i>→</i>}
							</React.Fragment>
						))}
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="indo-role">
						<div>
							<span className="aquamuse-tag reveal">02 / MY ROLE</span>
							<h2 className="reveal">
								AI / NLP
								<br />
								Developer.
							</h2>
						</div>
						<div className="indo-role-copy reveal">
							<p>
								My contribution focused on the technical work behind the model,
								from source collection to interpreting classification results.
							</p>
							<div>
								{[
									"Data collection & web scraping",
									"Dataset preparation & cleaning",
									"Exploratory data analysis",
									"Indonesian NLP preprocessing",
									"IndoBERT implementation & fine-tuning",
									"Model evaluation & result interpretation",
								].map((x, i) => (
									<span key={x}>
										<b>0{i + 1}</b>
										{x}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">03 / DATASET</span>
						<h2 className="reveal">2,276 articles across five classes.</h2>
						<p className="aquamuse-lead-desc reveal">
							Sources were collected from Detik, Kompas, and Liputan6, with
							URL-based labeling and no duplicate articles found.
						</p>
					</div>
					<div className="indo-dataset-stats reveal">
						<div>
							<strong>2,276</strong>
							<span>ARTICLES</span>
						</div>
						<div>
							<strong>3</strong>
							<span>MEDIA SOURCES</span>
						</div>
						<div>
							<strong>5</strong>
							<span>CLASSIFICATION CLASSES</span>
						</div>
					</div>
					<div className="indo-sources reveal">
						{["Detik", "Kompas", "Liputan6"].map((x) => (
							<span key={x}>
								<FileText size={16} />
								{x}
							</span>
						))}
					</div>
					<div className="indo-bars reveal">
						{labels.map(([name, count, color]) => (
							<div key={name as string}>
								<div>
									<b>{name}</b>
									<span>{count} articles</span>
								</div>
								<i>
									<em
										style={{
											width: `${(Number(count) / 761) * 100}%`,
											background: color as string,
										}}
									/>
								</i>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">
							04 / INDONESIAN NLP PIPELINE
						</span>
						<h2 className="reveal">From raw articles to prepared tokens.</h2>
					</div>
					<div className="indo-text-transform reveal">
						<span>RAW ARTICLE</span>
						<p>
							“Persija Jakarta akan menghadapi lawan pada pertandingan
							berikutnya…”
						</p>
						<i>↓</i>
						<p className="cleaned">persija jakarta hadap lawan tanding</p>
						<i>↓</i>
						<div>
							{[
								"LOWERCASE",
								"REGEX CLEANING",
								"SASTRAWI STEMMING",
								"STOPWORD REMOVAL",
								"TOKENIZATION",
								"BERT INPUT",
							].map((x) => (
								<b key={x}>{x}</b>
							))}
						</div>
					</div>
					<div className="indo-steps reveal">
						{[
							["SCRAPE", "requests · BeautifulSoup · trafilatura"],
							["CLEAN", "lowercase · regex · duplicate checks"],
							["NORMALIZE", "Sastrawi stemming · Indonesian stopwords"],
							["TOKENIZE", "truncation · padding · tokenization"],
							["FINE-TUNE", "IndoBERT on GPU / CUDA"],
						].map(([a, b], i) => (
							<div key={a}>
								<b>{String(i + 1).padStart(2, "0")}</b>
								<strong>{a}</strong>
								<span>{b}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-grid-2col indo-model">
						<div>
							<span className="aquamuse-tag reveal">
								05 / MODEL ARCHITECTURE
							</span>
							<h2 className="reveal">
								Context-aware Indonesian text classification.
							</h2>
							<p className="reveal">
								The implementation uses{" "}
								<strong>indobenchmark/indobert-base-p1</strong> with a dropout
								and linear classification head, trained using PyTorch and
								CrossEntropyLoss.
							</p>
							<div className="indo-model-details reveal">
								{[
									"Model · indobenchmark/indobert-base-p1",
									"Framework · PyTorch",
									"Loss · CrossEntropyLoss",
									"Optimizer · Adam",
									"Compute · CUDA",
								].map((x) => (
									<span key={x}>{x}</span>
								))}
							</div>
						</div>
						<div className="indo-architecture reveal">
							<span>INPUT TEXT</span>
							<i>↓</i>
							<span className="highlight">INDOBERT</span>
							<i>↓</i>
							<span>CONTEXTUAL REPRESENTATION</span>
							<i>↓</i>
							<span>DROPOUT + LINEAR HEAD</span>
							<i>↓</i>
							<span className="highlight">5 CLASSES</span>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section aquamuse-section-darker">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">06 / EVALUATION</span>
						<h2 className="reveal">
							Measured with classification methodology.
						</h2>
						<p className="aquamuse-lead-desc reveal">
							Evaluation uses accuracy, precision, recall, F1-score, and a
							confusion matrix. Exact performance figures are intentionally not
							shown here because they are not included in the available project
							record.
						</p>
					</div>
					<div className="indo-evaluation reveal">
						<div className="indo-metrics">
							{["Accuracy", "Precision", "Recall", "F1-score"].map((x) => (
								<span key={x}>
									<SearchCheck size={18} />
									{x}
								</span>
							))}
						</div>
						<div className="indo-matrix">
							<b>CONFUSION MATRIX</b>
							<div>
								{["L. ING", "L. ITA", "L. SPA", "L. IND", "NON"].map((x) => (
									<span key={x}>{x}</span>
								))}
								{Array.from({ length: 25 }).map((_, i) => (
									<i key={i} />
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="aquamuse-section">
				<div className="aquamuse-container">
					<div className="aquamuse-header-center">
						<span className="aquamuse-tag reveal">07 / WHAT I LEARNED</span>
						<h2 className="reveal">
							The context behind classification matters.
						</h2>
					</div>
					<div className="indo-insights reveal">
						{[
							"Class distribution needs consideration during training.",
							"Indonesian-specific preprocessing materially affects text quality.",
							"Football leagues share semantically similar terminology.",
							"Different media sources introduce stylistic variation.",
							"Contextual transformer representations are valuable for Indonesian text.",
						].map((x, i) => (
							<div key={x}>
								<b>0{i + 1}</b>
								<p>{x}</p>
							</div>
						))}
					</div>
					<div className="stack-block reveal">
						<span className="stack-cat">TECH STACK</span>
						<div className="stack-badges">
							{tech.map((x) => (
								<span className="tech-badge" key={x}>
									{x}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			{project.github && (
				<ProjectGithubCTA
					githubUrl={project.github}
					title="Explore the IndoBERT Project Repository"
					description="View the collection, Indonesian NLP preprocessing, PyTorch fine-tuning, and evaluation implementation."
					buttonLabel="GITHUB REPOSITORY"
				/>
			)}

			<ProjectNavFooter currentId="indobert" previous={previous} next={next} />

			<style jsx global>{`
				.indo-network {
					padding: 2rem;
					display: grid;
					grid-template-columns:
						minmax(0, 1fr) auto minmax(220px, 1.2fr)
						auto minmax(0, 1fr);
					gap: 1rem;
					align-items: stretch;
				}
				.indo-network > i {
					align-self: center;
					font-size: 1.4rem;
					color: var(--accent-2);
					font-style: normal;
				}
				.indo-source,
				.indo-transformer,
				.indo-classes {
					border: 1px solid rgba(255, 255, 255, 0.1);
					background: rgba(255, 255, 255, 0.025);
					padding: 1rem;
					min-height: 156px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 0.5rem;
					border-radius: 8px;
					font-family: var(--font-geist-mono), monospace;
					overflow: hidden;
				}
				.indo-source span,
				.indo-transformer small {
					font-size: 0.55rem;
					color: var(--accent-2);
					letter-spacing: 0.1em;
				}
				.indo-source p {
					font-size: 0.7rem;
					margin: 0;
					color: var(--muted);
					line-height: 1.45;
				}
				.indo-source small {
					font-size: 0.5rem;
					color: #79809a;
					margin-top: 0.2rem;
				}
				.indo-transformer {
					border-color: rgba(178, 108, 255, 0.4);
					background: radial-gradient(
						circle at 50% 50%,
						rgba(178, 108, 255, 0.15),
						rgba(178, 108, 255, 0.045)
					);
					text-align: center;
				}
				.indo-transformer b {
					font-size: 1rem;
					color: #e8dfff;
				}
				.indo-nodes {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					gap: 7px;
				}
				.indo-nodes em {
					height: 7px;
					border-radius: 99px;
					background: linear-gradient(90deg, #6d7cff, #b26cff);
				}
				.indo-classes strong {
					font-size: 0.62rem;
					color: #fff;
					letter-spacing: 0.07em;
				}
				.indo-classes > div {
					display: flex;
					flex-wrap: wrap;
					gap: 0.36rem;
				}
				.indo-classes span {
					font-size: 0.52rem;
					color: #d3c7ff;
					padding: 0.25rem 0.35rem;
					border: 1px solid rgba(178, 108, 255, 0.22);
					background: rgba(178, 108, 255, 0.07);
					border-radius: 4px;
				}
				.indo-flow {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					margin-top: 4rem;
					flex-wrap: wrap;
				}
				.indo-flow span {
					display: flex;
					flex-direction: column;
					gap: 0.35rem;
					padding: 0.8rem;
					min-width: 118px;
					border: 1px solid rgba(178, 108, 255, 0.22);
					background: rgba(178, 108, 255, 0.04);
					font:
						700 0.57rem var(--font-geist-mono),
						monospace;
					color: #e6dfff;
					letter-spacing: 0.06em;
				}
				.indo-flow b {
					color: var(--accent-2);
				}
				.indo-flow > i {
					color: var(--accent-2);
					font-style: normal;
				}
				.indo-role {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 4rem;
					align-items: center;
				}
				.indo-role h2 {
					font-size: clamp(2.4rem, 5vw, 4.2rem);
					margin: 0;
					line-height: 0.95;
				}
				.indo-role-copy > p {
					color: var(--muted);
					line-height: 1.7;
				}
				.indo-role-copy > div {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0.65rem;
				}
				.indo-role-copy span {
					display: flex;
					gap: 0.55rem;
					padding: 0.72rem;
					border-left: 2px solid var(--accent-2);
					background: rgba(178, 108, 255, 0.06);
					font-size: 0.78rem;
				}
				.indo-role-copy b {
					font:
						700 0.62rem var(--font-geist-mono),
						monospace;
					color: var(--accent-2);
				}
				.indo-dataset-stats {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 1rem;
					margin: 2.5rem 0 1rem;
				}
				.indo-dataset-stats div {
					padding: 1.7rem;
					text-align: center;
					border: 1px solid rgba(255, 255, 255, 0.1);
					background: rgba(255, 255, 255, 0.025);
					border-radius: 10px;
				}
				.indo-dataset-stats strong {
					display: block;
					font-size: 2.4rem;
					color: #e5d8ff;
				}
				.indo-dataset-stats span {
					font:
						700 0.6rem var(--font-geist-mono),
						monospace;
					color: var(--muted);
					letter-spacing: 0.1em;
				}
				.indo-sources {
					display: flex;
					justify-content: center;
					gap: 1rem;
					flex-wrap: wrap;
				}
				.indo-sources span {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.55rem 0.8rem;
					border: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 0.8rem;
				}
				.indo-sources svg {
					color: var(--accent-2);
				}
				.indo-bars {
					max-width: 760px;
					margin: 2.8rem auto 0;
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}
				.indo-bars > div > div {
					display: flex;
					justify-content: space-between;
					font-size: 0.8rem;
					margin-bottom: 0.35rem;
				}
				.indo-bars b {
					font-weight: 600;
				}
				.indo-bars span {
					color: var(--muted);
					font:
						600 0.62rem var(--font-geist-mono),
						monospace;
				}
				.indo-bars i {
					display: block;
					height: 11px;
					background: rgba(255, 255, 255, 0.06);
					border-radius: 99px;
					overflow: hidden;
				}
				.indo-bars em {
					display: block;
					height: 100%;
					border-radius: 99px;
				}
				.indobert-case .indo-text-transform {
					max-width: 920px;
					margin: 3rem auto 0;
					padding: clamp(1.25rem, 3vw, 2rem);
					border: 1px solid rgba(178, 108, 255, 0.24);
					border-radius: 14px;
					background:
						linear-gradient(
							135deg,
							rgba(178, 108, 255, 0.1),
							rgba(109, 124, 255, 0.04)
						),
						rgba(255, 255, 255, 0.02);
					box-shadow: 0 18px 50px rgba(0, 0, 0, 0.2);
					text-align: center;
				}
				.indobert-case .indo-text-transform > span {
					display: block;
					color: var(--accent-2);
					font:
						700 0.62rem var(--font-geist-mono),
						monospace;
					letter-spacing: 0.14em;
				}
				.indobert-case .indo-text-transform > p {
					max-width: 680px;
					margin: 0.85rem auto 0;
					color: #f1ecff;
					font:
						500 clamp(0.9rem, 1.8vw, 1.1rem)/1.55 var(--font-geist-mono),
						monospace;
					overflow-wrap: anywhere;
				}
				.indobert-case .indo-text-transform > i {
					display: block;
					margin: 0.8rem 0;
					color: var(--accent-2);
					font-size: 1.35rem;
					font-style: normal;
					line-height: 1;
				}
				.indobert-case .indo-text-transform > p.cleaned {
					max-width: max-content;
					margin-inline: auto;
					padding: 0.65rem 0.85rem;
					border: 1px solid rgba(99, 133, 171, 0.45);
					border-radius: 7px;
					background: rgba(99, 133, 171, 0.1);
					color: #cfe3ff;
					font-size: clamp(0.78rem, 1.7vw, 0.95rem);
				}
				.indobert-case .indo-text-transform > div {
					display: grid;
					grid-template-columns: repeat(6, minmax(0, 1fr));
					gap: 0.5rem;
					margin-top: 1.25rem;
				}
				.indobert-case .indo-text-transform > div b {
					min-height: 2.5rem;
					display: grid;
					place-items: center;
					padding: 0.45rem 0.35rem;
					border: 1px solid rgba(178, 108, 255, 0.24);
					border-radius: 6px;
					background: rgba(178, 108, 255, 0.07);
					color: #e6dfff;
					font:
						700 0.58rem/1.25 var(--font-geist-mono),
						monospace;
					letter-spacing: 0.04em;
					overflow-wrap: anywhere;
				}
				.indo-steps {
					display: grid;
					grid-template-columns: repeat(5, minmax(0, 1fr));
					gap: 0;
					border-top: 1px solid rgba(255, 255, 255, 0.12);
					margin-top: 2.7rem;
				}
				.indo-steps > div {
					padding: 1.3rem 1rem;
					min-height: 150px;
					border-inline: 1px solid rgba(255, 255, 255, 0.1);
					overflow-wrap: anywhere;
				}
				.indo-steps b,
				.indo-steps strong,
				.indo-steps span {
					display: block;
				}
				.indo-steps b {
					color: var(--accent-2);
					font:
						700 0.65rem var(--font-geist-mono),
						monospace;
				}
				.indo-steps strong {
					font:
						700 0.8rem var(--font-geist-mono),
						monospace;
					margin: 1.3rem 0 0.45rem;
					color: #ffffff;
				}
				.indo-steps span {
					font-size: 0.7rem;
					color: var(--muted);
					line-height: 1.45;
				}
				.indo-model {
					align-items: center;
				}
				.indo-model-details {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
					margin-top: 1.5rem;
				}
				.indo-model-details span {
					padding: 0.45rem 0.55rem;
					border: 1px solid rgba(255, 255, 255, 0.1);
					font:
						600 0.6rem var(--font-geist-mono),
						monospace;
					color: var(--muted);
				}
				.indo-architecture {
					padding: 1.6rem;
					border: 1px solid rgba(178, 108, 255, 0.25);
					background: linear-gradient(
						135deg,
						rgba(178, 108, 255, 0.08),
						rgba(109, 124, 255, 0.04)
					);
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.45rem;
					font:
						700 0.65rem var(--font-geist-mono),
						monospace;
					letter-spacing: 0.08em;
				}
				.indo-architecture span {
					width: 100%;
					padding: 0.75rem;
					border: 1px solid rgba(255, 255, 255, 0.1);
					text-align: center;
				}
				.indo-architecture .highlight {
					border-color: var(--accent-2);
					color: #e5d8ff;
				}
				.indo-architecture i {
					color: var(--accent-2);
					font-style: normal;
				}
				.indo-evaluation {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1.5rem;
					margin-top: 2.7rem;
				}
				.indo-metrics {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0.7rem;
				}
				.indo-metrics span {
					display: flex;
					align-items: center;
					gap: 0.6rem;
					padding: 1rem;
					border: 1px solid rgba(255, 255, 255, 0.1);
					font:
						600 0.8rem var(--font-geist-mono),
						monospace;
				}
				.indo-metrics svg {
					color: var(--accent-2);
				}
				.indo-matrix {
					padding: 1rem;
					border: 1px solid rgba(255, 255, 255, 0.1);
				}
				.indo-matrix > b {
					font:
						700 0.6rem var(--font-geist-mono),
						monospace;
					color: var(--accent-2);
					letter-spacing: 0.1em;
				}
				.indo-matrix > div {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					gap: 4px;
					margin-top: 0.75rem;
				}
				.indo-matrix span {
					font:
						600 0.52rem var(--font-geist-mono),
						monospace;
					color: var(--muted);
					text-align: center;
				}
				.indo-matrix i {
					aspect-ratio: 1;
					background: rgba(178, 108, 255, 0.12);
				}
				.indo-matrix i:nth-of-type(6n) {
					background: rgba(178, 108, 255, 0.55);
				}
				.indo-insights {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					gap: 0.8rem;
					margin-top: 2.5rem;
				}
				.indo-insights div {
					border: 1px solid rgba(255, 255, 255, 0.1);
					padding: 1rem;
				}
				.indo-insights b {
					font:
						700 0.62rem var(--font-geist-mono),
						monospace;
					color: var(--accent-2);
				}
				.indo-insights p {
					color: var(--muted);
					font-size: 0.78rem;
					line-height: 1.55;
					margin: 0.7rem 0 0;
				}
				@media (max-width: 800px) {
					.indobert-case .indo-text-transform > div {
						grid-template-columns: repeat(3, minmax(0, 1fr));
					}
					.indo-network,
					.indo-role,
					.indo-evaluation {
						grid-template-columns: 1fr;
					}
					.indo-network > i {
						transform: rotate(90deg);
						justify-self: center;
					}
					.indo-role-copy > div,
					.indo-dataset-stats,
					.indo-steps,
					.indo-insights {
						grid-template-columns: 1fr 1fr;
					}
					.indo-flow {
						justify-content: flex-start;
					}
					.indo-flow > i {
						transform: rotate(90deg);
					}
				}
				@media (max-width: 500px) {
					.indobert-case .indo-text-transform {
						margin-top: 2rem;
						padding: 1rem;
					}
					.indobert-case .indo-text-transform > div {
						grid-template-columns: repeat(2, minmax(0, 1fr));
					}
					.indo-network {
						padding: 1rem;
					}
					.indo-role-copy > div,
					.indo-dataset-stats,
					.indo-steps,
					.indo-insights,
					.indo-evaluation,
					.indo-metrics {
						grid-template-columns: 1fr;
					}
					.indo-steps > div {
						border-bottom: 1px solid rgba(255, 255, 255, 0.1);
					}
					.indo-flow span {
						width: 100%;
					}
					.indo-flow > i {
						width: 100%;
						text-align: center;
					}
				}
			`}</style>
		</main>
	);
}

const Meta = ({ label, value }: { label: string; value: string }) => (
	<div className="aquamuse-meta-item">
		<span className="meta-label">{label}</span>
		<strong className="meta-val">{value}</strong>
	</div>
);
