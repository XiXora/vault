<script context="module">
  import { writable } from 'svelte/store'
  import { root } from '$lib/ipfs'

  export const currentTrack = writable()
</script>

<script lang="ts">
  $: if ($currentTrack) {
    console.log($currentTrack)
  }
</script>

<article>
  {#if $currentTrack}
    <audio
      controls
      autoplay
      src="https://ipfs.io/api/v0/cat?arg={$root}/{$currentTrack.data_folder}/{$currentTrack.stereo_mix.vorbis}">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  {/if}
</article>