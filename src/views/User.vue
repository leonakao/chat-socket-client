<template>
    <v-row justify="center">
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