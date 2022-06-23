<template>
  <div id="three-last-sections" class="fixed w-full top-[100%] left-0 z-[100]">
    <Publication />
    <Team />
    <Email />
  </div>
</template>

<script>
import Team from "./Team.vue";
import Publication from "./Publication.vue";
import Email from "./Email.vue";
export default {
  components: { Publication, Team, Email },
  name: "ThreeLastSection",
};
</script>
