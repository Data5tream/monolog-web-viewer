<script lang="ts">
  import LogEntries from './LogEntries.svelte';

  let h;
  let height;
  $: if (h) height = h - 28;

  export let data;
</script>

{#if data.length}
    <div class="container" bind:clientHeight={h}>
        <div class="inner">
            <LogEntries {height} items={data} itemHeight={26}/>
        </div>
    </div>
{:else}
    <span class="error">No data found :(</span>
{/if}

<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  .inner {
    height: 0;
    min-height: 100%;
  }

  .error {
    display: block;
    position: absolute;
    left: 50%;
    top: 33%;
    transform: translateX(-50%);
    font-size: 48px;
  }
</style>
