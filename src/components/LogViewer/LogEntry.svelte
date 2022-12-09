<script lang="ts">
  import LogEntryField from './LogEntryField.svelte';
  import { popup } from '../../lib/store';

  export let logEntry;

  const showPopup = () => {
    popup.set({
      isVisible: true,
      logEntry,
    });
  };
</script>

<LogEntryField classList="timestamp" value={new Date(logEntry.timestamp).toISOString()}/>
<LogEntryField classList="text-{logEntry.level.toLowerCase()}" value={logEntry.level}/>
<LogEntryField classList="component" value={logEntry.component}/>
<LogEntryField on:click={showPopup} classList="message" value={logEntry.message}/>
<LogEntryField on:click={showPopup} classList="context" value={logEntry.context}/>
