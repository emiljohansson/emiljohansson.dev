<script>
	import "ui/globals.css"
	import "../app.css"
	// import feather from "feather-icons"
</script>

<nav class="flex items-center px-6 py-4 bg-white border-b border-slate-200">
	<a class="inline-flex items-center gap-2" href="/">
		<div class="rounded-full overflow-hidden">
			<img alt="Emil" src="/images/profile.jpg" height="30" width="30" />
		</div>
		<span class="font-bold">Emil Johansson</span>
	</a>

	<a
		class="inline-flex items-center justify-center ml-auto rounded-full shadow-sm shadow-slate-400 h-7 w-7 hover:bg-slate-50"
		href="https://github.com/emiljohansson"
		target="_blank"
		rel="noreferrer"
	>
		<!-- TODO look up new solution -->
		<!-- {@html feather.icons.github.toSvg({
			width: 16,
			height: 16,
		})} -->
		<span class="sr-only">Go to Emil's github</span>
	</a>
</nav>

<slot />
