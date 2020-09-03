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

export default {
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
.containerLayout {
    height: 100%;
}
</style>