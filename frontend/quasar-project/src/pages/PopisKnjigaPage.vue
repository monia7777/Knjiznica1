<template>
  <q-page padding>

    <h4>Popis knjiga</h4>


    <p>Ovdje članovi mogu vidjeti popis knjiga</p>


    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
    >

      <template v-slot="props">
        <q-tr :props="props">
          <q-td :props="props" field="id"></q-td>
          <q-td :props="props" field="naslov"></q-td>
          <q-td :props="props" field="autor"></q-td>
          <q-td :props="props" field="opis"></q-td>
          <q-td :props="props">
            <img :src="props.row.slika" alt="slika knjige" style="width: 50px; height: 75px;">
          </q-td>
          <q-td :props="props" field="stanje"></q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'PopisKnjiga',
  data() {
    return {

      books: [
        { id: 1, naslov: 'Knjiga 1', autor: 'Autor 1', opis: 'Opis knjige 1', slika: 'https://via.placeholder.com/50x75', stanje: 5 },
        { id: 2, naslov: 'Knjiga 2', autor: 'Autor 2', opis: 'Opis knjige 2', slika: 'https://via.placeholder.com/50x75', stanje: 3 },
        { id: 3, naslov: 'Knjiga 3', autor: 'Autor 3', opis: 'Opis knjige 3', slika: 'https://via.placeholder.com/50x75', stanje: 8 },
        { id: 4, naslov: 'Knjiga 4', autor: 'Autor 4', opis: 'Opis knjige 4', slika: 'https://via.placeholder.com/50x75', stanje: 2 },
        { id: 5, naslov: 'Knjiga 5', autor: 'Autor 5', opis: 'Opis knjige 5', slika: 'https://via.placeholder.com/50x75', stanje: 6 },
      ],


      columns: [
        { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'naslov', label: 'Naslov', align: 'left', field: 'naslov', sortable: true },
        { name: 'autor', label: 'Autor', align: 'left', field: 'autor', sortable: true },
        { name: 'opis', label: 'Opis', align: 'left', field: 'opis' },
        { name: 'slika', label: 'Slika', align: 'center', field: 'slika' },
        { name: 'stanje', label: 'Stanje', align: 'right', field: 'stanje', sortable: true },
      ],


      pagination: {
        rowsPerPage: 5,
      },
    };
  },
};
</script>

<style scoped>

h1 {
  color: #007bff;
}

p {
  font-size: 1.2rem;
  color: #555;
}
</style>

