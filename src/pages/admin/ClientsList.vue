<template>
    <q-page>
      <q-table
        flat
        class="bg-accent"
        title="Lista de usuários"
        :columns="columnsData"
        :rows="usersList"
        row-key="_id"
        rows-per-page-label="Registros por página"
        no-data-label="Procure por um usuário para visualizar relacionados"
        no-results-label="A pesquisa não retornou nenhum resultado"
        :rows-per-page-options="[10, 20, 30, 50]"
        @row-click="clkOpenUserDetail"
        selection="multiple"
        v-model:selected="selected"
        :selected-rows-label="getSelectedString"
        :filter="filter"
        v-model:pagination="pagination"
        @request="nextPage"
      >
        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Procurar">
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
                {{props.row.status.label}}
              </q-tooltip>
            </q-icon>
          </q-td>
        </template>
      </q-table>
    </q-page>
  </template>
  <script>
  import { defineComponent } from 'vue'
//   import { useTableColumns } from 'stores/tableColumns'
  import { date } from 'quasar'
  const {formatDate} = date
  
  export default defineComponent({
    name: 'UsersList',
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
        columnsData: useTableColumns().users,
        selected: [],
        filter: '',
        usersList: [],
        statusFilter: null,
        pagination: {
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 0,
          sortBy: ''
        }
      }
    },
    mounted() {
      this.$q.loading.hide()
    },
    beforeMount() {
    //   this.getUsersList()
    },
    methods: {
    //   clkFilterByStatus (item) {
    //     if (!this.statusFilter) this.statusFilter = item.status
    //     else if (this.statusFilter === item.status) this.statusFilter = null
    //     else this.statusFilter = item.status
    //     this.findSalesByFilter()
    //   },
    //   getUsersList () {
    //     const opt = {
    //       route: '/auth/getAllUsersFromCompany',
    //       body: {
    //         searchString: this.filter,
    //         page: this.pagination.page,
    //         rowsPerPage: this.pagination.rowsPerPage,
    //         sortBy: this.pagination.sortBy,
    //         descending: this.pagination.descending,
    //       }
    //     }
    //     this.$fetch(opt).then(r => {
    //       this.usersList = r.data
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
    //   clkOpenUserDetail(e, r, i) {
    //     console.log(r, 'aqui user id')
    //     this.$router.push('/admin/userDetail?_userId=' + r.userId)
    //   },
    },
    // watch: {
    //   drawer: function (nV, oV) {
    //     this.drawerData = nV
    //   }
    // }
  })
  </script>
  