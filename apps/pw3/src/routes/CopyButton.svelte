<script lang="ts">
	import { CopyIcon, CheckIcon } from 'svelte-feather-icons'

	export let text: string

	const states = ['idle', 'copied'] as const
	type State = (typeof states)[number]
	let state: State = 'idle'

	function copyText() {
		navigator.clipboard.writeText(text)
		state = 'copied'
		setTimeout(() => {
			state = 'idle'
		}, 5000)
	}

	function init(el: HTMLInputElement) {
		el.focus()
	}
</script>

<button class="btn btn-xs absolute right-0 top-0" on:click={copyText} use:init>
	{#if state === 'copied'}
		<CheckIcon size="15" class="text-success" /> Copied
	{:else}
		<CopyIcon size="15" /> Copy
	{/if}
</button>
