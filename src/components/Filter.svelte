<script lang="ts">
  import { setFilter, updateFilteredData } from '../lib/parser';

  export let filter;
  export let color = 'normal';
  export let title = '';
  export let active = false;

  const updateFilter = () => {
    setFilter(filter, title, !active);
    updateFilteredData();
  };
</script>

<button class="pill text-{color}" class:active on:click={updateFilter}>
    <span>{title}</span>
</button>

<style lang="scss">
  .pill {
    height: 32px;
    padding: 4px 16px;
    border-radius: 32px;
    border: 0;
    align-items: center;
    cursor: pointer;

    background: #2b2a33;

    &:not(.active) {
      filter: brightness(0.5);
    }
  }

  .text-normal {
    color: #eee;
  }

  @media (prefers-color-scheme: light) {
    .pill {
      background: #ddd;

      &:not(.active) {
        filter: brightness(0.8);
      }
    }

    .text-normal {
      color: #333;
    }
  }
</style>
