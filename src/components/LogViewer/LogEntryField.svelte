<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let classList;
  export let value;

  const click = () => {
    dispatch('click', {});
  }
</script>

<div class="log-entry-field {classList}" on:click={click}>
    {#if value}
        {value}
    {:else}
        <span class="text-muted">None</span>
    {/if}
</div>

<style lang="scss">
  .log-entry-field {
    padding: 2px 8px;
    transition: background 0.2s ease-in-out;
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.9em;
    cursor: pointer;

    &:hover {
      background: #333;
    }
  }
</style>
