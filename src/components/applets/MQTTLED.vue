<script setup>
import { triggerRef, getCurrentInstance, VueElement, onMounted, onUnmounted, ref, reactive, watch } from "vue"
import * as mqtt from "mqtt/dist/mqtt.min";

import * as echarts from "echarts";


let led = reactive({
    isSign: false,
    isOpen: false,
    threshold: 0,
    model: false,
})
let adcData = 0;

// 连接MQTT服务的地址，使用web socket协议，需要在地址上加上mqtt
// const connectUrl = "wss://broker-cn.emqx.io:8084/mqtt";
const connectUrl = "ws://127.0.0.1:8083/mqtt";
const topics = ["led/cpu"];
// 连接设置
const options = {
    clean: true,	// 保留会话
    connectTimeout: 4000,	// 超时时间
    reconnectPeriod: 1000,	// 重连时间间隔
    // 认证信息
    clientId: "cpu2913064141",
    username: 'hehe',
    password: 'hehe',
}

let client = mqtt.connect(connectUrl, options);

function initMQTT() {
    // 成功连接后触发的回调
    client.on('connect', () => {
        console.log('PC端已连接');
        // 发送提示给其他客户端判断
        client.publish('led/mcpu', 'pc_sign');
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

        if (topic == 'led/cpu') {
            if (message == 'led_sign') {
                // 登录信息判断
                led.isSign = true;
            } else if (message == "LEDK") {
                // LED控制信息判断
                led.isOpen = true;
                console.log("led is " + led.isOpen);
            } else if (message == "LEDG") {
                led.isOpen = false;
                console.log("led is " + led.isOpen);
            } else if (message.includes("threshold")) {
                let value = message.match(/\d+\.*\d*/g)[0];
                led.threshold = Number.parseInt(value, 10);
                console.log("当前阈值=" + led.threshold);
            } else if (message.includes("adc")) {
                // LED光敏信息判断
                let value = message.match(/\d+\.*\d*/g)[0];
                addADCData(Number.parseInt(value));
                led.isSign = true;
            }
        }
    });

}


// --------------------------------------------------------------------------------------
let myChart
let data = [];

// 指定图表的配置项和数据
let option = {
    title: {
        text: '光敏传感器'
    },
    tooltip: {
        trigger: 'axis',
        show: 'true',
        formatter: function (params) {
            params = params[0];
            let date = new Date(params.data.time);
            return (
                date.getHours() +
                '时' +
                date.getMinutes() +
                '分' +
                date.getSeconds() +
                '秒:' +
                params.data.value
            );
        },
    },
    dataset: {
        dimensions: ['time', 'value'],
        source: data,
    },
    xAxis: {
        name: '时间',
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        name: '黑暗度',
        min: 0,
        max: 300,
        interval: 15,
        splitLine: {
            show: false
        },
    },
    series: [
        {
            type: 'line',
            showSymbol: false,
            // smooth: true,
            markLine: {
                data: [{
                    name: "Y轴值水平线",
                    yAxis: led.threshold,
                }]
            }

        }
    ],
};

function initChart() {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("myEcharts"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = function () {
        myChart.resize();
    };
}

function addADCData(value) {
    if (data.length > 50) data.shift();
    data.push({ time: new Date(), value: value });
    option.dataset.source = data;
    myChart.setOption(option);
    adcData = value;
}
function setHreshold(value) {
    client.publish("led/mcpu", "threshold=[" + value.toString().padStart(3, "0") + ']', { qos: 2, retain: false });
    console.log("threshold = " + value)
}

// -------------------------------------------------------------------------
onMounted(() => {
    initChart();
    initMQTT();
});

onUnmounted(() => {
    client.end();
    echarts.dispose;
})

watch(() => led.isOpen, (newValue, oldValue) => {
    console.log("LED状态更新")
    client.publish("led/mcpu", newValue ? "LEDK" : "LEDG", { qos: 2, retain: false });
})
watch(() => led.threshold, (newValue, oldValue) => {
    option.series[0].markLine.data[0].yAxis = newValue;
    myChart.setOption(option); // 更新 ECharts 实例的配置项
})
watch(() => led.model, (newValue, oldValue) => {
    let str = led.model ? 1 : 0;
    client.publish("led/mcpu", "model=[" + str + "]", { qos: 2, retain: false });
    console.log("模式转换");
})

</script>

<template>
    <div class="box flex-layout" v-loading="!led.isSign" element-loading-text="等待LED灯连接...">
        <el-button type="success" @click="led.model = !led.model" plain
            style="position: absolute;top: 0;right: 0; z-index: 100;">{{ led.model ? '手动模式' : '自动模式' }}</el-button>

        <div class="box data">
            <div id="myEcharts" @mouseup="demo"></div>
            <el-slider ref="slider" v-model="led.threshold" vertical class="slider" height="50%" max="225"
                @change="setHreshold" />
        </div>
        <div class="box switch">
            <input type="checkbox" id="on-off" v-model="led.isOpen" style="display: none;">
            <div class="bulb"></div>
            <label class="base" for="on-off">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="basecup"></div>
            </label>
        </div>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.data {
    position: absolute;
    visibility: v-bind("led.model ? 'hidden' : 'visible'");
    /* display: none; */
}

.switch {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    visibility: inherit;
    visibility: v-bind("led.model ? 'visible' : 'hidden'");
    /* visibility: visible; */
    /* visibility: hidden; */
}

#myEcharts {
    width: 100%;
    height: 100%;
}

.slider {
    position: relative;
}

.flex-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
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
