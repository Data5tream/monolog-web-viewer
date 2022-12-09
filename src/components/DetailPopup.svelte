<script lang="ts">
  import { popup } from '../lib/store';
  import LogEntryField from './LogViewer/LogEntryField.svelte';

  let isVisible;
  let logEntry;
  popup.subscribe((val) => {
    isVisible = val.isVisible;
    logEntry = val.logEntry;
  });

  const hidePopup = () => {
    popup.set({ isVisible: false, logEntry: undefined });
  };

  const handleKeydown = (ev) => {
    if (isVisible && ev.key === 'Escape') {
      hidePopup();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isVisible}
    <div class="overlay" on:click|self={hidePopup}>
        <div class="popup">
            <div>
                {new Date(logEntry.timestamp).toISOString()}
            </div>
            <LogEntryField classList="text-{logEntry.level.toLowerCase()}" value={logEntry.level}/>
            <LogEntryField classList="component" value={logEntry.component}/>
            <div class="message">
                {logEntry.message}
            </div>
            <div class="context">
                {logEntry.context}
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(51, 51, 51, 0.8);
    z-index: 10;
  }

  .popup {
    display: grid;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-height: 80vh;
    overflow-y: auto;
    padding: 16px;
    background: #2b2a33;

    gap: 16px 0;
    grid-template-areas:
      "timestamp level component"
      "message message message"
      "context context context";

    .message {
      grid-area: message;
    }

    .context {
      grid-area: context;
    }
  }
</style>
