export default defineEventHandler(async (event) => {
    const { public: { baseURL } } = useRuntimeConfig();
    const { slug } = getQuery(event); // 获取 slug 参数

    try {
        const response = await $fetch('/categories', {
            baseURL,
            params: { slug }, // 传递 slug 参数
        });

        if (response.status === 'success') {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch category info:', error);
        throw createError({ statusCode: 500, message: 'Failed to fetch category info' });
    }
});