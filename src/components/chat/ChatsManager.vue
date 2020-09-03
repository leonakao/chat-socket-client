<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-col v-for="room in rooms" :key="room._id" class="shrink" cols="12" sm="6" lg="4" xl="3">
            <Chat :chat="room" />
        </v-col>
    </v-row>
</template>

<script>
import ChatConnect from '../../services/ChatConnection';
import { mapActions, mapState } from 'vuex';

export default {
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
            getRooms: 'getRooms',
        })
    }
};
</script>