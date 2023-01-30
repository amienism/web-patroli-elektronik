<template>
    <div class="d-flex flex-row justify-center" style="gap:1rem">
        <div style="width: 75px">
            <v-img :src="logo"></v-img>
        </div>
        <div class="d-flex flex-column justify-center">
            <span class="text-h5"><b>PATROL-E</b></span>
            <span class="text-body">Patroli Elektronik</span>
        </div>
    </div>
    <hr>
</template>

<script>
import logo from '@/assets/img/logo.png'

export default {
    data(){
        return {
            logo: logo,
        }
    }
}
</script>