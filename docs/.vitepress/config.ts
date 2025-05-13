import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My UI Library',
  description: 'A Vue 3 Component Library',
  themeConfig: {
    sidebar: [
      { text: '介绍', link: '/' },
      { text: '按钮 Button', link: '/button' }
    ]
  }
})