<template>
    <h2 class="mb-4">Patrol</h2>
    <div class="d-flex flex-row justify-space-between">
        <div class="w-25">
            <v-text-field density="compact" variant="solo" append-inner-icon="mdi-magnify" placeholder="Search"
                bg-color="secondary-darken-2"></v-text-field>
        </div>
    </div>
    <v-table class="rounded">
        <template v-if="table_loader">
            <tr>
                <td colspan="5">
                    <v-progress-linear indeterminate color="primary"></v-progress-linear>
                </td>
            </tr>
        </template>
        <thead class="text-left font-weight-black">
            <tr>
                <th>#</th>
                <th>Security</th>
                <th>Location</th>
                <th>Scan Date</th>
                <th>Scan Time</th>
                <th class="text-center">Action</th>
            </tr>
        </thead>
        <tbody class="text-left">
            <template v-for="patrol in patrols">
                <tr>
                    <td>{{ patrol.patrol_id }}</td>
                    <td>{{ patrol.user.name }}</td>
                    <td>{{ patrol.patrol_location.name }}</td>
                    <td>{{ dateFormat(patrol.scan_date) }}</td>
                    <td>{{ timeFormat(patrol.scan_date) }}</td>
                    <td class="text-center">
                        <v-icon>mdi-pencil</v-icon>
                        <v-icon>mdi-delete</v-icon>
                    </td>
                </tr>
            </template>
        </tbody>
    </v-table>
    <div class="d-flex flex-wrap justify-space-between my-2">
        <div class="d-flex align-center">
            <v-select v-model="data_per_page" :items="[3,5,7,10]" density="compact" hide-details="true" class="mr-2"
                variant="solo" @update:modelValue="handleDataPerPage"></v-select>
            <span>Patrol/page</span>
        </div>
        <v-pagination v-model="page" :length="total_page" total-visible="3" rounded="4" density="compact"
            variant="elevated" @update:modelValue="handlePage"></v-pagination>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                dialog: null,
                page: 1,
                data_per_page: 5,
                total_page: null,
                alert_color: null,
                alert_msg: '',
                input_loader: false,
                btn_loader: false,
                table_loader: false,

                formData: {},
                patrols: []
            }
        },
        methods: {
            async getPatrols() {
                this.table_loader = true;
                try {
                    const {
                        data
                    } = await axios.get('/patrol')
                    this.patrols = data.data;
                    this.total_page = data.total_page;
                    this.table_loader = false;
                } catch ({response: {data: {data}}}) {
                    this.locations = data;
                    this.table_loader = false;
                }
            },
            async handleDataPerPage(selected) {
                this.data_per_page = selected;
                this.table_loader = true;
                try {
                    const {
                        data
                    } = await axios.get('/patrol', {
                        params: {
                            limit: this.data_per_page
                        }
                    })
                    this.locations = data.data;
                    this.total_page = data.total_page;
                    this.table_loader = false;
                } catch (error) {
                    this.table_loader = false;
                    console.log(error)
                }
            },
            async handlePage(selected) {
                this.page = selected;
                this.table_loader = true;
                try {
                    const {
                        data
                    } = await axios.get('/patrol', {
                        params: {
                            limit: this.data_per_page,
                            page: this.page
                        }
                    })
                    this.locations = data.data;
                    this.total_page = data.total_page;
                    this.table_loader = false;
                } catch (error) {
                    this.table_loader = false;
                    console.log(error)
                }
            },
            
        },
        mounted() {
            this.getPatrols();
        },
        beforeMount() {
            this.$store.commit('SET_LAYOUT', 'dashboardLayout')
        }
    }
</script>

<style>
    .v-table {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1)
    }
</style>