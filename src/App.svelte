<script lang="ts">
  import { logData, rawData } from './lib/store';

  import LogViewer from './components/LogViewer.svelte';
  import Loader from './components/Loader.svelte';
  import Filters from './components/Filters.svelte';

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
<footer>
    <span>&copy; Simon Barth, 2022</span>
    <a href="https://github.com/Data5tream/monolog-web-viewer" target="_blank" rel="nofollow">Github</a>
    <span>Licensed under GNU AGPLv3</span>
</footer>

<style lang="scss">
  header {
    padding: 8px 16px;
  }

  main {
    overflow: scroll;
  }

  footer {
    color: #ccc;
    background: #111;
    padding: 12px 16px;

    & > * {
      padding: 0 8px;
      border-right: 1px solid #ccc;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: 0;
      }
    }
  }

  a, a:visited {
    color: #ccc;
  }
</style>
