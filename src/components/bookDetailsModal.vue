<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">✖</button>

      <div class="modal-body">
        <div class="book-cover-container">
          <img 
            :src="coverImage" 
            :alt="book.volumeInfo?.title" 
            class="book-cover"
            @error="setDefaultImage"
          />
        </div>

        <div class="book-details">
          <h2 class="book-title">{{ book.volumeInfo?.title }}</h2>
          <p class="book-author">By: {{ authors }}</p>

          <div class="badges">
            <span v-if="book.volumeInfo?.pageCount" class="badge">
              📄 {{ book.volumeInfo.pageCount }} Pages
            </span>
            <span v-if="book.volumeInfo?.publishedDate" class="badge">
              📅 {{ book.volumeInfo.publishedDate.substring(0, 4) }}
            </span>
            <span v-if="book.volumeInfo?.categories" class="badge">
              🏷️ {{ book.volumeInfo.categories[0] }}
            </span>
          </div>

          <div class="book-description" v-html="description"></div>

          <div class="modal-actions">
            <button 
              class="add-to-shelf-btn" 
              :class="{ 'in-shelf': isBookInShelf }"
              @click="toggleBookshelf"
            >
              {{ isBookInShelf ? 'Remove from Bookshelf' : 'Add to My Bookshelf' }}
            </button>
            
            <a 
              v-if="book.volumeInfo?.previewLink" 
              :href="book.volumeInfo.previewLink" 
              target="_blank" 
              class="preview-btn"
            >
              Read Preview
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import placeholderAsset from '@/assets/images/placeholder.png'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const isBookInShelf = ref(false)

const getSafeShelf = () => {
  try {
    return JSON.parse(localStorage.getItem('myBookshelf')) || []
  } catch (e) {
    console.error("Storage corrupted, resetting shelf");
    return []
  }
}

onMounted(() => {
  const shelf = getSafeShelf()
  isBookInShelf.value = shelf.some(savedBook => savedBook.id === props.book.id)
  document.addEventListener('keydown', handleEsc)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = 'auto'
})

const handleEsc = (e) => { 
  if (e.key === 'Escape') emit('close') 
}

const toggleBookshelf = () => {
  let shelf = getSafeShelf()

  if (isBookInShelf.value) {
    shelf = shelf.filter(savedBook => savedBook.id !== props.book.id)
    isBookInShelf.value = false
  } else {
    shelf.push(props.book)
    isBookInShelf.value = true
  }

  localStorage.setItem('myBookshelf', JSON.stringify(shelf))
}

const setDefaultImage = (event) => {
  event.target.src = placeholderAsset
}

const coverImage = computed(() => {
  return props.book.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || placeholderAsset
})

const authors = computed(() => {
  return props.book.volumeInfo?.authors?.join(', ') || 'Unknown Author'
})

const description = computed(() => {
  return props.book.volumeInfo?.description || 'No description available for this book.'
})
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; 
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-color); 
  width: 100%;
  max-width: 850px;
  max-height: 90vh; 
  border-radius: 20px;
  position: relative;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: var(--bg-color);
    transform: rotate(90deg);
  }
}

.modal-body {
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  overflow-y: auto; 
}

.book-cover-container {
  flex-shrink: 0;
  width: 200px;

  .book-cover {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
}

.book-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.book-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.book-author {
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  .badge {
    background-color: var(--search-bg); 
    color: var(--text-secondary);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
  }
}

.book-description {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 2rem;
  
  :deep(p) { margin-bottom: 1rem; }
  :deep(br) { display: none; }
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  flex-wrap: wrap;

  button, a {
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}

.add-to-shelf-btn {
  background-color: var(--primary-color);
  color: var(--bg-color);
  border: none;
  flex-grow: 1;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
  }

  &.in-shelf {
    background-color: var(--secondary-color);

    &:hover {
      background-color: #ef4444;
    }
  }
}

.preview-btn {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--border-color);
  }
}

@media (max-width: 768px) {
  .modal-body {
    flex-direction: column; 
    align-items: center;
    padding: 2rem 1.5rem;
    text-align: center;
  }

  .book-cover-container {
    width: 150px; 
  }

  .badges {
    justify-content: center;
  }

  .modal-actions {
    flex-direction: column;
    width: 100%;

    button, a { width: 100%; }
  }
}
</style>