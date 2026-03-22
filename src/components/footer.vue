<template>
  <footer class="footer">
    <div class="footer-container">
      
      <div class="footer-section brand-info">
        <div class="logo">Novelia</div>
        <p class="description">
          Your modern gateway to explore and discover the best books. 
          Read, learn, and grow.
        </p>
      </div>

      <div class="footer-section quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><a @click.prevent="goToCategories" href="#">Categories</a></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
      </div>

      <div class="footer-section quick-links">
        <h3>Follow Us</h3>
        <ul>
          <li><router-link to="/">LinkedIn</router-link></li>
          <li><router-link to="/">Facebook</router-link></li>
          <li><router-link to="/">Instagram</router-link></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Novelia. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const goToCategories = async () => {
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
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.footer {
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  padding: 2rem ;
  margin-top: 7rem; 
}

.footer-container {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 8rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: 1.2rem;
    color: var(--text-primary);
    font-weight: 600;
  }
}

.brand-info {
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .description {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.quick-links {
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    
    li a{
      color: var(--text-secondary);
      font-size: 0.95rem;
      transition: color 0.3s ease, padding-left 0.3s ease;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
        padding-left: 2px; 
      }
    }
  }
}

.social-links {
  .social-icons {
    display: flex;
    gap: 1rem;
    
    .social-btn {
      color: var(--text-secondary);
      font-size: 0.95rem;
      border: 1px solid var(--border-color);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        background-color: var(--primary-color);
        color: #fff;
        border-color: var(--primary-color);
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}
@media (max-width: $screen-md) {
  .footer {
    padding: 1.5rem 1rem; 
  }

  .footer-container {
    grid-template-columns: 2fr 1fr 1fr; 
    gap: 1rem; 
  }

  .brand-info {
    .logo {
      font-size: 1.1rem;
    }
    .description {
      font-size: 0.75rem;
      line-height: 1.4;
    }
  }

  .footer-section h3 {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .quick-links ul {
    gap: 0.5rem;
    
    li a {
      font-size: 0.75rem; 
    }
  }
}
</style>