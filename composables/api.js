import { useRuntimeConfig } from '#imports';

// 获取文章详情
export const fetchArticle = async (cid) => {
    const config = useRuntimeConfig();
    try {
        const response = await $fetch(`/post?cid=${cid}`, {
            baseURL: config.public.baseURL,
        });
        if (response.status === 'success') {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch article:', error);
        throw new Error('Failed to fetch article');
    }
};

// 获取文章列表
export const fetchPosts = async (page = 1, pageSize = 10) => {
    const config = useRuntimeConfig();
    try {
        const response = await $fetch('/posts', {
            baseURL: config.public.baseURL,
            params: {
                page,
                pageSize,
                showDigest: 'excerpt',
                limit: 150,
            },
        });
        if (response.status === 'success') {
            return response.data.dataSet.map((post) => ({
                ...post,
                digest: post.digest.replace(/<[^>]+>/g, '').substring(0, 150), // 移除 HTML 标签并截取前 150 字符
                formattedDate: `${post.date.year}-${post.date.month}-${post.date.day}`, // 格式化日期
            }));
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        throw new Error('Failed to fetch posts');
    }
};