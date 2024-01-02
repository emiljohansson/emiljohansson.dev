<script lang="ts">
	import { enhance } from '$app/forms'
	import CopyIcon from '$lib/icons/CopyIcon.svelte'
	import EyeOpenIcon from '$lib/icons/EyeOpenIcon.svelte'
	import { keyCode } from '$lib/store'
	import type { Account } from '$lib/types'

	export let account: Account

	const hiddenText = '••••••••••••••••••'
	let plaintext = ''

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

<div class="min-w-8 w-8">{account.id}</div>
<div class="min-w-10 w-10">{account.website}</div>
<div class="min-w-10 w-10">{account.username}</div>
<form
	action="?/plaintext"
	method="post"
	class="flex gap-2"
	use:enhance={onPlaintextSubmit}
>
	<input type="hidden" name="key" bind:value={$keyCode} />
	<input type="hidden" name="password" bind:value={account.password} />
	<button>
		<EyeOpenIcon />
	</button>
</form>
<button on:click={copyText}>
	<CopyIcon />
</button>
<div class="whitespace-nowrap">{plaintext || hiddenText}</div>
