<script type="ts">
	const links = [
		{
			href: "/password-generator",
			title: "Random",
		},
		{
			href: "/password-generator/memorable",
			title: "Memorable",
		},
		{
			href: "/password-generator/pin",
			title: "PIN",
		},
	]
</script>

<svelte:head>
	<title>Password Generator | emiljohansson.dev</title>
	<meta name="description" content="Generate a random or memorable password, or a pin" />
</svelte:head>

<header class="bg-white border-b border-slate-200">
	<div class="max-w-7xl mx-auto px-6 py-12">
		<h1>Password Generator</h1>
	</div>
</header>

<section>
	<div class="max-w-7xl mx-auto flex gap-6 px-6 py-12">
		<nav class="grid w-[200px] md:w-[264px]">
			<div>
				{#each links as { href, title }}
					<a {href} class="block hover:bg-gray-200 rounded-md w-full px-3 py-2 leading-6">
						{title}
					</a>
				{/each}
			</div>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</section>
