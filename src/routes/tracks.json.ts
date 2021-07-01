const cache = new Map()

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))
const fetchIPFS = async (url, { retries = 3, retryTime = 1000, ...opts } = {}) => {
  if (cache.has(url)) {
    return cache.get(url)
  }
  
  try {
    console.log('fetch:', url, retries)
    const res = await fetch(url, opts)
    if (res.status === 200) {
      const data = await res.json()
      cache.set(url, data)
      return data
    } else {
      console.log("Wrong status", url, res.status)
    }
  } catch (e) {
    console.log('fail', retries)
    await wait(retryTime)
    return await fetchIPFS(url, {...opts, retries: retries-1, retryTime })
  }
}
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const seasons = await fetchIPFS(`https://ipfs.benderfactory.com/metadata.json`)

  const data = await Promise.all(seasons.map(async season => {
    const data = await fetchIPFS(`https://ipfs.benderfactory.com/${season.path}/metadata.json`)
    return {
      path: season.path,
      ...data
    }
  }))
  
  return {
    headers: {
      'Cache-Control': 'max-age=86400'
    },
    body: data.flatMap(
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