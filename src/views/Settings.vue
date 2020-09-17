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
                                            :items="users"
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
                { name: 'User', page: 'UserView' },
                { name: 'Restaurant', page: 'RestView' },
                { name: 'Delivery', page: 'MotoView' },
                { name: 'Support', page: 'SuptView' },
            ],
            users: [
                { name: 'Account 001', auth: '001' },
                { name: 'Account 002', auth: '002' },
                { name: 'Account 003', auth: '003' },
                { name: 'Account 004', auth: '004' },
                { name: 'Account 005', auth: '005' },
                { name: 'Account 006', auth: '006' },
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