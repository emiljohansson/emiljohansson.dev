<script lang="ts">
	import { createCounter } from './counter.svelte'

	let counter = createCounter()
</script>

<article>
	<h2>Counter</h2>
	<p>Count: {counter.count}</p>
	<div class="flex">
		<button class="btn-secondary" onclick={counter.increment}>Increment</button>
		<button class="btn-secondary" onclick={counter.decrement}>Decrement</button>
		<button class="btn-secondary" onclick={counter.reset}>Reset</button>
		<button class="btn-secondary" onclick={() => counter.set(5)}>Set 5</button>
	</div>
</article>
