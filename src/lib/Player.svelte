<script context="module" type="ts">
	import { derived, writable } from 'svelte/store';
	import { root } from '$lib/ipfs';

	export const currentTrack = writable();

	const mp3 = derived([currentTrack, root], ([$currentTrack, $root]) =>
		$currentTrack
			? `https://ipfs.io${$root}/${$currentTrack.data_folder}/${$currentTrack.stereo_mix.mp3}`
			: ''
	);

	const vorbis = derived([currentTrack, root], ([$currentTrack, $root]) =>
		$currentTrack
			? `https://ipfs.io${$root}/${$currentTrack.data_folder}/${$currentTrack.stereo_mix.vorbis}`
			: ''
	);
</script>

<script lang="ts">
	let audio: HTMLAudioElement;

	$: if ($currentTrack) {
		console.log($currentTrack);
		if (audio) {
			audio.load();
			audio.play();
		}
	}
</script>

<article>
	{#if $currentTrack}
		<audio bind:this={audio} controls autoplay>
			<track kind="captions" src="data:%5b%e2%99%ab music %e2%99%ab%5d" />
			<source src={$vorbis} type="audio/ogg; codecs=vorbis" />
			<source src={$mp3} type="audio/mpeg" />
			Your browser does not support the <code>audio</code> element.
		</audio>
	{/if}
</article>

<style>
	audio {
		width: 100%;
	}
</style>
