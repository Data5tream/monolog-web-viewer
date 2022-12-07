<script lang="ts">
  import LogEntry from './LogEntry.svelte';

  export let data;
</script>

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

<style>
    table {
        width: 100%;
    }
</style>
