import { notFound } from "next/navigation";
import { projects } from "@/src/data/portfolio";
import { ProjectDetailPage } from "@/src/components/project-detail-page";
import { AurameCaseStudyPage } from "@/src/components/aurame-case-study";
import { MbelysCaseStudyPage } from "@/src/components/mbelys-case-study";
import { ContentBayCaseStudyPage } from "@/src/components/contentbay-case-study";
import { AquamuseCaseStudyPage } from "@/src/components/aquamuse-case-study";
import { AqiCaseStudyPage } from "@/src/components/aqi-case-study";
import { DgwoCaseStudyPage } from "@/src/components/dgwo-case-study";
import { FloodCaseStudyPage } from "@/src/components/flood-case-study";
import { IndobertCaseStudyPage } from "@/src/components/indobert-case-study";
import { YouTubeCaseStudyPage } from "@/src/components/youtube-case-study";
import { OrbiCaseStudyPage } from "@/src/components/orbi-case-study";
import { ScholaCaseStudyPage } from "@/src/components/schola-case-study";
import { EmotionCaseStudyPage } from "@/src/components/emotion-case-study";
import { FruitCaseStudyPage } from "@/src/components/fruit-case-study";
import { BlooCaseStudyPage } from "@/src/components/bloo-case-study";
import { SereneSoulCaseStudyPage } from "@/src/components/serenesoul-case-study";
import { NailDiseaseCaseStudyPage } from "@/src/components/nail-disease-case-study";
import { JciCaseStudyPage } from "@/src/components/jci-case-study";
import { CarPriceCaseStudyPage } from "@/src/components/car-price-case-study";
import { TrafficCaseStudyPage } from "@/src/components/traffic-case-study";

export function generateStaticParams() {
	return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const project = projects.find(
		(item) =>
			item.id === id || (id === "aquamuse" && item.id === "summarization"),
	);
	if (!project) notFound();

	if (id === "aurame") {
		return <AurameCaseStudyPage project={project} />;
	}

	if (id === "mbelys") {
		return <MbelysCaseStudyPage project={project} />;
	}

	if (id === "contentbay") {
		return <ContentBayCaseStudyPage project={project} />;
	}

	if (id === "summarization" || id === "aquamuse") {
		return <AquamuseCaseStudyPage project={project} />;
	}

	if (id === "aqi") {
		return <AqiCaseStudyPage project={project} />;
	}
	if (id === "dgwo") {
		return <DgwoCaseStudyPage project={project} />;
	}

	if (id === "flood") {
		return <FloodCaseStudyPage project={project} />;
	}

	if (id === "indobert") {
		return <IndobertCaseStudyPage project={project} />;
	}
	if (id === "youtube") {
		return <YouTubeCaseStudyPage project={project} />;
	}
	if (id === "orbi") return <OrbiCaseStudyPage project={project} />;
	if (id === "schola") return <ScholaCaseStudyPage project={project} />;
	if (id === "emotion") return <EmotionCaseStudyPage project={project} />;
	if (id === "fruit") return <FruitCaseStudyPage project={project} />;
	if (id === "nail-disease")
		return <NailDiseaseCaseStudyPage project={project} />;
	if (id === "jci") return <JciCaseStudyPage project={project} />;
	if (id === "bloo") return <BlooCaseStudyPage project={project} />;
	if (id === "serenesoul") return <SereneSoulCaseStudyPage project={project} />;
	if (id === "car") return <CarPriceCaseStudyPage project={project} />;
	if (id === "traffic") return <TrafficCaseStudyPage project={project} />;

	return <ProjectDetailPage project={project} />;
}
