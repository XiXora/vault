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
      autoplay>
      <track kind="captions" src="data:%5b%e2%99%ab music %e2%99%ab%5d" />
      <source src="https://ipfs.io{$root}/{$currentTrack.data_folder}/{$currentTrack.stereo_mix.vorbis}" type="audio/ogg; codecs=vorbis"/>
      <source src="https://ipfs.io{$root}/{$currentTrack.data_folder}/{$currentTrack.stereo_mix.mp3}" type="audio/mpeg"/>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  {/if}
</article>

<style>
  audio {
    width: 100%;
  }
</style>