<script lang="ts">
	let isWithin = false

	function onGlobalClick() {
		isWithin = false;
	}
</script>

<svelte:document on:click={onGlobalClick} />

<article>
	<h2>Click Outside</h2>
	<button class="btn-primary" on:click|stopPropagation={() => isWithin = true}>
		{isWithin ? 'Within' : 'Outside'}
	</button>
</article>