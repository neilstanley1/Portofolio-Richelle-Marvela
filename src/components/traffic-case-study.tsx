"use client";

import { useEffect, useState } from "react";
import {
	ArrowDown,
	ArrowUpRight,
	CheckCircle2,
	Cloud,
	ExternalLink,
	Maximize2,
	X,
} from "lucide-react";
import { projects, type PortfolioProject } from "@/src/data/portfolio";
import {
	ProjectBackButton,
	ProjectGithubCTA,
	ProjectNavFooter,
} from "@/src/components/project-layout/project-layout";

const layers = [
	[
		"01",
		"IoT Devices & Edge",
		"Collects real-time traffic data from cameras, trackers, gantries, sensors, and controllers.",
		[
			"CCTV AI Camera",
			"GPS Tracker",
			"RFID Gantry",
			"Ultrasonic Sensor",
			"Smart Traffic Light",
			"AWS Greengrass",
		],
	],
	[
		"02",
		"Ingestion",
		"Receives and streams edge data into AWS for realtime processing.",
		[
			"AWS IoT Core",
			"Kinesis Video Streams",
			"Kinesis Data Streams",
			"Kinesis Data Firehose",
		],
	],
	[
		"03",
		"Processing & AI",
		"Detects incidents, predicts congestion, and drives automated decisions.",
		[
			"Amazon Rekognition",
			"AWS Lambda",
			"Amazon SQS",
			"AWS Step Functions",
			"Amazon SageMaker",
		],
	],
	[
		"04",
		"Storage",
		"Separates real-time state, transactional records, and historical traffic data.",
		["Amazon S3", "Amazon Aurora", "Amazon ElastiCache"],
	],
	[
		"05",
		"Analytics & Events",
		"Generates analytical queries, dashboards, alerts, and operational insights.",
		[
			"AWS Glue",
			"Amazon Athena",
			"Amazon OpenSearch",
			"Amazon QuickSight",
			"Amazon SNS",
		],
	],
	[
		"06",
		"Application",
		"Delivers traffic information and operations tools to users and operators.",
		[
			"API Gateway",
			"CloudFront",
			"Route 53",
			"AWS WAF",
			"Amazon Cognito",
			"AWS Fargate",
		],
	],
	[
		"07",
		"Security & Operations",
		"Treats public-infrastructure security and observability as first-class concerns.",
		[
			"CloudWatch",
			"CloudTrail",
			"GuardDuty",
			"AWS Config",
			"IAM Access Analyzer",
			"AWS Backup",
		],
	],
] as const;

const objectives = [
	[
		"01",
		"REAL-TIME MONITORING",
		"Continuously collect and monitor traffic conditions.",
	],
	[
		"02",
		"AI INCIDENT DETECTION",
		"Detect vehicles and incidents from live traffic data.",
	],
	[
		"03",
		"SMART TRAFFIC OPTIMIZATION",
		"Optimize signals and routing from current conditions.",
	],
	[
		"04",
		"EMERGENCY RESPONSE",
		"Prioritize emergency vehicles through intelligent routing.",
	],
] as const;

const decisions = [
	[
		"KINESIS",
		"High-throughput realtime ingestion for continuous traffic streams.",
	],
	[
		"SQS",
		"Asynchronous buffering and decoupling between processing components.",
	],
	["S3", "Scalable data lake and long-term archive for historical workloads."],
	["AURORA", "Consistent structured storage for transactional traffic data."],
	[
		"ELASTICACHE",
		"Hot traffic state and low-latency reads without repeated database load.",
	],
	[
		"REKOGNITION",
		"Computer vision for vehicle and incident detection from video.",
	],
	["SAGEMAKER", "Inference and a path toward future model retraining."],
	["STEP FUNCTIONS", "Orchestration for multi-step AI decision workflows."],
	[
		"IOT CORE",
		"Secure device communication and command routing back to the edge.",
	],
	["API GATEWAY", "Managed REST entry point for applications and dashboards."],
	[
		"CLOUDFRONT + WAF",
		"Fast application delivery with a protected public perimeter.",
	],
	["COGNITO", "Authentication and user management for application access."],
] as const;

