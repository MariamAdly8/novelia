<template>
  <main class="not-found-page">
    <div class="content">
      <div class="error-code">404</div>
      <h1>Oops! Page Not Found</h1>
      <p>The book you're looking for might have been misplaced, or this page doesn't exist.</p>
      <router-link to="/" class="btn primary">Return to Library</router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.not-found-page {
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.content {
  background-color: var(--glass-bg);
  padding: 4rem 2rem;
  border-radius: 20px;
  border: 1px dashed var(--border-color);
  max-width: 600px;
  width: 100%;
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

p {
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.btn {
  padding: 12px 30px;
  border-radius: 30px;
  background-color: var(--primary-color);
  color: var(--bg-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-3px);
  }
}
</style>