<template>
    <v-list-item
        class="message"
        :align="message.user ? 'right' : 'left'"
    >
        <v-list-item-icon v-if="!message.user">
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-html="message.text"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon v-if="message.user">
            <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
    </v-list-item>
</template>

<script>
export default {
    props: {
        message: {
            required: true,
            type: Object
        }
    }
};
</script>