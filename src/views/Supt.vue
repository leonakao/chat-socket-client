<template>
    <v-container>
        <v-row>
            <v-container fluid>
                <v-row justify="center">
                    <h2>USERS:</h2>
                </v-row>
                <v-row class="users my-6 px-10" justify="center">
                    <div class="user flex-column d-flex" v-for="n of 6" :key="n" @click="openUser(n)">
                        <v-icon x-large>mdi-account</v-icon>
                        <span class="name">User 00{{ n }}</span>
                    </div>
                </v-row>
                <v-row justify="center">
                    <Chat v-if="userRoom" :room="userRoom" :key="userRoom._id" />
                </v-row>
                <v-row justify="center">
                    <h2>RESTAURANTS:</h2>
                </v-row>
                <v-row class="users my-6 px-10" justify="center">
                    <div class="user flex-column d-flex" v-for="n of 6" :key="n" @click="openRestaurant(n)">
                        <v-icon x-large>mdi-account</v-icon>
                        <span class="name">Restaurant 00{{ n }}</span>
                    </div>
                </v-row>
                <v-row justify="center">
                    <Chat v-if="restaurantRoom" :room="restaurantRoom" :key="restaurantRoom._id" />
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
        ...mapActions([
            'findRoomByUser',
            'findRoomByRestaurant',
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