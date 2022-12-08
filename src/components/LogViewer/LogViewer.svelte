<script lang="ts">
  import VirtualList from 'svelte-virtual-list-ce';

  import LogEntry from './LogEntry.svelte';

  let h;
  let height;
  $: if (h) height = `${h - 40}px`;

  export let data;
</script>

{#if data.length}
    <table bind:clientHeight={h}>
        <thead>
        <tr class="content-row">
            <th>Timestamp</th>
            <th>Level</th>
            <th>Component</th>
            <th>Message</th>
            <th>Context</th>
        </tr>
        </thead>
        <tbody>
        {#if height}
            <VirtualList {height} itemHeight={24} items={data} let:item>
                <LogEntry logEntry="{item}"/>
            </VirtualList>
        {/if}
        </tbody>
    </table>
{:else}
    <span class="error">No data found :(</span>
{/if}

<style lang="scss">
  table {
    height: 100%;
    width: 100%;
  }

  thead {
    height: 32px;

    tr {
      height: 32px;
    }
  }

  tbody {
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
