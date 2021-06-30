<script lang='ts' context="module">
  import { setRoot } from '$lib/ipfs'

  export async function load({ fetch, page }) {
    const { season, track } = page.params

    const root = await setRoot('https://ipfs.io/api/v0/name/resolve?arg=mm.em32.net')
    const path = `https://ipfs.io${root}/${season}`
    const reqMetadata = await fetch(`${path}/metadata.json`)
    const metadata = await reqMetadata.json()
    const props = metadata.recordings.find(({ data_folder }) => data_folder === track),

    return {
      props: {
        ...props,
        path: `${path}/${props.data_folder}`, 
      }
    }
  }
</script>

<script lang="ts">
  import { Table, Tags, Files } from '$lib/table'
  import { formatDuration } from '$lib/util'

  export let path

  export let title
  
  export let tags = []
  export let bpm
  export let youtube_url
  export let recorded_date

  export let torrent
  export let stereo_mix
  export let tracks
</script>

<h2>{title}</h2>

<p>Recorded on {recorded_date}</p>
{#if youtube_url}
  <a href={youtube_url}>Watch on Youtube</a>
{/if}

<p>{formatDuration(stereo_mix.media_info.Duration)}</p>
<p>{stereo_mix.media_info.Channels}ch {stereo_mix.media_info.SamplingRate}kHz {stereo_mix.media_info.BitDepth}bit</p>
{#if bpm}
  <p>{bpm} bpm</p>
{/if}

<Tags {tags} />

<p>Download <a href='{path}/{torrent}'>.torrent</a> with all flac files </p>

<Table
  columns={[
    // { label: '', getter: () => ''},
    { label: 'track', getter: ({ name, id}) => `track ${id}: ${name}` },
    // 'player',
    { label: 'files', component: Files, props: (track) => ({ basepath: path, ...track }) },
  ]}
  data={[
    stereo_mix,
    ...tracks
  ]}
/>

<h3>Terms of Service: <a href='{path}/ToS.txt'>must read before downloading</a></h3>
