<template>
    <v-row justify="center">
        <v-col cols="12" md="6" align="center">
            <v-form ref="roomForm">
                <v-text-field
                    label="Order"
                    required
                    v-model="order"
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
        createRoom() {
            if(this.$refs.roomForm.validate()) {
                this.newRoom({
                    orderId: this.order
                });
                this.$refs.roomForm.reset();
                this.updateRooms();
            }
        },
        ...mapActions({
            newRoom: 'createRoom',
            updateRooms: 'getRooms'
        })
    }
};
</script>