<script>
	const projects = [
		{
			href: 'https://emiljohansson.dev/design',
			text: 'Design System',
			external: true,
			description: 'Design system for the apps developed by Emil Johansson.',
			test: 'design-system',
		},
		{
			href: 'https://pw.emiljohansson.dev',
			text: 'Password Manager',
			external: true,
			description: 'Password manager for the apps developed by Emil Johansson.',
			test: 'password-manager',
		},
		{
			href: 'https://games.emiljohansson.dev',
			text: 'Games',
			external: true,
			description: 'Some simple games.',
			test: 'games',
		},
		{
			href: '/password-generator',
			text: 'Password Generator',
			description: 'Generate a password that is difficult to guess.',
			test: 'password-generator',
		},
		{
			href: '/random-string',
			text: 'Random String',
			description: 'Generate a random string of characters.',
			test: 'random-string',
		},
		{
			href: '/current-time',
			text: 'Current Time',
			description: 'Get the current time.',
			test: 'current-time',
		},
		{
			href: '/two-way-auth-generate',
			text: 'Two-Factor Authentication - Generate Code',
			description: 'Generate a two-factor authentication code.',
			test: 'two-way-auth-generate',
		},
		{
			href: '/two-way-auth-enter',
			text: 'Two-Factor Authentication - Enter Code',
			description: 'Enter a two-factor authentication code.',
			test: 'two-way-auth-enter',
		},
		{
			href: '/progress-bar',
			text: 'Progress Bar',
			description: 'Progress bar with a percentage.',
			test: 'progress-bar',
		},
		{
			href: '/confirm-button',
			text: 'Confirm Button',
			description: 'Hold down the button to confirm the action.',
			test: 'confirm-button',
		},
		{
			href: '/calculate',
			text: 'Calculate',
			description: 'Calculate a mathematical expression from an API route.',
			test: 'calculate',
		},
	]
</script>

<svelte:head>
	<title>Welcome to emiljohansson.dev | emiljohansson.dev</title>
	<meta name="description" content="Playground for Emil Johansson" />
</svelte:head>

<main class="px-6 py-4">
	<ul class="border border-slate-200 rounded-md overflow-hidden">
		{#each projects as { href, text, description, test, external }}
			<li class="p-4 bg-white border-b last:border-none border-slate-200">
				<a
					class="font-bold hover:underline"
					{href}
					data-test={test}
					target={external ? '_blank' : null}
					rel={external ? 'noreferrer' : null}
				>
					{text}
				</a>
				<div>
					{description}
				</div>
			</li>
		{/each}
	</ul>
</main>
