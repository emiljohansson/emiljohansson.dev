<script lang="ts">
	import { preventDefault } from 'svelte/legacy'

	let isValid = $state(false)

	async function onSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (!event.target) return
		const formData = new FormData(event.target as HTMLFormElement)
		const value = formData.get('value')

		const response = await fetch('/two-way-auth', {
			method: 'POST',
			body: JSON.stringify({ value }),
			headers: {
				'content-type': 'application/json',
			},
		})
		const data: { isValid: boolean } = await response.json()
		isValid = data.isValid
	}
</script>

<svelte:head>
	<title>Random String | emiljohansson.dev</title>
	<meta name="description" content="Genrates a random string" />
</svelte:head>

<header class="bg-white border-b border-slate-200 px-6 py-12">
	<h1 class="text-4xl font-medium mb-0">Two-Factor Authentication<br />Enter Code</h1>
</header>

<form onsubmit={preventDefault(onSubmit)}>
	<label>
		Code
		<input name="value" type="text" />
	</label>
	<button>Validate</button>
</form>

<div>
	Valid: {isValid}
</div>
