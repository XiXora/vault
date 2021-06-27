<script lang="ts">
  import { currentTrack } from '$lib/Player.svelte'

  export let track
</script>

<button class='icon' on:click={() => $currentTrack = track}>
  play_arrow
</button>