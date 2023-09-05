<template>
    <q-page-container class="no-padding ">
      <q-page v-if="opportunityDetailData">
        <div class="row q-pa-md q-ml-sm ">
          <div class="col-4 text-h5">
            Nova oportunidade
          </div>
          <div class="col" align="end">
            <div class="row justify-end items-center">
              <q-btn
                v-if="['inImages','inBudget','waitingPayment'].includes(opportunityDetailData.status.status)"
                label="Alterar valor consulta"
                flat
                no-caps
                @click="dialogAnswerOpportunity.open = true"
              >
                <q-icon class="q-ml-sm" name="import_export" color="cyan-8"/>
              </q-btn>
              <q-btn
                label="Falar com o cliente"
                flat
                no-caps
                @click="clkTalkToCustomer"
              >
                <q-icon class="q-ml-sm" name="chat" color="green-8"/>
              </q-btn>
              <div>
                Status:
                <q-badge class="text-subtitle2" rounded>
                  {{ opportunityDetailData.status.label }}
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
          <q-tab name="userData" label="Dados do usuário" />
          <q-tab name="selectedProcedures" label="Procedimentos selecionados" />
          <q-tab name="images" label="Imagens" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          class="q-my-md bg-accent"
        >
          <q-tab-panel name="userData" class="q-pa-none ">
            <div class="row justify-center ">
              <div class="col-10 q-gutter-md">
                <q-input
                  readonly
                  outlined
                  label="Nome do cliente"
                  v-model="opportunityDetailData.userInformations.name"
                />
                <q-input
                  readonly
                  outlined
                  label="E-mail"
                  v-model="opportunityDetailData.userInformations.email"
                />
                <q-input
                  readonly
                  outlined
                  label="Telefone"
                  v-model="opportunityDetailData.userInformations.mobile"
                />
                <q-input
                  readonly
                  outlined
                  label="Data de nascimento"
                  v-model="opportunityDetailData.userInformations.birthdate"
                />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-10 q-mr-md q-pt-md">
                <q-btn
                  no-caps
                  icon="add"
                  flat
                  label="Adicionar observação interna"
                  color="primary"
                  @click="addBar = !addBar"
                />
              </div>
            </div>
            <q-expansion-item
              hide-expand-icon
              header-style="display: none"
              v-model="addBar"
            >
              <q-item-section class="q-my-md ">
                <div class="row justify-center">
                  <div class="col-10 q-px-sm">
                    <q-input
                      class=" full-width"
                      label="Escreva aqui sua observação"
                      outlined
                      autogrow
                      :disable="disableObsInput"
                      v-model="newHistoryObs"
                    />
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="col-10 q-pl-md">
                    <q-btn
                      unelevated
                      icon="send"
                      no-caps
                      color="primary"
                      label="Inserir"
                      class=" q-mt-lg"
                      @click="newHistoryObservation"
                    />
                  </div>
                </div>
              </q-item-section>
            </q-expansion-item>
            <div class="row justify-center">
              <div class="col-10">
                <div class="row">
                  <div class="text-subtitle1 q-pa-md">Histórico</div>
                </div>
                <q-list
                  v-if="opportunityDetailData.opportunityDetailData &&
                  opportunityDetailData.opportunityData.internalObservations.length > 0"
                  separator
                  style="border-radius: 1rem;"
                  class="bg-brand"
                >
                  <q-item
                    v-for="item in opportunityDetailData.opportunityData.internalObservations"
                    :key="item._id"
                  >
                    <q-item-section >
                        <q-item-label
                          caption
                        >Por: {{ item.createdBy.name }}
                        </q-item-label>
                        <q-item-label>{{ item.observation }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="item.createdAt.createdAtOnlyDate">
                      <q-item-label
                        caption
                      >{{ item.createdAt.createdAtOnlyDate }}
                      </q-item-label>
                      <q-item-label
                        caption
                      >{{ item.createdAt.createdAtLocale.split(' ')[1] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div v-else>
                  <div
                    class="text-center q-mt-md"
                  >
                    <q-icon
                      size="36px"
                      color="negative"
                      name="report_gmailerrorred"
                    ></q-icon>
                    Esta oportunidade ainda não possui observações.
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="selectedProcedures" class="q-pa-none ">
            <q-list
              separator
  
              class="bg-accent q-pa-sm"
            >
              <div v-for="item in opportunityDetailData.opportunityData.procedures" :key="item">
                <q-separator spaced  />
                <q-item
                  @click="clkOpenSchedule(item)"
                  clickable
                >
                  <q-item-section >
                    <q-item-label class="text-bold">
                      Código
                    </q-item-label>
                    <q-item-label>
                      {{ item.procedureData.code }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section >
                    <q-item-label class="text-bold">
                      Parte do corpo
                    </q-item-label>
                    <q-item-label>
                      {{ item.bodyPart }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section >
                    <q-item-label class="text-bold">
                      Procedimento
                    </q-item-label>
                    <q-item-label>
                      {{ item.procedureData.label }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section align="start">
                    <q-item-label class="text-bold">
                      Data do procedimento
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                    <span style="font-size: 13px;">
                      {{
                        item.procedureDate ?
                        item.procedureDate.universalDate.substring(0,16) + 'h':
                        'Não agendado'
                      }}
                    </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section align="middle">
                    <q-item-label class="text-bold">
                      Preço
                    </q-item-label>
                    <q-item-label
                    > R$: {{ item.procedureData.price }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section align="middle" >
                    <q-item-label class="text-bold">
                      Status atual
                    </q-item-label>
                    <q-item-label
                      v-if="item.status && item.status.status"
                      lines="2"
                    > <q-badge multi-line :color="item.status.status === 'waitingProcedure' ? 'positive' : 'grey-6'">
                      {{ item.status.label }}
                    </q-badge>
                    </q-item-label>
                    <q-item-label
                      style="overflow-wrap: normal; "
                      v-else-if="opportunityDetailData.status && opportunityDetailData.status.status"
                    > <q-badge  :color="opportunityDetailData.status.status === 'waitingProcedure' ? 'positive' : 'grey-6'">
                        {{ opportunityDetailData.status.label }}
                      </q-badge>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
            <q-separator/>
  
  
          </q-tab-panel>
          <q-tab-panel name="images" class="q-pa-none">
            <div
              class="row"
              v-if="opportunityDetailData.opportunityData &&
              opportunityDetailData.opportunityData.imageData.length > 0"
            >
              <div
                v-for="item in opportunityDetailData.opportunityData.imageData"
                :key="item"
                class="col-5"
              >
              <q-card
                class="bg-grey-3 cardStyle"
              >
                <q-img
                class="imgStyle"
                  :src="`${$attachmentsAddress()}${item.image.filename}`"
                />
                <q-card-section>
                  <div
                    class="text-h5 q-mt-xs q-mb-xs"
                  >{{ item.procedureData.procedureData.label }}</div>
                  <div class="text-caption text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </q-card-section>
              </q-card>
              </div>
            </div>
            <div v-else>
              <div
                class="text-center q-mt-md"
              >
                <q-icon
                  size="36px"
                  color="negative"
                  name="report_gmailerrorred"
                ></q-icon>
                Esta oportunidade ainda não possui images.
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-dialog v-model="dialogAnswerOpportunity.open">
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
        </q-dialog>
        <q-dialog v-model="dialogOpenSchedule.open">
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
        </q-dialog>
      </q-page>
    </q-page-container>
  </template>
  <script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'OpportunityDetail',
    data() {
      return {
        tab: 'userData',
        filter: '',
        status: '',
        budgetData: {
          value: '',
          observation: '',
        },
        newHistoryObs: '',
        historyData: [],
        procedureDate: {
          date: '',
          hour: '',
        },
        dialogAnswerOpportunity: {
          data: {},
          open: false,
        },
        dialogOpenSchedule: {
          open: false,
        },
        opportunityDetailData: null,
        disableObsInput: false,
        addBar: false,
      }
    },
    mounted() {
    //   this.$q.loading.hide()
    },
    beforeMount() {
    //   this.getOpportunityDetailById()
    },
    methods: {
    //   clkOpenSchedule(item){
    //     console.log(item)
    //     // if(!item.status){
    //       this.dialogOpenSchedule.open = true
    //       this.dialogOpenSchedule.data = item
    //     // } else if (item.status){
    //       // this.$q.notify('Oportunidade não disponível para agendamento')
    //     // }
    //   },
    //   clkTalkToCustomer(){
    //     const userId = this.opportunityDetailData.createdBy.userId
    //     this.$router.push('/messenger/chatList?userId=' + userId)
    //   },
    //   insertScheduleProcedures(){
    //     if(this.procedureDate.date === '' || this.procedureDate.hour === ''){
    //       this.$q.notify('Necessário preencher data e horário')
    //       return
    //     }
    //     const opt = {
    //       route: '/desktop/opportunities/scheduleProcedures',
    //       body: {
    //         opportunityId: this.$route.query._id,
    //         procedureId: this.dialogOpenSchedule.data.procedureId,
    //         procedureDate: this.procedureDate
    //       }
    //     }
    //     this.$fetch(opt).then(r => {
    //       this.dialogOpenSchedule.data = ''
    //       this.dialogOpenSchedule.open = false
    //       this.getOpportunityDetailById()
    //       this.$q.notify('Data e horário definidos com sucesso!' )
    //     })
    //   },
    //   insertOpportunityBudget(){
    //     const opt = {
    //       route: '/desktop/opportunities/editBudgetValueByOpportunityId',
    //       body: {
    //         opportunityId: this.$route.query._id,
    //         budgetValue: this.budgetData.value,
    //         budgetObservation: this.budgetData.observation,
    //       }
    //     }
    //     this.$fetch(opt).then(r => {
    //       this.$q.notify('Respondido com sucesso!')
    //     })
    //   },
    //   newHistoryObservation(){
    //     console.log('poksdpo')
    //     const opt = {
    //       route: '/desktop/opportunities/newInternalObservation',
    //       body: {
    //         opportunityId: this.$route.query._id,
    //         observation: this.newHistoryObs
    //       }
    //     }
    //     this.$fetch(opt).then(r => {
    //       this.$q.notify('Observação inserida com sucesso!')
    //       this.getOpportunityDetailById()
    //       this.opportunityDetailData.internalObservations = r.data
    //     })
    //   },
    //   getSelectedString () {
    //     return this.selected.length === 0 ? '' : `${this.selected.length}
    //     despesa${this.selected.length > 1 ? 's' : ''}
    //     selecionadas de ${this.expensesData.length}`
    //   },
    //   nextPage (e) {
    //     this.pagination.page = e.pagination.page
    //     this.pagination.sortBy = e.pagination.sortBy
    //     this.pagination.descending = e.pagination.descending
    //     this.findSalesByFilter()
    //     console.log(e.pagination)
    //   },
    //   clkOpenOpportunityDetail(e, r, i) {
    //     console.log(r, 'aqui user id')
    //     this.$router.push('/crm/opportunityDetail?_id=' + r._id)
    //   },
    //   getOpportunityDetailById(){
    //     const opt = {
    //       route: '/desktop/opportunities/getOpportunityDetailById',
    //       body: {
    //         opportunityId: this.$route.query._id
    //       }
    //     }
    //     this.$q.loading.show()
    //     this.$fetch(opt).then(r => {
    //       this.$q.loading.hide()
    //       this.opportunityDetailData = r.data
    //       // if(r.data.opportunityData.internalObservations &&
    //       //   r.data.opportunityData.internalObservations.length > 0){
    //         // this.userInformations = r.data.userInformations
    //       //   this.historyData = r.data.opportunityData.internalObservations
    //       // }
    //       // this.status = r.data.status.label
    //       // this.opportunityData = r.data.opportunityData
    //     })
    //   }
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
  
  
  