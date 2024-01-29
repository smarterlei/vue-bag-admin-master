<template>
    <bag-view>
        <a-typography-title :level="3">socket</a-typography-title>
        <pre>
            <code>
            const {status, data, send, open, close} = useWebSocket('ws://127.0.0.1:7001', {
                heartbeat: {
                    message: 'ping',
                    interval: 3000,
                },
            })
            快节奏  实用说话技巧  
        </code>
        </pre>
        <a-input v-model:value="message"></a-input>
        <p> {{ message }}</p>
        <a-button type="primary" @click="submitform">submit</a-button>
    </bag-view>
</template>
<script setup>
import { useWebSocket } from '@vueuse/core'
import { io } from "socket.io-client"
import { onBeforeMount, ref } from 'vue'
// const { status, data, send, onOpen, close, error } = useWebSocket('ws://192.168.1.144:8001', {
//     heartbeat: {
//         Message: 'ping',
//         interval: 3000,
//     },
// })

// const { open, message, close, error } = new WebSocket('ws://192.168.1.144:8001/ping')
const log = console.log;

const socket = io("http://localhost:4000", {
    // query: {
    //     room: 'demo',
    //     userId: `client_${Math.random()}`,
    // },
    transports: ['websocket']
});
window.socket = socket
const message = ref('123')
const submitform = () => {
    console.log('sub')
    var now = new Date().toLocaleTimeString();
    socket.emit("chat", {
        message: message.value,
        handle: message.value,
        time: now,
    });

}



// socket.on("ping", (data) => {
//     console.log(data, 'ping')
// })
</script>
