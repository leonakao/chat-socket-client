<template>
    <v-list-item
        class="message"
        :align="isMine ? 'right' : 'left'"
    >
        <v-list-item-icon v-if="!isMine">
            <v-icon v-text="userIcon" />
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="message.content"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon v-if="isMine">
            <v-icon v-text="userIcon" />
        </v-list-item-icon>
    </v-list-item>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        message: {
            required: true,
            type: Object
        }
    },
    computed: {
        isMine() {
            return this.user.identification == this.message.from.reference.type && this.user.id == this.message.from.reference.id;
        },
        userIcon() {
            return this.message.viewed && this.isMine ? 'mdi-account-check' : 'mdi-account';
        },
        ...mapState({
            user: state => state.user
        })
    }
};
</script>