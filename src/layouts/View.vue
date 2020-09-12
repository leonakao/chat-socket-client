<template>
    <v-container
        fluid
        class="containerLayout"
    >
        <router-view />
        <Chats />
    </v-container>
</template>

<script>
import Chats from '../components/chat/ChatsManager';
import { mapActions, mapState } from 'vuex';
import ChatConnection from '../services/ChatConnection';

export default {
    data: () => {
        return {
            chatConnection: undefined,
        };
    },
    components: {
        Chats
    },
    beforeRouteEnter(to, from, next){
        const users = [
            { id: 1, token: process.env.VUE_APP_TOKEN_SERVICE_USER || '', name: 'Usuário', page: 'UserView' },
            { id: 1, token: process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT || '', name: 'Restaurante', page: 'RestView' },
            { id: 1, token: process.env.VUE_APP_TOKEN_SERVICE_DELIVERY || '', name: 'Motoboy', page: 'MotoView' },
            { id: 1, token: process.env.VUE_APP_TOKEN_SERVICE_SUPPORT || '', name: 'Suporte', page: 'SuptView' },
        ];
        const user = users.find(user => user.page === to.name);
        if(user){
            return next(vm => {
                vm.$store.commit('setUser', user);
            });
        }
        return next({ name: 'Settings' });
    },
    async created(){
        this.$nextTick(() => {
            this.chatConnection = ChatConnection(this.user);
            this.chatConnection.setNewChatCallback(this.updateRooms);
        });
    },
    computed: {
        ...mapState({
            rooms: state => state.rooms,
            user: state => state.user
        })
    },
    methods: {
        ...mapActions({
            newRoom: 'createRoom',
            updateRooms: 'getRooms'
        })
    }
};
</script>

<style scoped>
.containerLayout {
    height: 100%;
}
</style>