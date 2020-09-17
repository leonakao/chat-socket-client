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
            { id: 1, token: '001', identification: process.env.VUE_APP_TOKEN_SERVICE_USER || '', page: 'UserView' },
            { id: 1, token: '001', identification: process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT || '', page: 'RestView' },
            { id: 1, token: '001', identification: process.env.VUE_APP_TOKEN_SERVICE_DELIVERY || '', page: 'MotoView' },
            { id: 1, token: '001', identification: process.env.VUE_APP_TOKEN_SERVICE_SUPPORT || '', page: 'SuptView' },
        ];
        const user = users.find(user => user.page === to.name);
        if(user){
            if(to.params.accountAuth){ user.token = to.params.accountAuth; }
            return next(vm => {
                vm.$store.commit('setUser', user);
            });
        }
        return next({ name: 'Settings' });
    },
    async created(){
        this.$nextTick(() => {
            this.chatConnection = ChatConnection(this.user, this.user.identification);
            this.chatConnection.setNewChatCallback(this.updateRooms);
            this.$store.commit('setChatConnection', this.chatConnection);
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