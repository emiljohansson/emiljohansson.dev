import { generateCode } from 'app/api/two-factor/route'
import TwoWayAuthGenerate from './TwoWayAuthGenerate'

export default async function TwoWayAuthGeneratePage() {
	return <TwoWayAuthGenerate initFactor={generateCode()} />
}
