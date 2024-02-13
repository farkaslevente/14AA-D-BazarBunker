<template>
  <div class="chat">
    <div class="chat-header">
      <h1>Chat</h1> <!-- a vásárló vagy vevő neve jelenjen meg  TODO-->
    </div>
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" :class="{ 'message-sent': message.sentByMe, 'message-received': !message.sentByMe }">
        <div class="message-content">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input ref="inputField" type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { text: "Hey!", sentByMe: true },
        { text: "Hi there!", sentByMe: false },
        { text: "How are you?", sentByMe: false },
        { text: "I'm good, thanks!", sentByMe: true }
      ],
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ text: this.newMessage, sentByMe: true });
        this.newMessage = '';
        // Focus input field after sending message
        this.$refs.inputField.focus();
        // Here you can implement logic to send the message to the server or recipient
      }
    }
  }
};
</script>

<style scoped>
.chat {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.chat-messages {
  max-height: 400px;
  overflow-y: auto;
}

.message-content {
  padding: 10px;
  border-radius: 8px;
  margin: 5px;
  display: inline-block;
  max-width: 70%;
  border: 2px dashed #ccc;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
}

.message-sent {
  text-align: right;
}

.message-received {
  text-align: left;
}

.chat-input {
  margin-top: 20px;
}

.chat-input input {
  width: calc(100% - 60px);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chat-input button {
  width: 60px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
}

/* Custom message colors */
.message-sent .message-content {
  background-color: #86A7FC;
  color: #fff;
}

.message-received .message-content {
  background-color: #FF9843;
}
</style>
