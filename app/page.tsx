"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
	ArrowDownRight,
	ArrowUpRight,
	ExternalLink,
	Search,
	X,
} from "lucide-react";
import {
	areas,
	experience,
	projects,
	skills,
	social,
	type PortfolioProject,
} from "@/src/data/portfolio";
import { CertificateGrid, ToolsGrid } from "@/src/components/showcase";

const visualClass = {
	signal: "visual-signal",
	grid: "visual-grid",
	route: "visual-route",
	map: "visual-map",
	mobile: "visual-mobile",
	archive: "visual-archive",
};

function Reveal({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={`reveal ${className}`}>{children}</div>;
}

import Image from "next/image";

import { ProjectCard } from "@/src/components/project-card";

function EditorialHeroVisual({
	mouseOffset,
}: {
	mouseOffset: { x: number; y: number };
}) {
	return (
		<div className="hero-editorial-visual-box" aria-hidden="true">
			{/* Editorial Fluid Gradient Orb Centerpiece */}
			<div
				className="editorial-fluid-orb"
				style={{
					transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 16}px, 0)`,
				}}
			>
				<div className="orb-inner-glow" />
			</div>

			{/* Decorative Editorial Geometry Ring */}
			<div
				className="editorial-accent-ring"
				style={{
					transform: `translate3d(${mouseOffset.x * -14}px, ${mouseOffset.y * -12}px, 0) rotate(${mouseOffset.x * 10}deg)`,
				}}
			/>
		</div>
	);
}

export default function Page() {
	const [buildArea, setBuildArea] = useState("SOFTWARE");
	const [progress, setProgress] = useState(0);
	const [cursor, setCursor] = useState({ x: -100, y: -100 });
	const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

	const featured = useMemo(() => projects.filter((p) => p.featured), []);
	const buildProjects = useMemo(
		() =>
			projects.filter((p) =>
				p.categories.some((c) =>
					c.toUpperCase().includes(buildArea === "AI" ? "AI" : buildArea),
				),
			),
		[buildArea],
	);

	useEffect(() => {
		const items = document.querySelectorAll(".reveal");
		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach(
					(entry) =>
						entry.isIntersecting && entry.target.classList.add("is-visible"),
				),
			{ threshold: 0.12 },
		);
		items.forEach((item) => observer.observe(item));

		const onScroll = () =>
			setProgress(
				Math.min(
					100,
					(window.scrollY /
						(document.documentElement.scrollHeight - window.innerHeight)) *
						100,
				),
			);
		const onMove = (e: MouseEvent) => {
			setCursor({ x: e.clientX, y: e.clientY });
			const cx = window.innerWidth / 2;
			const cy = window.innerHeight / 2;
			setMouseOffset({
				x: (e.clientX - cx) / cx,
				y: (e.clientY - cy) / cy,
			});
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("mousemove", onMove);
		onScroll();
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("mousemove", onMove);
		};
	}, []);

	return (
		<>
			<div
				className="scroll-progress"
				style={{ transform: `scaleX(${progress / 100})` }}
			/>
			<div
				className="custom-cursor"
				style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
			>
				+
			</div>
			<main id="top">
				<section className="hero hero-genz-section">
					{/* Soft Background Atmosphere */}
					<div className="hero-atmosphere-layer" aria-hidden="true" />

					<div className="hero-genz-grid">
						{/* LEFT COLUMN: Editorial Cover Typography & CTAs */}
						<div className="hero-left-column">
							<div className="hero-kicker-capsule reveal">
								<span className="hero-kicker-dot" />
								AI • DATA • SOFTWARE
							</div>

							<div className="hero-name-container reveal">
								<h1 className="hero-name-first">RICHELLE</h1>
								<h1 className="hero-name-last">
									<em>MARVELA</em>
								</h1>
							</div>

							<p className="hero-bio-lead reveal">
								Computer Science &amp; Mathematics student building intelligent,
								data‑driven digital experiences.
							</p>

							<div className="hero-cta-group reveal">
								<a href="#work" className="hero-magnetic-btn primary">
									Explore Work <ArrowDownRight size={18} />
								</a>
								<a href="#contact" className="hero-magnetic-btn secondary">
									Get In Touch <ArrowUpRight size={18} />
								</a>
							</div>
						</div>

						{/* RIGHT COLUMN: Abstract Editorial Graphic Centerpiece */}
						<div className="hero-right-column reveal">
							<EditorialHeroVisual mouseOffset={mouseOffset} />
						</div>
					</div>

					{/* BOTTOM EDITORIAL MAGAZINE METADATA */}
					<div className="hero-magazine-meta reveal">
						<div className="meta-col">
							<span className="meta-label">LOCATION &amp; STATUS</span>
							<strong className="meta-value">
								BASED IN JAKARTA · AVAILABLE FOR INTERNSHIPS
							</strong>
						</div>
						<div className="meta-divider" />
						<div className="meta-col">
							<span className="meta-label">FOCUS DISCIPLINES</span>
							<strong className="meta-value">AI / DATA / SOFTWARE</strong>
						</div>
						<div className="meta-divider" />
						<div className="meta-col meta-right">
							<span className="meta-label">CATALOG METRIC</span>
							<strong className="meta-value">19+ PROJECTS · 2026</strong>
							<a
								className="circle-link"
								href="#work"
								aria-label="Scroll to work"
							>
								<ArrowDownRight size={18} />
							</a>
						</div>
					</div>
				</section>
				<section className="statement section-light reveal">
					<p className="eyebrow">A MULTIDISCIPLINARY PRACTICE</p>
					<h2>
						Moving between the problem, the system, and the{" "}
						<span>people who use it.</span>
					</h2>
				</section>

				{/* Selected Work Section Matching Reference Design */}
				<section id="work" className="section-wrap work-section">
					<div className="section-heading reveal">
						<div>
							<p className="eyebrow accent">02 / SELECTED WORK</p>
							<h2>
								Built across
								<br />
								<em>different layers.</em>
							</h2>
						</div>
						<p className="section-note">
							A curated selection of software, machine learning, data, systems,
							and product work.
						</p>
					</div>

					<div className="project-showcase-list">
						{featured.map((p, i) => (
							<ProjectCard key={p.id} project={p} index={i} />
						))}
					</div>

					{/* Closing CTA for the selected work section */}
					<div className="interested-cta-banner reveal">
						<h2>
							SEE WHAT I&apos;VE
							<br />
							<em>BEEN BUILDING.</em>
						</h2>
						<a className="interested-pill-btn" href="/showcase/projects">
							VIEW ALL PROJECTS <ArrowUpRight size={18} />
						</a>
					</div>
				</section>
				<section className="build-section section-wrap">
					<div className="section-heading reveal">
						<div>
							<p className="eyebrow accent">03 / WHAT I BUILD</p>
							<h2>
								Overlap is
								<br />
								<em>the point.</em>
							</h2>
						</div>
						<p className="section-note">
							The strongest projects often sit between disciplines. Explore the
							intersections.
						</p>
					</div>
					<div className="build-layout">
						<div className="build-tabs">
							{["SOFTWARE", "AI", "DATA", "SYSTEMS"].map((area) => (
								<button
									key={area}
									className={buildArea === area ? "active" : ""}
									onMouseEnter={() => setBuildArea(area)}
									onFocus={() => setBuildArea(area)}
								>
									{area}
									<ArrowUpRight />
								</button>
							))}
						</div>
						<div className="build-list reveal">
							{buildProjects.slice(0, 5).map((p) => (
								<div key={p.id} className="build-item">
									<span>{p.primaryCategory}</span>
									<strong>{p.title}</strong>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="explore-strip explore-strip-light">
					<p className="eyebrow accent">AREAS I EXPLORE</p>
					<div className="explore-track">
						{[
							"SOFTWARE",
							"AI",
							"DATA",
							"CLOUD",
							"SYSTEMS",
							"OPTIMIZATION",
							"IoT",
							"UI/UX",
						].map((x) => (
							<span key={x}>{x}</span>
						))}
					</div>
				</section>
				<section id="about" className="about section-light">
					<div className="reveal">
						<p className="eyebrow accent">04 / ABOUT</p>
						<h2>
							Curious by
							<br />
							<em>construction.</em>
						</h2>
					</div>
					<div className="about-copy reveal">
						<p>
							I&apos;m a Computer Science and Mathematics student at Bina
							Nusantara University interested in building technology across
							software engineering, artificial intelligence, data, cloud
							systems, and digital products.
						</p>
						<p>
							I enjoy moving between different layers of a project — from
							understanding the problem and designing the system to building
							applications, experimenting with machine learning models,
							analyzing data, and turning ideas into usable products.
						</p>
						<div className="area-cloud">
							{[
								"SOFTWARE",
								"AI / ML",
								"DATA",
								"CLOUD",
								"SYSTEMS",
								"OPTIMIZATION",
								"IoT",
								"GIS",
								"UI/UX",
							].map((x) => (
								<span key={x}>{x}</span>
							))}
						</div>
					</div>
				</section>
				<section id="experience" className="experience section-dark-tint">
					<div className="section-heading reveal">
						<div>
							<p className="eyebrow accent">06 / EXPERIENCE</p>
							<h2>
								Where I&apos;ve
								<br />
								<em>contributed.</em>
							</h2>
						</div>
					</div>
					<div className="timeline">
						{experience.map(([place, role, detail]) => (
							<div className="timeline-row reveal" key={`${place}-${role}`}>
								<span className="timeline-dot" />
								<div>
									<p className="eyebrow">{place}</p>
									<h3>{role}</h3>
									<p>{detail}</p>
								</div>
							</div>
						))}
					</div>
				</section>
				<section
					id="skills"
					className="preview-band preview-dark preview-tech-wall section-wrap"
				>
					<div className="preview-heading">
						<div>
							<p className="eyebrow accent">07 / TECHNOLOGIES &amp; TOOLS</p>
							<h2>
								Built with
								<br />
								<em>intention.</em>
							</h2>
						</div>
						<a className="text-button cta-button" href="/showcase/tools">
							EXPLORE ALL TECHNOLOGIES <ArrowUpRight />
						</a>
					</div>
					<ToolsGrid preview />
				</section>
				<section className="preview-band preview-certificates-dark section-wrap">
					<div className="preview-heading">
						<div>
							<p className="eyebrow accent">08 / CERTIFICATES</p>
							<h2>
								Selected <em>milestones.</em>
							</h2>
						</div>
						<a className="text-button cta-button" href="/showcase/certificates">
							VIEW ALL CERTIFICATES <ArrowUpRight />
						</a>
					</div>
					<CertificateGrid preview />
				</section>
				<section className="awards section-wrap">
					<div className="reveal">
						<p className="eyebrow accent">RECOGNITION</p>
						<h2>
							Selected
							<br />
							<em>awards.</em>
						</h2>
					</div>
					<div className="award-list">
						{[
							[
								"2025",
								"PKM-KC Funding Recipient",
								"MBELYS — IoT-Based Goat Sound Analysis System",
							],
							[
								"2021",
								"First Place · National Web Design Competition",
								"ITFIESTA — School-themed website",
							],
							[
								"2021",
								"Silver Medalist · National Mathematics Competition",
								"Medalyst",
							],
						].map(([year, title, detail]) => (
							<div className="reveal" key={title}>
								<span>{year}</span>
								<h3>{title}</h3>
								<p>{detail}</p>
							</div>
						))}
					</div>
				</section>
				<section id="contact" className="contact section-wrap reveal">
					<p className="eyebrow accent">09 / CONTACT</p>
					<h2>
						Let&apos;s make
						<br />
						<em>something useful.</em>
					</h2>
					<a className="contact-email" href={social.email}>
						richellemarvela27@gmail.com <ArrowUpRight />
					</a>
					<div className="contact-bottom">
						<span>
							AVAILABLE FOR INTERNSHIPS · COLLABORATION · TECHNICAL PROJECTS
						</span>
						<div>
							<a href={social.github}>
								GITHUB <ArrowUpRight />
							</a>
							<a href={social.linkedin}>
								LINKEDIN <ArrowUpRight />
							</a>
						</div>
					</div>
				</section>
			</main>
			<footer>
				<span>RICHELLE MARVELA</span>
				<span>© 2026 · BUILT WITH REACT</span>
				<a href="#top">BACK TO TOP ↑</a>
			</footer>
		</>
	);
}
