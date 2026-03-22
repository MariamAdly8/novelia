<template>
  <div class="book-card">
    <div class="cover-wrapper">
      <img 
        :src="coverImage" 
        :alt="book.volumeInfo.title" 
        class="cover-img" 
        loading="lazy" 
        @error="setDefaultImage"
      />
    </div>
    
    <div class="book-info">
      <h3 class="book-title" :title="book.volumeInfo.title">{{ book.volumeInfo.title }}</h3>
      <p class="book-author">{{ authors }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import placeholder from '@/assets/images/placeholder.png'
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const coverImage = computed(() => {
  return props.book.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:') || placeholder
})

const authors = computed(() => props.book.volumeInfo?.authors?.join(', ') || 'Unknown Author')

const setDefaultImage = (e) => {
  e.target.src = placeholder
}
</script>

<style lang="scss" scoped>
.book-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    border-color: var(--primary-color);
  }
}

.cover-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--border-color);
  
  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.book-card:hover .cover-img {
  transform: scale(1.05); 
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  .book-title {
    font-size: 1rem;
    color: var(--text-primary);
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .book-author {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
}
</style>