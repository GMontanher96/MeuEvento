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
            
        <div v-if="confirmPaymant"> <h3>Confirmação de Pagamento</h3> </div>
         <b-row>
              <b-col md="6" sm="12">
                    <b-form-group label="Forma de Pagamento:" label-for="event-forma-pagamento">
                          <b-form-select v-model="selected" :options="options"></b-form-select>
                    </b-form-group>
             </b-col>
         </b-row>
           <b-row v-if="selected === 'b' ">
               <b-col md="6" sm="12">
                    <b-form-group label="Número do Cartão:" label-for="payment-numero">
                        <b-form-input id="payment-numero" type="number"  required    />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Nome do Titular:" label-for="payment-nome">
                        <b-form-input id="payment-nome" type="text" required   />
                    </b-form-group>
             </b-col>
               <b-col md="6" sm="12">
                    <b-form-group label="Validade:" label-for="payment-validade">
                        <b-form-input id="payment-validade" type="text"  required    />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="CV:" label-for="payment-cv">
                        <b-form-input id="payment-cv" type="number" required   />
                    </b-form-group>
             </b-col>
                 <b-col md="6" sm="12">
                    <b-form-group label="Parcelas:" label-for="payment-parcelas">
                          <b-form-select v-model="selectedParc" :options="optionsParc"></b-form-select>
                    </b-form-group>
             </b-col>
        
              
      
             <b-col md="6" sm="12">
                    <b-form-group label="Valor:" label-for="event-valor">
                        <b-form-input id="event-valor" type="text" v-model="event.valor" required disabled />
                    </b-form-group>
             </b-col>
              
         </b-row>
         <b-row v-else-if="selected === 'a'">
              <b-col md="6" sm="12">
                    <b-form-group label="Valor:" label-for="event-valor">
                        <b-form-input id="event-valor" type="text" v-model="event.valor" required disabled />
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
      exibirPaymentCartao: false,
      exibirPaymentBoleto: false,
      confirmPaymant: false,
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
        { value: "a", text: "BOLETO" },
        { value: "b", text: "CARTÃO" },
      ],
      selectedParc: null,
      optionsParc: [
        { value: null, text: "Selecione as parcelas" },
        { value: 1, text: "1x" },
        { value: 2, text: "2x" },
        { value: 3, text: "3x" },
        { value: 4, text: "4x" },
        { value: 5, text: "5x" },
        { value: 6, text: "6x" },
      ],
    };
  },
  methods: {
    loadEvents() {
      const url = `${baseApiUrl}/events`;
      axios.get(url).then((res) => {
        this.events = res.data;
      });
      this.exibirList = true;
    },
    reset() {
      this.mode = "save";
      this.event = {};
      this.loadEvents();
      this.exibirForm = false;
      this.exibirList = false;
      this.confirmPaymant = false;
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
      this.confirmPaymant = true;
    },
  },

  mounted() {
    // this.loadEvents();
  },
};
</script>

<style>
</style>
