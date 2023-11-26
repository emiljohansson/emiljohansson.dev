import { generateCode } from '../api/codes'
import TwoWayAuthGenerate from './TwoWayAuthGenerate'

export default async function TwoWayAuthGeneratePage() {
	return <TwoWayAuthGenerate initFactor={generateCode()} />
}
