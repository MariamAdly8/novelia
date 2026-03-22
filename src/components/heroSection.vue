<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="title">Discover Your Next <span>Great Read</span></h1>
      <p class="subtitle">Explore thousands of books, from thrilling mysteries to cutting-edge technology.</p>
      
      <div class="cta-buttons">
        <button class="btn primary" @click="scrollToCategories">Explore Books</button>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToCategories = () => {
  const section = document.getElementById('categories-section')
  if (section) {
    const y = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
</script>

<style lang="scss" scoped>
.hero {
  padding: clamp(6rem, 12vw, 10rem) 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: linear-gradient(
    135deg, 
    var(--bg-color) 0%, 
    rgba(99, 102, 241, 0.08) 50%, 
    rgba(236, 72, 153, 0.05) 100% 
  );
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  z-index: 1;

  .title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    color: var(--primary-color);
    line-height: 1.2;
    font-weight: 800;
    
    span {
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color, #ec4899));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
  }
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap; 
  justify-content: center;

  .btn {
    padding: 0.8rem 2.5rem;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;

    &.primary {
      background-color: var(--primary-color);
      color: var(--bg-color);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); 
      &:hover { filter: brightness(1.1); transform: translateY(-3px); }
    }
  }
}
</style>