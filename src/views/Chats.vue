<template>
    <v-container
        fluid
        class="container-chats"
    >
        <v-row justify="center">
            <v-col cols="12" md="6" align="center">
                <v-form ref="roomForm">
                    <v-text-field
                        label="Order"
                        required
                        v-model="order"
                        :rules="[v => !!v || 'Order is required']"
                    />
                    <v-btn
                        color="primary"
                        @click="createRoom"
                    >
                        Create new Room
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <Chats />
    </v-container>
</template>

<script>
import Chats from '../components/chat/ChatsManager';
import { mapActions, mapState } from 'vuex';

export default {
    data: () => {
        return {
            order: ''
        };
    },
    components: {
        Chats
    },
    async created(){
        if( !this.user.id ){
            return this.$router.push('/settings');
        }
    },
    computed: {
        ...mapState({
            rooms: state => state.rooms,
            user: state => state.user
        })
    },
    methods: {
        createRoom() {
            if(this.$refs.roomForm.validate()) {
                this.newRoom({
                    order: this.order
                });
                this.$refs.roomForm.reset();
            }
        },
        ...mapActions({
            newRoom: 'createRoom'
        })
    }
};
</script>

<style scoped>
.container-chats {
    height: 100%;
}
</style>