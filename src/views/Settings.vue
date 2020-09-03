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
                            <div class="d-flex justify-end">
                                <v-btn
                                    class="mt-5"
                                    color="success"
                                    @click="start"
                                >
                                    User this setup
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
import { mapMutations } from 'vuex';

export default {
    data: () => {
        return {
            settings: [
                { id: 1, token: 'user', name: 'Usuário', page: 'UserView' },
                { id: 1, token: 'rest', name: 'Restaurante', page: 'RestView' },
                { id: 1, token: 'moto', name: 'Motoboy', page: 'MotoView' },
                { id: 1, token: 'supt', name: 'Suporte', page: 'SuptView' },
            ],
            currentSetting: {}
        };
    },
    methods: {
        start() {
            if(this.$refs.form.validate()) {
                this.setUser(this.currentSetting);
                this.$router.push({ name: this.currentSetting.page });
            }
        },
        ...mapMutations([
            'setUser'
        ])
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