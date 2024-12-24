<script lang="ts">
	import { onDestroy } from "svelte"
	import { getCurrentTime } from "@repo/lib/utils/date"

	let { hours, minutes, meridiem } = getCurrentTime()

	const interval = setInterval(() => {
		const newTime = getCurrentTime()
		minutes = newTime.minutes
		hours = newTime.hours
		meridiem = newTime.meridiem
	}, 1000)

	onDestroy(() => {
		clearInterval(interval)
	})
</script>

<svelte:head>
	<title>Current Time | emiljohansson.dev</title>
	<meta name="description" content="Genrates a random string" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Current Time</h1>
</header>

<main class="px-6 py-4">
	{hours}:{minutes}
	<span class="text-3/6 meridiem">{meridiem}</span>
</main>

<style>
	.meridiem {
		margin-bottom: -18px;
	}
</style>
