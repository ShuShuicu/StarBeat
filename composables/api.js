// composables/api.js
import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()

  const getPosts = async (number, page) => {
    const response = await fetch(`${config.public.baseURL}/posts?number=${number}&page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return response.json()
  }

  const getArchives = async () => {
    const response = await fetch(`${config.public.baseURL}/archives`)
    if (!response.ok) {
      throw new Error('Failed to fetch archives')
    }
    return response.json()
  }

  const getPost = async (cid) => {
    const response = await fetch(`${config.public.baseURL}/post?cid=${cid}`)
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    return response.json()
  }

  return {
    getPosts,
    getArchives,
    getPost,
  }
}