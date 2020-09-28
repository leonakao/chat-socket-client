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
                { name: 'User', page: 'UserView', users: [
                    { name: 'User 17443', auth: '17443' },
                    { name: 'User 43149', auth: '43149' },
                    { name: 'User 40003', auth: '40003' },
                    { name: 'User 43151', auth: '43151' },
                    { name: 'User 35052', auth: '35052' },
                    { name: 'User 30514', auth: '30514' },
                ]},
                { name: 'Restaurant', page: 'RestView', users: [
                    { name: 'Restaurant 641', auth: '641' },
                    { name: 'Restaurant 154', auth: '154' },
                    { name: 'Restaurant 316', auth: '316' },
                    { name: 'Restaurant 375', auth: '375' },
                    { name: 'Restaurant 529', auth: '529' },
                    { name: 'Restaurant 328', auth: '328' },
                ]},
                { name: 'Delivery', page: 'MotoView', users: [
                    { name: 'Delivery 618', auth: '618' },
                    { name: 'Delivery 154', auth: '154' },
                    { name: 'Delivery 344', auth: '344' },
                    { name: 'Delivery 341', auth: '341' },
                    { name: 'Delivery 503', auth: '503' },
                    { name: 'Delivery 305', auth: '305' },
                ]},
                { name: 'Support', page: 'SuptView', users: [
                    { name: 'Support 300', auth: '300' },
                    { name: 'Support 301', auth: '301' },
                    { name: 'Support 302', auth: '302' },
                    { name: 'Support 303', auth: '303' },
                    { name: 'Support 304', auth: '304' },
                    { name: 'Support 305', auth: '305' },
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