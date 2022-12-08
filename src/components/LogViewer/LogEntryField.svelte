<script lang="ts">
  export let classList;
  export let value;
</script>

<td class="{classList}">
    {#if value}
        {value}
    {:else}
        <span class="text-muted">None</span>
    {/if}
</td>

<style lang="scss">
  td {
    padding: 0 8px;
  }

  .timestamp {
    font-family: monospace;
    font-size: 0.8em;
  }

  .component {
    font-family: monospace;
  }

  .level {
    font-family: monospace;
  }

  .message {
    font-size: 0.8em;
  }
</style>
