<script lang="ts">
  import { logData, rawData } from './lib/store';

  import LogViewer from './components/LogViewer/LogViewer.svelte';
  import LogLoader from './components/LogLoader.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import DetailPopup from './components/DetailPopup.svelte';

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

<Header {fileLoaded}/>
<main>
    {#if fileLoaded}
        <LogViewer {data}/>
    {:else}
        <LogLoader/>
    {/if}
</main>
<Footer/>

<DetailPopup/>