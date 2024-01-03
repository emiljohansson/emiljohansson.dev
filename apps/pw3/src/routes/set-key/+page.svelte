<script lang="ts">
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData

	let fieldType: 'password' | 'text' = 'password'
</script>

<form action="?/set-key" method="post" use:enhance class="flex gap-4">
	<input
		class="input w-full"
		name="key"
		placeholder="key"
		type={fieldType}
		on:focus={() => (fieldType = 'text')}
		on:blur={() => (fieldType = 'password')}
		value={data.key}
	/>
	<button class="btn">Set Key</button>
</form>
