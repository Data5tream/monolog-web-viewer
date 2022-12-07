<script lang="ts">
  import LogViewer from './components/LogViewer.svelte';
  import Loader from './components/Loader.svelte';

  let fileLoaded = false;
</script>

<main>
  {#if fileLoaded}
    <LogViewer/>
  {:else}
    <Loader/>
  {/if}
</main>
