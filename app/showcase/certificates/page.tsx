import { CertificateGrid, ShowcaseNav } from "@/src/components/showcase";

export default function CertificatesPage() {
	return (
		<main className="showcase-page">
			<section className="archive-intro">
				<p className="eyebrow accent">SHOWCASE / CERTIFICATIONS</p>
				<h1>
					Technical <em>credentials.</em>
				</h1>
				<p>
					Verified learning milestones across AI, data, software engineering,
					cloud, and programming.
				</p>
				<ShowcaseNav />
			</section>
			<CertificateGrid />
		</main>
	);
}
