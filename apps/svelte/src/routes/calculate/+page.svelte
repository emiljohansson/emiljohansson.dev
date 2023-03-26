<script lang="ts">
	import type { ActionData } from "./$types"
	import { enhance } from "$app/forms"

	export let form: ActionData
</script>

<svelte:head>
	<title>Calculator | emiljohansson.dev</title>
	<meta name="description" content="Genrates a Calculator" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1>Calculator</h1>
</header>

<main>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false })
			}
		}}
	>
		<div class="flex items-center gap-2 mb-2">
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="input"
				type="text"
				name="query"
				aria-label="Query"
				autofocus
				placeholder="1+2"
			/>
			<span class="text-xl">= {form?.sum ?? "0"}</span>
		</div>
		<button class="btn-primary w-auto">Calculate</button>
	</form>
</main>
