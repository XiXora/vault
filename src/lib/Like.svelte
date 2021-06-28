<script context="module">
  import { browser } from '$app/env'
  import { writable } from 'svelte/store'

  const LIKES = 'likes'
  const storedLikes = browser && localStorage.getItem(LIKES)
  const likes = writable(storedLikes ? JSON.parse(storedLikes) : [])

  if (browser) {
    likes.subscribe(likes => {
      localStorage.setItem(LIKES, JSON.stringify(likes))
    })
  }
</script>

<script lang="ts">
  export let title

  $: like = $likes.includes(title)

  const toggle = () => {
    if (like) {
      $likes = $likes.filter(track => track !== title)
    } else {
      $likes = [...$likes, title]
    }
  }
</script>

<button class:like class='icon' on:click={toggle}>
  {like ? 'favorite' : 'favorite_border'}
</button>

<style>
  button {
    background: none;
    filter: var(--icon-filter-gray-light);

    transition: filter .3s ease-out;
  }
  :global(tr:hover) button {
    filter: var(--icon-filter-gray-dark);
  }

  .like {
    filter: var(--icon-filter-red);
  }
  :global(tr:hover) .like {
    filter: var(--icon-filter-red-light);
  }
</style>