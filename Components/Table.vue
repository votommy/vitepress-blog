<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

type Props = {
  rawSpreadsheetValues: string;
};

const { rawSpreadsheetValues } = defineProps<Props>();

const tableEl = ref();

function parseTable() {
  const parsedTable = rawSpreadsheetValues
    .trim()
    .split("\n")
    .filter((row) => row.trim() !== "") // remove empty lines
    .map((row) => row.split(/\t| {2,}/)); // splits on tabs or 2+ spaces

  generateHtmlTable(parsedTable);
}
function generateHtmlTable(data: string[][]) {
  const categories = [
    "Investments",
    "Liquid",
    "Assets",
    "Debt",
    "Net Worth",
    "Credit Score",
  ];

  tableEl.value =
    `<table>\n` +
    data
      .map((row, i) => {
        const tag = i === 0 ? "th" : "td";

        // Style the category headers
        let rowClass = "";
        if (categories.includes(row[0])) {
          const currCategory = categories.find((c) => c === row[0]);
          rowClass = `class="${currCategory?.replace(" ", "_")}-row"`;
        }

        return `  <tr ${rowClass}>${row
          .map((cell) => {
            return `<${tag}>${cell}</${tag}>`;
          })
          .join("")}</tr>`;
      })
      .join("\n") +
    `\n</table>`;
}
onBeforeMount(() => {
  parseTable();
});
</script>

<template>
  <div>
    <div v-html="tableEl" id="table-element"></div>
  </div>
</template>

<style lang="scss">
#table-element {
  table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }

  // Disable striped rows
  tr:nth-child(2n) {
    background-color: transparent;
  }
  // Header row
  tr:first-child {
    border-bottom: 2px solid var(--vp-c-brand-1);
  }
  // Header cells
  th {
    min-width: 100px;
    padding: 0 1rem;
  }

  th,
  td {
    border-left-width: 0;
  }

  // First column sticky
  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
    background-color: var(--vp-c-bg);
    z-index: 2;
    min-width: 200px;
    border-left-width: 1px;

    // right-shadow
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -6px;
      width: 6px;
      height: 100%;
      background: linear-gradient(to right, var(--vp-c-divider), transparent);
      pointer-events: none; /* Prevent blocking clicks */
    }
  }
  // Style the categories
  th:first-child {
    background-color: var(--vp-c-bg-soft);
  }
  .Investments-row > td {
    background-color: #c6efcd;
    color: #0b5001;
    font-weight: bold;
  }
  .Liquid-row > td {
    background-color: #ffe98b;
    color: #894401;
    font-weight: bold;
  }
  .Assets-row > td {
    background-color: #fec188;
    color: #b74510;
    font-weight: bold;
  }
  .Debt-row > td {
    background-color: #fdb9c3;
    color: #89000a;
    font-weight: bold;
  }
  .Net_Worth-row > td {
    background-color: #a6b9e1;
    color: #253660;
    font-weight: bold;
  }
  .Credit_Score-row > td {
    background-color: #f1cefe;
    color: #763da4;
    font-weight: bold;
  }

  // Cells
  td {
    padding: 0 1rem;
  }
}
</style>
