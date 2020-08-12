<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-row
            align="center"
            justify="center"
        >
            <v-col class="shrink">
                <Chat/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chat from '../components/chat/Chat';

export default {
    components: {
        Chat
    }
};
</script>