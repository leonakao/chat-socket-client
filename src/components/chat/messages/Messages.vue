<template>
    <v-list
        nav
        disabled
        class="messages"
    >
        <Message
            v-for="(message, i) in messages"
            :key="i"
            :message="message"
        />
    </v-list>
</template>

<script>
import Message from './Message';
export default {
    components: {
        Message
    },
    props: {
        messages: {
            type: Array,
            required: true,
        }
    }
};
</script>

<style>

.messages {
    width: 100%;
    height: 100%;
}

</style>