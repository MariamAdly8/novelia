# 📚 Novelia | Discover Great Books

Novelia is a modern, responsive Single Page Application (SPA) built with Vue.js that allows users to explore, search, and curate their own personal library using the Google Books API.

## 🚀 Live Demo
[Explore Novelia Live](https://mariamadly.github.io/novelia/)

## ✨ Key Features

- **🔍 Smart Search Engine:** Advanced book search with robust pagination to handle API edge cases.
- **📚 Personal Bookshelf:** Users can save their favorite books to a personal shelf, persisting data safely via `localStorage`.
- **🌓 Dark/Light Theme:** Seamless theme switching with user preference persistence for an optimal reading experience.
- **📱 Fully Responsive UI:** Pixel-perfect, mobile-first design using SCSS and CSS grid/flexbox.
- **🚦 Intelligent Pagination:** Custom logic handling for API limits, preventing dead-ends and empty rendering.
- **🛡️ Graceful Error Handling:** Bulletproof UI with fallbacks for broken image links, empty API responses, and strict XSS prevention.
- **🛣️ Dynamic Routing:** Clean navigation using Vue Router, including a custom `404 Not Found` page and optimized scroll behavior.

## 🛠️ Technologies Used

- **Frontend Framework:** Vue.js 3 (Composition API & `<script setup>`)
- **Routing:** Vue Router (Configured with Hash Mode for static hosting)
- **Styling:** SCSS, CSS Variables
- **Data Source:** Google Books API V1
- **Deployment:** GitHub Pages (`gh-pages`)

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mariamadly/novelia.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd novelia
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the project:**
   ```bash
   npm run serve
   ```


## 👩‍💻 Author

**Mariam Adly** | Software Engineer | ITI Trainee 
[GitHub](https://github.com/mariamadly)
