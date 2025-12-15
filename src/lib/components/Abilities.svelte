<script lang="ts">
	const { abilities }: { abilities: Record<string, number> } = $props();

	const color = function (level: number) {
		switch (level) {
			case 1:
				return 'border-[#CC4C25]'; // Bronze
			case 2:
				return 'border-[#E3E3E3]'; // Silver
			case 3:
				return 'border-[#FFA000]'; // Gold
			case 4:
				return 'border-[#B868C6]'; // Platinum
		}
		return 'border-[#ffffff]'; // Silver
	};

	const label = function (level: number) {
		switch (level) {
			case 1:
				return 'Bronze';
			case 2:
				return 'Silver';
			case 3:
				return 'Gold';
			case 4:
				return 'Platinum';
		}
		return 'None';
	};
</script>

<div class="flex flex-wrap gap-2">
	{#each Object.entries(abilities) as [ability, level] (ability)}
		<div
			class={`flex min-w-24 flex-col items-center rounded-md border-2 px-2 py-1 ${color(level)}`}
		>
			<span class="truncate text-xs font-bold">{ability}</span>
		</div>
	{/each}
</div>
