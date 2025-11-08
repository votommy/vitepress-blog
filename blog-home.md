---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Blogposts"
---

<script setup lang="ts">
import { ref } from 'vue'
import ItemsList from "/Components/ItemsList.vue"

import type { BlogpostObj} from "/Components/ItemsList.vue"

const blogposts = ref<BlogpostObj[]>([
  {
    title: "Earthrise",
    description: "Celebrating Earth Day's 50th Anniversity",
    link: "/blogposts/2020-04-22",
    tags: ["monologue", "science"],
  },
  {
    title: "2020 Annual Net Worth Review",
    description: "First Job Out of College!",
    link: "/blogposts/2020-12-28",
    tags: ["finance"],
  },
  {
    title: "2021 Annual Net Worth Review",
    description: "Bought New Car with DOGECOIN!",
    link: "/blogposts/2021-12-28",
    tags: ["finance"],
  },
  {
    title: "2022 Annual Net Worth Review",
    description: "Moved to Las Vegas!",
    link: "/blogposts/2022-12-28",
    tags: ["finance"],
  },
  {
    title: "I bought my favorite watch!",
    description: "The Over-Engineering of the Grand Seiko Spring Drive",
    link: "/blogposts/2023-04-24",
    tags: ["horology", "engineering", "monologue"],
  },
  {
    title: "2023 Annual Net Worth Review",
    description: "Slow & Steady",
    link: "/blogposts/2023-12-28",
    tags: ["finance"],
  },
  {
    title: "2024 Annual Net Worth Review",
    description: "$100k net worth! 800 credit score!",
    link: "/blogposts/2024-12-28",
    tags: ["finance"],
  },
])
</script>

<ItemsList :blogposts="blogposts" />
