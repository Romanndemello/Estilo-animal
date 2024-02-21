<template>
  <q-page-container class="no-padding ">
    <q-page v-if="clientData">
      <div class="row q-pa-md q-ml-sm ">
        <div class="col-4 text-h5">
          {{ clientData.petData.name}} 
          <q-chip 
            outline 
            color="secondary"
          >Dono: {{clientData.clientData.name}}</q-chip>
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
              <q-badge color="secondary" class="text-subtitle2" rounded>
                {{ clientData.petData.breed }}
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
        <q-tab name="more" label="Observações" />
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
                v-model="clientData.petData.name"
                outlined
                label="Nome do pet"
              />
              <q-input
                v-model="clientData.petData.breed"
                outlined
                label="Raça"
              />
              <q-select
                v-model="clientData.petData.gender"
                outlined
                :options="genderOptions"
                emit-value
                map-options
                label="Gênero"
              />
              <q-select
                v-model="clientData.petData.size"
                outlined
                label="Porte"
                :options="sizeOptions"
              />
            </div>
            
          </div>
          <div class="row justify-center q-mt-md">
            <div class="text-h6">Valores</div>
          </div>
          <div class="row justify-center q-mt-md">
            <q-input
              class="q-mr-xs"
              v-model="petValues.banho"
              outlined
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              label="Banho"
            />
            <q-input
              class="q-mr-xs"
              v-model="petValues.tosa"
              outlined
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              label="Tosa"
            />
            <q-input
              class="q-ml-xs"
              v-model="petValues.busca"
              outlined
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              label="Busca"
            />
            <q-input
              class="q-ml-xs"
              v-model="petValues.outros"
              outlined
              mask="#,##"
              fill-mask="0"
              reverse-fill-mask
              label="Outros"
            />
          </div>
        </q-tab-panel>
        <q-tab-panel name="client" class="q-pa-none ">
          <div class="row justify-center ">
            <div class="col-10 q-gutter-md">
              <q-input
                v-model="clientData.clientData.name"
                outlined
                label="Nome do cliente"
              />
              <q-input
                v-model="clientData.clientData.fone"
                outlined
                label="Whatsapp"
                mask="(##) #####-####"
              />
              <q-input
                v-model="clientData.clientData.rua"
                outlined
                label="Rua"
              />
              <q-input
              v-model="clientData.clientData.numEndereco"
              outlined
              label="Núm. endereço"
              type="number"
              />
              <q-input
                v-model="clientData.clientData.bairro"
                outlined
                label="Bairro"
              />
              <q-input
                v-model="clientData.clientData.cidade"
                outlined
                label="Cidade"
              />
              <q-input
                v-model="clientData.clientData.estado"
                outlined
                label="Estado"
              >
              </q-input>
              <q-input
                v-model="clientData.clientData.complemento"
                outlined
                label="Complemento"
              />
              <q-input
                v-model="clientData.clientData.cep"
                outlined
                label="CEP"
                mask="#####-###"
              />
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="more" class="q-pa-none">
          <div>
            <q-btn
              class="q-pa-sm q-ma-md" 
              outline 
              color="secondary"
              @click="dialogAddObs.open = true"
            >Adicionar observação</q-btn>
            <q-list separator
              v-for="obs in petObs"
              :key="obs._id"
            >
              <q-item class="bg-grey-3">
                <q-item-section>
                  <q-item-label>
                    <strong>Observação: </strong>{{obs.obs}}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  {{obs.data ?? obs.date}}
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="removeObs(obs)"
                    flat
                    dense
                    color="red"
                    icon="delete"
                  ></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <div class="row justify-end q-mb-sm q-mr-sm fixed-bottom-right">
        <q-btn
        v-if="$route.query.clientId"
          class="q-mr-md"
          @click="dialogDeleteClient.open = true"
          label="Apagar" 
          color="red"
        ></q-btn>
        <q-btn
          @click="saveClientInfo()"
          label="Salvar" 
          color="secondary"
        ></q-btn>
      </div>
      <q-dialog v-model="dialogAddObs.open">
        <q-card
          class="app-font bg-white q-pa-md"
          style="border-radius: 1rem; min-width: 25rem"
        >
          <div class="text-h6 q-pl-md">
            Adicionar observação
          </div>
          <q-card-section class="q-gutter-md">
            <q-input
              outlined
              v-model="dialogAddObs.data.obs"
              label="Observação"
            />
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              label="Sair"
              @click="dialogAddObs.open = false"
              no-caps
              flat
              color="primary"
            />
            <q-btn
              label="Salvar"
              no-caps
              @click="insertPetObs"
              unelevated
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogDeleteClient.open">
        <q-card
          class="app-font bg-white q-pa-md"
          style="border-radius: 1rem; min-width: 25rem"
        >
          <div class="text-h6 q-pl-md">
            Tem certeza que deseja apagar?
          </div>
          <q-card-actions align="center">
            <q-btn
              label="Cancelar"
              @click="dialogDeleteClient.open = false"
              no-caps
              flat
              color="primary"
            />
            <q-btn
              label="Apagar"
              no-caps
              @click="deleteClient()"
              unelevated
              color="red"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-page-container>
