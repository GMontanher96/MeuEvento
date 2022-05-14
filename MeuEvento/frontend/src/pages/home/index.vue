<template>
  <div>
    <SearchEvent />
  </div>
</template>

<script>
import SearchEvent from "@/components/searchEvent/SearchEvent";

export default {
  name: "Home",
  data() {
      return {
        filter: ''
      }
  },
  components: { SearchEvent },
};
</script>

<style>
</style>
