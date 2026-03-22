<template>
  <main class="home-page">
    <HeroSection />

    <section class="trending-section">
      <div class="section-header">
        <h2>Top Trending This Week🔥</h2>
        <p>The most read and loved books by our community.</p>
      </div>

      <div v-if="isTrendingLoading" class="loading-state">
        <div class="spinner"></div>
      </div>

      <div v-else class="trending-grid">
        <div 
          v-for="(book, index) in trendingBooks" 
          :key="book.id" 
          class="trending-card" 
          @click="openModal(book)"
        >
          <div class="rank-badge">#{{ index + 1 }}</div>
          
          <div class="trend-cover">
            <img 
              :src="getImage(book)" 
              @error="setDefaultImage"
            />
          </div>
          
          <div class="trend-info">
            <h3 class="trend-title">
              {{ book.volumeInfo?.title }}
            </h3>

            <p class="trend-author">
              {{ book.volumeInfo?.authors?.join(', ') || 'Unknown' }}
            </p>

            <p class="trend-desc">
              {{ book.volumeInfo?.description?.substring(0, 80) || 'No description available' }}...
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="books-section" id="categories-section">
      <div class="section-header">
        <h2>Explore The Library</h2>
        <p>Dive into thousands of books across all categories.</p>
      </div>

      <div class="category-chips">
        <button 
          v-for="cat in categories" 
          :key="cat.value"
          class="chip-btn"
          :class="{ active: currentCategory === cat.value }"
          @click="selectCategory(cat.value)"
        >
          {{ cat.name }}
        </button>
      </div>

      <div v-if="error" class="error-state">
        {{ error }}
      </div>

      <div v-else-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading the library...</p>
      </div>

      <div v-else-if="books.length > 0" class="books-grid">
        <BookCard 
          v-for="book in books" 
          :key="book.id" 
          :book="book" 
          @click="openModal(book)"
        />
      </div>

      <div v-else class="empty-state">
        <p>No books found for this category.</p>
      </div>

      <div class="pagination" v-if="books.length > 0">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1 || isLoading" 
          @click="changePage(currentPage - 1)">
          ← Prev
        </button>

        <span class="page-info">
          Page {{ currentPage }}
        </span>

        <button 
          class="page-btn" 
          :disabled="currentPage >= totalPages || isLoading" 
          @click="changePage(currentPage + 1)">
          Next →
        </button>
      </div>
    </section>

    <BookDetailsModal 
      v-if="selectedBook" 
      :book="selectedBook" 
      @close="closeModal" 
    />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import HeroSection from '@/components/heroSection.vue'
import BookCard from '@/components/bookCard.vue'
import BookDetailsModal from '@/components/bookDetailsModal.vue'
import { getBooks } from '@/services/api'
import placeholder from '@/assets/images/placeholder.png'

const selectedBook = ref(null)

const openModal = (book) => {
  selectedBook.value = book
}

const closeModal = () => {
  selectedBook.value = null
}

const trendingBooks = ref([])
const isTrendingLoading = ref(true)

const books = ref([])
const isLoading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const itemsPerPage = 10
const totalResults = ref(0)

const totalPages = computed(() => {
  return Math.ceil(totalResults.value / itemsPerPage)
})

const categories = [
  { name: 'All Time Hits', value: 'subject:fiction' },
  { name: 'Programming', value: 'subject:computers' },
  { name: 'Business', value: 'subject:business' },
  { name: 'Design', value: 'subject:design' },
  { name: 'History', value: 'subject:history' },
  { name: 'Science', value: 'subject:science' }
]

const currentCategory = ref(categories[0].value)

const getImage = (book) => {
  return book.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || placeholder
}

const setDefaultImage = (e) => {
  e.target.src = placeholder
}

const fetchTrendingBooks = async () => {
  isTrendingLoading.value = true
  const data = await getBooks('subject:fantasy', 1, 3)

  if (data.items) trendingBooks.value = data.items

  isTrendingLoading.value = false
}

const fetchLibraryBooks = async () => {
  isLoading.value = true
  error.value = null

  const data = await getBooks(currentCategory.value, currentPage.value, itemsPerPage)

  if (data.error) {
    error.value = data.error
    books.value = []
  } else {
    books.value = data.items
    totalResults.value = data.totalItems
  }

  isLoading.value = false
}

const selectCategory = (newCategory) => {
  if (currentCategory.value !== newCategory) {
    currentCategory.value = newCategory
    currentPage.value = 1
    fetchLibraryBooks()
    document.querySelector('.books-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const changePage = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    currentPage.value = newPage
    fetchLibraryBooks()

    document.querySelector('.books-section')?.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  fetchTrendingBooks()
  fetchLibraryBooks()
})
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 70px; 
  min-height: 100vh;
}

.section-header {
  margin-bottom: 2.5rem;
  text-align: center;
  
  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
}


.trending-section {
  padding: clamp(3rem, 5vw, 5rem) clamp(1rem, 5vw, 4rem);
  background-color: var(--glass-bg); 
  border-bottom: 1px solid var(--border-color);
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.trending-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--bg-color);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
  }

  .rank-badge {
    position: absolute;
    top: -10px;
    left: -10px;
    background: var(--primary-color);
    color: var(--bg-color);
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(99, 102, 241, 0.4);
  }

  .trend-cover {
    width: 100px;
    height: 150px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .trend-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .trend-title {
      font-size: 1.2rem;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .trend-author {
      font-size: 0.9rem;
      color: var(--primary-color);
      font-weight: 500;
    }

    .trend-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
  }
}


.books-section {
  padding: clamp(3rem, 5vw, 5rem) clamp(1rem, 5vw, 4rem);
  max-width: 1400px;
  margin: 0 auto;
}

.category-chips {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 
  gap: 1rem;
  margin-bottom: 3rem;

  .chip-btn {
    padding: 8px 20px;
    border-radius: 20px;
    border: 1px solid var(--border-color);
    background-color: transparent;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    &.active {
      background-color: var(--primary-color);
      color: var(--bg-color);
      border-color: var(--primary-color);
      box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
    }
  }
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem;
  color: var(--text-secondary);
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

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
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

@media (max-width: 768px) {
  .trending-card {
    flex-direction: column; 
    align-items: flex-start;
    
    .trend-cover {
      width: 100%;
      height: 200px;
    }
  }
}

@media (max-width: 576px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  .trending-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
    
  }
  .category-chips {
    gap: 0.5rem;
    .chip-btn {
      padding: 6px 15px;
      font-size: 0.85rem;
    }
  }

  .pagination {
    gap: 1rem;
    .page-btn { padding: 8px 16px; font-size: 0.9rem; }
  }
}
</style>