<template>
    <h2>Login</h2>
    <p>Please login to continue.</p>
    <form action="" class="d-flex flex-column mt-10" @submit.prevent="handleLogin">
        <v-text-field v-model="formData.email" type="email" label="Email" density="compact" variant="solo" bg-color="grey-lighten-4">
        </v-text-field>
        <v-text-field v-model="formData.password" type="password" label="Password" density="compact" variant="solo" bg-color="grey-lighten-4">
        </v-text-field>
        <v-btn type="submit" color="primary" :loading="btn_loader">Masuk</v-btn>
    </form>
    <div class="d-flex h-100 align-end justify-center">
        <span>
            Forgot Password? <b @click="$router.push('/auth/forget_password')">Click Here</b>
        </span>
    </div>
    <v-snackbar
      :timeout="2000"
      rounded="pill"
      :color="snackbarVariant"
      v-model="snackbar"
    >
      <p class="text-center">{{snackbar_msg}}</p>
    </v-snackbar>
</template>

<script>

    import axios from 'axios';

    export default {
        data() {
            return {
                snackbar: false,
                snackbar_msg: '',
                snackbarVariant: '',
                btn_loader: false,
                formData: {}
            }
        },
        methods: {
            async handleLogin(){
                this.btn_loader = true;
                try {
                    const {data: {
                        messages, data: {
                            token
                        }
                    }} = await axios.post('/auth/login', this.formData)
                    localStorage.setItem('token', token)
                    this.snackbar_msg = messages;
                    this.snackbarVariant = 'success';
                    this.snackbar = true;
                    this.btn_loader = false;
                    this.$router.push('/app')
                } catch ({response: {data: {messages}}}) {
                    this.snackbarVariant = 'warning';
                    this.snackbar_msg = messages;
                    this.snackbar = true;
                    this.btn_loader = false;
                }
            }
        },
        beforeMount() {
            this.$store.commit('SET_LAYOUT', 'appLayout')
        }
    }
</script>

<style>

</style>