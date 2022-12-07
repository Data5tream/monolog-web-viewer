<script lang="ts">
  import { components } from '../lib/store';
  import Filter from './Filter.svelte';

  let comps = [];
  components.subscribe((val) => comps = val);
</script>

<div class="tag-container">
    <div class="components">
        {#each comps as comp}
            <Filter title="{comp.name}" active="{comp.active}"/>
        {/each}
    </div>
</div>

<style>
    .tag-container, .components {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }
</style>
