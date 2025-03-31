<script setup>
    import { ref } from 'vue';
</script>

<template>
    <div id="con">

        <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">

                <v-btn v-bind="activatorProps" variant="flat" id="TA-con">
                    <div id="text-con">
                        <i id="linght"></i>
                        <div id="TA">为TA充电</div>
                    </div>
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card prepend-icon="mdi-battery-charging" title="为 鼠子 的创作充电">
                    <v-card-text>
                        <v-img src="/assets/images/WeChatPay.webp"></v-img>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="取消" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

        <div id="tube-con">
            <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 77H234.226L307.006 24H790" stroke="#e5e9ef" stroke-width="20" />
                <path d="M0 140H233.035L329.72 71H1028" stroke="#e5e9ef" stroke-width="20" />
                <path d="M1 255H234.226L307.006 307H790" stroke="#e5e9ef" stroke-width="20" />
                <path d="M0 305H233.035L329.72 375H1028" stroke="#e5e9ef" stroke-width="20" />
                <rect y="186" width="236" height="24" fill="#e5e9ef" />
                <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#e5e9ef" />
                <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
                <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#e5e9ef" />
                <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
            </svg>
            <div id="mask">
                <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 77H234.226L307.006 24H790" stroke="#f25d8e" stroke-width="20" />
                    <path d="M0 140H233.035L329.72 71H1028" stroke="#f25d8e" stroke-width="20" />
                    <path d="M1 255H234.226L307.006 307H790" stroke="#f25d8e" stroke-width="20" />
                    <path d="M0 305H233.035L329.72 375H1028" stroke="#f25d8e" stroke-width="20" />
                    <rect y="186" width="236" height="24" fill="#f25d8e" />
                    <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#f25d8e" />
                    <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
                    <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#f25d8e" />
                    <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
                </svg>
            </div>
            <div id="orange-mask">
                <svg viewBox="0 0 1028 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 77H234.226L307.006 24H790" stroke="#ffd52b" stroke-width="20" />
                    <path d="M0 140H233.035L329.72 71H1028" stroke="#ffd52b" stroke-width="20" />
                    <path d="M1 255H234.226L307.006 307H790" stroke="#ffd52b" stroke-width="20" />
                    <path d="M0 305H233.035L329.72 375H1028" stroke="#ffd52b" stroke-width="20" />
                    <rect y="186" width="236" height="24" fill="#ffd52b" />
                    <ellipse cx="790" cy="25.5" rx="25" ry="25.5" fill="#ffd52b" />
                    <circle r="14" transform="matrix(1 0 0 -1 790 25)" fill="white" />
                    <ellipse cx="790" cy="307.5" rx="25" ry="25.5" fill="#ffd52b" />
                    <circle r="14" transform="matrix(1 0 0 -1 790 308)" fill="white" />
                </svg>
            </div>
            <p id="people">来杯咖啡吧</p>
        </div>
    </div>
</template>

<style scoped>
    /* 设置白色容器 */
    #con {
        width: 100%;
        max-width: 320px;
        height: 85px;
        position: relative;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }

    /* 设置文本内容容器 */
    #TA-con {
        width: 40%;
        height: 50px;
        background-color: #f25d8e;
        box-shadow: 0 4px 4px rgba(255, 112, 159, .3);
        position: relative;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 768px) {
        body #TA-con {
            width: 94px;
            height: 32px;
            right: -6px;
            left: inherit;
        }

        body #tube-con {
            display: none;
        }

        body #text-con {
            width: 84px;
        }

        body #TA {
            line-height: 35px;
        }

        body #linght {
            top: 26%;
            left: 4px;
        }

        body #text-con i {
            font-size: 26px;
            color: #fff;
        }
    }

    /* 设置文本居中容器 */
    #text-con {
        width: 100px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }

    /* 做一个小闪电 */
    #linght {
        width: 0;
        height: 0;
        position: absolute;
        top: 32%;
        left: 10px;
        border-color: transparent;
        border-style: solid;
        border-width: 10px;
        border-top: 10px solid #fff;
        border-radius: 4px;
        transform: rotate(-55deg);
    }

    #linght::after {
        position: absolute;
        top: -13px;
        left: -11px;
        content: "";
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 10px;
        border-top: 10px solid #fff;
        transform: rotate(180deg);
        border-radius: 4px;
    }

    /* 文字 */
    #TA {
        float: right;
        line-height: 50px;
        font-size: 15px;
        color: #fff;
        padding-right: 5px;
    }

    #TA-con:hover {
        background-color: #ff6b9a;
    }

    /* 创建图形容器 */
    #tube-con {
        width: 150px;
        height: 55px;
        position: relative;
    }

    /* 对svg图形设置宽高 */
    svg {
        width: 100%;
        height: 100%;
    }

    /* 创建一个蒙版 宽度为0，当我hover充电框的时候，宽度展开 */
    #mask {
        width: 0px;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.5s;
    }

    /* 对蒙版的sbg单独设置宽高，保证宽度高低有一个固定值而不是百分比 */
    #mask svg {
        width: 150px;
        height: 55px;
    }

    /* 对充电框hover的时候开始动画，将粉色线条铺开 */
    #TA-con:hover+#tube-con>#mask {
        width: 150px;
    }

    /* 对充电框hover的时候开始动画，添加黄色快速移动的动画 */
    #TA-con:hover+#tube-con>#orange-mask {
        animation: move1 0.5s linear 0.2s infinite;
    }

    #TA-con:hover+#tube-con>#orange-mask svg {
        animation: movetwo 0.5s linear 0.2s infinite;
    }

    /* 创建黄色移动的蒙版 */
    #orange-mask {
        width: 18px;
        height: 100%;
        overflow: hidden;
        position: absolute;
        left: -15px;
        top: 0px;
    }

    /* 创建黄色移动的内容 */
    #orange-mask svg {
        position: absolute;
        ;
        top: 0;
        left: 15px;
        width: 150px;
        height: 55px;
    }

    @keyframes move1 {
        0% {
            left: -15px;
        }

        100% {
            left: 140px;
        }
    }

    @keyframes movetwo {
        0% {
            left: 15px;
        }

        100% {
            left: -140px;
        }
    }

    #people {
        position: absolute;
        right: 10px;
        top: 16px;
        font-size: 12px;
        font-family: "雅黑";
        color: #dfdfdf;
    }

    #people>b {
        color: #777;
    }
</style>