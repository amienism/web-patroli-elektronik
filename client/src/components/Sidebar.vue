<template>
    <v-card>
        <v-navigation-drawer
          class="bg-primary"
          permanent
          v-model="$store.state.drawer"
        >
        <div class="pa-4">
            <Header />
        </div>
        <v-list color="transparent">
            <v-list-item prepend-icon="mdi-chart-pie" title="Dashboard" href="/admin/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-map-marker" title="Patrol Location" href="/admin/patrols"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="User Management" href="/admin/users"></v-list-item>
          </v-list>
          
          <template v-slot:append>
            <div class="pa-2">
              <hr>
              <v-list color="transparent">
                  <v-list-item prepend-icon="mdi-logout" title="Logout" @click="handleLogout"></v-list-item>
                </v-list>
            </div>
          </template>
        </v-navigation-drawer>
    </v-card>
  </template>

  <script>
  import Header from '@/components/Header.vue'
  
  export default {
    data(){
      return {
      }
    },
    components: {
        Header
    },
    methods: {
        handleLogout() {
            localStorage.removeItem('token');
            this.$router.push('/')
        }
    },
    
  }


</script>