const services = [
	"AWS IoT Core",
	"AWS IoT Greengrass",
	"Kinesis Video Streams",
	"Kinesis Data Streams",
	"Kinesis Data Firehose",
	"Amazon Rekognition",
	"AWS Lambda",
	"Amazon SQS",
	"AWS Step Functions",
	"Amazon SageMaker",
	"Amazon S3",
	"Amazon Aurora",
	"Amazon ElastiCache",
	"AWS Glue",
	"Amazon Athena",
	"Amazon OpenSearch",
	"Amazon QuickSight",
	"Amazon SNS",
	"Amazon API Gateway",
	"Amazon CloudFront",
	"Amazon Route 53",
	"AWS WAF",
	"Amazon Cognito",
	"AWS Fargate",
	"Amazon CloudWatch",
	"AWS CloudTrail",
	"Amazon GuardDuty",
	"AWS Config",
	"IAM Access Analyzer",
	"AWS Backup",
];

const costs = [
	["Amazon Rekognition", "$11,668.00", "85.4%"],
	["Kinesis Video Streams", "$389.40", "2.9%"],
	["Amazon Aurora MySQL", "$319.91", "2.3%"],
	["Amazon CloudWatch", "$292.57", "2.1%"],
	["IAM Access Analyzer", "$186.40", "1.4%"],
	["Amazon SageMaker", "$173.68", "1.3%"],
] as const;

const categories = [
	["AI / ML", "$11,841.68", "86.2%"],
	["Monitoring & Operations", "$379.26", "2.75%"],
	["Streaming & IoT", "$448.42", "3.3%"],
	["Analytics & BI", "$78.79", "0.6%"],
	["Database & Storage", "$354.95", "2.6%"],
	["Security & Network", "$472.08", "3.4%"],
] as const;

const challenges = [
	[
		"01",
		"Massive Data Volume & Velocity",
		"Thousands of CCTV frames and sensor events can arrive continuously.",
		"Kinesis + SQS + Firehose",
	],
	[
		"02",
		"Ultra-Low Latency Decisions",
		"Traffic incidents require fast decisions and command routing.",
		"Kinesis Video Streams + Rekognition + Step Functions + SageMaker + IoT Core",
	],
	[
		"03",
		"High Public Access",
		"Traffic information may be accessed simultaneously by many users.",
		"ElastiCache + CloudFront + API Gateway",
	],
	[
		"04",
		"Data Silos & AI Retraining",
		"Historical data must remain useful for analytics and model improvement.",
		"S3 + Glue + Athena + QuickSight + SageMaker",
	],
	[
		"05",
		"Public Infrastructure Security",
		"A public platform needs strong perimeter, identity, audit, and detection controls.",
		"WAF + Cognito + GuardDuty + CloudTrail + CloudWatch",
	],
] as const;

function Artifact({
	src,
	alt,
	label,
	onOpen,
}: {
	src: string;
	alt: string;
	label: string;
	onOpen: () => void;
}) {
	return (
		<div className="traffic-artifact">
			<div className="traffic-artifact-head">
				<span>{label}</span>
				<button type="button" onClick={onOpen}>
					<Maximize2 size={15} /> VIEW FULL ARCHITECTURE
				</button>
			</div>
			<div className="traffic-artifact-scroll">
				<img src={src} alt={alt} />
			</div>
		</div>
	);
}

function SectionHeading({
	number,
	title,
	lead,
}: {
	number: string;
	title: string;
	lead?: string;
}) {
	return (
		<div className="traffic-heading">
			<span>{number}</span>
			<h2>{title}</h2>
			{lead && <p>{lead}</p>}
		</div>
	);
}

