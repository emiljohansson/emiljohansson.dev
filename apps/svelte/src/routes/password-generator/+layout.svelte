<header class="bg-white border-b border-slate-200">
	<div class="max-w-7xl mx-auto px-6 py-12">
		<h1 class="text-4xl font-medium mb-0">Password Generator</h1>
	</div>
</header>

<section>
	<div class="max-w-7xl mx-auto flex gap-6 px-6 py-12">
		<nav class="grid w-[200px] md:w-[264px]">
			<a
				href="/password-generator/random"
				class="hover:bg-gray-200 rounded-md w-full px-3 py-2 leading-6">Random</a
			>
			<a
				href="/password-generator/memorable"
				class="hover:bg-gray-200 rounded-md w-full px-3 py-2 leading-6">Memorable</a
			>
			<a
				href="/password-generator/pin"
				class="hover:bg-gray-200 rounded-md w-full px-3 py-2 leading-6">PIN</a
			>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</section>
