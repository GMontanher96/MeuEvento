<template>
  <div class="admin-pages">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastro de Eventos" />
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Eventos" active>
              <CreateEvents />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
  </div>
</template>

<script>
import PageTitle from "@/components/pageTitle/PageTitle";
import CreateEvents from "@/components/events/CreateEvents"
export default {
  name: "AdminPages",
  components: { PageTitle, CreateEvents },
};
</script>

<style>
</style>
