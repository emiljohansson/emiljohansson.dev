<script lang="ts">
	import type { PageData } from "./$types"
	import randomString from "@emiljohansson/random-string"

	export let data: PageData

	let value = data.value
</script>

<svelte:head>
	<title>Random String | emiljohansson.dev</title>
	<meta name="description" content="Genrates a random string" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Random string</h1>
</header>

<main class="px-6 py-4">
	{value}
</main>
