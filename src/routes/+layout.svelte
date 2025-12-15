<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>CFB 26 Roster Creator</title>

	<meta
		name="description"
		content="Generates a roster for CFB26 dynasties that can be imported into Team Builder."
	/>
	<meta name="keywords" content="CFB26, roster, creator, team builder, NCAA Football 26" />
</svelte:head>

<div class="dark container mx-auto">
	{@render children()}
</div>
