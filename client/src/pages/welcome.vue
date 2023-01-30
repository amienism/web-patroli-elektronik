<template>
    <div class="d-flex flex-column justify-space-between align-center">
        <div class="w-100">
            <v-img :src="img"></v-img>
        </div>
    </div>
    <p class="text-center">Reporting system for security guards to facilitate attendance, supervision, and
        incident reporting.</p>
    <p class="text-center">More <b>Effective & Eficient!</b></p>
    <div class="d-flex align-end h-100">
        <v-btn color="primary" class="flex-grow-1" @click="$router.push('/auth/login')">Login</v-btn>
    </div>
</template>

<script>
    import landing_page_img from '@/assets/img/landing-page.png';

    export default {
        data() {
            return {
                img: landing_page_img
            }
        }
    }
</script>