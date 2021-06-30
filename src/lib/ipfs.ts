import { writable } from 'svelte/store'

export const root = writable(null)

export const setRoot = async (ipfsURI) => {
  const reqNS = await fetch(ipfsURI)
  const { Path } = await reqNS.json()

  root.set(Path)

  return Path
}