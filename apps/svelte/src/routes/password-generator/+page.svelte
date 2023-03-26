<script lang="ts">
	import { randomString } from "lib/utils/string"

	let value = randomString()
	let length = 20
	let numeric = false
	let symbols = false

	$: value = randomString({ length, numeric, symbols })
</script>

<h2>Random Password</h2>

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
