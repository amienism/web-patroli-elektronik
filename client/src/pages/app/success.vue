<template>
    <div class="d-flex justify-center">
        <v-img :src="success_img" height="125"></v-img>
    </div>
    <div class="text-center mb-10">
        <h3 class="text-center">Floor Ground LT-1</h3>
        <small>Succesfully Scanned</small>
    </div>
    <span><b>Security : </b>John Doe</span>
    <span><b>Patrol Date : </b>Monday, 01-01-1970</span>
    <span><b>Patrol Time : </b>23:41</span>
    <div class="h-100 d-flex align-end">
        <v-btn color="primary" class="flex-grow-1">Home</v-btn>
    </div>
</template>

<script>
import success_img from '@/assets/img/success.png'

export default {
    data(){
        return{
            success_img: success_img
        }
    },
    beforeMount() {
            this.$store.commit('SET_LAYOUT', 'appLayout')
        }
}

</script>