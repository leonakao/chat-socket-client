<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col v-for="chat in chats" :key="chat" class="shrink" cols="12" sm="6" lg="4" xl="3">
                <Chat :id="chat" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chat from '../components/chat/Chat';

export default {
    data: () => {
        return {
            chats: ['teste', 4, 2, 3]
        };
    },
    components: {
        Chat
    }
};
</script>