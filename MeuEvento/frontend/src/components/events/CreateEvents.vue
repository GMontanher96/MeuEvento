<template>
 <div class="events-admin">
     <b-form>
         <input id="event-id" type="hidden" v-model="event.id" />
         <b-row>
             <b-col md="6" sm="12">
                    <b-form-group label="Nome do Evento:" label-for="event-nome">
                        <b-form-input id="event-nome" type="text" v-model="event.nome" required  placeholder="Informe o nome do evento" />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Descrição:" label-for="event-descricao">
                        <b-form-input id="event-descricao" type="text" v-model="event.descricao" required placeholder="Informe a descrição do evento" />
                    </b-form-group>
             </b-col>
         </b-row>
           <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Empresa:" label-for="event-empresa">
                        <b-form-input id="event-empresa" type="text" v-model="event.empresa" required placeholder="Informe o nome da empresa responsável" />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Responsável:" label-for="event-responsavel">
                        <b-form-input id="event-responsavel" type="text" v-model="event.responsavel" required placeholder="Informe o nome do responsável" />
                    </b-form-group>
             </b-col>
               
         </b-row>
              <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Data:" label-for="event-data">
                        <b-form-input id="event-data" type="date" v-model="event.data" required placeholder="Informe a data do evento" />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Hora:" label-for="event-horario">
                        <b-form-input id="event-horario" type="time" v-model="event.horario" required placeholder="Informe a hora do evento" />
                    </b-form-group>
             </b-col>
               
         </b-row>
                 <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Cidade:" label-for="event-cidade">
                        <b-form-input id="event-cidade" type="text" v-model="event.cidade" required placeholder="Informe a cidade do evento" />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Estado:" label-for="event-estado">
                        <b-form-input id="event-estado" type="text" v-model="event.estado" required placeholder="Informe o estado do evento" />
                    </b-form-group>
             </b-col>
               
         </b-row>
                 <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Local:" label-for="event-local">
                        <b-form-input id="event-local" type="text" v-model="event.local" required placeholder="Informe o local do evento" />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Valor:" label-for="event-valor">
                        <b-form-input id="event-valor" type="text" v-model="event.valor" required placeholder="Informe o valor do evento" />
                    </b-form-group>
             </b-col>
        
         </b-row>
              <b-row>
                  <b-col md="6" sm="12">
                    <b-form-group label="Observação:" label-for="event-obs">
                        <b-form-input id="event-obs" type="text" v-model="event.obs" required placeholder="Observação" />
                    </b-form-group>
             </b-col>
               <b-col xs="12" style="padding: 30px">
                  <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
                  <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                  <b-button class="ml-3" @click="reset">Cancelar</b-button>
               </b-col>
         </b-row>
   

     </b-form>
     <b-table hover striped :items="events" :fields="fields">
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadEvent(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
                  <b-button variant="danger" @click="loadEvent(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
     </b-table>
 </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
// import moment from 'moment';

export default {
  name: "EventsAdmin",
  data: function() {
    return {
      mode: "save",
      event: {},
      events: [],
      fields: [
        { key: "nome", label: "Evento", sortable: true },
        { key: "descricao", label: "Descrição", sortable: true },
        { key: "empresa", label: "Empresa", sortable: true },
        { key: "responsavel", label: "Responsável", sortable: true },
        {
          key: "data",
          label: "Data",
          sortable: true,
          formatter: (value) => (value ? "DD/MM/YYYY" : "DD/MM/YYYY"),
        },
        { key: "horario", label: "Hora", sortable: true },
        { key: "cidade", label: "Cidade", sortable: true },
        { key: "estado", label: "Estado", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadEvents() {
      const url = `${baseApiUrl}/events`;
      axios.get(url).then((res) => {
        this.events = res.data;
      });
    },
    reset(){
        this.mode = 'save'
        this.event = {}
        this.loadEvents()
    },
    save() {
        const method = this.event.id ? 'put' : 'post'
        const id = this.event.id ? `/${this.event.id}` : ''
        axios[method](`${baseApiUrl}/events${id}`, this.event)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)

    },
    remove() {
        const id = this.event.id
        axios.delete(`${baseApiUrl}/events/${id}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)
    },
    loadEvent(event, mode = 'save') {
        this.mode = mode
        this.event = { ...event }
    }
  },
  mounted() {
    this.loadEvents();
  },
};
</script>

<style>
</style>
