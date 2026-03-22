<template>
  <main class="contact-page">
    <div class="contact-header">
      <h1>Get in <span>Touch</span> ✉️</h1>
      <p>Have a question or a book recommendation? We'd love to hear from you.</p>
    </div>

    <div class="contact-container">
      
      <div class="contact-info">
        <h2>Contact Information</h2>
        <p class="subtitle">Fill out the form and our team will get back to you within 24 hours.</p>
        
        <div class="info-items">
          <div class="info-item">
            <span class="icon">📍</span>
            <div>
              <h3>Our Location</h3>
              <p>ITI Campus, Assiut, Egypt</p>
            </div>
          </div>
          
          <div class="info-item">
            <span class="icon">📞</span>
            <div>
              <h3>Phone Number</h3>
              <p>+20 100 123 4567</p>
            </div>
          </div>
          
          <div class="info-item">
            <span class="icon">✉️</span>
            <div>
              <h3>Email Address</h3>
              <p>hello@novelia.com</p>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-form-wrapper">
        
        <div v-if="isSubmitted" class="success-message">
          <div class="success-icon">✨</div>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out, {{ form.name }}. We'll get back to you soon.</p>
          <button class="btn primary" @click="resetForm">Send Another Message</button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="form.name" placeholder="John Doe" required />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="form.email" placeholder="john@example.com" required />
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" v-model="form.subject" placeholder="How can we help?" required />
          </div>

          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" v-model="form.message" rows="5" placeholder="Write your message here..." required></textarea>
          </div>

          <button type="submit" class="submit-btn">Send Message 🚀</button>
        </form>

      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitted = ref(false)

const handleSubmit = () => {
  console.log('Form Data:', form)
    isSubmitted.value = true
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  isSubmitted.value = false
}
</script>

<style lang="scss" scoped>
.contact-page {
  padding-top: 100px; 
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: clamp(1rem, 5vw, 4rem);
  padding-right: clamp(1rem, 5vw, 4rem);
  padding-bottom: 4rem;
}

.contact-header {
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

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr; 
  gap: 4rem;
  background-color: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.contact-info {
  background-color: var(--secondary-color);
  color: var(--bg-color);
  padding: 3rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    color: var(--glass-bg);
    margin-bottom: 3rem;
    line-height: 1.6;
  }
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .icon {
      font-size: 1.5rem;
      padding: 10px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
      font-weight: 600;
    }

    p {
      color: var(--glass-bg);
      font-size: 0.95rem;
    }
  }
}

.contact-form-wrapper {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-color);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.95rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    input, textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background-color: var(--search-bg);
      color: var(--text-primary);
      font-family: inherit;
      transition: all 0.3s ease;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
      }
    }

    textarea {
      resize: vertical; 
    }
  }
}

.submit-btn {
  margin-top: 1rem;
  background-color: var(--primary-color);
  color: var(--bg-color);
  padding: 14px 24px;
  border-radius: 30px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
  }
}

.success-message {
  text-align: center;
  animation: fadeIn 0.5s ease;

  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.8rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .btn.primary {
    background-color: var(--primary-color);
    color: var(--bg-color);
    padding: 10px 24px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr; 
  }

  .contact-info {
    padding: 2rem;
  }

  .contact-form-wrapper {
    padding: 2rem;
  }
}
</style>