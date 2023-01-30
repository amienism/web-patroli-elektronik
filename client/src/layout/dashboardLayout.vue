<template>
    <!-- <v-layout>
            <Sidebar />
            <v-main>
                <v-app-bar-nav-icon variant="text" @click.stop="handleDrawer"></v-app-bar-nav-icon>
                <div class="pa-5">
                    <template v-if="$store.state.mobile && $store.state.drawer">
                    </template>
                    <template v-else>
                        <RouterView />
                    </template>
                </div>
            </v-main>
    </v-layout> -->
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    
}
</script>

<style scoped>
.v-layout {
    background-color: #DE7189;
}

.v-main {
    min-height: 100vh;
}
</style>