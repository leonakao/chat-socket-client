<template>
    <v-list-item
        class="message"
        :align="isMine ? 'right' : 'left'"
    >
        <v-list-item-icon v-if="!isMine">
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="message.content"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon v-if="isMine">
            <v-icon>mdi-account</v-icon>
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
            return this.user.token == this.message.from.reference.type && this.user.id == this.message.from.reference.id;
        },
        ...mapState({
            user: state => state.user
        })
    }
};
</script>