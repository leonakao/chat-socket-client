<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-col v-for="room in rooms" :key="room._id" class="shrink" cols="12" sm="6" lg="4" xl="3">
            <Chat :room="room"/>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Chat from './Chat';

export default {
    async created(){
        this.$nextTick(async () => {
            await this.getRooms();
            if(this.user.identification === process.env.VUE_APP_TOKEN_SERVICE_SUPPORT) {
                this.rooms.push(...this.allRooms);
            }
        });

        this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'openRoom') {
                const notOpenedRooms = state.orderRooms.filter((orderRoom) => !this.rooms.find(room => room._id === orderRoom._id));
                this.rooms.push(...notOpenedRooms);
            }
        });
    },
    data: () => ({
        rooms: [],
        unsubscribe: () => {}
    }),
    components: {
        Chat
    },
    computed: {
        ...mapState({
            allRooms: state => state.rooms,
            user: state => state.user
        })
    },
    methods: {
        ...mapActions({
            getRooms: 'getRooms',
        })
    },
    beforeDestroy(){
        this.unsubscribe();
    }
};
</script>