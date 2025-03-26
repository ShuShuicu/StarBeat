export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const { cid } = query;

    try {
        const response = await $fetch(`/post?cid=${cid}`, {
            baseURL: 'https://api-v2.x-x.work/web/blog',
        });

        if (response.status === 'success') {
            return response.data;
        }
        return null;
    } catch (error) {
        if (error.response?.status === 500) {
            throw createError({ statusCode: 500, message: '500' });
        }
        console.error('Failed to fetch article:', error);
        throw createError({ statusCode: 500, message: 'Failed to fetch article' });
    }
});