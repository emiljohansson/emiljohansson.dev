<script lang="ts">
	import { randomString } from "lib/utils/string"

	const letters = false
	const numeric = true
	const symbols = false
	let length = 6
	let value = randomString({ length, letters, numeric, symbols })

	$: value = randomString({ length, letters, numeric, symbols })
</script>

<h2 class="text-2xl font-semibold mb-6">PIN</h2>

<input class="input w-full" type="text" readonly {value} />
<div class="flex gap-2">
	<input type="range" min="3" max="15" bind:value={length} class="w-full" />
	{length}
</div>
