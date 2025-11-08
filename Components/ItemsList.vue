<script setup lang="ts">
import { computed, ref } from "vue";

import Filter from "./Filter.vue";

import { useRouter, withBase } from "vitepress";

export type BlogpostObj = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};
type Props = {
  blogposts: BlogpostObj[];
};

const { blogposts } = defineProps<Props>();
const router = useRouter();

const sortDir = ref<"asc" | "desc">("asc");
const filter = ref<string>();

const sortedBlogposts = computed(() => {
  const filteredBlogPosts = filter.value
    ? blogposts.filter((blogposts) =>
        blogposts.tags.includes(filter.value ?? "")
      )
    : blogposts;

  return [...filteredBlogPosts].sort((a, b) => {
    if (sortDir.value === "asc") {
      return a.link.localeCompare(b.link);
    } else {
      return b.link.localeCompare(a.link);
    }
  });
});
/**
 * The file names are always in the form of yyyy-mm-dd.
 * Transform that format into MMM dd, yyyy
 * - example: 1998-06-30 -> Jun 30, 1998
 * @param fileName
 */
function getDateFromFileName(fileName: string) {
  const parts = fileName.split("/");
  const date = parts[parts.length - 1];

  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];

  switch (month) {
    case "01":
      return `Jan ${day}, ${year}`;
    case "02":
      return `Feb ${day}, ${year}`;
    case "03":
      return `Mar ${day}, ${year}`;
    case "04":
      return `Apr ${day}, ${year}`;
    case "05":
      return `May ${day}, ${year}`;
    case "06":
      return `Jun ${day}, ${year}`;
    case "07":
      return `Jul ${day}, ${year}`;
    case "08":
      return `Aug ${day}, ${year}`;
    case "09":
      return `Sep ${day}, ${year}`;
    case "10":
      return `Oct ${day}, ${year}`;
    case "11":
      return `Nov ${day}, ${year}`;
    case "12":
      return `Dec ${day}, ${year}`;
  }
}

function goToLink(path: string) {
  router.go(withBase(path));
}
function toggleSort() {
  sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
}
function handleFilterSelected(event: string | undefined) {
  filter.value = event;
}
</script>

<template>
  <div>
    <div class="toolbar">
      <Filter
        :items="blogposts.map((blogpost) => blogpost.tags).flat()"
        @selected="handleFilterSelected"
      />

      <div style="margin-left: 1rem">
        <label for="sort-btn">Sort:</label>
        <button
          id="sort-btn"
          class="sort-btn"
          :title="sortDir === 'asc' ? 'Oldest to newest' : 'Newest to oldest'"
          @click="toggleSort"
        >
          {{ sortDir === "asc" ? "Oldest to newest" : "Newest to oldest" }}
        </button>
      </div>
    </div>
    <div
      v-for="blogpost in sortedBlogposts"
      class="item-container"
      @click="goToLink(blogpost.link)"
    >
      <div class="item-date">{{ getDateFromFileName(blogpost.link) }}</div>
      <div class="item-content">
        <div class="item-title">{{ blogpost.title }}</div>
        <div class="item-description">{{ blogpost.description }}</div>

        <div class="tags">
          <span v-for="tag in blogpost.tags" class="tagPills">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .sort-btn {
    color: #999;
    font-size: 0.85rem;
    border: 1px #999 solid;
    border-radius: 1rem;
    padding: 3px 6px;
    margin-left: 4px;

    &:hover {
      color: var(--vp-c-brand-1);
      border-color: var(--vp-c-brand-1);
    }
  }
}

.item-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--vp-c-bg-soft);
  border-radius: 1rem;
  border: 1px solid var(--vp-c-bg-soft);
  padding: 2rem 2rem 1rem 2rem;
  margin: 1rem 0;
  cursor: pointer;

  &:hover {
    border-color: var(--vp-c-brand-1);
  }

  .item-date {
    align-self: center;
    width: 25%;
    font-weight: 700;
    font-size: 1.5rem;
  }
  .item-content {
    width: 75%;

    .item-title {
      font-weight: 700;
      font-size: 1.5rem;
    }
    .item-description {
      color: var(--var-c-text-2);
      margin-top: 0.25rem;
    }
    .tags {
      display: flex;
      justify-content: flex-start;
      margin-top: 1rem;

      .tagPills {
        color: #999;
        font-size: 0.85rem;
        border: 1px #999 solid;
        border-radius: 1rem;
        padding: 3px 6px;
        margin-left: 4px;
      }
    }
  }
}
</style>
