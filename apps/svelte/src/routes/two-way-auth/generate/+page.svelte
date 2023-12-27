<script lang="ts">
	import type { PageData } from "./$types"

	export let data: PageData

	let factor = data.factor

	async function getCurrentValue() {
		const response = await fetch('/two-way-auth');
		factor = await response.json();
		console.log(factor);
	}
</script>

<svelte:head>
	<title>Random String | emiljohansson.dev</title>
	<meta name="description" content="Genrates a random string" />
</svelte:head>

<button on:click={getCurrentValue}>Roll the dice</button>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Two-Factor Authentication<br />Generate Code</h1>
</header>

<div>{factor.value}</div>
