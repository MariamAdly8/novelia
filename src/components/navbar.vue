<template>
  <nav class="navbar">
    
    <div class="left-section">
      <div class="logo">
        Novelia
      </div>
    </div>

    <div class="nav-links" :class="{ 'mobile-active': isMenuOpen }">
      <router-link to="/" @click="closeMenu">Home</router-link>
      <a @click.prevent="goToCategories" href="#">Categories</a>
      <router-link to="/contact" @click="closeMenu">Contact Us</router-link>
      
      <div class="mobile-actions">
        <button class="books mobile-books" @click="() => { closeMenu(); router.push('/bookshelf'); }">My Bookshelf</button>
      </div>
    </div>

    <div class="right-section">
      <div class="search-container">
        <input type="text" placeholder="Search for books..." class="search-input" @keyup.enter="handleSearch" v-model="searchQuery"/>
      </div>

      <button class="books desktop-only" @click="router.push('/bookshelf')">My Bookshelf</button>
      
      <button @click="toggleDark" class="theme-toggle">
        {{ isDark ? '☀️' : '🌙' }}
      </button>

      <button class="hamburger" @click="toggleMenu" :class="{ 'open': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const isDark = ref(false)
const isMenuOpen = ref(false)

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
const toggleDark = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark-theme') 
    localStorage.setItem('theme', 'dark') 
  } else {
    document.documentElement.classList.remove('dark-theme') 
    localStorage.setItem('theme', 'light') 
  }
}
const goToCategories = async () => {
  closeMenu() 
  
  if (route.path !== '/') {
    await router.push('/')
  }
  
  setTimeout(() => {
    const section = document.getElementById('categories-section')
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100)
}
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark-theme')
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0 4rem; 
  background-color: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 18rem; 
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 1.5rem; 
  
  a {
    font-weight: 500;
    color: var(--text-primary);
    transition: color 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    
    &:hover, &.router-link-exact-active{
      color: var(--secondary-color); 
    }
  }
}

.mobile-actions {
  display: none;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
}

.search-input {
  width: clamp(100px, 20vw, 250px);
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--search-bg);
  color: var(--text-primary);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); 
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
}

.books {
  background-color: var(--primary-color);
  color: var(--bg-color);
  padding: 8px 20px;
  border-radius: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px); 
  }
}

.theme-toggle {
  background: transparent;
  font-size: 1.9rem;
  border-radius: 50%;
  padding: 8px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1); 
  }
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: var(--glass-bg);
  cursor: pointer;
  padding: 0;
  border: none;
  z-index: 1001; 
  span {
    width: 100%;
    height: 2px;
    background-color: var(--text-primary);
    transition: all 0.3s ease;
  }
}

.hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }



@media (max-width: $screen-xl) {
  .navbar { padding: 0 4%; }
  .left-section { gap: 2rem; } 
  .nav-links { gap: 2.5vw; font-size: 0.95rem; }
  .right-section { gap: 1.5vw; }
  .search-input { width: 15vw; }
}

@media (max-width: $screen-lg) {
  .navbar { padding: 0 2rem; }
  .nav-links { gap: 1rem; font-size: 0.8rem; }
  .left-section { gap: 2rem; }
  .right-section { gap: 0.8rem; }
  .books { font-size: 0.8rem; }
  .search-input { width: 10rem; }
}

@media (max-width: $screen-md) {
  .navbar { padding: 0 1.5rem; }
  .right-section { gap: 0.5rem; }
  .hamburger { display: flex; }

  .nav-links {
    position: absolute;
    top: 70px; 
    left: 0;
    width: 100%;
    background-color: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--border-color);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none; 
    transition: all 0.4s ease-in-out;
    z-index: 999;
  }

  .nav-links.mobile-active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}

@media (max-width: $screen-sm) {
  .desktop-only {
    display: none;
  }
  .navbar {
    padding: 0 1rem; 
  }

  .logo {
    font-size: 1.2rem; 
  }

  .right-section {
    gap: 0.1rem; 
  }

  .search-input {
    width: 116px; 
    padding: 6px 12px; 
    font-size: 0.7rem; 
  }

  .theme-toggle {
    font-size: 1.3rem; 
    padding: 4px;
  }

  .hamburger {
    width: 20px; 
    height: 15px;
  }
  .mobile-actions {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
    align-items: center;
  }

 .mobile-books {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 1rem;
  }
}
</style>