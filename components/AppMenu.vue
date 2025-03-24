<template>
    <a-flex justify="space-between" align="center"
        style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); padding: 6px 30px 6px 30px;">
        <div>
            <a-space size="small">
                <NuxtLink to="/">
                    <img src="/assets/Kasumi.svg" alt="logo" style="height:50px; margin-right: 20px;">
                </NuxtLink>

                <NuxtLink v-for="item in menuItems" :key="item.link" :to="item.link">
                    <a-button type="text">{{ item.text }}</a-button>
                </NuxtLink>

            </a-space>
        </div>

        <div>
            <a-space size="large">

                <div style="width: clamp(10px, 320px, 800px); margin: 0 10px;">
                    <a-input placeholder="孤独摇滚！">
                        <template #suffix>
                            <a-button type="text">
                                <template #icon>
                                    <SearchOutlined />
                                </template>
                            </a-button>
                        </template>
                    </a-input>
                </div>

                <a-flex vertical justify="space-between" align="center" class="header-hover-element">
                    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="inner-icon" :style="{ fontSize: '22px' }">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10 1C5.02955 1 1 5.02955 1 10C1 14.9705 5.02955 19 10 19C14.9705 19 19 14.9705 19 10C19 5.02955 14.9705 1 10 1ZM10.0006 2.63614C14.0612 2.63614 17.3642 5.93996 17.3642 9.99977C17.3642 14.0604 14.0612 17.3634 10.0006 17.3634C5.93996 17.3634 2.63696 14.0604 2.63696 9.99977C2.63696 5.93996 5.93996 2.63614 10.0006 2.63614Z"
                            fill="currentColor"></path>
                        <path
                            d="M13.1381 8.05573V8.05331H10.7706C10.7859 7.8643 10.7948 7.67286 10.7948 7.47981C10.7948 7.26414 10.7843 7.05008 10.7649 6.83926C10.7658 6.82552 10.7674 6.81179 10.7674 6.79725V6.79483C10.7674 6.35541 10.4111 6 9.97254 6C9.53312 6 9.17771 6.35622 9.17771 6.79483V6.79725C9.17771 6.85137 9.18336 6.90468 9.19386 6.95557L9.18255 6.95719C9.19871 7.12924 9.20759 7.30291 9.20759 7.479C9.20759 7.67286 9.19709 7.8643 9.17771 8.0525H6.74313V8.05573C6.32876 8.08239 6 8.42649 6 8.84814V8.85057C6 9.28998 6.33683 9.64216 6.77544 9.64216C6.80937 9.64216 6.8441 9.64378 6.89903 9.64297L8.7601 9.63893C8.28837 10.7294 7.47011 11.6341 6.44507 12.2149C6.44023 12.2173 6.43619 12.2197 6.43134 12.2229C6.42003 12.2294 6.40953 12.2359 6.39822 12.2423L6.39903 12.2431C6.17528 12.3837 6.02585 12.6325 6.02585 12.916V12.9184C6.02585 13.3578 6.38207 13.7132 6.82068 13.7132C6.99111 13.7132 7.14782 13.6591 7.27706 13.5687C8.7706 12.706 9.9168 11.3094 10.4556 9.64055H13.0105C13.0517 9.64136 13.1131 9.63893 13.1131 9.63893C13.5905 9.62924 13.9039 9.2916 13.9039 8.85299V8.85057C13.9047 8.42003 13.5638 8.07108 13.1381 8.05573Z"
                            fill="currentColor"></path>
                        <path
                            d="M13.7731 12.5388C13.7715 12.5356 13.7691 12.5331 13.7674 12.5307C13.74 12.4814 13.7077 12.4362 13.6713 12.3942C13.1584 11.6672 12.513 11.0412 11.7674 10.5541L11.7666 10.555C11.6366 10.4613 11.4766 10.4055 11.3046 10.4055C10.8652 10.4055 10.5098 10.7617 10.5098 11.2003V11.2028C10.5098 11.5033 10.677 11.765 10.9233 11.8999C11.5615 12.3215 12.0825 12.8045 12.4944 13.4499L12.5372 13.5041C12.6786 13.6333 12.866 13.7133 13.0728 13.7133C13.5122 13.7133 13.8676 13.3571 13.8676 12.9184V12.916C13.8668 12.7795 13.8329 12.6511 13.7731 12.5388Z"
                            fill="currentColor"></path>
                    </svg>
                    <a-typography-text type="secondary">大会员</a-typography-text>
                </a-flex>
            </a-space>
        </div>

    </a-flex>

</template>

<script setup>
import { ref } from 'vue';
const menuItems = ref([
    {
        link: '/',
        text: '首页',
    },
])
</script>

<style scoped>
.menu-game-icon {
    height: 50px;
    margin-left: -5px;
    margin-right: -5px;
    display: block;
}

.inner-icon {
    transition: transform 0.3s ease;
    animation: none;
}

.header-hover-element {
    cursor: pointer;
}

@keyframes moveUpDown {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-2px);
    }

    100% {
        transform: translateY(0);
    }
}

.header-hover-element:hover .inner-icon {
    animation: moveUpDown 0.3s ease forwards;
    animation-play-state: running;
}

.header-hover-element:not(:hover) {
    animation: none;
}
</style>