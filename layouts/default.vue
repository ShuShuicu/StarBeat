<script setup>
</script>

<template>
    <AppMenu />
    <div class="StarBeatContent">
        <a-row :gutter="12">
            <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="18" :xxl="18">
                <NuxtPage />
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="6" :xxl="6">
                <a-affix :offset-top="20">
                    <AppSidebar />
                </a-affix>
            </a-col>
        </a-row>
    </div>
</template>