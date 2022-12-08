<script lang="ts">
  import LogEntryField from './LogEntryField.svelte';

  const shortMsg = (message: string): string => {
    return message.length > 160 ? message.substring(0, 160) + '...' : message;
  }

  export let logEntry;
</script>

<div class="content-row">
    <LogEntryField classList="timestamp" value="{new Date(logEntry.timestamp).toISOString()}"/>
    <LogEntryField classList="text-{logEntry.level.toLowerCase()}" value="{logEntry.level}"/>
    <LogEntryField classList="component" value="{logEntry.component}"/>
    <LogEntryField classList="message" value="{shortMsg(logEntry.message)}"/>
    <LogEntryField classList="context" value="{logEntry.context}"/>
</div>
