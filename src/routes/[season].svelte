<script context="module">
  export async function load({ fetch, page }) {
    const Path = 'QmZZ1gFyrrHXbDeiUUhaC9QvYYMo5xq12m4AAYFDwKDDyA'
    const reqMetadata = await fetch(`https://ipfs.io/api/v0/cat?arg=${Path}/${page.params.season}/metadata.json`)
    const { title, recordings } = await reqMetadata.json()

    return {
      props: {
        title, recordings
      }
    }
  }
</script>

<script lang="ts">
  export let title: string
  export let recordings
</script>

<h1>{title}</h1>
<table>
  {#each recordings as recording}
  <tr>
    <td>{recording.title}</td>
    <td><button>play</button></td>
    <td>{recording.tracks.length} stems</td>
    <td>{recording.stereo_mix.media_info.Duration}</td>
    <td>
      {recording.stereo_mix.media_info.Channels}ch
      {recording.stereo_mix.media_info.SamplingRate/1000}Khz
      {recording.stereo_mix.media_info.BitDepth}bit
    </td>
  </tr>
  {/each}
</table>


<pre>{JSON.stringify(recordings, null, 2)}</pre>
<!-- <pre>{data}</pre> -->
