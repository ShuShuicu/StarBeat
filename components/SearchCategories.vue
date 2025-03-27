<script setup>
import { useFetch } from '#app';

const { data: categories, pending, error } = useFetch('/api/categories');
</script>

<template>
    <v-row v-if="!pending && !error">
        <v-col v-for="category in categories" :key="category.mid" cols="12" sm="6" md="3" lg="3">
            <NuxtLink :to="`/topic/${category.slug}`">
                <v-card>
                    <template #title>{{ category.name }}</template>
                    <template #subtitle>{{ category.description }}</template>
                </v-card>
            </NuxtLink>
        </v-col>
    </v-row>
    <v-row v-else-if="pending">
        <v-col cols="12">
            <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">
            <p>Error loading categories: {{ error.message }}</p>
        </v-col>
    </v-row>
</template>