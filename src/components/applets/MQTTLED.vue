<script setup>
import { VueElement, onMounted, onUnmounted, ref, reactive, watch } from "vue"
import * as mqtt from "mqtt/dist/mqtt.min";

let led = reactive({
    isSign: true,
    isOpen: false,
})

// 连接MQTT服务的地址，使用web socket协议，需要在地址上加上mqtt
const connectUrl = "ws://broker.emqx.io:8083/mqtt";
const topics = ["led/client", "led/controller"];
// 连接设置
const options = {
    clean: true,	// 保留会话
    connectTimeout: 4000,	// 超时时间
    reconnectPeriod: 1000,	// 重连时间间隔
    // 认证信息
    clientId: "mqtt_${Math.random().toString(16).slice(3)}",
    username: 'hehe',
    password: 'hehe',
}

let client = mqtt.connect(connectUrl, options);

// 成功连接后触发的回调
client.on('connect', () => {
    console.log('PC端已连接');
    // 发送提示给其他客户端判断
    client.publish('led/client', 'pc_sign');
    // 订阅主题，这里可以订阅多个主题
    client.subscribe(topics, () => {
        console.log(`订阅了主题:${topics}`);
    })
});

/** 
 * topic：收到的报文的topic 
 * message：收到的数据包的负载playload 
 * packet：MQTT 报文信息，其中包含 QoS、retain 等信息
 */
client.on('message', (topic, payload, qos) => {
    // 这里有可能拿到的数据格式是Uint8Array格式，用toString转成字符串
    let message = payload.toString();
    if (topic == 'led/client') {
        // 登录主题信息判断
        if (message == 'led_sign') {
            led.isSign = true;
            console.log("LED已连接！");
        }

    }
    else if (topic == 'led/controller') {
        // LED控制主题信息判断
        if (message == "LEDK") {
            led.isOpen = true;
            console.log("led is " + led.isOpen);
        }
        else if (message == "LEDG") {
            led.isOpen = false;
            console.log("led is " + led.isOpen);
        }

    }
});

onUnmounted(() => {
    client.end();
})

watch(() => led.isOpen, (newValue, oldValue) => {
    console.log("LED状态更新")
    client.publish("led/controller", newValue ? "LEDK":"LEDG");
})
</script>

<template>
    <div class="el-container flex-layout" v-loading="!led.isSign" element-loading-text="等待LED灯连接...">

        <input type="checkbox" id="on-off" v-model="led.isOpen" style="display: none;">
        <div class="bulb"></div>
        <label class="base" for="on-off">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="basecup"></div>
        </label>
    </div>
</template>

<style scoped>
.flex-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.bulb {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(#000 50%, #bcbaba);
}


.base {
    width: 86px;
    height: 65px;
    background-color: cadetblue;
    margin-top: -10px;
}

.bar {
    width: 95px;
    height: 7px;
    background-color: #bcbcbc;
    border-radius: 5px;
    transform: translate(-4px, 6px) rotate(-6deg);
}

.bar:nth-child(2) {
    transform: translate(-4px, 23px) rotate(-6deg);
}

.bar:nth-child(3) {
    transform: translate(-4px, 38px) rotate(-6deg);
}

.basecup {
    width: 27px;
    height: 17px;
    background-color: cadetblue;
    border-radius: 0 0 10px 10px;
    margin: 43px auto;
}

#on-off:checked~.bulb {
    background: radial-gradient(#cbc6c6, #fff000);
    filter: drop-shadow(0 0 50px #eede82);
}

#on-off:checked~.bulb polyline {
    stroke: #f2f0e6;
}

#on-off:checked~.bulb #stave {
    background-color: #d0c89f;
}
</style>
