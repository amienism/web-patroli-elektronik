<template>
    
</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return {
                qr_code: this.$route.params.qr_code_path
            }
        },
        methods: {
            async postPatrol(){
                try {
                    const {data: {data: {messages}}} = await axios.post('')
                } catch (error) {
                    
                }
            }
        },
        mounted(){

        }
    }

</script>