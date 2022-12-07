<script lang="ts">
  import { logData } from './lib/store';

  import LogViewer from './components/LogViewer.svelte';
  import Loader from './components/Loader.svelte';
  import Filters from './components/Filters.svelte';

  let fileLoaded = false;
  let data = [];

  logData.subscribe((val) => {
    data = val;
    fileLoaded = true;
  });
</script>

<main>
    <Filters/>
    {#if fileLoaded}
        <LogViewer {data}/>
    {:else}
        <Loader/>
    {/if}
</main>
