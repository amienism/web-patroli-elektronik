<template>
    <v-dialog v-model="dialog" :max-width="dialog === 'delete'? 400:500">
        <v-card>
            <template v-if="dialog === 'add'">
                <v-card-title>
                    <div class="d-flex flex-row justify-space-between">
                        <span>
                            Add User
                        </span>
                        <v-icon @click="dialog = null">mdi-close</v-icon>
                    </div>
                </v-card-title>
                <v-card-text>
                    <form action="" class="d-flex flex-column mb-4" @submit.prevent="submitAdd">
                        <v-alert :type="alert_color" v-if="alert_color" density="compact" class="my-2">{{alert_msg}}
                        </v-alert>
                        <v-text-field v-model="formData.name" prepend-inner-icon="mdi-map-marker" label="Location Name"
                            variant="solo" density="compact" bg-color="grey-lighten-4"></v-text-field>
                        <v-btn type="submit" color="primary" :loading="btn_loader">Add</v-btn>
                    </form>
                </v-card-text>
            </template>
            <template v-if="dialog === 'update'">
                <v-card-title>
                    <div class="d-flex flex-row justify-space-between">
                        <span>
                            Edit User
                        </span>
                        <v-icon @click="dialog = null">mdi-close</v-icon>
                    </div>
                </v-card-title>
                <v-card-text>
                    <form action="" class="d-flex flex-column mb-4" @submit.prevent="submitUpdate">
                        <v-alert :type="alert_color" v-if="alert_color" density="compact" class="my-2">{{alert_msg}}
                        </v-alert>
                        <v-text-field v-model="formData.name" prepend-inner-icon="mdi-map-marker" label="Location Name"
                            variant="solo" density="compact" bg-color="grey-lighten-4" :loading="input_loader">
                        </v-text-field>
                        <v-select v-model="formData.status" prepend-inner-icon="mdi-list-status" label="Status" :items="[{value: 1, title: 'Active'}, {value: 0, title: 'Inactive'}]" item-value="value" item-title="title" variant="solo" density="compact" bg-color="grey-lighten-4" :loading="input_loader">
                        </v-select>

                        <v-btn type="submit" color="primary" :loading="btn_loader">Edit</v-btn>
                    </form>
                </v-card-text>
            </template>
            <template v-if="dialog === 'delete'">
                <v-card-title class="text-center">
                    Delete location {{ formData.name }} ?
                </v-card-title>
                <v-card-subtitle class="text-center text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, aperiam.
                </v-card-subtitle>
                <v-card-text>
                    <div class="d-flex flex-row" style="gap: 1rem;">
                        <v-btn color="primary-lighten flex-grow-1" @click="dialog=null">NO</v-btn>
                        <v-btn color="primary flex-grow-1" @click="submitDelete" :loading="btn_loader">YES</v-btn>
                    </div>
                </v-card-text>
            </template>
            <template v-if="dialog === 'showqr'">
                <v-card-title class="text-center">
                    QR CODE
                </v-card-title>
                <v-card-text class="d-flex flex-column align-center mb-4" style="gap: 1rem;">
                    <qrcode :value="show_qr" :size="300" level="H" />
                    <v-btn color="primary">Print</v-btn>
                </v-card-text>
            </template>
        </v-card>
    </v-dialog>


    <h2 class="mb-4">Patrol Location Management</h2>
    <div class="d-flex flex-row justify-space-between">
        <div class="w-25">
            <v-text-field density="compact" variant="solo" append-inner-icon="mdi-magnify" placeholder="Search"
                bg-color="secondary-darken-2"></v-text-field>
        </div>
        <v-btn color="primary" @click="handleAdd">Add Location</v-btn>
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
                <th>ID</th>
                <th>Name</th>
                <th>QR Code</th>
                <th>Status</th>
                <th class="text-center">Action</th>
            </tr>
        </thead>
        <tbody class="text-left">
            <template v-for="loc in locations">
                <tr>
                    <td>{{ loc.location_id }}</td>
                    <td>{{ loc.name }}</td>
                    <td>
                        <qrcode :value="loc.qr_code" :size="50" level="H" @click="handleShowQr(loc.qr_code)" />
                    </td>
                    <td>
                        <v-chip color="primary" v-if="loc.status" variant="flat">Active</v-chip>
                        <v-chip color="primary-lighten" variant="flat" v-else>Inactive</v-chip>
                    </td>
                    <td class="text-center">
                        <v-icon @click="handleUpdate(loc.location_id)">mdi-pencil</v-icon>
                        <v-icon @click="handleDelete(loc.location_id)">mdi-delete</v-icon>
                    </td>
                </tr>
            </template>
        </tbody>
    </v-table>
    <div class="d-flex flex-wrap justify-space-between my-2">
        <div class="d-flex align-center">
            <v-select v-model="data_per_page" :items="[3,5,7,10]" density="compact" hide-details="true" class="mr-2"
                variant="solo" @update:modelValue="handleDataPerPage"></v-select>
            <span>Location/page</span>
        </div>
        <v-pagination v-model="page" :length="total_page" total-visible="3" rounded="4" density="compact"
            variant="elevated" @update:modelValue="handlePage"></v-pagination>
    </div>
