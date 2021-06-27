<script context="module">
  import { root } from '$lib/ipfs'

  export async function load({ fetch }) {
    try {
      const reqNS = await fetch('https://ipfs.io/api/v0/name/resolve?arg=mm.em32.net')
      const { Path } = await reqNS.json()

      root.set(Path)

      const reqMetadata = await fetch(`https://ipfs.io/api/v0/cat?arg=${Path}/metadata.json`)
      const seasons = await reqMetadata.json()

      const data = await Promise.all(seasons.map(async season => {
        const req = await fetch(`https://ipfs.io/api/v0/cat?arg=${Path}/${season.path}/metadata.json`)
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
  import Table from '$lib/Table.svelte'
  import Play from '$lib/Play.svelte'

  export let recordings = []
</script>

<Table
  columns={[
    { label: '', component: Play, props: track => ({ track }) },
    'title',
    { label: 'stems', getter: ({ tracks }) => tracks.length },
    { label: 'duration', getter: ({ stereo_mix }) => {
      const seconds = (stereo_mix.media_info.Duration|0) % 60
      const minutes = (stereo_mix.media_info.Duration / 60) |0

      return `${minutes}m${seconds.toString().padStart(2, '0')}s`
    }, style: 'text-align: right;'},
    { label: 'metadata', getter: ({ stereo_mix }) => `
      ${stereo_mix.media_info.Channels}ch
      ${stereo_mix.media_info.SamplingRate/1000}Khz
      ${stereo_mix.media_info.BitDepth}bit
    `},
    { label: 'tags', getter: ({ tags }) => tags.join(', ') }
  ]}
  data={recordings}
/>

<pre>{JSON.stringify(recordings, null, 2)}</pre>
