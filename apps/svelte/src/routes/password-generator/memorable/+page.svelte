<script lang="ts">
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import debounce from 'just-debounce-it'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	let submitButton: HTMLButtonElement = $state()
	let numberOfWords = $state(4)
	let value = $state(data.words)

	const onSlideChanged = debounce(() => {
		submitButton.click()
	}, 300)
</script>

<h2 class="text-2xl font-semibold mb-6">Memorable Password</h2>

<input class="input w-full" type="text" readonly {value} />

<form
	id="newWordForm"
	method="post"
	action="?/newWords"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success' && result.data) {
				value = result.data.words
			}
		}
	}}
>
	<div class="flex gap-2">
		<input
			type="range"
			min="3"
			max="15"
			bind:value={numberOfWords}
			oninput={onSlideChanged}
			name="numberOfWords"
			class="w-full"
		/>
		{numberOfWords}
	</div>
	<button type="submit" bind:this={submitButton} class="sr-only">Test</button>
</form>
