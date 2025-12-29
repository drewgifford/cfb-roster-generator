<script lang="ts">
	import { teamStore } from '$lib/stores/team.svelte';
	import CreateRosterForm from '$lib/components/CreateRosterForm.svelte';
	import RosterTable from '$lib/components/RosterTable.svelte';
	import PlayerForm from '$lib/components/PlayerForm.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import { onMount } from 'svelte';
	import { JsonProvider } from '$lib/util/db-provider';

	let isLoading = $state(true);

	onMount(async () => {
		await JsonProvider.initializeData();
		isLoading = false;
	});
</script>

{#if !teamStore.hasRoster()}
	<CreateRosterForm {isLoading} />
{:else}
	<RosterTable />
{/if}

{#if teamStore.hasSelectedPlayer()}
	<Overlay on:close={() => teamStore.selectPlayer(null)}>
		<PlayerForm />
	</Overlay>
{/if}

<p class="mt-4 mb-4 text-sm text-blue-500">
	Created by <a href="https://github.com/drewgifford" target="_blank">Drew Gifford</a>
</p>
