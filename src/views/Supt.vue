<template>
    <v-container>
        <v-row>
            <v-container fluid>
                <v-row justify="center">
                    <h2>USERS:</h2>
                </v-row>
                <v-row class="users my-6 px-10" justify="center">
                    <div class="user flex-column d-flex" v-for="account in accounts.users" :key="account.id" @click="openUser(account.id)">
                        <v-icon x-large>mdi-account</v-icon>
                        <span class="name">{{ account.name }}</span>
                    </div>
                </v-row>
                <v-row justify="center">
                    <Chat v-if="userRoom" :room="userRoom" :key="userRoom._id" />
                </v-row>
                <v-row justify="center">
                    <h2>RESTAURANTS:</h2>
                </v-row>
                <v-row class="users my-6 px-10" justify="center">
                    <div class="user flex-column d-flex" v-for="account in accounts.restaurants" :key="account.id" @click="openRestaurant(account.id)">
                        <v-icon x-large>mdi-account</v-icon>
                        <span class="name">{{ account.name }}</span>
                    </div>
                </v-row>
                <v-row justify="center">
                    <Chat v-if="restaurantRoom" :room="restaurantRoom" :key="restaurantRoom._id" />
                </v-row>
                <v-row justify="center">
                    <h2>DELIVERY MEN:</h2>
                </v-row>
                <v-row class="users my-6 px-10" justify="center">
                    <div class="user flex-column d-flex" v-for="account in accounts.deliverys" :key="account.id" @click="openDelivery(account.id)">
                        <v-icon x-large>mdi-account</v-icon>
                        <span class="name">{{ account.name }}</span>
                    </div>
                </v-row>
                <v-row justify="center">
                    <Chat v-if="deliveryRoom" :room="deliveryRoom" :key="deliveryRoom._id" />
                </v-row>
            </v-container>
        </v-row>
        <v-row justify="center">
            <h2>ALL CHATS:</h2>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Chat from '../components/chat/Chat';

export default {
    data: () => ({
        userRoom: undefined,
        userId: undefined,
        restaurantRoom: undefined,
        restaurantId: undefined,
        deliveryRoom: undefined,
        deliveryId: undefined,
        accounts: {
            users: [
                { name: 'User 17443', id: '17443' },
                { name: 'User 43149', id: '43149' },
                { name: 'User 40003', id: '40003' },
            ],
            restaurants: [
                { name: 'Restaurant 641', id: '641' },
                { name: 'Restaurant 154', id: '154' },
                { name: 'Restaurant 316', id: '316' },
            ],
            deliverys: [
                { name: 'Delivery 618', id: '618' },
                { name: 'Delivery 154', id: '154' },
                { name: 'Delivery 344', id: '344' },
            ],
        },
    }),
    components: {
        Chat
    },
    methods: {
        async openUser(userId) {
            if(this.userId === userId) {
                this.userId = undefined;
                this.userRoom = undefined;
                return;
            }
            this.userRoom = await this.findRoomByUser(userId);
        },
        async openRestaurant(restaurantId) {
            if(this.restaurantId === restaurantId) {
                this.restaurantId = undefined;
                this.restaurantRoom = undefined;
                return;
            }
            this.restaurantRoom = await this.findRoomByRestaurant(restaurantId);
        },
        async openDelivery(deliveryId) {
            if(this.deliveryId === deliveryId) {
                this.deliveryId = undefined;
                this.deliveryRoom = undefined;
                return;
            }
            this.deliveryRoom = await this.findRoomByDelivery(deliveryId);
        },
        ...mapActions([
            'findRoomByUser',
            'findRoomByRestaurant',
            'findRoomByDelivery',
        ])
    }
};
</script>

<style scoped>
.user {
    border: 1px solid #000;
    padding: 5px;
    height: 90px;
    width: 90px;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin: 0 10px;
}

.user:hover {
    cursor: pointer;
    background-color: #eee;
}
</style>