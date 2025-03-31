<script setup>
const name = '鼠子'
const description = '分享经验，无限进步！'
const avatar = 'https://q1.qlogo.cn/g?b=qq&nk=1778273540&s=640'
</script>

<template>
    <a-card>
        <a-card-meta :title="name" :description="description">
            <template #avatar>
                <a-avatar :src="avatar" :size="52" />
            </template>
        </a-card-meta>
    </a-card>
</template>
