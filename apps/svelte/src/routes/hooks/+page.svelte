<script lang="ts">
	import type { PageData } from './$types'
	import ClickOutsideSection from './ClickOutsideSection.svelte'
	import CounterSection from './CounterSection.svelte'
	import DebounceSection from './DebounceSection.svelte'
	import RandomStringSection from './RandomStringSection.svelte'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()
</script>

<svelte:head>
	<title>Hooks | emiljohansson.dev</title>
	<meta name="description" content="Genrates a random string" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Current Time</h1>
</header>

<main class="px-6 py-4 grid gap-4">
	<RandomStringSection initValue={data.randomValue} />
	<DebounceSection />
	<CounterSection />
	<ClickOutsideSection />
</main>
