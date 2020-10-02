<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col class="shrink" cols="12" sm="6" lg="4">
                <v-card>
                    <v-card-title>
                        Account Settings
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            label="Use account:"
                                            :items="currentSetting.users"
                                            item-text="name"
                                            item-value="auth"
                                            v-model="currentAccount"
                                            :rules="[v => !!v || 'Select a account']"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-btn-toggle
                                        mandatory
                                        class="roles"
                                        v-model="currentSetting"
                                    >
                                        <v-btn
                                            v-for="setting in settings"
                                            :key="setting.type"
                                            color="warning"
                                            :value="setting"
                                            :disabled="setting.disabled"
                                        >
                                            {{ setting.name }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-row>
                            </v-container>
                            <div class="d-flex justify-end">
                                <v-btn
                                    class="mt-5"
                                    color="success"
                                    @click="start"
                                >
                                    Use this setup
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => {
        return {
            settings: [
                { name: 'User', page: 'UserView', disabled: false, users: [
                    { name: 'User 17443', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjE3NDQzIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.M9I474ty2-sKx8S-hNAhLiaaVpwX_8c3OkXcr5Icf-U' },
                    { name: 'User 43149', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjQzMTQ5IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.76T54nBiD-HxufyL7IH__P_p47T9t_tWRaArbeYj6yE' },
                    { name: 'User 40003', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjQwMDAzIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.8Ha29Touq-DTPWi0l_qqu_o7-7_aT_NQC908y2xZLTg' },
                ]},
                { name: 'Restaurant', page: 'RestView', disabled: true, users: [
                    { name: 'Restaurant 641', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiNjQxIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.FF6EtT2hZ6HHIhA6_mGgTATmugxbjvA-HSHtv_5SLLQ' },
                    { name: 'Restaurant 154', auth: 'seyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiMTU0IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.YOFNYjepsgTiFhzC5y5Z775HtSfH0_0xV-eTJizGLow' },
                    { name: 'Restaurant 316', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiMzE2IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.EMOSt4B9oLQ8HXRJAgrYq3iDFRmQ0TVFRaQoqUBzND0' },
                ]},
                { name: 'Delivery', page: 'MotoView', disabled: false, users: [
                    { name: 'Delivery 618', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjYxOCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.zq4-x2KMQW5R26rGmL84fVVaNCKT-z3-gRvIOgCe8CI' },
                    { name: 'Delivery 154', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjE1NCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.FT5oP66XePkarnNqg8FMuEGrUmvFYoSlWSwfX-gZVGY' },
                    { name: 'Delivery 344', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjM0NCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.E01EgXK1S-3w5T4ti6EBW66q_h8cEY5ln9EV7Dpi5KM' },
                ]},
                { name: 'Support', page: 'SuptView', disabled: false, users: [
                    { name: 'Support 300', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAwIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.uUNOHfz0cbsEbwqhd2RVktpP1bdISx1Ee9XOUG5amow' },
                    { name: 'Support 301', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAxIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.T3n5HUTCJ6M41xETqhJhlFaOIPCJgYjDmJlcKhpKfqY' },
                    { name: 'Support 302', auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAyIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9._VQxPhJg1UkxqdQKmp4UoBmpg3ZsAwdpc4FJWLejT7U' },
                ]},
            ],
            currentSetting: {},
            currentAccount: 0
        };
    },
    methods: {
        start() {
            if(this.$refs.form.validate()) {
                this.$router.push({ name: this.currentSetting.page, params: { accountAuth: this.currentAccount } });
            }
        },
    }
};
</script>

<style scoped>
.roles {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.roles button {
    font-size: 0.8em;
    border-radius: 5px !important;
}
</style>