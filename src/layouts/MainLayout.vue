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
              EAnimal
            </q-toolbar-title>
            <div class="q-mr-md">
              <q-btn
              icon="home"
              dense
              flat
              @click="$router.push('/home')"
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
        <!-- <q-drawer

          side="right"
          v-model="drawerRight"
          show-if-above
          :mini="!drawer"
          bordered
          class="bg-grey-4"
        >
          <q-list>
            <q-item
              :active="activeRightDrawer === item.permissionId"
              active-class="bg-blue-grey-2 text-primary"
              class="q-py-md"
              @click="clkItem(item)"
              v-for="item in permissions"
              :key="item.permissionId"
              clickable v-ripple>
              <q-item-section avatar>
                <q-icon v-if="activeRightDrawer === item.permissionId" size="2rem"
                  :name="item.icon"
                  color="primary"
                  >
                  <q-tooltip>
                    {{ item.title }}
                  </q-tooltip>
                </q-icon>
                <q-icon v-else size="2rem"
                  :name="item.icon"
                  color="grey-8"
                  >
                  <q-tooltip>
                    {{ item.title }}
                  </q-tooltip>
                </q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </q-drawer> -->
        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          :width="300"
          class="bg-grey-3"
        >
          <div class="fit row  justify-start">

            <div class="col-3 bg-secondary text-white text-center">
              <q-list class="bg-grey-3">
                <q-item
                  :active="activeRightDrawer === item.permissionId"
                  active-class="bg-grey-3 text-secondary borda-redonda"
                  class="q-py-md bg-secondary"
                  :style="(i === indexMenu1 + 1) ? 'border-radius: 0 15px 0 0' : (i === indexMenu1 - 1 ? 'border-radius: 0 0 15px 0' : '')"
                  @click="clkItem(item, i)"
                  v-for="(item, i) in permissions"
                  :key="item.permissionId"
                  clickable v-ripple
                >
                  <q-item-section avatar class="items-center">
                    <q-item-label>
                      <q-icon v-if="activeRightDrawer === item.permissionId" size="2rem"
                        :name="item.icon"
                        color="primary"
                        >
                        <q-tooltip>
                          {{ item.title }}
                        </q-tooltip>
                      </q-icon>
                      <q-icon v-else size="2rem"
                        :name="item.icon"
                        color="bg-grey-3"
                        >
                        <q-tooltip>
                          {{ item.title }}
                        </q-tooltip>
                      </q-icon>
                    </q-item-label>
                    <q-item-label class="text-caption">{{ item.nick }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-list class="bg-grey-3">
                <q-item
                  class="bg-secondary"
                  :style="indexMenu1 === permissions.length - 1 ? 'border-radius: 0 15px 0 0' : ''"
                >
                </q-item>
              </q-list>
            </div>

            <div class="col-9">
              <DrawerLogo/>
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
                  <q-item-section avatar class="items-left">
                    <q-icon
                      v-if="active === item.label"
                      :name="item.icon"
                      color="secondary"

                    />
                    <q-icon
                      v-else
                      :name="item.icon"
                      color="secondary"
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
          <q-scroll-area :style="'height: ' + heightRouterView + 'px; border-radius: 15px;'">
            <router-view
              class="bg-white"
            />
          </q-scroll-area>
        </q-page-container>
      </div>
    </div>

  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import DrawerLogo from '../components/DrawerLogo.vue'
import { date, dom } from 'quasar'
const { height, width } = dom

export default defineComponent({
  name: 'MainLayout',
  components: {
    DrawerLogo
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
      permissions: [],
      leftDrawerOpen: true,
      active: '',
      activeRightDrawer: null,
      options: [],
      dateNow: Date.now(),
      dateDay: date.formatDate( Date.now(), 'DD/MM/YYYY'),
      dateTime: date.formatDate( Date.now(), 'HH:mm'),
      heightRouterView: 0,
      cidade: ''
    }
  },
  mounted() {
    this.$q.loading.hide()
    this.heightRouterView = height(document.getElementById('idMainLayout')) - height(document.getElementById('idMainToolbar'))
  },
  beforeMount() {
    this.userInfo = this.$presentUserInfo()
    if (!this.userInfo || !this.userInfo.token) {
      this.$router.push('/login')
      return
    }
    this.$getPermissions().then(r => {
      this.permissions = r.data
      this.options = this.$getDrawerOptions(this.$route.path.split('/')[1].toLowerCase())
      this.activeRightDrawer = this.permissions[0].permissionId

      this.permissions.forEach(element => {
        if (this.$route.path.split('/')[1] === element.role.toLowerCase()) {
          this.activeRightDrawer = element.permissionId
          this.indexMenu1 = this.permissions.indexOf(element)
        }
      })
      this.options.forEach(element => {
          if (this.$route.fullPath === element.route) {
            this.active = element.label
          }
        })
    })
    this.drawerData = this.drawer
  },
  watch: {
    $route (to, from){
      // let existe = false
      // this.options.forEach(element => {
      //   if (this.$route.path === element.route) {
      //     this.active = element.label
      //   }
      // })
      if (this.$route.query._id || this.$route.path === '/home') {
        this.active = false

      }
    }
  },
  methods: {
    clkOptionMenu (item) {
      this.$router.push(item.route)
      this.active = item.label
    },
    clkDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    clkItem (item, i) {
      this.indexMenu1 = i
      this.activeRightDrawer = item.permissionId
      this.$router.push(item.role.toLowerCase() !== 'adm' ? ('/' + item.role.toLowerCase() ) :( '/' + item.role.toLowerCase()))
      this.options = this.$getDrawerOptions(item.role.toLowerCase())
      this.active = this.options[1].label
    },
    clkMenu (menuItem, i) {
      this.activeMenu = i
      this.$router.push(menuItem.route)
    },
    
    // toggleLeftDrawer () {
    //   this.leftDrawerOpen = !this.leftDrawerOpen
    // }
  }

})
</script>
<style>
  .borda-redonda {
    border-radius: 0 15px 15px  0;
  }
  .redondo {
    border-radius: 50px;
  }
</style>