<template>
    <v-overlay :model-value="$store.state.loader" persistent class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <component v-bind:is="layout"></component>
</template>

<script>
    import appLayout from './layout/appLayout.vue';
    import dashboardLayout from './layout/dashboardLayout.vue';


    export default {
        computed: {
            layout() {
                return this.$store.getters.layout
            }
        },
        components: {
            'dashboardLayout': dashboardLayout,
            'appLayout': appLayout
            // define as many layouts you want for the application
        }
    }
</script>