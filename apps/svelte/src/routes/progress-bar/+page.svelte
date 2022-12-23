<script lang="ts">
	import { tweened } from "svelte/motion"
	import { quadOut } from "svelte/easing"
	import { onDestroy } from "svelte"

	let percentage = 0
	const progress = tweened(0, {
		duration: 600,
		easing: quadOut,
	})

	const interval = setInterval(() => {
		percentage = percentage + Math.max(5, Math.floor(Math.random() * 20))
		if (percentage >= 100) {
			percentage = 100
			clearInterval(interval)
		}
		progress.set(percentage)
	}, 1000)

	onDestroy(() => {
		clearInterval(interval)
	})
</script>

<svelte:head>
	<title>Progress Bar | emiljohansson.dev</title>
	<meta name="description" content="Progress bar" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Progress Bar</h1>
</header>

<main class="px-6 py-4">
	<div class="flex items-center">
		<div
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={100}
			aria-valuetext="100%"
			role="progressbar"
			data-state="complete"
			data-value="100"
			data-max="100"
			class="relative overflow-hidden bg-black-rich/50 rounded-full w-96 h-6"
			title="Progress"
		>
			<div
				class="h-full w-0 bg-green-400"
				class:bg-red-400={$progress <= 25}
				class:bg-yellow-200={$progress > 25 && $progress <= 50}
				data-state="complete"
				data-value="100"
				data-max="100"
				style="width: {$progress}%;"
			/>
		</div>
		<div class="ml-2">
			{percentage}%
		</div>
	</div>
</main>
