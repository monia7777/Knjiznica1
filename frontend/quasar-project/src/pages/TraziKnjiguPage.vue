<template>
  <q-page padding>
    <h4>Traži knjigu</h4>
    <p>Ovdje članovi knjižnice mogu pretraživati knjige i autore</p>

    <q-input
      v-model="searchQuery"
      label="Unesite naziv knjige ili autora"
      debounce="300"
      outlined
    />

    <q-checkbox
      v-model="searchByAuthor"
      label="Pretražuj po autoru"
      :true-value="true"
      :false-value="false"
    />

    <q-checkbox
      v-model="searchByTitle"
      label="Pretražuj po naslovu"
      :true-value="true"
      :false-value="false"
    />


    <div class="q-mt-md" style="display: flex; justify-content: flex-end;">
      <q-btn
        label="Traži"
        color="primary"
        @click="searchBooks"
      />
    </div>

    <q-table
      :rows="filteredBooks"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15]"
      row-key="id"
      class="q-mt-md"
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageName',
  data() {
    return {
      searchQuery: '',
      searchByAuthor: false,
      searchByTitle: false,
      books: [
        { id: 1, title: 'Ponos i predrasude', author: 'Jane Austen' },
        { id: 2, title: '1984', author: 'George Orwell' },
        { id: 3, title: 'Mali princ', author: 'Antoine de Saint-Exupéry' },
      ],
      columns: [
        { name: 'title', label: 'Naslov', align: 'left', field: 'title' },
        { name: 'author', label: 'Autor', align: 'left', field: 'author' },
      ],
      filteredBooks: [],
    };
  },
  methods: {
    searchBooks() {
      if (!this.searchQuery) {
        this.filteredBooks = this.books;
        return;
      }

      const query = this.searchQuery.toLowerCase();

      this.filteredBooks = this.books.filter((book) => {
        const titleMatch = this.searchByTitle && book.title.toLowerCase().includes(query);
        const authorMatch = this.searchByAuthor && book.author.toLowerCase().includes(query);
        return (this.searchByTitle && titleMatch) || (this.searchByAuthor && authorMatch);
      });
    },
  },
  watch: {
    searchQuery: 'searchBooks',
    searchByAuthor: 'searchBooks',
    searchByTitle: 'searchBooks',
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
