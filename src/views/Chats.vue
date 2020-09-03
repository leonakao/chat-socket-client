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
        ...mapActions({
            getRooms: 'getRooms'
        })
    }
};
</script>