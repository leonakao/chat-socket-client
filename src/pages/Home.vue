<template>
    <v-container
        class="fill-height"
        fluid
    >
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
            chats: ['teste', 4, 2, 3]
        };
    },
    components: {
        Chat
    },
    async created(){
        await this.getRooms();
        ChatConnect();
    },
    computed: {
        ...mapState({
            rooms: state => state.rooms
        })
    },
    methods: {
        ...mapActions({
            getRooms: 'getRooms'
        })
    }
};
</script>