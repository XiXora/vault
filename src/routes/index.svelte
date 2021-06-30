<script context="module">
  import { setRoot } from '$lib/ipfs'

  export async function load({ fetch }) {
    try {
      const root = await setRoot('https://ipfs.io/api/v0/name/resolve?arg=mm.em32.net')

      const reqMetadata = await fetch(`https://ipfs.io${root}/metadata.json`)
      const seasons = await reqMetadata.json()

      const data = await Promise.all(seasons.map(async season => {
        const req = await fetch(`https://ipfs.io${root}/${season.path}/metadata.json`)
        return {
          path: season.path,
          ...(await req.json())
        }
      }))

      return {
        props: {
          recordings: data.flatMap(
            ({title, path, recordings}) => recordings.map(
              recording => ({
                ...recording,
                season: title,
                data_folder: `${path}/${recording.data_folder}`
              })
            )
          )
        }
      }
    } catch(e) {
      console.log("Error happened:", e)
    }
  }
</script>

<script>
  import { goto } from '$app/navigation';
  import { Table, Play, Like, Tags, Link } from '$lib/table'
  import { currentTrack } from '$lib/Player.svelte'
  import { formatDuration } from '$lib/util'

  export let recordings = []

  const getMetadata = ({ stereo_mix }) => `
    ${stereo_mix.media_info.Channels}ch
    ${stereo_mix.media_info.SamplingRate/1000}Khz
    ${stereo_mix.media_info.BitDepth}bit
  `
</script>

<Table
  on:click={({ detail: { data_folder } }) => goto(data_folder)}
  columns={[
    { label: '', component: Play, props: track => ({ track }) },
    { label: 'title', component: Link, props: ({ title, data_folder }) => ({ href:data_folder, text: title }) },
    { label: 'stems', getter: ({ tracks }) => tracks.length },
    { label: 'duration', getter: ({ stereo_mix }) => formatDuration(stereo_mix.media_info.Duration), style: 'text-align: right;'},
    { label: 'metadata', getter: getMetadata},
    { label: 'tags', component: Tags, props: ({ tags }) => ({ tags }) },
    { label: '', component: Like, props: ({ title }) => ({ title }) },
  ]}
  rowClass={row => ({
    active: row === $currentTrack
  })}
  data={recordings}
/>

<style>
  :global(table tr.active) {
    background: var(--gray-light);
  }
</style>