<script lang="ts">
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import { keyCode } from '$lib/store'
	import AccountRow from './AccountRow.svelte'
	import UpdateIcon from '$lib/icons/UpdateIcon.svelte'

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

<div class="flex">
	{#if data.user}
		{data.user.email}
		<form action="?/logout" method="post" use:enhance>
			<button>Logout</button>
		</form>
	{:else}
		<a href="/login">Login</a>
	{/if}
</div>
<h1>Accounts</h1>
<div>Set: <input bind:value={$keyCode} /></div>
<form action="?/add-account" method="post" use:enhance>
	<input type="hidden" name="key" bind:value={$keyCode} />
	<input type="text" name="website" placeholder="website" required />
	<input type="text" name="username" placeholder="username" />
	<input
		type="text"
		name="password"
		placeholder="password"
		required
		bind:value={newPassword}
	/>
	<button type="button" on:click={() => (newPassword = createPassword())}>
		<UpdateIcon />
		<span class="sr-only">Re-generate</span>
	</button>
	<button>Add</button>
</form>
<ul>
	{#each data.accounts as account}
		<li>
			<AccountRow {account} />
		</li>
	{/each}
</ul>
