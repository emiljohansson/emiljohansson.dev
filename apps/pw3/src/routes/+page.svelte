<script lang="ts">
	import { keyword } from '$lib/store'
	import AccountRow from './AccountRow.svelte'
	import { enhance } from '$app/forms'

	export let data

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
<div>Set: <input bind:value={$keyword} /></div>
<form action="?/add-account" method="post" use:enhance>
	<input type="hidden" name="secret" bind:value={$keyword} />
	<input type="text" name="website" placeholder="website" required />
	<input type="text" name="username" placeholder="username" />
	<input
		type="text"
		name="password"
		placeholder="password"
		required
		bind:value={newPassword}
	/>
	<button>Save</button>
</form>
<ul>
	{#each data.accounts as account}
		<li>
			<AccountRow {account} />
		</li>
	{/each}
</ul>
