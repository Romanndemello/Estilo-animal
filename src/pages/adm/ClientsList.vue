<template>
    <q-page>
      <q-table
        flat
        title="Lista de clientes"
        :columns="columnsData"
        :rows="clientsList"
        row-key="_id"
        rows-per-page-label="Registros por página"
        no-data-label="Procure por um usuário para visualizar relacionados"
        no-results-label="A pesquisa não retornou nenhum resultado"
        :rows-per-page-options="[10, 20, 30, 50]"
        @row-click="clkOpenClientDetail"
        v-model:selected="selected"
        :filter="filterValue"
        v-model:pagination="pagination"
        @request="nextPage"
      >
        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="filterValue" placeholder="Procurar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div v-if="selected.length > 0" class="q-gutter-x-sm q-ml-sm">
            <q-btn
              color="green"
              class=""
              round
              no-caps
              icon="attach_money"
              unelevated
              @click="clkPayExpenses"
            >
              <q-tooltip>
                Pagar despesa
              </q-tooltip>
            </q-btn>
          </div>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-icon v-if="props.row.status" :name="props.row.status.icon" :color="props.row.status.color" size='30px' left>
              <q-tooltip :props="props" :offset="[0,3]">
                <!-- {{props.row.status.label}} -->
              </q-tooltip>
            </q-icon>
          </q-td>
        </template>
      </q-table>
    </q-page>
  </template>

  <script>
  import { defineComponent } from 'vue'
  import { useTableColumns } from 'stores/tableColumns'
  import { date } from 'quasar'
  import useFetch from 'src/boot/useFetch'
  const {formatDate} = date
  export default defineComponent({
    name: 'ClientsList',
    props: {
      drawer: Boolean,
      permissions: Array,
    },
    data() {
      return {
  
        inputValue: '',
        drawerData: true,
        popupFlag: false,
        newFlagInput: '',
        options: [],
        columnsData: useTableColumns().clientsList,
        selected: [],
        filterValue: '',
        clientsList: [],
        statusFilter: null,
        pagination: {
          sortBy: '_id',
          descending: true,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 0,
        }
      }
    },
    mounted() {
      this.$q.loading.hide()
    },
    beforeMount() {
      this.getClientsList()
    },
    methods: {
      clkFilterByStatus (item) {
        if (!this.statusFilter) this.statusFilter = item.status
        else if (this.statusFilter === item.status) this.statusFilter = null
        else this.statusFilter = item.status
        this.findSalesByFilter()
      },
      getClientsList () {
        const opt = {
          route: '/desktop/adm/getListOfClients',
          body: {
            filterValue: this.filterValue,
            page: this.pagination.page,
            rowsPerPage: this.pagination.rowsPerPage,
            sortBy: this.pagination.sortBy,
            descending: this.pagination.descending
          }
        }
        this.$q.loading.show()
        useFetch(opt).then(r => {
          this.$q.loading.hide()
          this.clientsList = r.data.list
          this.formatDate()
          this.pagination.rowsNumber = r.data.count[0].count;
        })
      },
      getSelectedString () {
        return this.selected.length === 0 ? '' : `${this.selected.length}
        despesa${this.selected.length > 1 ? 's' : ''}
        selecionadas de ${this.expensesData.length}`
      },
      nextPage (e) {
        this.pagination.page = e.pagination.page
        this.pagination.sortBy = e.pagination.sortBy
        this.pagination.descending = e.pagination.descending
        this.getClientsList()
        console.log(e.pagination)
      },
      clkOpenClientDetail(e, r, i) {
        this.$router.push('/adm/clientDetail?clientId=' + r._id)
      },
      formatDate () {
        for(let i = 0; this.clientsList.length > i; i++) {
          if(this.clientsList[i].petDate) {
            const data = date.extractDate(this.clientsList[i].petDate, 'YYYY-MM-DD HH:mm:ss')
            this.clientsList[i].petDate = date.formatDate(data, 'DD/MM/YYYY')
            // const dateFinal = date.addToDate(data, {years: 4})
            // this.reportData.orgList.cargos[i].affiliateInfo.dataFinalFormated = date.formatDate(dateFinal, 'DD/MM/YYYY')
          }
        }
      },
    },
    
    watch: {
      drawer: function (nV, oV) {
        this.drawerData = nV
      }
    }
  })
  </script>
  