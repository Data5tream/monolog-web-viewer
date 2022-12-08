<script lang="ts">
  import { logData, rawData } from './lib/store';

  import LogViewer from './components/LogViewer/LogViewer.svelte';
  import Loader from './components/Loader.svelte';
  import Filters from './components/Filters.svelte';
  import Footer from './components/Footer.svelte';

  let fileLoaded = false;
  let data = [];

  logData.subscribe((val) => {
    data = val;
  });

  // Check if file is loaded or not. Uses raw data because of filters
  rawData.subscribe((val) => {
    fileLoaded = !!val.length;
  });
</script>

<header>
    <Filters/>
</header>
<main>
    {#if fileLoaded}
        <LogViewer {data}/>
    {:else}
        <Loader/>
    {/if}
</main>
<Footer/>

<style>
  header {
    padding: 8px 16px;
  }
</style>