</template>

<script>
    import qrcode from 'qrcode.vue'
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
                value: "",
                size: 300,
                show_qr: null,

                formData: {},
                locations: []
            }
        },
        components: {
            qrcode
        },
        methods: {
            async getLocations() {
                this.table_loader = true;
                try {
                    const {
                        data
                    } = await axios.get('/locations')
                    this.locations = data.data;
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
                    } = await axios.get('/locations', {
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
                    } = await axios.get('/locations', {
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
            handleAdd() {
                this.alert_color = null;
                this.formData = {};
                this.dialog = 'add';
            },
            handleShowQr(qr_code) {
                this.dialog = 'showqr';
                this.show_qr = qr_code;
            },
            async handleUpdate(location_id) {
                this.dialog = 'update';
                this.formData = {};
                this.alert_color = null;
                this.input_loader = true;
                try {
                    const {
                        data: {
                            data,
                            messages
                        }
                    } = await axios.get('/locations/' + location_id)
                    this.formData = data;
                    this.input_loader = false;
                } catch (error) {
                    this.input_loader = false;
                    console.log(error)
                }
            },
            async handleDelete(location_id) {
                this.dialog = 'delete';
                this.alert_color = null;
                try {
                    const {
                        data: {
                            data,
                            messages
                        }
                    } = await axios.get('/locations/' + location_id)
                    this.formData = data;
                } catch (error) {
                    console.log(error)
                }
            },
            async submitAdd() {
                this.btn_loader = true;
                try {
                    var qr_code = this.formData.name.replace(/ /g, '_')
                    let formData = {
                        name: this.formData.name,
                        qr_code: `http://192.168.0.232:5000/scan/${qr_code}`
                    }
                    const {
                        data: {
                            messages
                        }
                    } = await axios.post('/locations', formData);
                    this.alert_msg = messages;
                    this.alert_color = "success";
                    this.dialog = null;
                    this.formData = {};
                    this.btn_loader = false;
                    this.getLocations();
                } catch ({
                    response: {
                        data: {
                            messages
                        }
                    }
                }) {
                    this.btn_loader = false;
                    this.alert_msg = messages;
                    this.alert_color = "warning";
                }
            },
            async submitUpdate(){
                this.btn_loader = true;
                try {
                    var qr_code = this.formData.name.replace(/ /g, '_')
                    let formData = {
                        name: this.formData.name,
                        qr_code: `http://192.168.0.232:5000/scan/${qr_code}`,
                        status: this.formData.status
                    }
                    const {
                        data: {
                            messages
                        }
                    } = await axios.put('/locations/'+this.formData.location_id, formData);
                    this.alert_msg = messages;
                    this.alert_color = "success";
                    this.dialog = null;
                    this.formData = {};
                    this.btn_loader = false;
                    this.getLocations();
                } catch ({
                    response: {
                        data: {
                            messages
                        }
                    }
                }) {
                    this.btn_loader = false;
                    this.alert_msg = messages;
                    this.alert_color = "warning";
                }
            },
            async submitDelete() {
                this.btn_loader = true;
                this.alert_color = null;
                try {
                    const {
                        data
                    } = await axios.delete(`/locations/${this.formData.location_id}`)
                    this.dialog = null;
                    this.getLocations();
                    this.formData = {};
                    this.btn_loader = false;
                } catch (error) {
                    this.btn_loader = false;
                    console.log(error)
                }
            }
        },
        mounted() {
            this.getLocations();
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