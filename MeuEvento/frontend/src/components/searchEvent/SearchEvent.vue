<template>
  <b-container fluid>
          <PageTitle icon=" fa fa-search" main="Buscar eventos"  sub="Encontre seus eventos preferidos!"/>
    <b-input-group size="large">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Digite o nome do evento"
            ></b-form-input>
            
            <b-input-group-append>
                  <b-button class="ml-3" @click="loadEvents">Consultar</b-button>

          </b-input-group-append>
          </b-input-group>
          
          <br>
            <b-form v-show="exibirForm">
         <input id="event-id" type="hidden" v-model="event.id" />
         <b-row>
             <b-col md="6" sm="12">
                    <b-form-group label="Nome do Evento:" label-for="event-nome">
                        <b-form-input id="event-nome" type="text" v-model="event.nome" required disabled   />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Descrição:" label-for="event-descricao">
                        <b-form-input id="event-descricao" type="text" v-model="event.descricao" required disabled  />
                    </b-form-group>
             </b-col>
         </b-row>
           <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Empresa:" label-for="event-empresa">
                        <b-form-input id="event-empresa" type="text" v-model="event.empresa" required  disabled/>
                    </b-form-group>
             </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Responsável:" label-for="event-responsavel">
                        <b-form-input id="event-responsavel" type="text" v-model="event.responsavel" required disabled />
                    </b-form-group>
             </b-col>
           
               
         </b-row>
              <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Data:" label-for="event-data">
                        <b-form-input id="event-data" type="date" v-model="event.data" required   disabled/>
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Hora:" label-for="event-horario">
                        <b-form-input id="event-horario" type="time" v-model="event.horario" disabled  />
                    </b-form-group>
             </b-col>
               
         </b-row>
                 <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Cidade:" label-for="event-cidade">
                        <b-form-input id="event-cidade" type="text" v-model="event.cidade" required  disabled />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Estado:" label-for="event-estado">
                        <b-form-input id="event-estado" type="text" v-model="event.estado" required   disabled/>
                    </b-form-group>
             </b-col>
               
         </b-row>
                 <b-row>
                 <b-col md="6" sm="12">
                    <b-form-group label="Local:" label-for="event-local">
                        <b-form-input id="event-local" type="text" v-model="event.local" required disabled  />
                    </b-form-group>
             </b-col>
             <b-col md="6" sm="12">
                    <b-form-group label="Valor:" label-for="event-valor">
                        <b-form-input id="event-valor" type="text" v-model="event.valor" required disabled />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Forma de Pagamento:" label-for="event-forma-pagamento">
                          <b-form-select v-model="selected" :options="options"></b-form-select>
                    </b-form-group>
             </b-col>
        
         </b-row>
              <b-row>
               <b-col xs="12" style="padding: 30px">
                  <b-button variant="success" v-if="mode === 'save'" @click="buy">Comprar</b-button>
                  <b-button class="ml-3" @click="reset">Cancelar</b-button>
               </b-col>
         </b-row>
   

     </b-form>
          <b-row>
                 <b-table v-show="exibirList" hover striped :items="events" :fields="fields" :filter="filter"
>
        <template slot="actions" slot-scope="data">
            <b-button variant="success" @click="loadEvent(data.item)" class="mr-2">
                <i class="fa fa-ticket"></i>
            </b-button>
        </template>
        
     </b-table>
  
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from "@/components/pageTitle/PageTitle";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Home",
  components: { PageTitle },
  data() {
    return {
      exibirForm: false,
      exibirList: false,
      mode: "save",
      event: {},
      events: [],
      filter: null,
      fields: [
        { key: "nome", label: "Nome do Evento", sortable: true },
        { key: "descricao", label: "Descrição", sortable: true },
        {
          key: "data",
          label: "Data",
          sortable: true,
          formatter: (value) => (value ? "DD/MM/YYYY" : "DD/MM/YYYY"),
        },
        { key: "horario", label: "Hora", sortable: true },
        { key: "cidade", label: "Cidade", sortable: true },
        { key: "local", label: "Local", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "actions", label: "Comprar" },
      ],
      selected: null,
      options: [
        { value: null, text: "Selecione a forma de pagamento" },
        { value: "a", text: "PIX" },
        { value: "b", text: "CARTÃO DE CREDITO" },
        { value: "b", text: "CARTÃO DE DEBITO" },    
      ],
    };
  },
  methods: {
    loadEvents() {
      const url = `${baseApiUrl}/events`;
      axios.get(url).then((res) => {
        this.events = res.data;
      });
      this.exibirList = true
    },
    reset() {
      this.mode = "save";
      this.event = {};
      this.loadEvents();
    },
    buy() {
      const method = this.event.id ? "put" : "post";
      const id = this.event.id ? `/${this.event.id}` : "";
      axios[method](`${baseApiUrl}/events${id}`, this.event)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadEvent(event, mode = "save") {
      this.mode = mode;
      this.event = { ...event };
      this.exibirForm = true;
    },
  },

  mounted() {
    // this.loadEvents();
  },
};
</script>

<style>
</style>
