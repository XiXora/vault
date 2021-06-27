<script lang="ts">
  type Column = string | {
    label: string,
    getter?: any,
    style?: string,

    component?: unknown,
    props?: unknown
  }


  export let columns: Column[]
  export let data: string[][]
</script>

<table>
  <tr class='header'>
    {#each columns as column}
      <th>{column.label ?? column}</th>
    {/each}
  </tr>

  {#each data as row}
    <tr>
      {#each columns as column}
        <td style={column.style}>
          {#if column.getter}
            {column.getter(row)}
          {:else if column.component}
            <svelte:component this={column.component} {...column.props(row)} />
          {:else}
            {row[column]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
    width: calc(100% + 16px);
    margin: 8px -8px;
    box-sizing: border-box;
  }
  .header {
    position: sticky;
    top: 0;
    background: var(--gray);
    box-shadow: 0 2px var(--black);
  }
  .header th {
    padding: 8px 0;
  }

  th {
    font-weight: bold;
    position: sticky;
  }

  tr:not(.header) {
    transition: background .3s ease-in-out;
  }

  tr:not(.header):hover {
    background: var(--gray-light);
  }
</style>