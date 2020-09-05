<template>
    <v-card class="chat">
        <v-container fluid style="padding: 0;">
            <v-row class="chat-title" no-gutters>
                {{ chat.name || "Name not found" }}
            </v-row>
            <v-divider></v-divider>
            <v-row class="chat-messages">
                <v-container id="messages-container" class="messages-container">
                    <Messages :messages="messages" />
                </v-container>
            </v-row>
            <v-divider></v-divider>
            <v-row class="chat-input">
                <v-col cols="12">
                    <v-text-field @keyup.enter="inputKeyUp()" v-model="messageInput" placeholder="Type your message..."></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Messages from './messages/Messages';
import { mapState } from 'vuex';

export default {
    data: () => {
        return {
            messages: [
            ],
            messageInput: ''
        };
    },
    components: {
        Messages
    },
    props: {
        chat: {
            type: Object,
            required: true
        }
    },
    mounted() {
        if(window.chatConnection) {
            window.chatConnection.useChat(this.chat._id, this.addMessage);
        }
    },
    methods: {
        inputKeyUp() {
            if(!this.messageInput || this.messageInput === '') {
                return;
            }

            if(window.chatConnection) {
                window.chatConnection.sendMessage(this.chat._id, this.messageInput);
                this.messageInput = '';
            } else {
                console.error('Chat not connected');
            }
        },
        addMessage(message) {
            if(!message) { return false; }
            this.messages.push(message);
            this.$nextTick(() => {
                const messageContainer = document.getElementById('messages-container');
                messageContainer.scrollTop = messageContainer.scrollHeight;
            });
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        })
    }
};
</script>

<style>

.chat {
    min-height: 400px;
    min-width: 400px;
}

.chat .row {
    padding: 15px;
}

.chat .chat-messages {
    height: 400px;
    padding: 0 10px;
}

.chat .chat-messages .messages-container {
    overflow-y: scroll;
    padding: 0;
    margin: 0;
    height: 100%;
}

.chat .chat-input {
    padding: 0px 30px;
}

</style>