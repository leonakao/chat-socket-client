<template>
    <v-card class="room">
        <v-container fluid style="padding: 0;">
            <v-row class="room-title" no-gutters>
                {{ room.name || "Name not found" }}
            </v-row>
            <v-divider></v-divider>
            <v-row class="room-messages">
                <v-container id="messages-container" class="messages-container">
                    <Messages :messages="messages" />
                </v-container>
            </v-row>
            <v-divider></v-divider>
            <v-row class="room-input">
                <v-col cols="12">
                    <v-text-field @keyup.enter="inputKeyUp()" v-model="messageInput" placeholder="Type your message..." @focus="focused = true" @blur="focused = false"></v-text-field>
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
            messages: [],
            messageInput: '',
            connected: false,
            messageContainer: undefined,
            focused: false,
        };
    },
    components: {
        Messages
    },
    props: {
        room: {
            type: Object,
            required: true
        }
    },
    async mounted() {
        if(window.chatConnection) {
            const messages = await window.chatConnection.useChat(this.room._id, {
                newMessage: this.addMessage,
                messagesViewed: this.messagesViewed
            });
            this.messages.push(...messages);
            this.connected = true;
        }
        this.messageContainer = this.$el.querySelector('#messages-container');
        this.$nextTick(() => {
            this.scrollToBottom();
            this.emitMessagesViewed();
        });
    },
    methods: {
        inputKeyUp() {
            if(!this.messageInput || this.messageInput === '') {
                return;
            }

            if(window.chatConnection) {
                window.chatConnection.sendMessage(this.room._id, this.messageInput);
                this.messageInput = '';
            } else {
                console.error('Chat not connected');
            }
        },
        addMessage(message) {
            if(!message) { return false; }
            this.messages.push(message);
            if(this.focused){
                this.emitMessagesViewed();
            }
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        messagesViewed() {
            this.messages.forEach((message, index) => {
                if(!message.viewed) {
                    this.messages[index].viewed = true;
                }
            });
        },
        scrollToBottom(){
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        },
        emitMessagesViewed() {
            window.chatConnection.messagesViewed(this.room._id);
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        })
    },
    watch: {
        focused(isFocused) {
            if(isFocused) {
                this.emitMessagesViewed();
            }
        }
    }
};
</script>

<style>

.room {
    min-height: 400px;
    min-width: 400px;
}

.room .row {
    padding: 15px;
}

.room .room-messages {
    height: 400px;
    padding: 0 10px;
}

.room .room-messages .messages-container {
    overflow-y: scroll;
    padding: 0;
    margin: 0;
    height: 100%;
}

.room .room-input {
    padding: 0px 30px;
}

</style>