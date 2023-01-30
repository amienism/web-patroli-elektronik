<template>
    <div class="d-flex justify-center">
        <v-img :src="error_img" height="125"></v-img>
    </div>
    <div class="text-center mb-10">
        <h3 class="text-center">Floor Ground LT-1</h3>
        <small>Scan Failure</small>
    </div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic eum officia.</p>
    <div class="h-100 d-flex align-end">
        <v-btn color="primary" class="flex-grow-1">Home</v-btn>
    </div>
</template>

<script>
import error_img from '@/assets/img/error.png'

export default {
    data(){
        return{
            error_img: error_img
        }
    }
}

</script>