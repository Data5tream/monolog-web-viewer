<tr>
    <LogEntryField classList="timestamp" value="{new Date(logEntry.timestamp).toISOString()}"/>
    <LogEntryField classList="level-{logEntry.level.toLowerCase()}" value="{logEntry.level}"/>
    <LogEntryField classList="component" value="{logEntry.component}"/>
    <LogEntryField classList="message" value="{shortMsg(logEntry.message)}"/>
    <LogEntryField classList="context" value="{logEntry.context}"/>
</tr>

<script lang="ts">
  import LogEntryField from './LogEntryField.svelte';

  const shortMsg = (message: string): string => {
    return message.length > 128 ? message.substring(0, 128) + '...' : message;
  }

  export let logEntry;
</script>
