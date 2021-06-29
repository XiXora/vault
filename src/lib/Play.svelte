<script lang="ts">
	import { currentTrack } from '$lib/Player.svelte';

	export let track;
</script>

<button
	class:playing={$currentTrack === track}
	class="icon"
	on:click={() => ($currentTrack = track)}
>
	play_arrow
</button>

<style>
	.playing {
		background: none;
		filter: var(--icon-filter-red);
	}
</style>
