<script lang="ts">
  import LogEntry from './LogEntry.svelte';

  export let data;
</script>

{#if data.length}
    <table>
        <thead>
        <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Component</th>
            <th>Message</th>
            <th>Context</th>
        </tr>
        </thead>
        <tbody>
        {#each data as logEntry}
            <LogEntry {logEntry}/>
        {/each}
        </tbody>
    </table>
{:else}
    <span class="error">No data found :(</span>
{/if}

<style>
    table {
        width: 100%;
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