export function TrafficCaseStudyPage({
	project,
}: {
	project: PortfolioProject;
}) {
	const [activeArtifact, setActiveArtifact] = useState<string | null>(null);
	const [zoom, setZoom] = useState(1);
	const index = projects.findIndex((item) => item.id === "traffic");
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) =>
			event.key === "Escape" && setActiveArtifact(null);
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);

	const openArtifact = (src: string) => {
		setZoom(1);
		setActiveArtifact(src);
	};

	return (
		<main className="project-page-root case-study traffic-case">
			<header className="traffic-hero">
				<div className="traffic-container">
					<ProjectBackButton />
					<div className="traffic-hero-grid">
						<div>
							<span className="traffic-kicker">
								<Cloud size={15} /> CLOUD ARCHITECTURE
							</span>
							<h1>
								AWS Smart City
								<br />
								Traffic Management System
							</h1>
							<p className="traffic-subtitle">
								AI &amp; IoT-Based Intelligent Transportation System
							</p>
							<p className="traffic-lead">
								Designing a scalable AWS cloud architecture for real-time
								traffic monitoring, AI-powered incident detection, congestion
								prediction, smart signal optimization, and emergency vehicle
								prioritization.
							</p>
							<div className="traffic-meta-grid">
								<div>
									<span>ROLE</span>
									<strong>Cloud Architecture / System Design</strong>
								</div>
								<div>
									<span>PLATFORM</span>
									<strong>Amazon Web Services</strong>
								</div>
								<div>
									<span>ARCHITECTURE</span>
									<strong>IoT · Streaming · AI/ML · Analytics</strong>
								</div>
								<div>
									<span>SCOPE</span>
									<strong>City-Scale Traffic Management</strong>
								</div>
							</div>
						</div>
						<Artifact
							src="/projects/traffic/aws-smart-city-architecture.png"
							alt="AWS Smart City Traffic Management architecture diagram"
							label="PROPOSED AWS ARCHITECTURE"
							onOpen={() =>
								openArtifact(
									"/projects/traffic/aws-smart-city-architecture.png",
								)
							}
						/>
					</div>
				</div>
			</header>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="01 / OVERVIEW"
						title="Designing a Cloud-Native Traffic Management Platform"
						lead="The architecture connects field devices, realtime streams, AI decisioning, analytics, applications, and security into one city-scale system."
					/>
					<div className="traffic-overview-grid">
						{[
							"REAL-TIME MONITORING|CCTV AI cameras, GPS trackers, RFID gantries, ultrasonic sensors, and smart traffic lights continuously report conditions.",
							"ACCIDENT DETECTION|Computer vision and AI-powered video analytics identify incidents from live traffic feeds.",
							"TRAFFIC PREDICTION|Historical and realtime data support congestion and traffic-pattern analysis.",
							"SMART SIGNAL OPTIMIZATION|Traffic signals can respond dynamically to current conditions.",
							"EMERGENCY VEHICLE PRIORITY|Ambulances, fire trucks, and police vehicles can receive green-wave coordination.",
						].map((item) => {
							const [title, copy] = item.split("|");
							return (
								<article key={title}>
									<span>ARCHITECTURE INTENT</span>
									<h3>{title}</h3>
									<p>{copy}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="02 / THE PROBLEM"
						title="A traffic system cannot reason from isolated devices."
					/>
					<div className="traffic-problem-grid">
						{[
							"CONGESTION|Longer travel times and reduced transportation efficiency.",
							"DELAYED RESPONSE|Emergency vehicles can be delayed without coordination.",
							"OUTDATED SYSTEMS|Fixed schedules cannot react to current traffic.",
							"DATA FRAGMENTATION|Traffic data arrives from many device types.",
							"SCALABILITY|Continuous camera and sensor streams must be absorbed.",
							"SECURITY|Public infrastructure requires strong access control and detection.",
						].map((item, i) => {
							const [title, copy] = item.split("|");
							return (
								<article key={title}>
									<b>0{i + 1}</b>
									<h3>{title}</h3>
									<p>{copy}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="03 / SYSTEM OBJECTIVES"
						title="Translate operational needs into architecture decisions."
					/>
					<div className="traffic-objectives">
						{objectives.map(([num, title, copy]) => (
							<article key={num}>
								<b>{num}</b>
								<h3>{title}</h3>
								<p>{copy}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="04 / ARCHITECTURE LAYERS"
						title="Seven layers, each with a distinct responsibility."
						lead="The architecture separates collection, transport, intelligence, persistence, delivery, and operations so each workload can scale and fail independently."
					/>
					<div className="traffic-layer-grid">
						{layers.map(([num, title, copy, items]) => (
							<article key={num}>
								<b>{num}</b>
								<h3>{title}</h3>
								<p>{copy}</p>
								<ul>
									{items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="05 / SYSTEM ARCHITECTURE"
						title="The complete proposed AWS architecture."
						lead="The architecture separates realtime ingestion, processing, storage, analytics, application delivery, and operational security into dedicated layers."
					/>
					<Artifact
						src="/projects/traffic/aws-smart-city-architecture.png"
						alt="Complete AWS Smart City Traffic Management architecture"
						label="SYSTEM ARCHITECTURE ARTIFACT"
						onOpen={() =>
							openArtifact("/projects/traffic/aws-smart-city-architecture.png")
						}
					/>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="06 / END-TO-END DATA FLOW"
						title="From traffic sensors to traffic control."
					/>
					<div className="traffic-flow">
						{[
							"TRAFFIC SENSORS",
							"AWS GREENGRASS",
							"AWS IOT CORE",
							"KINESIS STREAMS",
							"PROCESSING",
							"AI ANALYSIS",
							"DECISION ENGINE",
							"TRAFFIC CONTROL",
							"STORAGE / ANALYTICS",
							"APPLICATIONS",
						].map((item, i) => (
							<div key={item}>
								<b>{String(i + 1).padStart(2, "0")}</b>
								<span>{item}</span>
								{i < 9 && <ArrowDown size={15} />}
							</div>
						))}
					</div>
					<div className="traffic-flow-notes">
						{[
							[
								"SOURCE",
								"CCTV, GPS, RFID, ultrasonic sensors, and controllers generate realtime data.",
							],
							[
								"EDGE",
								"Greengrass aggregates devices and enables low-latency local execution.",
							],
							[
								"INGESTION",
								"IoT Core handles MQTT communication while Kinesis handles streams.",
							],
							[
								"PROCESSING",
								"Lambda and SQS absorb workloads and decouple traffic spikes.",
							],
							[
								"AI",
								"Rekognition analyzes video and SageMaker provides inference.",
							],
							[
								"DECISION",
								"Step Functions orchestrates the workflow and IoT Core sends commands back.",
							],
						].map(([title, copy]) => (
							<div key={title}>
								<b>{title}</b>
								<p>{copy}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="07 / REAL-TIME PROCESSING"
						title="Stream, buffer, process, store."
					/>
					<div className="traffic-split-callout">
						<div>
							<span>PROBLEM</span>
							<h3>
								Traffic infrastructure produces continuous high-volume streams
								that cannot be sent directly into a traditional database.
							</h3>
						</div>
						<div>
							<span>ARCHITECTURE SOLUTION</span>
							<div className="traffic-service-chain">
								KINESIS <b>→</b> SQS <b>→</b> LAMBDA <b>→</b> FIREHOSE
							</div>
							<p>
								Kinesis absorbs streams, SQS buffers spikes, Lambda processes
								events, and Firehose delivers them into storage.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="08 / AI & DECISION ENGINE"
						title="Turn live signals into coordinated action."
					/>
					<div className="traffic-decision-flow">
						{[
							"LIVE TRAFFIC DATA",
							"AMAZON REKOGNITION",
							"INCIDENT / VEHICLE DETECTION",
							"AWS STEP FUNCTIONS",
							"AMAZON SAGEMAKER",
							"PRIORITY ROUTE CALCULATION",
							"TRAFFIC SIGNAL UPDATE",
							"AWS IOT CORE",
							"SMART TRAFFIC CONTROLLER",
						].map((item, i) => (
							<div key={item}>
								<b>{String(i + 1).padStart(2, "0")}</b>
								<span>{item}</span>
							</div>
						))}
					</div>
					<p className="traffic-section-note">
						Rekognition performs detection, Step Functions orchestrates the
						decision workflow, SageMaker provides inference, and IoT Core sends
						the resulting command back to edge infrastructure.
					</p>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="09 / REAL-WORLD SCENARIOS"
						title="Architecture decisions become operational stories."
					/>
					<div className="traffic-scenario-grid">
						<article>
							<span>SCENARIO 01</span>
							<h3>ACCIDENT DETECTION &amp; EMERGENCY RESPONSE</h3>
							<p>
								CCTV → Kinesis Video Streams → Rekognition → Incident → Step
								Functions → SageMaker → Route priority → Signal update.
							</p>
							<strong>
								The system detects an incident, evaluates its impact, and
								coordinates traffic response.
							</strong>
						</article>
						<article>
							<span>SCENARIO 02</span>
							<h3>EMERGENCY VEHICLE PRIORITY</h3>
							<p>
								GPS Tracker → IoT Core → Traffic priority calculation → Green
								Wave → Smart Traffic Controller.
							</p>
							<strong>
								Emergency vehicles receive traffic signal priority to reduce
								response time.
							</strong>
						</article>
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="10 / WHY THESE AWS SERVICES?"
						title="Each managed service has an architectural job."
					/>
					<div className="traffic-decision-grid">
						{decisions.map(([title, copy]) => (
							<article key={title}>
								<b>{title}</b>
								<p>{copy}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="11 / STORAGE STRATEGY"
						title="Separate hot, transactional, and analytical workloads."
					/>
					<div className="traffic-storage-grid">
						<article>
							<span>HOT DATA</span>
							<h3>Amazon ElastiCache</h3>
							<p>Realtime traffic state and frequently accessed information.</p>
						</article>
						<article>
							<span>TRANSACTIONAL DATA</span>
							<h3>Amazon Aurora</h3>
							<p>Structured information requiring consistency.</p>
						</article>
						<article>
							<span>DATA LAKE</span>
							<h3>Amazon S3</h3>
							<p>Historical logs, video archives, and analytical data.</p>
						</article>
					</div>
					<p className="traffic-section-note">
						Separating hot, transactional, and analytical workloads prevents a
						single database from becoming a bottleneck.
					</p>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="12 / ANALYTICS & INTELLIGENCE"
						title="Retain data, query it, learn from it."
					/>
					<div className="traffic-analytics-flow">
						<span>S3</span>
						<b>→</b>
						<span>AWS GLUE</span>
						<b>→</b>
						<span>ATHENA</span>
						<b>→</b>
						<span>QUICKSIGHT</span>
						<em>↘ SAGEMAKER MODEL RETRAINING</em>
					</div>
					<p className="traffic-section-note">
						Historical traffic data is retained in S3, catalogued by Glue,
						queried through Athena, and visualized in QuickSight. The same
						archive can support future model retraining.
					</p>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="13 / APPLICATION LAYER"
						title="Deliver the system to citizens and operators."
					/>
					<div className="traffic-app-flow">
						{[
							"USERS",
							"ROUTE 53",
							"CLOUDFRONT",
							"WAF",
							"API GATEWAY",
							"BACKEND",
							"APPLICATIONS",
						].map((item, i) => (
							<div key={item}>
								<b>{String(i + 1).padStart(2, "0")}</b>
								<span>{item}</span>
							</div>
						))}
					</div>
					<div className="traffic-apps">
						<span>Mobile Application</span>
						<span>Website Application</span>
						<span>Traffic Operations Dashboard</span>
						<span>Authentication: Cognito</span>
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="14 / SECURITY & OPERATIONS"
						title="Security is an architecture layer, not a checklist."
						lead="Because the system manages public infrastructure, security and operational observability are treated as first-class architectural concerns."
					/>
					<div className="traffic-security-grid">
						{[
							"PERIMETER|AWS WAF",
							"AUTHENTICATION|Amazon Cognito",
							"THREAT DETECTION|Amazon GuardDuty",
							"AUDIT|AWS CloudTrail",
							"MONITORING|Amazon CloudWatch",
							"COMPLIANCE|AWS Config",
							"ACCESS ANALYSIS|IAM Access Analyzer",
							"BACKUP|AWS Backup",
						].map((item) => {
							const [title, copy] = item.split("|");
							return (
								<article key={title}>
									<span>{title}</span>
									<strong>{copy}</strong>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="15 / DESIGNING FOR SCALE"
						title="Scale through managed boundaries."
					/>
					<div className="traffic-scale-grid">
						{[
							"STREAMING SCALE|Kinesis handles continuous high-throughput streams.",
							"ASYNC DECOUPLING|SQS absorbs traffic spikes.",
							"SERVERLESS PROCESSING|Lambda scales event-driven workloads.",
							"EDGE PROCESSING|Greengrass reduces latency and network dependency.",
							"CACHING|ElastiCache reduces repeated database reads.",
							"CDN|CloudFront distributes application content.",
							"DATA LAKE|S3 provides scalable long-term storage.",
						].map((item) => {
							const [title, copy] = item.split("|");
							return (
								<article key={title}>
									<b>{title}</b>
									<p>{copy}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="16 / ARCHITECTURAL CHALLENGES"
						title="Design around the failure modes."
					/>
					<div className="traffic-challenge-grid">
						{challenges.map(([num, title, problem, solution]) => (
							<article key={num}>
								<b>CHALLENGE {num}</b>
								<h3>{title}</h3>
								<p>{problem}</p>
								<span>SOLUTION</span>
								<strong>{solution}</strong>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-cost-section">
				<div className="traffic-container">
					<SectionHeading
						number="17 / CLOUD COST ANALYSIS"
						title="Cost is part of architecture."
					/>
					<div className="traffic-cost-hero">
						<div>
							<strong>$13,742.64</strong>
							<span>MONTHLY</span>
						</div>
						<div>
							<strong>$164,911.68</strong>
							<span>ANNUAL</span>
						</div>
						<div>
							<strong>$0</strong>
							<span>UPFRONT</span>
						</div>
						<div>
							<strong>28</strong>
							<span>AWS SERVICES</span>
						</div>
					</div>
					<div className="traffic-cost-meta">
						<span>REGION: Asia Pacific (Singapore)</span>
						<span>ESTIMATE DATE: 06/05/2026</span>
					</div>
					<p className="traffic-disclaimer">
						AWS Pricing Calculator estimate; excludes applicable taxes and
						represents projected workload cost rather than actual billing.
					</p>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="18 / WHERE THE COST GOES"
						title="Rekognition dominates the projected workload cost."
					/>
					<div className="traffic-cost-bars">
						{costs.map(([name, amount, pct]) => (
							<div key={name}>
								<div>
									<b>{name}</b>
									<span>
										{amount} / month · {pct}
									</span>
								</div>
								<i
									style={{
										width:
											pct === "85.4%"
												? "85.4%"
												: `${Math.max(parseFloat(pct) * 3, 4)}%`,
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="19 / COST BY ARCHITECTURE LAYER"
						title="Cost follows the intelligence layer."
					/>
					<div className="traffic-category-grid">
						{categories.map(([name, amount, pct]) => (
							<article key={name}>
								<span>{name}</span>
								<strong>{amount}</strong>
								<b>{pct}</b>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="20 / COST OPTIMIZATION"
						title="AI/ML dominates the architecture's projected operating cost."
					/>
					<div className="traffic-optimization">
						<strong>
							Amazon Rekognition alone represents 85.4% of projected monthly
							spend.
						</strong>
						<p>
							Potential savings identified in the architecture analysis:
							investigate Rekognition Provisioned Throughput and SageMaker
							Reserved Instances as cost-optimization strategies.
						</p>
						<span>
							Potential AI/ML savings estimate: 30–40% · recommendation, not a
							guarantee.
						</span>
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="21 / COST / PERFORMANCE TRADE-OFF"
						title="Prioritize responsiveness where it changes the outcome."
					/>
					<div className="traffic-tradeoff-grid">
						{[
							"REAL-TIME AI|HIGH COST|HIGH RESPONSIVENESS",
							"EDGE PROCESSING|LOWER LATENCY|REDUCED CLOUD DEPENDENCY",
							"CACHING|LOWER DATABASE LOAD|FASTER RESPONSE",
							"DATA LAKE|LOW-COST LONG-TERM STORAGE|ANALYTICAL VALUE",
						].map((item) => {
							const [title, a, b] = item.split("|");
							return (
								<article key={title}>
									<h3>{title}</h3>
									<span>{a}</span>
									<b>{b}</b>
								</article>
							);
						})}
					</div>
					<p className="traffic-section-note">
						The architecture prioritizes realtime responsiveness for
						traffic-critical workloads while separating long-term analytics from
						latency-sensitive operations.
					</p>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="22 / ARCHITECTURE PRINCIPLES"
						title="The rules behind the design."
					/>
					<div className="traffic-principles">
						{[
							"EVENT-DRIVEN|Streaming and event-based processing for realtime traffic data.",
							"DECOUPLED|SQS and modular services prevent cascading failures.",
							"SCALABLE|Managed and serverless services support elastic workloads.",
							"LOW-LATENCY|Edge processing, caching, and realtime streaming.",
							"DATA-CENTRIC|Transactional, hot, and analytical workloads stay separate.",
							"SECURITY-FIRST|Authentication, detection, monitoring, and auditing are integrated.",
						].map((item, i) => {
							const [title, copy] = item.split("|");
							return (
								<article key={title}>
									<b>0{i + 1}</b>
									<h3>{title}</h3>
									<p>{copy}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="23 / OUTCOME"
						title="A city-scale architecture with a complete data lifecycle."
					/>
					<div className="traffic-outcome">
						<p>
							Designed a city-scale AWS cloud architecture that connects IoT
							infrastructure, realtime streaming, AI inference, automated
							traffic decisions, analytics, application delivery, and security
							into one integrated system.
						</p>
						<div>
							<strong>7</strong>
							<span>ARCHITECTURE LAYERS</span>
							<strong>28</strong>
							<span>AWS SERVICES</span>
							<strong>REAL-TIME</strong>
							<span>TRAFFIC PROCESSING</span>
							<strong>AI-POWERED</strong>
							<span>DECISION MAKING</span>
						</div>
					</div>
				</div>
			</section>

			<section className="traffic-section">
				<div className="traffic-container">
					<SectionHeading
						number="24 / MY ROLE"
						title="Cloud Architecture / System Design"
					/>
					<div className="traffic-role-grid">
						{[
							"Designed the AWS architecture and defined architecture layers.",
							"Mapped business requirements to cloud services.",
							"Designed realtime ingestion, processing, AI, storage, and analytics flows.",
							"Designed application delivery, security, operations, and backup layers.",
							"Performed AWS cost estimation and analyzed cost drivers.",
							"Proposed cost optimization opportunities without claiming production deployment.",
						].map((item) => (
							<div key={item}>
								<CheckCircle2 size={16} />
								{item}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-section traffic-section-dark">
				<div className="traffic-container">
					<SectionHeading
						number="25 / TECHNOLOGY"
						title="Amazon Web Services"
					/>
					<div className="traffic-tech-grid">
						{services.map((service) => (
							<span key={service}>{service}</span>
						))}
					</div>
				</div>
			</section>

			<section className="traffic-final-cta">
				<div className="traffic-container">
					<span>ARCHITECTURE AT A GLANCE</span>
					<h2>
						From IoT devices at the edge to AI-powered traffic decisions and
						city-wide analytics.
					</h2>
					<button
						type="button"
						onClick={() =>
							openArtifact("/projects/traffic/aws-smart-city-architecture.png")
						}
					>
						VIEW FULL ARCHITECTURE <ArrowUpRight size={16} />
					</button>
				</div>
			</section>

			<ProjectNavFooter currentId="traffic" previous={previous} next={next} />

			{activeArtifact && (
				<div
					className="traffic-lightbox"
					role="dialog"
					aria-modal="true"
					aria-label="Architecture diagram viewer"
					onClick={() => setActiveArtifact(null)}
				>
					<div
						className="traffic-lightbox-toolbar"
						onClick={(event) => event.stopPropagation()}
					>
						<span>ARCHITECTURE ARTIFACT</span>
						<div>
							<button
								type="button"
								onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
							>
								−
							</button>
							<strong>{Math.round(zoom * 100)}%</strong>
							<button
								type="button"
								onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))}
							>
								+
							</button>
							<button
								type="button"
								aria-label="Close architecture viewer"
								onClick={() => setActiveArtifact(null)}
							>
								<X size={18} />
							</button>
						</div>
					</div>
					<div
						className="traffic-lightbox-content"
						onClick={(event) => event.stopPropagation()}
					>
						<img
							src={activeArtifact}
							alt="Expanded AWS Smart City Traffic Management architecture"
							style={{ width: `${zoom * 100}%` }}
						/>
					</div>
				</div>
			)}

			{project.github && (
				<ProjectGithubCTA
					githubUrl={project.github}
					title="Explore the architecture documentation"
					description="Review the source documentation and cloud architecture rationale."
					buttonLabel="VIEW REPOSITORY"
				/>
			)}
		</main>
	);
}
