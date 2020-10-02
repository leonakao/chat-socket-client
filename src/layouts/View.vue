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
            { id: 17443, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjE3NDQzIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.M9I474ty2-sKx8S-hNAhLiaaVpwX_8c3OkXcr5Icf-U', identification: process.env.VUE_APP_TOKEN_SERVICE_USER || '', page: 'UserView' },
            { id: 43149, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjQzMTQ5IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.76T54nBiD-HxufyL7IH__P_p47T9t_tWRaArbeYj6yE', identification: process.env.VUE_APP_TOKEN_SERVICE_USER || '', page: 'UserView' },
            { id: 40003, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lciI6IjQwMDAzIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.8Ha29Touq-DTPWi0l_qqu_o7-7_aT_NQC908y2xZLTg', identification: process.env.VUE_APP_TOKEN_SERVICE_USER || '', page: 'UserView' },
            { id: 641, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiNjQxIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.FF6EtT2hZ6HHIhA6_mGgTATmugxbjvA-HSHtv_5SLLQ', identification: process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT || '', page: 'RestView' },
            { id: 154, token: 'seyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiMTU0IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.YOFNYjepsgTiFhzC5y5Z775HtSfH0_0xV-eTJizGLow', identification: process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT || '', page: 'RestView' },
            { id: 316, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaG9wIjoiMzE2IiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.EMOSt4B9oLQ8HXRJAgrYq3iDFRmQ0TVFRaQoqUBzND0', identification: process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT || '', page: 'RestView' },
            { id: 618, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjYxOCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.zq4-x2KMQW5R26rGmL84fVVaNCKT-z3-gRvIOgCe8CI', identification: process.env.VUE_APP_TOKEN_SERVICE_DELIVERY || '', page: 'MotoView' },
            { id: 154, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjE1NCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.FT5oP66XePkarnNqg8FMuEGrUmvFYoSlWSwfX-gZVGY', identification: process.env.VUE_APP_TOKEN_SERVICE_DELIVERY || '', page: 'MotoView' },
            { id: 344, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZWxpdmVyeSI6IjM0NCIsImdlcmFkbyI6IjIwMjAtMDktMjQgMDM6MDY6MzgifQ.E01EgXK1S-3w5T4ti6EBW66q_h8cEY5ln9EV7Dpi5KM', identification: process.env.VUE_APP_TOKEN_SERVICE_DELIVERY || '', page: 'MotoView' },
            { id: 300, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAwIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.uUNOHfz0cbsEbwqhd2RVktpP1bdISx1Ee9XOUG5amow', identification: process.env.VUE_APP_TOKEN_SERVICE_SUPPORT || '', page: 'SuptView' },
            { id: 301, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAxIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9.T3n5HUTCJ6M41xETqhJhlFaOIPCJgYjDmJlcKhpKfqY', identification: process.env.VUE_APP_TOKEN_SERVICE_SUPPORT || '', page: 'SuptView' },
            { id: 302, token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdXBwb3J0IjoiMzAyIiwiZ2VyYWRvIjoiMjAyMC0wOS0yNCAwMzowNjozOCJ9._VQxPhJg1UkxqdQKmp4UoBmpg3ZsAwdpc4FJWLejT7U', identification: process.env.VUE_APP_TOKEN_SERVICE_SUPPORT || '', page: 'SuptView' },
        ];
        const user = users.find(user => user.page === to.name);
        if(user){
            if(to.params.accountAuth){
                user.token = to.params.accountAuth;
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