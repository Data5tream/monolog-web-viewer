<script lang="ts">
  import { components, levels } from '../lib/store';
  import Filter from './FilterPill.svelte';

  let comps = [];
  components.subscribe((val) => comps = val);

  let lvls = [];
  levels.subscribe((val) => lvls = val);
</script>

<div class="tag-container">
    <div class="components">
        <div>Components</div>
        {#each comps as comp}
            <Filter filter="components" title={comp.name} active={comp.active}/>
        {/each}
    </div>
    <div class="levels">
        <div>Levels</div>
        {#each lvls as lvl}
            <Filter filter="levels" title={lvl.name} active={lvl.active} color={lvl.name.toLowerCase()} />
        {/each}
    </div>
</div>

<style lang="scss">
  .tag-container {
    margin: 0 0 16px;

    & > div:not(:first-child) {
      border-left: 1px solid #ccc;
      margin-left: 8px;
      padding: 0 16px 0 14px;
    }
  }

  .tag-container, .components, .levels {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }
</style>
