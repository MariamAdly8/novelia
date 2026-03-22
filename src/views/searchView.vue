<template>
  <main class="search-page">

    <div class="search-header">
      <h1>Search Results for "<span>{{ currentQuery }}</span>"</h1>

      <div class="search-box">
        <input 
          v-model="localQuery"
          @keyup.enter="handleSearch"
          placeholder="Search for books..."
        />
        <button @click="handleSearch">Search</button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Searching the library...</p>
    </div>

    <div v-else-if="books.length > 0" class="books-section">
      
      <div class="books-grid">
        <BookCard 
          v-for="book in books" 
          :key="book.id" 
          :book="book" 
          @click="openModal(book)"
        />
      </div>

      <div class="pagination">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1" 
          @click="changePage(currentPage - 1)">
          &#8592; Prev
        </button>

        <span class="page-info">
          Page {{ currentPage }}
        </span>

        <button 
          class="page-btn" 
          :disabled="isLastPage" 
          @click="changePage(currentPage + 1)">
          Next &#8594;
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h2>No books found!</h2>
      <p>We couldn't find any books matching "{{ currentQuery }}". Try different keywords.</p>
      <router-link to="/" class="explore-btn">Back to Home</router-link>
    </div>

    <BookDetailsModal 
      v-if="selectedBook" 
      :book="selectedBook" 
      @close="closeModal" 
    />
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBooks } from '@/services/api'
import BookCard from '@/components/bookCard.vue'
import BookDetailsModal from '@/components/bookDetailsModal.vue'

const route = useRoute()
const router = useRouter()

const books = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 10
const currentQuery = ref('')
const localQuery = ref('') 
const selectedBook = ref(null)

// المتغير اللي بيتحكم في زرار النيكست
const isLastPage = ref(false)

const openModal = (book) => {
  selectedBook.value = book
}

const closeModal = () => {
  selectedBook.value = null
}

const fetchSearchResults = async () => {
  if (!currentQuery.value) return

  isLoading.value = true

  const formattedQuery = currentQuery.value.replace(/\s+/g, '+')
  const strictQuery = `intitle:${formattedQuery}`

  const data = await getBooks(strictQuery, currentPage.value, itemsPerPage)

  if (data && !data.error && data.items && data.items.length > 0) {
    books.value = data.items
    // لو عدد الكتب اللي راجع أقل من 10، يبقى دي أكيد آخر صفحة فنقفل النيكست
    isLastPage.value = data.items.length < itemsPerPage
  } else {
    if (currentPage.value > 1) {
      // لو اليوزر داس نيكست وجوجل مبعتش حاجة، نرجعه لورا بصمت ونقفل الزرار
      currentPage.value--
      isLastPage.value = true
    } else {
      // لو بحث جديد ومفيش داتا خالص
      books.value = []
      isLastPage.value = true
    }
  }

  isLoading.value = false
}

const changePage = (newPage) => {
  if (newPage > 0) {
    currentPage.value = newPage
    fetchSearchResults()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSearch = () => {
  if (!localQuery.value.trim()) return

  router.push({
    path: '/search',
    query: { q: localQuery.value }
  })
}

onMounted(() => {
  currentQuery.value = route.query.q || ''
  localQuery.value = currentQuery.value
  fetchSearchResults()
})

watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      currentQuery.value = newQuery
      localQuery.value = newQuery 
      currentPage.value = 1 
      isLastPage.value = false // نفتح زرار النيكست مع كل بحث جديد
      fetchSearchResults()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)
</script>

<style lang="scss" scoped>
.search-page {
  padding-top: 100px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: clamp(1rem, 5vw, 4rem);
  padding-right: clamp(1rem, 5vw, 4rem);
  padding-bottom: 4rem;
}

.search-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 { 
    font-size: clamp(1.8rem, 4vw, 3rem);
    color: var(--text-primary);
    margin-bottom: 0.5rem;

    span {
      color: var(--primary-color);
    }
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h2 {
  color: var(--text-primary);
  font-size: 1.8rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.explore-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-3px);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;

  .page-btn {
    padding: 10px 24px;
    background-color: var(--primary-color);
    color: var(--bg-color);
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: var(--border-color);
      color: var(--text-secondary);
      cursor: not-allowed;
    }
  }

  .page-info {
    font-weight: 600;
    color: var(--text-primary);
  }
}

.search-box {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  input {
    width: 300px;
    padding: 10px 15px;
    border-radius: 25px;
    border: 1px solid var(--border-color);
    outline: none;
    font-size: 1rem;
  }

  button {
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    background-color: var(--primary-color);
    color: var(--bg-color);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }
}

@media (max-width: 576px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  .search-box {

  input {
    width: 250px;
    font-size: 0.7rem;
  }

  button {
    padding: 6px 16px;
    font-size: 0.8rem;
  }
}

}
</style>