
<template>
  <q-layout class="app-font" view="lHh LpR LFf" id="idMainLayout">
    <div class="">
      <div class="col-11">
        <q-header>
          <q-toolbar class="bg-grey-3 text-primary" id="idMainToolbar">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="clkDrawer"
            />
            <q-toolbar-title class="text-primary">
              Estilo Animal
            </q-toolbar-title>
            <q-input
              dense
              dark
              standout
              v-model="filterValue"
              input-class="text-left"
              class="q-mx-md text-primary"
              color="primary"
              @keyup.enter="makeSearch"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filterValue === ''"
                  name="search"
                  color="primary"
                />
                <q-icon
                  v-else
                  name="clear"
                  class="cursor-pointer"
                  @click="filterValue = '';
                  searchResult = []"
                  color="primary"
                />
              </template>
            </q-input>
            <div class="q-mr-md">
              <q-btn
              icon="home"
              dense
              flat
              @click="$router.push('/')"
              >
                <q-tooltip anchor="bottom left" :offset="[10, 10]">
                  Ir para tela home
                </q-tooltip>
              </q-btn>
            </div>
            <div>
              <q-btn
                icon="logout"
                dense
                flat
                @click="$router.push('/login')"
              >
                <q-tooltip anchor="bottom left" :offset="[10, 10]">
                  Desconectar-se
                </q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>
        </q-header>
        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          :width="300"
          class="bg-grey-3"
        >
          <div class="fit row justify-start">

            <div class="col-3 bg-secondary text-white text-center">
              <q-list class="bg-grey-3">
                <q-item
                  :active="activeRightDrawer === item.id"
                  active-class="bg-grey-3 text-primary borda-redonda"
                  class="q-py-md bg-secondary text-center q-px-none"
                  :style="(i === indexMenu1 + 1) ? 'border-radius: 0 15px 0 0' : (i === indexMenu1 - 1 ? 'border-radius: 0 0 15px 0' : '')"
                  @click="clkItem(item, i)"
                  v-for="(item, i) in permissions"
                  :key="item.id"
                  clickable v-ripple
                >
                  <q-item-section  class="">
                    <q-item-label>
                    <q-icon size="2rem"
                      :name="item.icon"
                      :color="activeRightDrawer === item.id ? 'primary' : 'bg-accent'"
                      >
                      <q-tooltip>
                        {{ item.label }}
                      </q-tooltip>
                    </q-icon>
                    </q-item-label>

                    <q-item-label class="text-caption">{{ item.nick }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-list class="bg-grey-3">
                <q-item
                  class="bg-secondary q-pa-none"
                  :style="indexMenu1 === permissions.length - 1 ? 'border-radius: 0 15px 0 0' : ''"
                >
                </q-item>
              </q-list>
            </div>

            <div class="col-9">
              <!-- <DrawerLogo/> -->
              <q-list class="q-mx-xs q-gutter-y-xs">
                <q-item
                  class="redondo"
                  v-for="item in options"
                  :key="item.route"
                  clickable
                  v-ripple
                  :active="active === item.label"
                  active-class="bg-blue-grey-2 text-primary"
                  @click="clkOptionMenu(item)"
                >
                  <!-- <q-item-section v-if="active === item.label" avatar>
                    <q-icon
                      :name="item.icon"
                      color="primary"
                      />
                  </q-item-section> -->
                  <q-item-section avatar>
                    <q-icon
                      :name="item.icon"
                      color="primary"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-drawer>

        <q-page-container class="bg-grey-3" >
          <q-scroll-area class="bg-accent" :style="'height: ' + heightRouterView + 'px; border-radius: 15px;'">
            <router-view
              :permissions="permissions"
              :drawer="leftDrawerOpen"
              :style="'height: ' + heightRouterView + 'px; border-radius: 15px;'"
              class="bg-accent q-pa-sm"
            />
          </q-scroll-area>
        </q-page-container>
      </div>
    </div>

  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
// import DrawerLogo from '../components/DrawerLogo.vue'
import { date, dom } from 'quasar'
const { height, width } = dom
export default defineComponent({
  name: 'MainLayout',
  components: {
    // DrawerLogo
  },

  data () {
    return {
      indexMenu1: 0,
      statusNotificationsList: [],
      drawer: false,
      drawerRight: true,
      drawerData: true,
      filterValue: '',
      userInfo: '',
      activeMenu: '',
      permissions: [
        {
          id: 1,
          icon: 'pets',
          label: 'Clientes',
          route: '/admin'
        },
        {
          id: 2,
          icon: 'payments',
          label: 'Financeiro',
          route: '/finance'
        },
        {
          id: 3,
          icon:'settings',
          label: 'Configurações',
          route: '/config'
        }
      ],
      leftDrawerOpen: true,
      active: '',
      activeRightDrawer: 1,
      options: [
        {
          route: '/admin/clientsList',
          label: 'Lista de clientes',
          icon: 'list'
        },
        {
          route: '/admin/newClient',
          label: 'Novo cliente',
          icon: 'person_add'
        }
      ],
      dateNow: Date.now(),
      dateDay: date.formatDate( Date.now(), 'DD/MM/YYYY'),
      dateTime: date.formatDate( Date.now(), 'HH:mm'),
      heightRouterView: 0
    }
  },
  mounted() {
  //   this.$q.loading.hide()
  //   this.heightRouterView = height(document.getElementById('idMainLayout')) - height(document.getElementById('idMainToolbar'))
  },
  beforeMount() {
    // this.userInfo = this.$presentUserInfo()

    // if (!this.userInfo || !this.userInfo.token) {
    //   this.$router.push('/login')
    //   return
    // }
    // this.$getPermissions().then(r => {
    //   this.permissions = r.data
    //   this.activeRightDrawer = this.permissions[0].id
    //   if (this.$route.path === '/' || this.$route.path === '/config' || this.$route.path === '/config/home') {
    //     this.options = this.$getDrawerOptions('config')
    //     this.active = this.options[0].label
    //   } else {
    //     this.options = this.$getDrawerOptions(this.$route.path.split('/')[1])
    //   }
    //   console.log( this.$route.path.split('/')[1])
    //   this.permissions.forEach(element => {
    //     if (this.$route.path.split('/')[1] === element.role.toLowerCase()) {
    //       this.activeRightDrawer = element.id
    //       this.indexMenu1 = this.permissions.indexOf(element)
    //     }
    //   })
    //   this.options.forEach(element => {
    //     if (this.$route.fullPath === element.route) {
    //       this.active = element.label
    //     }
    //   })
    // })
    // // this.getStatusNotifications()
    // this.drawerData = this.drawer
    // if (!this.$logoAndColors.get().alreadySet) {
    //   this.getCompanyColors()
    // }
  },
  watch: {
    // $route (to, from){
    //   let existe = false
    //   this.options.forEach(element => {
    //     if (this.$route.path === element.route) {
    //       existe = true
    //     }
    //   })
    //   if (!existe) {
    //     this.active = false
    //   }
    // }
    // drawer: function (nV, oV) {
    //   this.drawerData = nV
    // }
  },
  methods: {
    // async getCompanyColors() {
    //   await this.$logoAndColors.getFromServer(this.userInfo.cId)
    //   return
    // },
    clkOptionMenu (item) {
      this.$router.push(item.route)
      this.active = item.label
    },
    clkDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    clkItem (item, i) {
      this.indexMenu1 = i
      this.activeRightDrawer = item.id
      this.$router.push('/' + item.role.toLowerCase())
      this.options = this.$getDrawerOptions(item.role.toLowerCase())
    },
    clkMenu (menuItem, i) {
      this.activeMenu = i
      this.$router.push(menuItem.route)
    },
    makeSearch () {
      this.$router.push('/expenses/searchResults?filterValue='+ this.filterValue)
    },
    // clkOpenExpenseDetail(notification) {
    //   const opt = {
    //     method: 'POST',
    //     route: '/expenses/updateNotificationStatus',
    //     body: {
    //       id: notification._id
    //     }
    //   }
    //   this.$fetch(opt).then(r => {
    //     this.$router.push('/expenses/expenseDetail?_id=' + notification.expenseId)
    //     this.getStatusNotifications()
    //   })
    // },
  }

})
</script>

<style scoped>
.borda-redonda {
    border-radius: 0 15px 15px  0;
  }
  .redondo {
    border-radius: 50px;
  }
</style>
