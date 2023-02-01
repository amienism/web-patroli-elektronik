<template>
    <h2 class="mb-4">Dashboard</h2>
    <div class="d-flex flex-row justify-space-between" style="gap:10px">
        <v-card class="d-flex flex-grow-1" elevation="3">
                <div class="d-flex">
                    <v-sheet class="d-flex align-center px-6" color="primary">
                        <v-icon size="large" color="1e1e2c">mdi-police-badge</v-icon>
                    </v-sheet>
                    <div class="d-flex flex-column pa-4">
                        <h3 class="tw-text-lg tw-font-semibold">
                            Security
                        </h3>
                        <span class="tw-text-lg">
                            10 Security
                        </span> 
                    </div>
                </div>
        </v-card>
        <v-card class="d-flex flex-grow-1" elevation="3">
                <div class="d-flex">
                    <v-sheet class="d-flex align-center px-6" color="primary">
                        <v-icon size="large" color="1e1e2c">mdi-police-badge</v-icon>
                    </v-sheet>
                    <div class="d-flex flex-column pa-4">
                        <h3 class="tw-text-lg tw-font-semibold">
                            Security
                        </h3>
                        <span class="tw-text-lg">
                            10 Security
                        </span> 
                    </div>
                </div>
        </v-card>
        <v-card class="d-flex flex-grow-1" elevation="3">
                <div class="d-flex">
                    <v-sheet class="d-flex align-center px-6" color="primary">
                        <v-icon size="large" color="1e1e2c">mdi-police-badge</v-icon>
                    </v-sheet>
                    <div class="d-flex flex-column pa-4">
                        <h3 class="tw-text-lg tw-font-semibold">
                            Security
                        </h3>
                        <span class="tw-text-lg">
                            10 Security
                        </span> 
                    </div>
                </div>
        </v-card>
        <v-card class="d-flex flex-grow-1" elevation="3">
                <div class="d-flex">
                    <v-sheet class="d-flex align-center px-6" color="primary">
                        <v-icon size="large" color="1e1e2c">mdi-police-badge</v-icon>
                    </v-sheet>
                    <div class="d-flex flex-column pa-4">
                        <h3 class="tw-text-lg tw-font-semibold">
                            Security
                        </h3>
                        <span class="tw-text-lg">
                            10 Security
                        </span> 
                    </div>
                </div>
        </v-card>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    },
    beforeMount(){
        this.$store.commit('SET_LAYOUT', 'dashboardLayout')
    }
}
</script>