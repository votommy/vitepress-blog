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
    { header: "Investments", backgroundColor: "#C6EFCD", fontColor: "#0B5001" },
    { header: "Liquid", backgroundColor: "#FFE98B", fontColor: "#894401" },
    { header: "Assets", backgroundColor: "#FEC188", fontColor: "#B74510" },
    { header: "Debt", backgroundColor: "#FDB9C3", fontColor: "#89000A" },
    { header: "Net Worth", backgroundColor: "#A6B9E1", fontColor: "#253660" },
    {
      header: "Credit Score",
      backgroundColor: "#F1CEFE",
      fontColor: "#763DA4",
    },
  ];

  tableEl.value =
    `<table>\n` +
    data
      .map((row, i) => {
        const tag = i === 0 ? "th" : "td";

        // Style the category headers
        let rowCss = "";
        if (categories.map((category) => category.header).includes(row[0])) {
          const currCategory = categories.find((c) => c.header === row[0]);
          rowCss = `style="background-color: ${currCategory?.backgroundColor}; color: ${currCategory?.fontColor}; font-weight: bold;"`;
        }

        return `  <tr ${rowCss}>${row
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
  // Categories column
  th:first-child {
    min-width: 200px;
  }

  // Cells
  td {
    padding: 0 1rem;
  }
}
</style>
