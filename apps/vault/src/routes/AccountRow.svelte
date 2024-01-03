<script lang="ts">
	import type { Account } from '$lib/types'
	import { enhance } from '$app/forms'
	import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons'
	import CopyButton from './CopyButton.svelte'

	export let account: Account

	const revealStates = ['idle', 'loading', 'revealed'] as const
	type RevealState = (typeof revealStates)[number]

	const hiddenText = '•••••••••••••••••••'
	let plaintext = ''
	let formEl: HTMLFormElement
	let state: RevealState = 'idle'
	let showPlaintext = false

	const onPlaintextSubmit = () => {
		console.log('1')
		state = 'loading'

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return async ({ result }: { result: any }) => {
			console.log('2', result)
			if (result.type === 'failure') {
				state = 'idle'
				return
			}
			state = 'revealed'
			plaintext = result.data as string
			showPlaintext = true
		}
	}
</script>

<tr>
	<td class="min-w-8 w-8">{account.id}</td>
	<td class="min-w-10 w-10">{account.website}</td>
	<td class="min-w-10 w-10">{account.username}</td>
	<td>
		<form
			bind:this={formEl}
			action="?/plaintext"
			method="post"
			class="flex gap-2"
			use:enhance={onPlaintextSubmit}
		>
			<input type="hidden" name="password" bind:value={account.password} />
		</form>
	</td>
	<td class="flex gap-2 w-full">
		{#if state === 'idle'}
			<button
				class="btn btn-ghost btn-xs btn-square"
				on:click={() => {
					formEl.dispatchEvent(new Event('submit'))
				}}
			>
				<EyeIcon size="15" />
				<span class="sr-only">Reveal</span>
			</button>
		{:else if state === 'loading'}
			<button class="btn btn-ghost btn-xs btn-square">
				<span class="loading loading-spinner loading-xs"></span>
				<span class="sr-only">Loading</span>
			</button>
		{:else}
			<button
				class="btn btn-ghost btn-xs btn-square"
				on:click={() => {
					showPlaintext = !showPlaintext
				}}
			>
				{#if showPlaintext}
					<EyeOffIcon size="15" /> <span class="sr-only">Hide</span>
				{:else}
					<EyeIcon size="15" /> <span class="sr-only">Reveal</span>
				{/if}
			</button>
		{/if}
		<tt class="w-full">
			{#if plaintext && showPlaintext}
				<div class="w-full relative">
					<input
						class="input input-xs input-ghost w-full"
						type="text"
						readonly
						bind:value={plaintext}
					/>
					<CopyButton text={plaintext} />
				</div>
			{:else}
				<input
					class="input input-xs input-ghost w-full"
					tabindex="-1"
					type="text"
					readonly
					value={hiddenText}
				/>
			{/if}
		</tt>
	</td>
</tr>
