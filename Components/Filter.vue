<script setup lang="ts">
import { computed, ref } from "vue";
type Props = {
  items: string[];
};
type Emits = {
  selected: [val: string | undefined];
};

const { items } = defineProps<Props>();
const emit = defineEmits<Emits>();

const selected = ref<string>();
const distinctItems = computed(() => {
  return [...new Set(items.flat())];
});

function handleSelect(item: string) {
  if (selected.value === item) {
    selected.value = undefined;
  } else {
    selected.value = item;
  }

  emit("selected", selected.value);
}
</script>

<template>
  <div class="items">
    Filter by tags:
    <span
      v-for="item in distinctItems"
      class="itemPills"
      :class="{ selected: selected === item }"
      :selected="selected === item"
      @click="handleSelect(item)"
    >
      {{ item }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.items {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  .itemPills {
    color: #999;
    font-size: 0.85rem;
    border: 1px #999 solid;
    border-radius: 1rem;
    padding: 3px 6px;
    margin-left: 4px;
    cursor: pointer;

    &:hover {
      color: var(--vp-c-brand-1);
      border-color: var(--vp-c-brand-1);
    }

    &.selected {
      color: var(--vp-c-brand-1);
      background-color: var(--vp-c-brand-soft);
      border-color: var(--vp-c-brand-1);
    }
  }
}
</style>
