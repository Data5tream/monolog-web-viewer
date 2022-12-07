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

<button class="pill {color}" class:active on:click={updateFilter}>
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
  }

  .normal {
    background: #333;
    color: #fff;

    &.active {
      background: #555;
    }
  }
</style>
