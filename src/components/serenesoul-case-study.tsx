"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
	ArrowRight,
	CheckCircle2,
	Heart,
	Smile,
	Calendar as CalendarIcon,
	MessageSquare,
	Sparkles,
	ShieldCheck,
	Activity,
	Users,
	Award,
	BookOpen,
	TrendingUp,
	MapPin,
	Compass,
	Check,
	Clock,
	Lock,
} from "lucide-react";
import { type PortfolioProject } from "@/src/data/portfolio";
import {
	ProjectContainer,
	ProjectBackButton,
	ProjectMetaGrid,
	ProjectSection,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
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
		}, 60);

		return () => {
			clearTimeout(timer);
			observer.disconnect();
		};
	}, []);

	return ref;
}

/* ─────────────────────────────────────────────────────────────
   SERENE SOUL CASE STUDY COMPONENT
───────────────────────────────────────────────────────────── */
export function SereneSoulCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const mainRef = useReveal();

	return (
		<main
			className="project-page-root serenesoul-case-study"
			ref={mainRef as React.RefObject<HTMLElement>}
		>
			{/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
			<header className="project-hero-section">
				<ProjectContainer>
					<ProjectBackButton
						href="/showcase/projects"
						label="BACK TO PROJECTS"
					/>

					<div className="project-hero-layout-single">
						<div className="project-kicker reveal" data-delay="0">
							<span
								style={{
									width: 6,
									height: 6,
									borderRadius: "50%",
									background: "#0d5c75",
									display: "inline-block",
								}}
							/>
							MENTAL HEALTH · PRODUCT DESIGN
						</div>

						<h1 className="project-hero-title reveal" data-delay="80">
							Serene Soul
						</h1>

						<p className="project-hero-subtitle reveal" data-delay="140">
							Mental Health &amp; Wellness Mobile Application
						</p>

						<p className="project-hero-lead reveal" data-delay="200">
							An empathetic, mobile-first mental health platform designed to
							make emotional self-assessment, daily habit tracking, and
							professional psychological consultation accessible, private, and
							stigma-free for young users.
						</p>

						{/* Recruiter-First Metadata Grid */}
						<div className="reveal" data-delay="260">
							<ProjectMetaGrid
								items={[
									{
										label: "ROLE",
										value: "Product Designer",
									},
									{
										label: "TEAM",
										value: "Solo Project · UI/UX Designer",
									},
									{
										label: "TYPE",
										value: "Mobile Application / UI/UX",
									},
									{
										label: "FOCUS",
										value: "Mental Health · UX · Product Design",
									},
								]}
							/>
						</div>
					</div>
				</ProjectContainer>
			</header>

			{/* ─────────────────────────────────────────────────────────────
          HERO VISUAL / SHOWCASE
      ───────────────────────────────────────────────────────────── */}
			<section className="project-section" style={{ paddingTop: 0 }}>
				<ProjectContainer>
					<div className="serene-hero-mockup-frame reveal" data-delay="100">
						<div className="serene-mockup-header">
							<span className="serene-mockup-title">
								MOBILE APPLICATION PROTOTYPE · INTERACTIVE DESIGN SYSTEM
							</span>
							<div
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "0.45rem",
									fontFamily: "var(--font-geist-mono)",
									fontSize: "0.68rem",
									fontWeight: 700,
									letterSpacing: "0.08em",
									color: "#0d5c75",
									background: "rgba(13, 92, 117, 0.08)",
									padding: "0.3rem 0.75rem",
									borderRadius: 9999,
									border: "1px solid rgba(13, 92, 117, 0.18)",
								}}
							>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: "#10b981",
										display: "inline-block",
									}}
								/>
								FIGMA PROTOTYPE · UI/UX DESIGN
							</div>
						</div>

						<div className="serene-hero-device-grid">
							<div className="serene-device-item">
								<Image
									src="/projects/serenesoul/mood-history-screen.png"
									alt="Serene Soul Mood Calendar & Mood Count Gauge Screen"
									width={280}
									height={560}
									className="serene-device-img"
									priority
								/>
								<span className="serene-device-label">
									Mood History &amp; Count
								</span>
							</div>

							<div className="serene-device-item">
								<Image
									src="/projects/serenesoul/therapist-screen.png"
									alt="Serene Soul Therapist & Psychiatrist Discovery Screen"
									width={280}
									height={560}
									className="serene-device-img"
									priority
								/>
								<span className="serene-device-label">
									Specialist Discovery
								</span>
							</div>

							<div className="serene-device-item">
								<Image
									src="/projects/serenesoul/notifications-screen.png"
									alt="Serene Soul Empathetic Mascot Notifications Screen"
									width={280}
									height={560}
									className="serene-device-img"
									priority
								/>
								<span className="serene-device-label">
									Empathetic Check-ins
								</span>
							</div>
						</div>
					</div>
				</ProjectContainer>
			</section>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 01 — THE PROBLEM
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="problem" className="reveal" data-delay="100">
				<div className="project-split-intro">
					<div>
						<span className="project-tag">01 / THE PROBLEM</span>
						<h2>
							Mental health support should be accessible, private, and easy to
							reach.
						</h2>
					</div>
					<div>
						<p>
							In Indonesia and across developing healthcare ecosystems, seeking
							mental health care remains fraught with logistical, social, and
							psychological friction. Many young people struggle in silence due
							to cultural taboos, prohibitive specialist fees, and a scarcity of
							trusted counselors in their immediate vicinity.
						</p>
					</div>
				</div>

				<div className="serene-problem-grid">
					<div className="serene-problem-card">
						<div className="serene-problem-icon">
							<Users size={20} />
						</div>
						<h3>PROFESSIONAL SHORTAGE</h3>
						<p>
							A severe geographic deficit of certified psychologists and
							psychiatrists leaves rural and suburban communities almost
							entirely underserved.
						</p>
					</div>

					<div className="serene-problem-card">
						<div className="serene-problem-icon">
							<Clock size={20} />
						</div>
						<h3>TIME &amp; DISTANCE</h3>
						<p>
							Lengthy commutes, conflicting academic schedules, and rigid
							clinical hours deter young adults from keeping consistent
							in-person appointments.
						</p>
					</div>

					<div className="serene-problem-card">
						<div className="serene-problem-icon">
							<Lock size={20} />
						</div>
						<h3>SOCIAL STIGMA</h3>
						<p>
							Fear of judgment, familial disapproval, and lack of discrete
							medical privacy prevent vulnerable youth from reaching out until
							crises escalate.
						</p>
					</div>

					<div className="serene-problem-card">
						<div className="serene-problem-icon">
							<Activity size={20} />
						</div>
						<h3>FRAGMENTED TOOLS</h3>
						<p>
							Users struggle with disjointed apps—one for journaling, another
							for therapy booking—lacking continuous data continuity for their
							therapists.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 02 — MARKET & USER INSIGHT
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="market-insight" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">02 / MARKET &amp; USER INSIGHT</span>
					<h2>Validated need for digital-first psychological care.</h2>
					<p className="project-section-lead">
						Research conducted during product development revealed an acute
						demand among younger demographics for accessible, digital-first
						mental health solutions that protect privacy while delivering
						certified care.
					</p>
				</div>

				<div className="serene-stat-grid">
					<div className="serene-stat-card">
						<div className="serene-stat-num">8/8</div>
						<div className="serene-stat-title">RESPONDENT INTEREST</div>
						<p className="serene-stat-desc">
							100% of surveyed target users expressed strong intent to use a
							digital self-check and teleconsultation app.
						</p>
					</div>

					<div className="serene-stat-card">
						<div className="serene-stat-num">15–25</div>
						<div className="serene-stat-title">PRIMARY TARGET AGE</div>
						<p className="serene-stat-desc">
							Focus demographic of high schoolers, college students, and
							early-career youth navigating life transitions.
						</p>
					</div>

					<div className="serene-stat-card">
						<div
							className="serene-stat-num"
							style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)" }}
						>
							Nationwide
						</div>
						<div className="serene-stat-title">ONLINE ACCESSIBILITY</div>
						<p className="serene-stat-desc">
							Virtual teleconsultations bridge the gap across Indonesian
							islands, removing physical clinic borders.
						</p>
					</div>

					<div className="serene-stat-card">
						<div className="serene-stat-num">100%</div>
						<div className="serene-stat-title">PRIVACY PRIORITY</div>
						<p className="serene-stat-desc">
							Users identified discreet personal mobile access as their primary
							motivation for choosing an app over a physical clinic.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 03 — TARGET USERS / STP
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="stp" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">03 / TARGET USERS &amp; STP</span>
					<h2>Designing for empathy, accessibility, and youth culture.</h2>
					<p className="project-section-lead">
						A comprehensive Segmentation, Targeting, and Positioning (STP)
						analysis guided the product architecture and UX copywriting,
						ensuring the platform resonates with Indonesian digital natives.
					</p>
				</div>

				<div className="serene-stp-grid">
					<div className="serene-stp-card">
						<span className="serene-stp-tag">GEOGRAPHIC</span>
						<h3>Indonesia &amp; Urban Youth</h3>
						<ul className="serene-stp-list">
							<li>
								Primary: Urban &amp; metropolitan cities (Jakarta, Bandung,
								Surabaya, etc.)
							</li>
							<li>
								Secondary: Nationwide expansion across all provinces via
								teleconsultation
							</li>
							<li>
								Fully remote service delivery requiring only mobile internet
							</li>
						</ul>
					</div>

					<div className="serene-stp-card">
						<span className="serene-stp-tag">DEMOGRAPHIC</span>
						<h3>Young Adults 15–25</h3>
						<ul className="serene-stp-list">
							<li>
								High school, vocational, university students &amp; entry-level
								workers
							</li>
							<li>All genders (inclusive, judgment-free space)</li>
							<li>
								Accessible pricing model matched to student &amp; youth budgets
							</li>
						</ul>
					</div>

					<div className="serene-stp-card">
						<span className="serene-stp-tag">BEHAVIORAL</span>
						<h3>Digital-First Habit Seekers</h3>
						<ul className="serene-stp-list">
							<li>
								Both first-time mental health seekers &amp; ongoing therapy
								patients
							</li>
							<li>
								Daily smartphone users comfortable with emoji-based
								self-expression
							</li>
							<li>
								Desire low-friction micro-habits (journaling, coding,
								meditation)
							</li>
						</ul>
					</div>

					<div className="serene-stp-card">
						<span className="serene-stp-tag">PSYCHOGRAPHIC</span>
						<h3>Striving Under Pressure</h3>
						<ul className="serene-stp-list">
							<li>
								Experiencing academic overload, quarter-life anxiety, or burnout
							</li>
							<li>
								Seeking private, non-judgmental guidance outside family circles
							</li>
							<li>
								Value self-discovery, emotional literacy, and proactive
								self-care
							</li>
						</ul>
					</div>
				</div>

				<div className="serene-positioning-box">
					<h4>BRAND &amp; PRODUCT POSITIONING</h4>
					<p>
						Serene Soul positions itself as an accessible, private, and
						convenient mental-health companion that combines self-monitoring,
						wellness activities, and professional consultation into one
						friendly, non-intimidating mobile experience.
					</p>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 04 — PRODUCT SOLUTION
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="solution" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">04 / PRODUCT SOLUTION</span>
					<h2>A holistic 6-pillar mental wellness ecosystem.</h2>
					<p className="project-section-lead">
						Rather than treating mental health as an isolated crisis
						intervention, Serene Soul provides a continuous spectrum of
						care—from preventive daily mindfulness and mood logging to certified
						clinical appointments.
					</p>
				</div>

				<div className="serene-ecosystem-grid">
					<div className="serene-ecosystem-node">
						<span className="serene-node-num">01</span>
						<ShieldCheck size={24} className="serene-node-icon" />
						<h4>SELF CHECK</h4>
						<p>Validated psychological questionnaires for self-reflection.</p>
					</div>

					<div className="serene-ecosystem-node">
						<span className="serene-node-num">02</span>
						<Smile size={24} className="serene-node-icon" />
						<h4>MOOD TRACK</h4>
						<p>One-tap daily emotional sentiment logging and analytics.</p>
					</div>

					<div className="serene-ecosystem-node">
						<span className="serene-node-num">03</span>
						<CalendarIcon size={24} className="serene-node-icon" />
						<h4>WELLNESS</h4>
						<p>Guided daily routines: journaling, coding, exercise.</p>
					</div>

					<div className="serene-ecosystem-node">
						<span className="serene-node-num">04</span>
						<BookOpen size={24} className="serene-node-icon" />
						<h4>ARTICLES</h4>
						<p>Digestible, expert-reviewed mental wellness insights.</p>
					</div>

					<div className="serene-ecosystem-node">
						<span className="serene-node-num">05</span>
						<Users size={24} className="serene-node-icon" />
						<h4>CONSULT</h4>
						<p>Direct discovery &amp; scheduling with certified specialists.</p>
					</div>

					<div className="serene-ecosystem-node">
						<span className="serene-node-num">06</span>
						<TrendingUp size={24} className="serene-node-icon" />
						<h4>PROGRESS</h4>
						<p>Longitudinal mood arc gauges and monthly activity trends.</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 05 — KEY FEATURES (CORE UI SHOWCASE)
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="features" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">05 / KEY FEATURES</span>
					<h2>
						Crafted interfaces for vulnerability, self-reflection, and care.
					</h2>
					<p className="project-section-lead">
						Every screen was designed with deliberate emotional safety,
						approachable typography, and clear visual hierarchy to lower the
						psychological barrier to seeking help.
					</p>
				</div>

				<div className="serene-feature-list">
					{/* Feature 01: Mood History */}
					<div className="serene-feature-row">
						<div className="serene-feature-screen-box">
							<Image
								src="/projects/serenesoul/mood-history-screen.png"
								alt="Serene Soul Mood Calendar and Monthly Mood Count Arc Screen"
								width={300}
								height={600}
								className="serene-feature-screen-img"
							/>
						</div>
						<div className="serene-feature-info">
							<span className="serene-feature-badge">EMOTIONAL ANALYTICS</span>
							<h3>Mood History &amp; Monthly Mood Count</h3>
							<p>
								Visualizes daily emotional states on a monthly calendar grid
								using color-coded, intuitive facial expressions (very happy,
								neutral, sad, distressed). A semicircular gauge aggregates the
								user&apos;s overall monthly sentiment balance to foster
								emotional self-awareness.
							</p>
							<div className="serene-feature-bullets">
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Interactive calendar showing daily mood entries at a glance.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Category dropdown filter to isolate specific mood states.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Semicircular emotional balance gauge visualizing monthly
										wellness distribution.
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Feature 02: Calendar & Routine */}
					<div className="serene-feature-row reverse">
						<div className="serene-feature-info">
							<span className="serene-feature-badge">HABIT FORMATION</span>
							<h3>Daily Activity &amp; Wellness Routine Tracking</h3>
							<p>
								Structured habit schedules designed to promote positive,
								fulfilling daily routines. Users can schedule and track
								mindfulness activities such as journaling, coding practice, or
								physical exercise, reinforcing consistent self-improvement.
							</p>
							<div className="serene-feature-bullets">
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Scheduled daily tasks with customizable reminder times.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Color-coded activity tracking cards (e.g., Code Everyday
										16:00, Journal 20:00).
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Monthly completion dot grid providing instant visual
										accomplishment feedback.
									</span>
								</div>
							</div>
						</div>
						<div className="serene-feature-screen-box">
							<Image
								src="/projects/serenesoul/calendar-screen.png"
								alt="Serene Soul Monthly Routine and Daily Habit Tracker Screen"
								width={300}
								height={600}
								className="serene-feature-screen-img"
							/>
						</div>
					</div>

					{/* Feature 03: Specialist Discovery */}
					<div className="serene-feature-row">
						<div className="serene-feature-screen-box">
							<Image
								src="/projects/serenesoul/therapist-screen.png"
								alt="Serene Soul Specialist Discovery and Appointment Management Screen"
								width={300}
								height={600}
								className="serene-feature-screen-img"
							/>
						</div>
						<div className="serene-feature-info">
							<span className="serene-feature-badge">CLINICAL ACCESS</span>
							<h3>Therapist &amp; Psychologist Discovery</h3>
							<p>
								Removes the intimidation of finding certified mental health
								professionals. Users can discover vetted psychiatrists and
								psychologists, review credentials, check availability, and
								manage upcoming consultation bookings seamlessly.
							</p>
							<div className="serene-feature-bullets">
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Clear role segmentation distinguishing psychiatrists
										(medical) and psychologists (therapy).
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Next Appointment preview card displaying doctor name, date,
										and time slot.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										One-tap profile browsing with specialist bios, consultation
										rates, and reviews.
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Feature 04: Self-Assessment */}
					<div className="serene-feature-row reverse">
						<div className="serene-feature-info">
							<span className="serene-feature-badge">DIAGNOSTIC TRIAGE</span>
							<h3>Structured Self-Assessment Questionnaire</h3>
							<p>
								A gentle, non-judgmental mental health questionnaire based on
								standardized psychological screening protocols (such as PHQ-9).
								Assesses symptoms over a 2-week window using a clean 4-point
								Likert scale to guide users toward appropriate care tiers.
							</p>
							<div className="serene-feature-bullets">
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Clear question phrasing focused on recent 2-week emotional
										frequency.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										4-point radio selection: Tidak pernah, Beberapa hari,
										Sebagian besar hari, Hampir setiap hari.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Private, confidential scoring that recommends mindfulness or
										specialist consultation.
									</span>
								</div>
							</div>
						</div>
						<div className="serene-feature-screen-box">
							<Image
								src="/projects/serenesoul/test-screen.png"
								alt="Serene Soul 2-Week Mental Health Screening Questionnaire Screen"
								width={300}
								height={600}
								className="serene-feature-screen-img"
							/>
						</div>
					</div>

					{/* Feature 05: Proactive Notifications */}
					<div className="serene-feature-row">
						<div className="serene-feature-screen-box">
							<Image
								src="/projects/serenesoul/notifications-screen.png"
								alt="Serene Soul Empathetic Mascot-Led Proactive Notification Cards Screen"
								width={300}
								height={600}
								className="serene-feature-screen-img"
							/>
						</div>
						<div className="serene-feature-info">
							<span className="serene-feature-badge">EMPATHETIC CARE</span>
							<h3>Contextual Mascot-Led Check-ins</h3>
							<p>
								Rather than cold robotic push notifications, Serene Soul
								features friendly, pastel-illustrated character companions that
								proactively reach out when consecutive distress moods are
								detected or when daily habits are missed.
							</p>
							<div className="serene-feature-bullets">
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Pattern recognition triggers (e.g., &quot;The number of bad
										mood emoji this week reached 5&quot;).
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Actionable direct action buttons: Consult, Mood Tracker,
										Activity.
									</span>
								</div>
								<div className="serene-bullet-item">
									<CheckCircle2 size={16} className="serene-bullet-icon" />
									<span>
										Warm, non-judgmental copywriting creating a feeling of
										genuine personal companionship.
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 06 — USER EXPERIENCE / APP FLOW
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="user-flow" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">06 / USER EXPERIENCE &amp; FLOW</span>
					<h2>A seamless pathway from self-reflection to professional care.</h2>
					<p className="project-section-lead">
						The end-to-end user journey was mapped to avoid overwhelming users
						in moments of emotional distress, ensuring intuitive discovery in
						three taps or fewer.
					</p>
				</div>

				<div className="serene-flow-pipeline">
					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 01</span>
						<h4>OPEN APP</h4>
						<p>
							Arrive at calming home dashboard with friendly greeting and
							personalized daily wellness prompts.
						</p>
					</div>

					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 02</span>
						<h4>CHECK MOOD / TEST</h4>
						<p>
							Log current emotional state in 5 seconds or complete structured
							2-week self-check test.
						</p>
					</div>

					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 03</span>
						<h4>VIEW INSIGHTS</h4>
						<p>
							Review monthly mood history calendar, arc gauge distribution, and
							personalized score summary.
						</p>
					</div>

					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 04</span>
						<h4>EXPLORE ROUTINES</h4>
						<p>
							Access habit schedules, complete journaling, or read curated
							psychoeducational articles.
						</p>
					</div>

					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 05</span>
						<h4>CONSULT SPECIALIST</h4>
						<p>
							Discover psychologists or psychiatrists and schedule a
							confidential teleconsultation session.
						</p>
					</div>

					<div className="serene-flow-card">
						<span className="serene-flow-step-num">STEP 06</span>
						<h4>TRACK PROGRESS</h4>
						<p>
							Monitor therapeutic growth, habit streaks, and emotional
							stabilization over weeks and months.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 07 — UI / DESIGN SYSTEM
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="design-system" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">07 / UI &amp; DESIGN SYSTEM</span>
					<h2>
						Calming visual psychology designed to reduce cognitive stress.
					</h2>
					<p className="project-section-lead">
						The design language prioritizes softness, warmth, and clinical trust
						over corporate sterility. Every color token, corner radius, and
						typographic scale was chosen to elicit serenity.
					</p>
				</div>

				<div className="serene-ds-grid">
					<div className="serene-ds-card">
						<h3>Harmonious Color Palette</h3>
						<p>
							Soft pastel hues paired with deep ocean teal for maximum WCAG AAA
							contrast, promoting emotional groundedness without harsh medical
							starkness.
						</p>
						<div className="serene-swatches">
							<div
								className="serene-swatch"
								style={{ background: "#f3faea", color: "#0c2b33" }}
							>
								<span className="serene-swatch-name">Serene Sage</span>
								<span className="serene-swatch-hex">#F3FAEA</span>
							</div>
							<div
								className="serene-swatch"
								style={{ background: "#0d5c75", color: "#ffffff" }}
							>
								<span className="serene-swatch-name">Ocean Teal</span>
								<span className="serene-swatch-hex">#0D5C75</span>
							</div>
							<div
								className="serene-swatch"
								style={{ background: "#0c2b33", color: "#ffffff" }}
							>
								<span className="serene-swatch-name">Deep Navy</span>
								<span className="serene-swatch-hex">#0C2B33</span>
							</div>
							<div
								className="serene-swatch"
								style={{ background: "#f87171", color: "#ffffff" }}
							>
								<span className="serene-swatch-name">Coral Blush</span>
								<span className="serene-swatch-hex">#F87171</span>
							</div>
							<div
								className="serene-swatch"
								style={{ background: "#60a5fa", color: "#ffffff" }}
							>
								<span className="serene-swatch-name">Sky Pastel</span>
								<span className="serene-swatch-hex">#60A5FA</span>
							</div>
							<div
								className="serene-swatch"
								style={{ background: "#fbbf24", color: "#0c2b33" }}
							>
								<span className="serene-swatch-name">Warm Amber</span>
								<span className="serene-swatch-hex">#FBBF24</span>
							</div>
						</div>
					</div>

					<div className="serene-ds-card">
						<h3>Design Pillars</h3>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "0.85rem",
							}}
						>
							<div>
								<strong
									style={{
										fontSize: "0.92rem",
										color: "#0c2b33",
										display: "block",
									}}
								>
									Emotional Accessibility
								</strong>
								<span style={{ fontSize: "0.84rem", color: "#3b5a63" }}>
									Simplified vocabulary, friendly illustrated avatars, and
									judgment-free copywriting.
								</span>
							</div>
							<div>
								<strong
									style={{
										fontSize: "0.92rem",
										color: "#0c2b33",
										display: "block",
									}}
								>
									Tactile Ergonomics
								</strong>
								<span style={{ fontSize: "0.84rem", color: "#3b5a63" }}>
									Thumb-friendly bottom navigation dock, large touch targets
									(&gt;44px), and rounded cards (16–22px).
								</span>
							</div>
							<div>
								<strong
									style={{
										fontSize: "0.92rem",
										color: "#0c2b33",
										display: "block",
									}}
								>
									Clinical Confidentiality
								</strong>
								<span style={{ fontSize: "0.84rem", color: "#3b5a63" }}>
									Visual cues communicating data privacy, doctor verification
									badges, and secure consultation rooms.
								</span>
							</div>
						</div>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 08 — BUSINESS MODEL
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="business-model" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">08 / BUSINESS MODEL</span>
					<h2>
						A sustainable freemium model balancing access with clinical care.
					</h2>
					<p className="project-section-lead">
						To ensure zero barriers for youth seeking initial self-awareness
						while funding certified medical professionals, Serene Soul balances
						free preventative tools with premium teletherapy.
					</p>
				</div>

				<div className="serene-pricing-grid">
					{/* Free Tier */}
					<div className="serene-price-card">
						<span className="serene-price-tag">PREVENTATIVE ACCESS</span>
						<h3>Free Tier</h3>
						<div className="serene-price-rate">Rp0</div>
						<ul className="serene-price-features">
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Standard
								mental-health screening tests
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Daily mood calendar
								&amp; count tracking
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Wellness activity
								scheduling (Code, Journal)
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Curated mental health
								articles &amp; guides
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Empathetic mascot
								check-in notifications
							</li>
						</ul>
					</div>

					{/* Premium Tier */}
					<div className="serene-price-card premium">
						<span className="serene-price-tag">PROFESSIONAL CLINICAL CARE</span>
						<h3>Premium Consultation</h3>
						<div className="serene-price-rate">
							Rp175.000{" "}
							<span
								style={{
									fontSize: "0.95rem",
									fontWeight: 500,
									color: "#4a6870",
								}}
							>
								/ session
							</span>
						</div>
						<ul className="serene-price-features">
							<li>
								<CheckCircle2 size={16} color="#0d5c75" />{" "}
								<strong>All Free Tier features included</strong>
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> 1-on-1 virtual
								consultation with licensed psychologists
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Specialized
								psychiatric medical consultation
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Longitudinal
								diagnostic progress reports
							</li>
							<li>
								<CheckCircle2 size={16} color="#0d5c75" /> Priority appointment
								booking &amp; emergency triage
							</li>
						</ul>
					</div>
				</div>

				<div className="serene-sponsor-card">
					<div>
						<h4>ADDITIONAL REVENUE: INSTITUTIONAL PARTNERSHIPS</h4>
						<p>
							Corporate wellness programs and university counseling sponsorships
							providing subsidized student mental health coverage.
						</p>
					</div>
					<span
						style={{
							fontFamily: "var(--font-geist-mono)",
							fontSize: "0.72rem",
							fontWeight: 700,
							color: "#0d5c75",
							background: "rgba(13, 92, 117, 0.08)",
							padding: "0.35rem 0.8rem",
							borderRadius: 6,
						}}
					>
						B2B / INSTITUTIONAL
					</span>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 09 — IMPACT / VALUE
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="impact" className="reveal" data-delay="100">
				<div className="project-section-heading">
					<span className="project-tag">09 / IMPACT &amp; VALUE</span>
					<h2>Transforming the mental wellness landscape for youth.</h2>
					<p className="project-section-lead">
						By shifting psychological intervention from a late-stage crisis to
						an approachable daily self-care habit, Serene Soul delivers tangible
						value for users and healthcare providers alike.
					</p>
				</div>

				<div className="serene-impact-grid">
					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							EASIER ACCESS
						</h3>
						<p>
							Provides instantaneous access to mental health assessments and
							specialist booking in seconds from any smartphone.
						</p>
					</div>

					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							COMPLETE PRIVACY
						</h3>
						<p>
							End-to-end discrete digital access removes the fear of public
							judgment and community stigma around therapy.
						</p>
					</div>

					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							ZERO GEOGRAPHIC BARRIERS
						</h3>
						<p>
							Connects users in remote regions across Indonesia with certified
							psychologists based in major medical centers.
						</p>
					</div>

					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							CONTINUOUS SELF-MONITORING
						</h3>
						<p>
							Helps users build emotional self-literacy by tracking mood
							fluctuations and identifying personal trigger patterns.
						</p>
					</div>

					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							BETTER THERAPY SESSIONS
						</h3>
						<p>
							Empowers psychologists with longitudinal mood history calendars,
							enabling deeper and more contextual consultations.
						</p>
					</div>

					<div className="serene-impact-card">
						<h3>
							<CheckCircle2 size={18} color="#0d5c75" />
							HEALTHIER ROUTINES
						</h3>
						<p>
							Encourages sustainable daily habits like journaling, coding, and
							exercise that tangibly improve emotional resilience.
						</p>
					</div>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          SECTION 10 — PROJECT OUTCOME
      ───────────────────────────────────────────────────────────── */}
			<ProjectSection id="outcome" className="reveal" data-delay="100">
				<div className="serene-outcome-banner">
					<span className="serene-outcome-eyebrow">10 / PROJECT OUTCOME</span>
					<h2 className="serene-outcome-quote">
						&ldquo;Serene Soul brings mental-health discovery, self-monitoring,
						wellness activities, and professional consultation into one
						accessible digital experience.&rdquo;
					</h2>
					<p className="serene-outcome-subtext">
						Designed independently in Figma as a UI/UX project, with thoughtful
						features, responsive components, and end-to-end user flows that make
						healthcare design feel empathetic, youthful, and clinically
						grounded.
					</p>
				</div>
			</ProjectSection>

			{/* ─────────────────────────────────────────────────────────────
          FIGMA CTA CARD (STANDARDIZED)
      ───────────────────────────────────────────────────────────── */}
			<ProjectGithubCTA
				figmaUrl="https://bit.ly/SereneSoul-Prototype"
				title="Explore the Interactive Prototype"
				description="Experience the complete Serene Soul mobile application user journey, component library, and interaction flows directly in Figma."
				buttonLabel="VIEW FIGMA PROTOTYPE ↗"
			/>

			{/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION (PREV / NEXT)
      ───────────────────────────────────────────────────────────── */}
			<ProjectNavFooter currentId="serenesoul" />
		</main>
	);
}
