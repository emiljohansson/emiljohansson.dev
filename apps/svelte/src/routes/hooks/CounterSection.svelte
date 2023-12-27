<script lang="ts">
	import { createCounter } from "./counter"

	let {count, increment, decrement, reset, set} = createCounter()
</script>

<article>
	<h2>Counter</h2>
	<p>Count: {$count}</p>
	<div class="flex">
		<button class="btn-secondary" on:click={increment}>
			Increment
		</button>
		<button class="btn-secondary" on:click={decrement}>
			Decrement
		</button>
		<button class="btn-secondary" on:click={reset}>
			Reset
		</button>
		<button class="btn-secondary" on:click={() => set(5)}>
			Set 5
		</button>
	</div>
</article>