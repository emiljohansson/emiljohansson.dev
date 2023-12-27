<script lang="ts">
	let value = ''
	let debounced = ''
	let timer: ReturnType<typeof setTimeout> 

	const debounce = (func: () => void, delay = 300) => {
		clearTimeout(timer);
		timer = setTimeout(func, delay)
	}
</script>

<article>
	<h2>Debounce</h2>
	<input
		class="input"
		type="text"
		bind:value={value}
		on:keyup={() => debounce(() => debounced = value)}
	/>
	<p>Value: {value}</p>
	<p>Debounced: {debounced}</p>
</article>