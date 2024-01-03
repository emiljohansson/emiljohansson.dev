<script lang="ts">
	import { enhance } from '$app/forms'
	import CopyIcon from '$lib/icons/CopyIcon.svelte'
	import EyeOpenIcon from '$lib/icons/EyeOpenIcon.svelte'
	import { keyCode } from '$lib/store'
	import type { Account } from '$lib/types'

	export let account: Account

	const hiddenText = '•••••••••••••••••••'
	let plaintext = ''
	let form: HTMLFormElement

	function copyText() {
		navigator.clipboard.writeText(plaintext)
	}

	const onPlaintextSubmit =
		() =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async ({ result }: { result: any }) => {
			plaintext = result.data as string
		}
</script>

<tr>
	<td class="min-w-8 w-8">{account.id}</td>
	<td class="min-w-10 w-10">{account.website}</td>
	<td class="min-w-10 w-10">{account.username}</td>
	<td>
		<form
			bind:this={form}
			action="?/plaintext"
			method="post"
			class="flex gap-2"
			use:enhance={onPlaintextSubmit}
		>
			<input type="hidden" name="key" bind:value={$keyCode} />
			<input type="hidden" name="password" bind:value={account.password} />
		</form>
	</td>
	<td class="flex gap-2 w-full">
		<button
			class="btn btn-ghost btn-xs"
			on:click={() => {
				form.dispatchEvent(new Event('submit'))
			}}
		>
			<EyeOpenIcon />
		</button>
		<tt class="w-full">
			{#if plaintext}
				<div class="w-full relative">
					<input
						class="input input-xs w-full"
						type="text"
						readonly
						bind:value={plaintext}
					/>
					<button class="btn btn-xs absolute right-0 top-0" on:click={copyText}>
						<CopyIcon /> Copy
					</button>
				</div>
			{:else}
				{hiddenText}
			{/if}
		</tt>
	</td>
</tr>
