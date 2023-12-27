<script lang="ts">
	import { randomString } from "./randomString"

	export let initValue: string

	let {value: random, generate} = randomString(initValue)
</script>

<article>
	<h2>Random String</h2>
	<button on:click={generate}>{$random}</button>
</article>