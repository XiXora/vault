<script lang="ts">
  import Player from '$lib/Player.svelte'
  
	import '../app.css';
</script>

<header>
  <img src='logo.png' alt='Logo' />

  <h1>Vault</h1>

  <Player />
</header>

<slot />

<style>
  header {
    display: flex;

    height: 5rem;
    padding: 5px;
    margin: -8px;

    background: var(--gray);
    border-bottom: 5px solid var(--black);
  }

  img {
    height: 5rem;
  }

  h1 {
    margin: 0;
    font-size: 4rem;
    margin-left: 1rem;
  }
</style>