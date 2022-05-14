<template>
 <div class="events-admin">
     <b-table hover striped :items="events" :fields="fields"></b-table>
 </div>
</template>

<script>
import { baseApiUrl } from "@/global"
import axios from "axios";

export default {
  name: "EventsAdmin",
  data: function() {
    return {
      mode: "save",
      event: {},
      events: [],
      fields: [ 
                { key: 'nome', label: 'Evento', sortable: true},
                { key: 'descricao', label: 'Descrição', sortable: true},
                { key: 'empresa', label: 'Empresa', sortable: true},
                { key: 'responsavel', label: 'Responsável', sortable: true},
                { key: 'data', label: 'Data', sortable: true },
                { key: 'horario', label: 'Hora', sortable: true },
                { key: 'cidade', label: 'Cidade', sortable: true},
                { key: 'estado', label: 'Estado', sortable: true},
                { key: 'valor', label: 'Valor', sortable: true},
                { key: 'actions', label: 'Ações'}
                
                
                ]
    };
  },
  methods: {
    loadEvents() {
      const url = `${baseApiUrl}/events`;
      axios.get(url).then(res => {
        this.events = res.data
      });
    },
  },
  mounted() {
    this.loadEvents();
  },
};
</script>

<style>
</style>