</template>
<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import useFetch from 'src/boot/useFetch'
export default defineComponent({
  name: 'clientDetail',
  data() {
    return {
      tab: 'pet',
      dialogDeleteClient: {
        open: false
      },
      dialogAddObs: {
        open: false,
        data: {
          obs: ''
        }
      },
      petValues: {
        banho: '',
        tosa: '',
        busca: '',
        outros: ''
      },
      petObs: [],
      clientData: {
        petData: {
          breed: '',
          date: '',
          gender: '',
          name: '',
          nick: '',
          size: '',
          weight: ''
        },
        clientData: {
          _id: '',
          name: '',
          email: '',
          fone: '',
          rua: '',
          numEndereco: 0,
          bairro: '',
          cidade: '',
          cep: '',
          complemento: '',
          estado: ''
        }
      },
      sizeOptions: [
        'GRANDE',
        'MEDIO',
        'PEQUENO'
      ],
      genderOptions: [
        {label: 'Macho', value: 'M'},
        {label: 'Fêmea', value: 'F'}
      ]
    }
  },
  mounted() {
  //   this.$q.loading.hide()
  },
  beforeMount() {
    if (this.$route.query.clientId) {
      this.getClientDetailById()
      this.getPetObs()
      this.getPetValues()
    }
    
  },
  methods: {
    deleteClient() {
      const opt = {
        route: '/desktop/adm/removeClientById',
        body: {
          petId: this.$route.query.clientId,
          clientId: this.clientData.clientData._id,
        }
      }
      useFetch(opt).then(() => {
        this.dialogDeleteClient.open = false
        this.$q.notify('Dados apagados!')
        this.$router.push('/adm/clientsList')
      })
    },
    saveClientInfo() {
      if (this.$route.query.clientId && this.$route.query.clientId !== '') {
        const opt = {
          route: '/desktop/adm/saveClientInfo',
          body: {
            clientData: this.clientData,
            petValues:  this.petValues,
          }
        }
        useFetch(opt).then(() => {
          this.$q.notify('Dados salvos!')
          this.getClientDetailById()
          this.getPetValues()
        })
      } else {
        const opt = {
          route: '/desktop/adm/createNewClient',
          body: {
            clientData: this.clientData,
            petValues:  this.petValues,
          }
        }
        useFetch(opt).then(() => {
          this.$q.notify('Dados salvos!')
          this.$router.push('/adm/clientsList')
        })
      }
    },
    insertPetObs () {
      const opt = {
        route: '/desktop/adm/createNewPetObs',
        body: {
          petId: this.$route.query.clientId,
          obs: this.dialogAddObs.data.obs
        }
      }
      useFetch(opt).then(() => {
        this.dialogAddObs.open = false
        this.getPetObs()
      })
    },
    getClientDetailById(){
      const opt = {
        route: '/desktop/adm/getClientDetailById',
        body: {
          clientId: this.$route.query.clientId
        }
      }
      this.$q.loading.show()
      useFetch(opt).then(r => {
        this.$q.loading.hide()
        this.clientData = r.data
        if(this.clientData.petData.gender === 'F') {
          this.clientData.petData.gender = 'Fêmea'
        } else if (this.clientData.petData.gender === 'M') { 
          this.clientData.petData.gender = 'Macho'
        } else this.clientData.petData.gender = 'Não informado'
      })
    },
    getPetObs() {
      const opt = {
        route: '/desktop/adm/getPetObsById',
        body: {
          petId: this.$route.query.clientId
        }
      }
      this.$q.loading.show()
      useFetch(opt).then(r => {
        this.$q.loading.hide()
        this.petObs = r.data
        // this.formatObsDate()
      })
    },
    getPetValues() {
      const opt = {
        route: '/desktop/adm/getPetValuesById',
        body: {
          petId: this.$route.query.clientId
        }
      }
      this.$q.loading.show()
      useFetch(opt).then(r => {
        this.$q.loading.hide()
        this.petValues = r.data
      })
    },
    formatObsDate() {
      for (let i = 0; this.petObs.length > i; i++) {
        const data = date.extractDate(this.petObs[i].data, 'YYYY-MM-DD')
        this.petObs[i].data = date.formatDate(data, 'DD/MM/YYYY')
      }
    },
    removeObs(obs) {
      const opt = {
        route: '/desktop/adm/removePetObs',
        body: {
          obsId: obs._id       
        }
      }
      this.$q.loading.show()
      useFetch(opt).then(() => {
        this.$q.loading.hide()
        this.getPetObs()
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


