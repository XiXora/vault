<script context="module">
  export async function load({ fetch }) {
    const reqNS = await fetch('https://ipfs.io/api/v0/name/resolve?arg=mm.em32.net')
    // const { Path } = await reqNS.json()
    const Path = 'QmZZ1gFyrrHXbDeiUUhaC9QvYYMo5xq12m4AAYFDwKDDyA'

    const reqMetadata = await fetch(`https://ipfs.io/api/v0/cat?arg=${Path}/metadata.json`)
    const seasons = await reqMetadata.json()

    return {
      props: {
        seasons
      }
    }
  }
</script>

<script>
  export let seasons = []
</script>


<h1>Welcome to the BENDERFACToRY Vault</h1>
  
<ul>
  {#each seasons as season}
    <li><a href='/{season.path}'>{season.name}</a></li>
  {/each}
</ul>

<pre>{JSON.stringify(seasons, null, 2)}</pre>
<!-- <pre>{data}</pre> -->
