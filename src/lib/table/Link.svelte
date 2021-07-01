<script lang="ts">
	export let href;
	export let text;
</script>

<a {href} on:click|stopPropagation={() => false}>{text}</a>
