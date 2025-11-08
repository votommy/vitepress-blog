import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tommy's Blog",
  description: "Welcome to my corner of the web. This is my digital journal where I post my art, life updates, and whatever’s on my mind.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogposts', link: '/blog-home' }
    ],

    // sidebar: [
    //   {
    //     text: 'Blogposts',
    //     items: [
    //       { text: '2024 Net Worth Review', link: '/blogposts/2024-12-28' },
    //     ]
    //   }
    // ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
