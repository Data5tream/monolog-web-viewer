<script lang="ts">
  import { components, levels } from '../lib/store';
  import Filter from './Filter.svelte';

  let comps = [];
  components.subscribe((val) => comps = val);

  let lvls = [];
  levels.subscribe((val) => lvls = val);
</script>

<div class="tag-container">
    <div class="components">
        <label>Components</label>
        {#each comps as comp}
            <Filter filter="components" title="{comp.name}" active="{comp.active}"/>
        {/each}
    </div>
    <div class="levels">
        <label>Levels</label>
        {#each lvls as lvl}
            <Filter filter="levels" title="{lvl.name}" active="{lvl.active}"/>
        {/each}
    </div>
</div>

<style lang="scss">
    .tag-container {
      margin: 0 16px 8px;

      & > div:not(:first-child) {
        border-left: 2px solid #ccc;
        padding: 4px 8px;
      }
    }

    .tag-container, .components {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
    }
</style>
