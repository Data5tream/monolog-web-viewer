<script lang="ts">
  import LogEntryField from './LogEntryField.svelte';

  export let logEntry;
</script>

<LogEntryField classList="timestamp" value="{new Date(logEntry.timestamp).toISOString()}"/>
<LogEntryField classList="text-{logEntry.level.toLowerCase()}" value="{logEntry.level}"/>
<LogEntryField classList="component" value="{logEntry.component}"/>
<LogEntryField classList="message" value="{logEntry.message}"/>
<LogEntryField classList="context" value="{logEntry.context}"/>
