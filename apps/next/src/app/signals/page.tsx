import Section from '@/components/Section'
import Content from '@/components/Content'
import GlobalContent from './GlobalContent'
import LocalContent from './LocalContent'

export default function Page() {
	return (
		<Content>
			<Section size="normal">
				<h1 className="sr-only">Signals</h1>
				<div className="grid gap-8">
					<div>
						<h2 className="heading2">Local</h2>
						<div className="grid gap-3">
							<div>
								<LocalContent />
							</div>
							<div>
								<LocalContent />
							</div>
						</div>
					</div>

					<div>
						<h2 className="heading2">Global</h2>
						<div className="grid gap-3">
							<div>
								<GlobalContent />
							</div>
							<div>
								<GlobalContent />
							</div>
						</div>
					</div>
				</div>
			</Section>
		</Content>
	)
}
