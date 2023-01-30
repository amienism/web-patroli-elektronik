<template>
  <v-container fluid style="background-color: #e9efff; min-height: 100vh;" class="d-flex align-center">
    <v-row justify="space-around">
      <v-col cols="10" class="rounded-lg pa-2" lg="4 pa-6" md="4" sm="6" style="background-color: white; min-height: 90vh; position: relative;">
        <div :class="$route.name == 'welcome-page'? 'd-flex flex-column': 'h-25 d-flex flex-column'">
          <Header />
        </div>
        <div :class="$route.name == 'welcome-page'? 'd-flex flex-column h-90': 'h-75 d-flex flex-column'">
          <RouterView />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import Header from '@/components/Header.vue';

export default {
  data() {
    return {

    }
  },
  components: {
    Header
  }
}

</script>

<style scoped>

.h-90 {
  height: 85%;
}

</style>

