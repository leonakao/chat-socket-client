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
        <v-row
            align="center"
            justify="center"
        >
            <v-col v-for="room in rooms" :key="room._id" class="shrink" cols="12" sm="6" lg="4" xl="3">
                <Chat :chat="room" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chat from '../components/chat/Chat';
import { mapActions, mapState } from 'vuex';
import ChatConnect from '../services/ChatConnection';

export default {
    data: () => {
        return {
            order: ''
        };
    },
    components: {
        Chat
    },
    async created(){
        if( !this.user.id ){
            return this.$router.push('/settings');
        }
        await this.getRooms();
        ChatConnect(this.user);
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
            getRooms: 'getRooms',
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