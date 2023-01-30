<template>
    <h2>Login</h2>
    <p>Please login to continue.</p>
    <form action="">
        <div class="d-flex flex-column mt-10">
            <v-text-field type="email" label="Email" density="compact" variant="solo" bg-color="grey-lighten-4"></v-text-field>
            <v-text-field type="password" label="Password" density="compact" variant="solo" bg-color="grey-lighten-4">
            </v-text-field>
            <v-btn type="submit" color="primary" @click="$router.push('/app')">Masuk</v-btn>
        </div>
    </form>
    <div class="d-flex h-100 align-end justify-center">
        <span>
            Forgot Password? <b @click="$router.push('/auth/forget_password')">Click Here</b>
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        beforeMount() {
            this.$store.commit('SET_LAYOUT', 'appLayout')
        }
    }
</script>

<style>

</style>