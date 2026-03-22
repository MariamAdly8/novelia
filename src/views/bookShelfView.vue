<template>
  <main class="bookshelf-page">
    <div class="shelf-header">
      <h1>My <span>Bookshelf</span></h1>
      <p>Your personal collection of favorite reads and future adventures.</p>
    </div>

    <div v-if="savedBooks.length > 0" class="books-grid">
      <BookCard 
        v-for="book in savedBooks" 
        :key="book.id" 
        :book="book" 
        @click="openModal(book)"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <h2>Your shelf is empty!</h2>
      <p>Start exploring and add some awesome books to your collection.</p>
      <router-link to="/" class="explore-btn">Explore Books</router-link>
    </div>

    <BookDetailsModal 
      v-if="selectedBook" 
      :book="selectedBook" 
      @close="closeModal" 
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookCard from '@/components/bookCard.vue'
import BookDetailsModal from '@/components/bookDetailsModal.vue'

const savedBooks = ref([])
const selectedBook = ref(null)

const loadBooks = () => {
  try {
    const shelf = JSON.parse(localStorage.getItem('myBookshelf')) || []
    savedBooks.value = shelf
  } catch (error) {
    console.error('Error reading from localStorage', error)
    savedBooks.value = [] 
  }
}

const openModal = (book) => {
  selectedBook.value = book
}

const closeModal = () => {
  selectedBook.value = null
  loadBooks()
}

onMounted(() => {
  loadBooks()
})
</script>

<style lang="scss" scoped>
.bookshelf-page {
  padding-top: 100px; 
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: clamp(1rem, 5vw, 4rem);
  padding-right: clamp(1rem, 5vw, 4rem);
  padding-bottom: 4rem;
}

.shelf-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--text-primary);
    margin-bottom: 0.5rem;

    span {
      color: var(--primary-color);
    }
  }

  p {
    color: var(--text-secondary);
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 1rem;
  background-color: var(--glass-bg);
  border-radius: 20px;
  border: 1px dashed var(--border-color);

  .empty-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  h2 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .explore-btn {
    background-color: var(--primary-color);
    color: var(--bg-color);
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      filter: brightness(0.9);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    }
  }
}

@media (max-width: 576px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
}
</style>