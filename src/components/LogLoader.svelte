 <script lang="ts">
 import { parseLog } from '../lib/parser';

 let files: Array<File>;

 const loadFileContent = async (file: File) => {
   parseLog(await file.text());
 }

 $: if (files) {
   loadFileContent(files[0]);
 }
</script>

<label for="fileUpload">Select monolog log file</label>
<input id="fileUpload" type="file" accept="text/plain,.log" bind:files>
