<script lang="ts">
  import Controls from "./Controls.svelte"
  import DisplayPreview from "./DisplayPreview.svelte"
  import PlayerStatusList from "./PlayerStatusList.svelte"
  import QuestionPreview from "./QuestionPreview.svelte"


</script>

<div class="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
  <div class="col-span-4"><Controls/></div>
  <div class="row-span-5 col-start-5"><PlayerStatusList/></div>
  <div class="col-span-3 row-span-4 col-start-1 row-start-2"><DisplayPreview/></div>
  <div class="row-span-4 col-start-4 row-start-2"><QuestionPreview/></div>
</div>
