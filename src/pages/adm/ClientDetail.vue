<template>
    <q-page-container class="no-padding ">
      <q-page v-if="clientData">
        <div class="row q-pa-md q-ml-sm ">
          <div class="col-4 text-h5">
            {{ clientData.petName}} | {{clientData.clientName}}
          </div>
          <div class="col" align="end">
            <div class="row justify-end items-center">
              <!-- <q-btn
                label="Alterar valor consulta"
                flat
                no-caps
                @click="dialogAnswerOpportunity.open = true"
              >
                <q-icon class="q-ml-sm" name="import_export" color="cyan-8"/>
              </q-btn> -->
              <!-- <q-btn
                label="Falar com o cliente"
                flat
                no-caps
                @click="clkTalkToCustomer"
              >
                <q-icon class="q-ml-sm" name="chat" color="green-8"/>
              </q-btn> -->
              <div>
                Status:
                <q-badge class="text-subtitle2" rounded>
                  {{ clientData.petBreed }}
                </q-badge>
              </div>
            </div>
          </div>
        </div>
        <q-separator class="q-mx-md"></q-separator>
        <q-tabs
          v-model="tab"
          dense
          no-caps
          class="text-grey q-py-sm"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          @update:model-value="addBar = false"
        >
          <q-tab name="pet" label="Dados do pet" />
          <q-tab name="client" label="Dados do dono" />
          <q-tab name="more" label="Mais informações" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          class="q-my-md"
        >
          <q-tab-panel name="pet" class="q-pa-none ">
            <div class="row justify-center ">
              <div class="col-10 q-gutter-md">
                <q-input
                  readonly
                  outlined
                  label="Nome do pet"
                  v-model="clientData.petName"
                />
                <q-input
                  readonly
                  outlined
                  label="Raça"
                  v-model="clientData.petBreed"
                />
                <q-input
                  readonly
                  outlined
                  label="Gênero"
                  v-model="clientData.petGender"
                />
                <q-input
                  readonly
                  outlined
                  label="Data de nascimento"
                  v-model="clientData.petDate"
                />
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="selectedProcedures" class="q-pa-none ">
            <q-list
              separator
  
              class="bg-accent q-pa-sm"
            >
            </q-list>
            <q-separator/>
  
  
          </q-tab-panel>
          <q-tab-panel name="images" class="q-pa-none">
              
          </q-tab-panel>
        </q-tab-panels>
        <!-- <q-dialog v-model="dialogAnswerOpportunity.open">
          <q-card
            class="app-font bg-accent q-pa-md"
            style="border-radius: 1rem; min-width: 25rem"
          >
            <div class="text-h6 q-pl-md">
              Responder oportunidade
            </div>
            <q-card-section class="q-gutter-md">
              <q-input
                outlined
                prefix="R$"
                mask="#.###.###.###,##"
                reverse-fill-mask
                v-model="budgetData.value"
                label="Valor"
              />
              <q-input
                outlined
                v-model="budgetData.observation"
                label="Observação (opcional)"
              />
            </q-card-section>
            <q-card-actions  align="center">
              <q-btn
                label="Sair"
                @click="dialogAnswerOpportunity.open = false"
                no-caps
                flat
                color="primary"
              />
              <q-btn
                label="Salvar"
                no-caps
                @click="insertOpportunityBudget"
                unelevated
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
        <!-- <q-dialog v-model="dialogOpenSchedule.open">
          <q-card
            class="app-font bg-accent q-pa-md"
            style="border-radius: 1rem; min-width: 25rem"
          >
            <div class="text-h6 q-pl-md">
              Definir data e horário para {{ dialogOpenSchedule.data.procedureData.label }}
            </div>
            <q-card-section class="q-gutter-md">
              <q-input
                outlined
                type="date"
                v-model="procedureDate.date"
                label="Data"
              />
              <q-input
                outlined
                type="time"
                v-model="procedureDate.hour"
                label="Horário"
              />
            </q-card-section>
            <q-card-actions  align="center">
              <q-btn
                label="Sair"
                @click="dialogOpenSchedule.open = false"
                no-caps
                flat
                color="primary"
              />
              <q-btn
                label="Salvar"
                no-caps
                @click="insertScheduleProcedures"
                unelevated
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
      </q-page>
    </q-page-container>
  </template>
  <script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'clientDetail',
    data() {
      return {
        tab: 'pet',
        clientData: {}
      }
    },
    mounted() {
    //   this.$q.loading.hide()
    },
    beforeMount() {
      this.getClientDetailById()
    },
    methods: {
      getClientDetailById(){
        const opt = {
          route: '/desktop/adm/getClientDetailById',
          body: {
            clientId: this.$route.query.clientId
          }
        }
        this.$q.loading.show()
        this.$fetch(opt).then(r => {
          this.$q.loading.hide()
          this.clientData = r.data
          if(this.clientData.petGender === 'F') {
            this.clientData.petGender = 'Fêmea'
          } else if (this.clientData.petGender === 'M') { 
            this.clientData.petGender = 'Macho'
          } else this.clientData.petGender = 'Não informado'
        })
      }
    }
  })
  </script>
  <style scoped>
  .cardStyle{
    border-radius: 1rem;
    height: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 0px 0px 6px -3px;
  }
  .bg-brand {
    background: #f1e6db ;
  }
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.8s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  
  
  