<script lang="ts">
	import { run } from 'svelte/legacy'

	import { randomString } from '@repo/lib/utils/string'

	let value = $state(randomString())
	let length = $state(20)
	let numeric = $state(false)
	let symbols = $state(false)

	run(() => {
		value = randomString({ length, numeric, symbols })
	})
</script>

<h2 class="text-2xl font-semibold mb-6">Random Password</h2>

<input class="input w-full" type="text" readonly {value} />
<div class="flex gap-2">
	<input type="range" min="8" max="100" bind:value={length} class="w-full" />
	{length}
</div>
<label class="flex gap-2">
	<input type="checkbox" bind:checked={numeric} />
	Numbers
</label>
<label class="flex gap-2">
	<input type="checkbox" bind:checked={symbols} />
	Symbols
</label>
