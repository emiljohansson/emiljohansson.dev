import { generateCode } from '../api/route'
import TwoWayAuthGenerate from './TwoWayAuthGenerate'

export default async function TwoWayAuthGeneratePage() {
	return <TwoWayAuthGenerate initFactor={generateCode()} />
}
