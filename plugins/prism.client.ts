// plugins/prism.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
    const { default: Prism } = await import('prismjs')
    await import('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js')
    await import('prismjs/themes/prism-okaidia.min.css')
    if (typeof window !== 'undefined') {
        window.Prism = Prism
    }
})
