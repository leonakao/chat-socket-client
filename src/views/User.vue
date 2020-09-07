<template>
    <v-row justify="center">
        <v-col cols="12" md="6" align="center">
            <v-form ref="roomForm" @submit.prevent>
                <v-text-field
                    label="Order"
                    ref="orderInput"
                    required
                    v-model="order"
                    @keypress.enter="createRoom"
                    :rules="[v => !!v || 'Order is required']"
                />
                <v-btn
                    color="primary"
                    @click="createRoom"
                >
                    Create new Room
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data: () => {
        return {
            order: ''
        };
    },
    methods: {
        async createRoom() {
            if(this.$refs.roomForm.validate()) {
                await this.newRoom({
                    orderId: this.order
                });
                this.updateRooms();
                this.$refs.roomForm.reset();
            }
            this.$refs.orderInput.blur();
        },
        ...mapActions({
            newRoom: 'createRoom',
            updateRooms: 'getRooms'
        })
    }
};
</script>