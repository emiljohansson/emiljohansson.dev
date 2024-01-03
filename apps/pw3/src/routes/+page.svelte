<script lang="ts">
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import { keyCode } from '$lib/store'
	import AccountRow from './AccountRow.svelte'
	import { RefreshCwIcon } from 'svelte-feather-icons'

	export let data: PageData

	const numbers = '0123456789'
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

	const r = (length: number, pattern: string) => {
		let value = ''
		let index = length
		while (index--) {
			const charIndex = Math.floor(Math.random() * pattern.length)
			value += pattern[charIndex]
		}
		return value
	}

	const createPassword = () =>
		`${r(3, characters)}-${r(3, characters)}${r(1, numbers)}${r(
			3,
			characters,
		)}-${r(3, characters)}${r(1, numbers)}${r(3, characters)}`

	let newPassword = createPassword()
</script>

<div class="flex items-center mb-6">
	<h1 class="mb-0">Accounts</h1>
	<div class="flex items-center gap-2 ml-auto">
		{#if data.user}
			<span>{data.user.email}</span>
			<form action="?/logout" method="post" use:enhance>
				<button class="btn">Logout</button>
			</form>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</div>
</div>
<input bind:value={$keyCode} class="input w-full" />
<form
	action="?/add-account"
	method="post"
	use:enhance
	class="
		w-full
		flex gap-2
		fixed bottom-0 left-0
		px-6
		py-4
		z-10
		bg-base-300
	"
>
	<input type="hidden" name="key" bind:value={$keyCode} />
	<input
		class="input w-full"
		type="text"
		name="website"
		placeholder="website"
		required
	/>
	<input
		class="input w-full"
		type="text"
		name="username"
		placeholder="username"
	/>
	<div class="relative w-full">
		<input
			class="input w-full pr-11"
			type="text"
			name="password"
			placeholder="password"
			required
			bind:value={newPassword}
		/>
		<button
			class="btn absolute top-0 right-0 h-full"
			type="button"
			on:click={() => (newPassword = createPassword())}
		>
			<RefreshCwIcon size="15" />
			<span class="sr-only">Re-generate</span>
		</button>
	</div>
	<button class="btn btn-primary">Add</button>
</form>

<table class="table table-zebra">
	<thead>
		<tr>
			<th></th>
			<th>Website</th>
			<th>Username</th>
		</tr>
	</thead>
	<tbody>
		{#each data.accounts as account}
			<AccountRow {account} />
		{/each}
	</tbody>
</table>

<div class="h-20" />
