<script lang="ts">
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'

	export let data: PageData

	let fieldType: 'password' | 'text' = 'password'
</script>

<div class="grid items-center max-w-sm h-[calc(100vh-48px)] m-auto">
	<div>
		<h1>You Key</h1>
		<p class="mb-4 text-base-content/70">Enter your key</p>
		<form action="?/set-key" method="post" use:enhance class="flex gap-4">
			<input
				class="input input-bordered w-full"
				name="key"
				placeholder="key"
				type={fieldType}
				on:focus={() => (fieldType = 'text')}
				on:blur={() => (fieldType = 'password')}
				value={data.key}
			/>
			<button class="btn btn-primary">Set Key</button>
		</form>
	</div>
</div>
