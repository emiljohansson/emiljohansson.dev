<script lang="ts">
	import { randomString } from './randomString'

	interface Props {
		initValue: string
	}

	let { initValue }: Props = $props()

	let { value: random, generate } = randomString(initValue)
</script>

<article>
	<h2>Random String</h2>
	<button onclick={generate}>{$random}</button>
</article>
