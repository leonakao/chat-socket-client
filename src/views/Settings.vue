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
                            <v-text-field
                                label="Id"
                                v-model="user.id"
                                :rules="[v => !!v || 'Id is required']"
                                required
                            />
                            <v-text-field
                                label="Name"
                                v-model="user.name"
                                :rules="[
                                    v => !!v || 'Name is required',
                                    v => (v && v.length > 3) || 'Name must be at least 3 characters'
                                ]"
                                counter
                                required
                            />
                            <v-btn-toggle
                                mandatory
                                class="roles"
                                v-model="user.role"
                            >
                                <v-btn
                                    v-for="role in roles"
                                    :key="role.type"
                                    color="warning"
                                    :value="role"
                                >
                                    {{ role.name }}
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
            roles: [
                { type: 'user', token: 'user', name: 'Usuário' },
                { type: 'rest', token: 'rest', name: 'Restaurante' },
                { type: 'moto', token: 'moto', name: 'Motoboy' },
                { type: 'sup', token: 'sup', name: 'Suporte' },
            ],
            user: {
                name: 'Leonardo',
                id: '',
                role: {}
            },
        };
    },
    created() {
        this.user.id = 321546;
    },
    methods: {
        generateId() {
            return Date.now();
        },
        start() {
            if(this.$refs.form.validate()) {
                this.setUser(this.user);
                this.$router.push({ name: 'Chats' });
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