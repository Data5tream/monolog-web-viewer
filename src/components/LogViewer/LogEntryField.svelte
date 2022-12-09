<script lang="ts">
  export let classList;
  export let value;
</script>

<div class="log-entry-field {classList}">
    {#if value}
        {value}
    {:else}
        <span class="text-muted">None</span>
    {/if}
</div>

<style lang="scss">
  div {
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
