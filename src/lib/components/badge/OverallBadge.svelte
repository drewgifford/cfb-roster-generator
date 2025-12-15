<script lang="ts">
	const { ovr }: { ovr: number } = $props();

	const badgeColor = $derived.by(() => {
		if (ovr >= 90) {
			return 'badge-info';
		} else if (ovr >= 80) {
			return 'badge-success';
		} else if (ovr >= 70) {
			return 'badge-warning';
		} else if (ovr >= 60) {
			return 'badge-secondary';
		} else {
			return 'badge-error';
		}
	});
</script>

<div class="badge badge-soft text-nowrap {badgeColor}">{ovr} OVR</div>
