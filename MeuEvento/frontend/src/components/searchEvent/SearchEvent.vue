<template>
  <div>
          <PageTitle icon=" fa fa-search" main="Buscar eventos"  sub="Encontre seus eventos preferidos!"/>
    <b-input-group size="large">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Digite o nome do evento"
            ></b-form-input>

      
          </b-input-group>
  </div>
</template>

<script>
import PageTitle from "@/components/pageTitle/PageTitle";

export default {
  name: "Home",
  data() {
      return {
        filter: ''
      }
  },
  components: { PageTitle },
};
</script>

<style>
</style>
