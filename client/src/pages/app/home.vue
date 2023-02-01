<template>
    <div class="d-flex flex-column justify-center align-center mb-10">
        <v-avatar :image="avatar" size="80" variant="elevated"></v-avatar>
        <h2>{{$store.state.user.name}}</h2>
        <p class="text-capitalize">{{$store.state.user.role}}</p>
    </div>
    <div class="d-flex flex-column">
        <span><b>Status:</b><v-chip size="small" class="mx-2" variant="flat" color="success">On Duty</v-chip></span>
        <span><b>Total Scanned: </b>10/10</span>
    </div>
    <div class="d-flex flex-column justify-end h-100" style="gap: 10px">
        <v-btn color="primary" @click="$router.push('/app/scanner')">Scan</v-btn>
        <div class="d-flex flex-row" style="gap: 10px">
            <v-btn color="primary-lighten" class="d-flex flex-grow-1">Setting</v-btn>
            <v-btn color="primary-lighten" class="d-flex flex-grow-1" @click="handleLogout">Logout</v-btn>
        </div>
    </div>
</template>

<script>
import avatar from '@/assets/img/avatar.png'

export default {
    data(){
        return {
            avatar: avatar,
        }
    },
    methods:{
        handleLogout(){
            localStorage.removeItem('token');
            this.$router.push('/')
        }
    },
    beforeMount() {
            this.$store.commit('SET_LAYOUT', 'appLayout')
        }
}

</script>