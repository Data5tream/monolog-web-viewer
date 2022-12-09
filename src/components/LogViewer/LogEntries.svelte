<script lang="ts">
  /**
   * This component is based loosely on `svelte-virtual-list` by Rich Harris.
   *
   * It has been adapted to a grid layout and optimized for this particular use case.
   */

  import { onMount, tick } from 'svelte';

  import LogEntry from './LogEntry.svelte';

  // props
  export let items: Array<LogEntry> = [];
  export let height: number;
  export let itemHeight: number;

  let start: number = 0;
  let end: number;
  let viewport;
  let contents;
  let viewport_height = 0;
  let visible: Array<LogEntry>;
  let mounted = false;

  let top = 0;
  let bottom = 0;

  const tableHeaders = [
    'Timestamp',
    'Level',
    'Component',
    'Message',
    'Context',
  ];

  // set widths of header cells and keep them in sync
  let headerWidths = 'auto auto auto 1fr auto';
  $: if (visible && contents) {
    const fs = contents.getElementsByClassName('log-entry-field');
    if (fs.length) {
      headerWidths = `${fs[0].clientWidth}px ${fs[1].clientWidth}px ${fs[2].clientWidth}px 1fr auto`;
    }
  }

  $: visible = (items.length && end) ? items.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  }) : [];

  // render items on change
  $: if (mounted && height) refresh(items, height);


  /**
   * Render visible items and update paddings
   *
   * @param {Array<LogEntry>} items
   * @param {number} viewport_height
   */
  async function refresh(items, viewport_height) {
    const isStartOverflow = items.length < start

    if (isStartOverflow) {
      await scrollToIndex(items.length - 1, {behavior: 'auto'})
    }

    const { scrollTop } = viewport;

    await tick(); // wait until the DOM is up-to-date

    let content_height = top - scrollTop;
    let i = start;

    while (content_height < viewport_height && i < items.length) {
      end = i + 1;
      await tick();

      content_height += itemHeight;
      i += 1;
    }

    end = i;
    bottom = (items.length - end) * itemHeight;
  }


  /**
   * Update `start` and `end` to new values.
   */
  async function handle_scroll() {
    const { scrollTop } = viewport;

    let i = 0;
    let y = 0;

    while (i < items.length) {
      if (y + itemHeight > scrollTop) {
        start = i;
        top = y;

        break;
      }

      y += itemHeight;
      i += 1;
    }

    while (i < items.length) {
      y += itemHeight;
      i += 1;

      if (y > scrollTop + height) break;
    }

    end = i;
    bottom = (items.length - end) * itemHeight;
  }

  export async function scrollToIndex (index, opts) {
    const { scrollTop } = viewport;
    const itemsDelta = index - start;
    const distance = itemsDelta * itemHeight;
    opts = {
      left: 0,
      top: scrollTop + distance,
      behavior: 'smooth',
      ...opts
    };
    viewport.scrollTo(opts);
  }

  // trigger initial refresh
  onMount(() => {
    mounted = true;
  });
</script>

<div class="headers" style="grid-template-columns: {headerWidths}">
    {#each tableHeaders as header}
        <div>{header}</div>
    {/each}
</div>

<div class="item-container"
    bind:this={viewport}
    bind:offsetHeight={viewport_height}
    on:scroll={handle_scroll}
    style="height: {height}px"
>

    <div class="item-wrapper" bind:this={contents} style="padding-top: {top}px; padding-bottom: {bottom}px;">
        {#each visible as row (row.index)}
            <LogEntry logEntry={row.data}/>
        {/each}
    </div>
</div>

<style>
    .headers {
        display: grid;
    }
    .headers > div {
        padding: 0 8px;
    }

    .item-container {
        display: block;
        position: relative;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }

    .item-wrapper {
        display: grid;
        grid-template-columns: auto minmax(90px, auto) minmax(128px, auto) 1fr auto;
        gap: 2px 0;
    }
</style>
