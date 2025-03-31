export default defineEventHandler(async (event) => {
    const { public: { baseURL } } = useRuntimeConfig();
    try {
        const response = await $fetch('/categories', {
            baseURL,
        });

        if (response.status === 'success') {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw createError({ statusCode: 500, message: 'Failed to fetch categories' });
    }
});