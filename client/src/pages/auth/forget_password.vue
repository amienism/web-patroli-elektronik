<template>
    <h2>Forget Password</h2>
    <p>Please provide your email to continue.</p>
    <form action="" class="d-flex flex-column mt-10 h-100">
        <v-text-field type="email" label="Email" density="compact" variant="solo" bg-color="grey-lighten-4"></v-text-field>
        <div class="d-flex align-end h-100">
            <v-btn color="primary" class="d-flex flex-grow-1">Submit</v-btn>
        </div>
    </form>
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