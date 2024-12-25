<script lang="ts">
	import { stopPropagation } from 'svelte/legacy'

	let isWithin = $state(false)

	function onGlobalClick() {
		isWithin = false
	}
</script>

<svelte:document onclick={onGlobalClick} />

<article>
	<h2>Click Outside</h2>
	<button class="btn-primary" onclick={stopPropagation(() => (isWithin = true))}>
		{isWithin ? 'Within' : 'Outside'}
	</button>
</article>
