<template>
    <v-layout>
        <Sidebar />
            <v-main>
                <v-app-bar-nav-icon variant="text" @click.stop="handleDrawer"></v-app-bar-nav-icon>
                <div class="pa-5">
                        <RouterView />
                </div>
            </v-main>
    </v-layout>
    
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
    data() {
        return {
            
        }
    },
    components: {
        Sidebar
    },
    methods: {
        handleDrawer(){
            this.$store.state.drawer = !this.$store.state.drawer
        }
    },
    
}
</script>

<style scoped>
.v-layout {
    background-color: #e9efff;
}

.v-main {
    min-height: 100vh;
}
</style>