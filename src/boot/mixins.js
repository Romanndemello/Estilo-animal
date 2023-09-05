//////////// VARIAVEIS DA APLICACAO //////
const MODE_MASTER_SERVER = 'local'
/////////////////////////////////////////
// NAO ALTERAR //
const MODE_MASTER_ATTACHMENTS_SERVER = MODE_MASTER_SERVER
const MODE_IFRAME = 'homol'
const MODE_AUTH_SERVER = 'local'
const MODE_APP_SERVER = 'local'
const COMPANY_ID = 40
const PROJECT_NAME = 'eanimal_system'
const DEFAULT_SERVER_NAME = 'application'
const SYSTEM_COMPLETE = false

///////////////////////////////////////////

import { Notify, LocalStorage, Loading } from 'quasar'
import { boot } from 'quasar/wrappers'
import  CryptoJS from "crypto-js";
import axios from 'axios'

const fetch = async ({
  project,
  serverName,
  mode,
  method,
  route,
  body,
  destinationroute,
  destinationserver,
  file,
  destinationUrl
}) => {
  // verifica se o body tem 'project'. Se nao tiver coloca o padrao do .env
  // isso é para nao ter que colocar toda hora, somente quando for excecao
  if (!project) project = PROJECT_NAME
  if (!mode) mode = MODE_APP_SERVER
  if (!serverName) serverName = DEFAULT_SERVER_NAME
  if (!method) method = 'POST'
  const newBody = {
    project,
    serverName,
    mode,
    method,
    route,
    body
  }
  const udCr = LocalStorage.getItem('u')
  let token
  if (udCr) {
    const key = LocalStorage.getItem('$k')
    const ud = JSON.parse(CryptoJS.AES.decrypt(udCr, key).toString(CryptoJS.enc.Utf8))
    token = ud.token
  }
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  }
  axios.defaults.headers.common['cid'] = COMPANY_ID
  axios.defaults.headers.common['pid'] = 22

  let routeMasterServer = masterServerRoute()
  let bodyToSend = newBody
  /// ANEXOS ///////////////////////////////////////
  let form
  if (file && file.length > 0) {
    newBody.destinationserver = destinationserver
    newBody.destinationroute = destinationroute
    form = new FormData();
    form.append('body', JSON.stringify(newBody))
    file.forEach(f => {
      form.append('file', f.file, f.name);
    })
    bodyToSend = form
  }
  //////////////////////////////////////////////////

  if (destinationUrl) routeMasterServer = destinationUrl


  let ret
  try {
    ret = await axios.post(routeMasterServer, bodyToSend)
  }
  catch (e) {
    console.log('AQUI ERRO CATCH', e)
    // Loading.hide()
  }

  console.log('retorno fetch ' + route, ret.data)
  // Loading.hide()
  if (ret.data.error && ret.data.errorFetch) Notify.create(ret.data.errorFetch.message)
  else if (ret.data.error) {
    if ( ret.data.errorType === 'tokenNonExistent') {
      Notify.create('Token inexistente')
    }
    else if (ret.data.errorType === 'loginNonExistent') { 
      Notify.create('Login inválido')
    }
    else if (ret.data.errorType === 'inactiveUser') { 
      Notify.create('Usuário inativo')
    }
    else if (ret.data.errorType === 'userNotActiveInCompany') {
      Notify.create('Usuário não pertence a essa companhia')
    }
    else if (ret.data.errorType === 'companyNotActive') { 
      Notify.create('Companhia inativa')
    }
    else if (ret.data.errorType === 'wrongUserPassword') {
      Notify.create('Senha incorreta')
    }
    else if (ret.data.errorType === 'productCompanyNotActive') { 
      Notify.create('Produto inativo')
    }
    else if( route !== '/getKey'){
      // console.log('AQUI CUIDADOOOOOOIASOIDOAISDOISA', ret.data)
      // if (MODE_SPA === 'local') window.location.href = '/#/login'
      // if (MODE_SPA === 'homol') window.location.href = '/Church/front/app/#/login'
      // if (MODE_SPA === 'app') window.location.href = '/#/login'
      // Notify.create(this.errorMessages(ret.data.errorType))
      return
    } else Notify.create('Teste')
    return ret.data
  } else return ret.data
}

const errorMessages = (type) => {
  let ret
  Vue.prototype.$errorMessages.forEach(e => {
    if (e.name === type) ret = e.label
  })
  Notify.create(ret)
  return ret
}
const presentUserInfo = () => {
  const key = LocalStorage.getItem('$k')
  const udCr = LocalStorage.getItem('u')
  if (!udCr || !key) return false
  const ud = JSON.parse(CryptoJS.AES.decrypt(udCr, key).toString(CryptoJS.enc.Utf8))
  return ud
}

const attachmentsAddress = () => {
  return 'https://homolr.b3dev.net/A_master_server/files/projects_omnisystem/'
}

const getUserInfoByToken = () => {
  const opt = {
    serverName: 'authentication',
    mode: MODE_AUTH_SERVER,
    route: '/getUserInfoByToken'
  }
  return this.fetch(opt)
}

const masterServerRoute = () => {
  let ret
  if (MODE_MASTER_SERVER === 'dev') ret = 'http://100.64.92.6:8000'
  else if (MODE_MASTER_SERVER === 'prod') ret = 'https://homolr.b3dev.net/api/'
  else if (MODE_MASTER_SERVER === 'local') ret = 'http://localhost:8000'
  return ret
}
const registerUserDataAndKey = async ({ data, key }) => {
  LocalStorage.set('$k', key)
  const d = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
  LocalStorage.set('u', d)
  return
}
const getPermissions = () => {
  const opt = {
    route: '/util/getPermissions'
  }
  return fetch(opt)
}

const getDrawerOptions = (type) => {
  const obj = {
    adm: [

      {
        label: 'Novo cliente',
        route: '/adm/newClient',
        icon: 'add'
      },
      {
        label: 'Lista de clientes',
        route: '/adm/clientsList',
        icon: 'list'
      },
    ],

    finance: [
      
      {
        label: 'Novo fornecedor',
        route: '/finance/newSupplier',
        icon: 'library_add'
      },
      {
        label: 'Lista de fornecedores',
        route: '/finance/suppliersList',
        icon: 'trolley'
      },
    ],

    reports: [
      {
        label: 'Relatórios',
        route: '/reports/reportsList',
        icon: 'money'
      }
    ],
  }
  return obj[type]
}

const isSystemComplete = () => {return SYSTEM_COMPLETE}

const urlIframeAdmin = () => {
  if (MODE_IFRAME === 'local') return 'http://localhost:8302/#'
  else return 'https://homolr.b3dev.net/Admin/front/#'
}




export default boot(({ app }) => {
  app.config.globalProperties.$fetch = fetch
  app.config.globalProperties.$errorMessages = errorMessages
  app.config.globalProperties.$presentUserInfo = presentUserInfo
  app.config.globalProperties.$attachmentsAddress = attachmentsAddress
  app.config.globalProperties.$getUserInfoByToken = getUserInfoByToken
  app.config.globalProperties.$masterServerRoute = masterServerRoute
  app.config.globalProperties.$registerUserDataAndKey = registerUserDataAndKey
  app.config.globalProperties.$getPermissions = getPermissions
  app.config.globalProperties.$getDrawerOptions = getDrawerOptions
  app.config.globalProperties.$isSystemComplete = isSystemComplete
  app.config.globalProperties.$urlIframeAdmin = urlIframeAdmin
})
