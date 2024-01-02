<script lang="ts">
	import { enhance } from '$app/forms'
	import { keyword } from '$lib/store'
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
	<input type="hidden" name="secret" bind:value={$keyword} />
	<input type="hidden" name="password" bind:value={account.password} />
	<button>
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</form>
<button on:click={copyText}>
	<svg
		width="15"
		height="15"
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
		/>
	</svg>
</button>
<div class="whitespace-nowrap">{plaintext || hiddenText}</div>
