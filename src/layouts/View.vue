<template>
    <v-container
        fluid
        class="containerLayout"
    >
        <router-view />
        <v-row justify="center">
            <v-col cols="6" sm="4" md="2" align="center"
                   v-for="order in orders"
                   :key="order.id"
                   :value="order.id"
            >
                <v-card elevation="10">
                    <v-card-title>{{ order.name }}</v-card-title>
                    <v-card-text class="text-left">
                        <p>User: {{ order.user }}</p>
                        <p>Restaurant: {{ order.restaurant }}</p>
                        <p>Delivery: {{ order.delivery }}</p>
                    </v-card-text>
                    <v-card-actions class="flex-wrap">
                        <v-btn
                            v-if="!isRestaurant"
                            text
                            color="primary"
                            block
                            @click="openRoomWithRestaurantByOrder(order.id)"
                            :disabled="!!orderRooms.find(room => room.orderId === order.id && (room.type == 'user_order' ||  room.type == 'delivery_order'))"
                        >
                            Open chat with Restaurant
                        </v-btn>
                        <v-btn
                            v-if="!isUser"
                            text
                            color="primary"
                            block
                            @click="openRoomWithUserByOrder(order.id)"
                            :disabled="!!orderRooms.find(room => room.orderId === order.id && room.type == 'user_order')"
                        >
                            Open chat with User
                        </v-btn>
                        <v-btn
                            v-if="!isDelivery"
                            text
                            color="primary"
                            block
                            @click="openRoomWithDeliveryByOrder(order.id)"
                            :disabled="!!orderRooms.find(room => room.orderId === order.id && (room.type == 'delivery_order' || room.type == 'user_order_delivery'))"
                        >
                            Open chat with Delivery Man
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <Chats />
    </v-container>
</template>

<script>
import Chats from '../components/chat/ChatsManager';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
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
            if(to.params.accountAuth){
                user.token = to.params.accountAuth;
                user.id = parseInt(user.token);
            }
            return next(vm => {
                vm.$store.commit('setUser', user);
            });
        }
        return next({ name: 'Settings' });
    },
    async created(){
        this.$nextTick(() => {
            this.chatConnection = ChatConnection(this.user, this.user.identification);
            this.chatConnection.setNewChatCallback(this.openRoom);
            this.$store.commit('setChatConnection', this.chatConnection);
        });
    },
    computed: {
        ...mapState({
            rooms: state => state.rooms,
            user: state => state.user,
            orderRooms: state => state.orderRooms
        }),
        ...mapGetters({
            orders: 'getOrders'
        }),
        isRestaurant() {
            return this.user.identification === process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT;
        },
        isSupport() {
            return this.user.identification === process.env.VUE_APP_TOKEN_SERVICE_SUPPORT;
        },
        isUser() {
            return this.user.identification === process.env.VUE_APP_TOKEN_SERVICE_USER;
        },
        isDelivery() {
            return this.user.identification === process.env.VUE_APP_TOKEN_SERVICE_DELIVERY;
        }
    },
    methods: {
        ...mapActions({
            newRoom: 'createRoom',
            updateRooms: 'getRooms',
            findRoomWithRestaurantByOrder: 'findRoomWithRestaurantByOrder',
            findRoomWithUserByOrder: 'findRoomWithUserByOrder',
            findRoomWithDeliveryByOrder: 'findRoomWithDeliveryByOrder',
        }),
        ...mapMutations({
            openRoom: 'openRoom'
        }),
        async openRoomWithUserByOrder(orderId) {
            const room = await this.findRoomWithUserByOrder(orderId);
            this.openRoom(room);
        },
        async openRoomWithRestaurantByOrder(orderId) {
            const room = await this.findRoomWithRestaurantByOrder(orderId);
            this.openRoom(room);
        },
        async openRoomWithDeliveryByOrder(orderId) {
            const room = await this.findRoomWithDeliveryByOrder(orderId);
            this.openRoom(room);
        },

    }
};
</script>

<style scoped>
.containerLayout {
    height: 100%;
}

.disabledbutton {
    pointer-events: none;
    opacity: 0.4;
}
</style>