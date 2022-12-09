<script lang="ts">
  import Filters from './Filters.svelte';

  export let fileLoaded;
</script>

<header>
    {#if fileLoaded}
        <Filters/>
    {:else}
        <span>Select a file below to display logs</span>
    {/if}
</header>

<style>
  header {
    padding: 8px 16px;
  }
</style>
