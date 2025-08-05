<template>
  <div class="home-view" :class="{ 'light-mode': isLightMode }">
    <!-- Botón flotante para alternar modo -->
    <button class="theme-toggle-btn" @click="toggleTheme" :aria-label="isLightMode ? 'Modo oscuro' : 'Modo claro'">
      <svg v-if="!isLightMode" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
    </button>

    <!-- Main Slider Section -->
    <section class="main-slider-section">
      <!-- Main Slider -->
      <div class="main-slider">
        <div class="main-slider-track" ref="mainSliderTrack">
          <div 
            v-for="(post, index) in sliderPosts" 
            :key="index"
            class="main-slide"
            :class="{ 'active': currentMainSlideIndex === index }"
          >
            <!-- Imagen arriba -->
            <div class="main-slide-image">
              <img :src="post.image" :alt="post.title">
            </div>
            <!-- Contenido debajo SOLO en móvil -->
            <div class="main-slide-content mobile-slide-content">
              <h2 class="main-slide-title">{{ post.title }}</h2>
              <p class="main-slide-excerpt">{{ post.excerpt }}</p>
              <button class="main-slide-btn">Leer Más</button>
            </div>
            <!-- Overlay solo en escritorio -->
            <div class="main-slide-overlay enhanced-overlay desktop-only">
                <div class="main-slide-content">
                  <h2 class="main-slide-title">{{ post.title }}</h2>
                  <p class="main-slide-excerpt">{{ post.excerpt }}</p>
                  <button class="main-slide-btn">Leer Más</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Slider Indicators -->
        <!-- ELIMINADO: Indicadores de slider tipo puntitos -->
      </div>
      
      <!-- News Slider -->
      <div class="news-slider-container">
        <div class="news-slider-track" ref="newsSliderTrack">
          <div 
            v-for="(post, index) in sliderPosts" 
            :key="index"
            class="news-slide-item"
            :class="{ 'active': currentMainSlideIndex === index }"
            @click="goToMainSlide(index)"
          >
            <div class="news-item-content">
              <div class="news-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16v16H4z"/>
                  <path d="M8 8h8v2H8zM8 12h6v2H8z"/>
                </svg>
              </div>
              <h3 class="news-slide-title">{{ post.title }}</h3>
            </div>
            <div class="news-progress-bar" v-if="currentMainSlideIndex === index">
              <div class="news-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Comics Section -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Cómics Destacados</h2>
              <p class="section-subtitle">Las mejores historias seleccionadas para ti</p>
            </div>
            <div class="section-title-image">
              <img src="/img/comic2.jpg" alt="Cómics Destacados">
            </div>
          </div>
        </div>
        
        <div class="comics-scroll-container">
          <div class="comics-scroll-track" ref="comicsTrack">
          <div 
              v-for="(comic, index) in comics" 
            :key="index"
            class="comic-card"
            @click="selectComic(comic)"
          >
            <div class="comic-image">
              <img :src="comic.image" :alt="comic.title">
              <div class="comic-overlay">
                <div class="comic-rating">
                    <div class="comic-icons">
                      <svg 
                        v-for="iconIndex in 5" 
                        :key="iconIndex"
                        class="comic-svg" 
                        :class="{ 'active': iconIndex <= comic.rating }"
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                      </svg>
                    </div>
                </div>
              </div>
            </div>
            <div class="comic-info">
                <h3 class="comic-title">{{ comic.title }} {{ comic.issue }}</h3>
                <p class="comic-date">{{ formatDate(comic.publishDate) }}</p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Explora por Categorías</h2>
              <p class="section-subtitle">Encuentra tu género favorito</p>
            </div>
            <div class="section-title-image">
              <img src="/img/slide1.png" alt="Categorías">
            </div>
          </div>
        </div>
        
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.name">
            <div class="category-icon">
              <svg :viewBox="category.icon" fill="currentColor">
                <path :d="category.path"/>
              </svg>
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description }}</p>
            <span class="category-count">{{ category.count }} cómics</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Toys Section -->
    <section class="toys-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Juguetes de tus<br>Personajes Favoritos</h2>
              <p class="section-subtitle">¡Llévate a casa la diversión<br>y la aventura!</p>
            </div>
            <div class="section-title-image">
              <img src="/img/rafatos.png" alt="Juguetes">
            </div>
          </div>
        </div>
        <div class="toys-scroll-container">
          <div class="toys-scroll-track">
            <div v-for="(toy, index) in toys" :key="index" class="toy-card">
              <div class="toy-image">
                <img :src="toy.image" :alt="toy.name">
              </div>
              <div class="toy-info">
                <h3 class="toy-name">{{ toy.name }}</h3>
                <p class="toy-character">Personaje: <span>{{ toy.character }}</span></p>
                <p class="toy-price">{{ toy.price }}</p>
                <button class="toy-cart-btn" @click.stop="addToCart(toy)" aria-label="Agregar al carrito">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Games Section (diseño único, cuadrícula responsiva) -->
    <section class="games-section-unique">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Juegos de Héroes</h2>
              <p class="section-subtitle">Explora los mejores videojuegos<br>de superhéroes modernos</p>
            </div>
            <div class="section-title-image">
              <img src="/img/comic1.jpg" alt="Gaming Icon">
            </div>
          </div>
        </div>
        <div class="games-mosaic">
          <div v-for="(game, index) in games" :key="index" class="game-mosaic-item">
            <div class="game-mosaic-image">
              <img :src="game.image" :alt="game.name">
            </div>
            <div class="game-mosaic-content">
              <h3 class="game-mosaic-title">{{ game.name }}</h3>
              <p class="game-mosaic-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                  <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
                  <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
                  <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                </svg>
                {{ game.releaseDate }}
              </p>
              <button class="game-mosaic-btn" @click.stop="playGame(game)">Ver Detalles</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Movies Section -->
    <section class="movies-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Películas de Cómics</h2>
              <p class="section-subtitle">Las mejores adaptaciones<br>del papel a la pantalla grande</p>
            </div>
            <div class="section-title-image">
              <img src="/img/most.jpg" alt="Películas">
            </div>
          </div>
        </div>
        
        <div class="movies-layout">
          <!-- Featured Movie (Large) -->
          <div class="featured-movie">
            <div class="featured-movie-card" @click="watchMovie(movies[0])">
              <div class="featured-movie-image">
                <img :src="movies[0].image" :alt="movies[0].title">
                <div class="featured-movie-overlay">
                  <div class="movie-badge">
                    <span class="badge-text">{{ movies[0].year }}</span>
                  </div>
                  <div class="movie-rating-badge">
                    <span class="rating-star">★</span>
                    <span class="rating-text">{{ movies[0].rating }}</span>
                  </div>
                </div>
              </div>
              <div class="featured-movie-content">
                <div class="movie-tags">
                  <span class="tag">{{ movies[0].genre.split(',')[0] }}</span>
                  <span class="tag">{{ movies[0].duration }}</span>
                </div>
                <h3 class="featured-movie-title">{{ movies[0].title }}</h3>
                <p class="featured-movie-description">Una experiencia cinematográfica épica que redefine el género de superhéroes. Con actuaciones magistrales y efectos visuales revolucionarios.</p>
                <div class="featured-movie-actions">
                  <button class="play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <span>Ver Trailer</span>
                  </button>
                  <button class="info-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Netflix Style Collage -->
          <div class="movies-collage">
            <div class="collage-grid">
              <div 
                v-for="(movie, index) in movies.slice(1, 31)" 
                :key="index"
                class="collage-item"
                @click="watchMovie(movie)"
              >
                <div class="item-image">
                  <img :src="movie.image" :alt="movie.title">
                  <div class="item-overlay">
                    <div class="play-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                    <div class="item-info">
                      <h4 class="item-title">{{ movie.title }}</h4>
                      <div class="item-rating">
                        <span class="star">★</span>
                        <span class="score">{{ movie.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- YouTube Videos Section -->
    <section class="youtube-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Videos de YouTube</h2>
              <p class="section-subtitle">Los mejores videos de cómics<br>y superhéroes</p>
            </div>
            <div class="section-title-image">
              <img src="/img/comic6.jpg" alt="YouTube">
            </div>
          </div>
        </div>
        
        <div class="youtube-carousel">
          <div class="carousel-track">
            <div 
              v-for="(video, index) in youtubeVideos" 
              :key="index"
              class="video-card"
              @click="playVideo(video)"
            >
              <div class="video-thumbnail">
                <img :src="video.thumbnail" :alt="video.title">
                <div class="video-overlay">
                  <div class="play-button">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <div class="video-duration">{{ video.duration }}</div>
                </div>
              </div>
              <div class="video-info">
                <h3 class="video-title">{{ video.title }}</h3>
                <p class="video-channel">{{ video.channel }}</p>
                <div class="video-stats">
                  <span class="views">{{ video.views }}</span>
                  <span class="date">{{ video.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section">
      <div class="container">
        <div class="section-header">
          <div class="section-content-container">
            <div class="section-text-container">
              <h2 class="section-title">Blog & Noticias</h2>
              <p class="section-subtitle">Las últimas novedades<br>y análisis del mundo del cómic</p>
            </div>
            <div class="section-title-image">
              <img src="/img/register.jpg" alt="Blog y Noticias">
            </div>
          </div>
        </div>
        
        <div class="blog-layout">
          <!-- Featured Blog Post (Large) -->
          <div class="featured-blog">
            <div class="featured-blog-card" @click="selectBlog(blogPosts[0])">
              <div class="featured-blog-image">
                <img :src="blogPosts[0].image" :alt="blogPosts[0].title">
                <div class="featured-blog-overlay">
                  <div class="blog-category">{{ blogPosts[0].category }}</div>
                  <div class="blog-stats">
                    <span class="blog-views">{{ blogPosts[0].views.toLocaleString() }} vistas</span>
                    <span class="blog-likes">{{ blogPosts[0].likes.toLocaleString() }} likes</span>
                  </div>
                </div>
              </div>
              <div class="featured-blog-content">
                <div class="blog-meta">
                  <span class="blog-author">{{ blogPosts[0].author }}</span>
                  <span class="blog-date">{{ formatDate(blogPosts[0].date) }}</span>
                  <span class="blog-read-time">{{ blogPosts[0].readTime }}</span>
                </div>
                <h3 class="featured-blog-title">{{ blogPosts[0].title }}</h3>
                <p class="featured-blog-excerpt">{{ blogPosts[0].excerpt }}</p>
                <button class="featured-blog-btn">Leer Artículo</button>
              </div>
            </div>
          </div>
          <!-- Recent Blog Posts (Small with vertical scroll) -->
          <div class="recent-blogs">
            <h3 class="recent-blogs-title">Artículos Recientes</h3>
            <div class="recent-blogs-container">
              <div 
                v-for="(post, index) in blogPosts.slice(1, 8)" 
                :key="index"
                class="recent-blog-card"
                @click="selectBlog(post)"
              >
                <div class="recent-blog-image">
                  <img :src="post.image" :alt="post.title">
                  <div class="recent-blog-overlay">
                    <div class="blog-category-small">{{ post.category }}</div>
                  </div>
                </div>
                <div class="recent-blog-content">
                  <div class="blog-meta-small">
                    <span class="blog-author-small">{{ post.author }}</span>
                    <span class="blog-date-small">{{ formatDate(post.date) }}</span>
                  </div>
                  <h4 class="recent-blog-title">{{ post.title }}</h4>
                  <div class="blog-stats-small">
                    <span class="blog-views-small">{{ post.views.toLocaleString() }} vistas</span>
                    <span class="blog-likes-small">{{ post.likes.toLocaleString() }} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2 class="newsletter-title">Mantente Conectado</h2>
          <p class="newsletter-subtitle">Recibe las últimas novedades, lanzamientos y contenido exclusivo</p>
          
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="input-group">
              <input 
                type="email" 
                class="newsletter-input" 
                placeholder="Tu email aquí..."
                v-model="newsletterEmail"
                required
              >
              <button type="submit" class="newsletter-btn">
                <span>Suscribirse</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import { 
  slides, 
  comics, 
  blogPosts,
  videos,
  newsletterData,
  useSlider, 
  useCarousel, 
  setupTouchHandlers, 
  setupCarouselListeners, 
  cleanupCarouselListeners 
} from '../assets/js/slider.js'

// Newsletter email
const newsletterEmail = ref('')

const emit = defineEmits(['update:isLightMode'])

const isLightMode = ref(false)
const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  emit('update:isLightMode', isLightMode.value)
}

// Main slider functionality
const currentMainSlideIndex = ref(0)
const mainSliderTrack = ref(null)
const newsSliderTrack = ref(null)
let mainSliderInterval = null

// Create slider posts with slide images and blog content
const sliderPosts = ref([
  {
    title: blogPosts[0].title,
    excerpt: blogPosts[0].excerpt,
    image: "/img/slide1.png"
  },
  {
    title: blogPosts[1].title,
    excerpt: blogPosts[1].excerpt,
    image: "/img/slide2.png"
  },
  {
    title: blogPosts[2].title,
    excerpt: blogPosts[2].excerpt,
    image: "/img/slide3.png"
  }
])

const goToMainSlide = (index) => {
  currentMainSlideIndex.value = index
}

const nextMainSlide = () => {
  currentMainSlideIndex.value = (currentMainSlideIndex.value + 1) % sliderPosts.value.length
}

const prevMainSlide = () => {
  currentMainSlideIndex.value = currentMainSlideIndex.value === 0 ? sliderPosts.value.length - 1 : currentMainSlideIndex.value - 1
}

const startMainSliderAutoSlide = () => {
  mainSliderInterval = setInterval(() => {
    nextMainSlide()
  }, 5000)
}

const stopMainSliderAutoSlide = () => {
  if (mainSliderInterval) {
    clearInterval(mainSliderInterval)
    mainSliderInterval = null
  }
}

// Comics scroll track reference
const comicsTrack = ref(null)

// Categories data
const categories = ref([
  {
    name: 'Superhéroes',
    description: 'Poderes extraordinarios y batallas épicas',
    count: 156,
    icon: '0 0 24 24',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  {
    name: 'Ciencia Ficción',
    description: 'Futuros distantes y tecnología avanzada',
    count: 89,
    icon: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  {
    name: 'Fantasía',
    description: 'Mundos mágicos y criaturas legendarias',
    count: 124,
    icon: '0 0 24 24',
    path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    name: 'Horror',
    description: 'Suspenso y terror psicológico',
    count: 67,
    icon: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  }
])

// Toys data
const toys = ref([
  {
    name: 'Figura de Acción Spider-Man',
    character: 'Spider-Man',
    price: '$25.99',
    image: '/img/comic1.jpg'
  },
  {
    name: 'Figura de Acción Batman',
    character: 'Batman',
    price: '$29.99',
    image: '/img/comic2.jpg'
  },
  {
    name: 'Figura de Acción X-Men',
    character: 'Wolverine',
    price: '$27.99',
    image: '/img/comic3.jpg'
  },
  {
    name: 'Muñeca Wonder Woman',
    character: 'Wonder Woman',
    price: '$24.99',
    image: '/img/comic4.jpg'
  },
  {
    name: 'Figura Iron Man Deluxe',
    character: 'Iron Man',
    price: '$32.99',
    image: '/img/comic5.jpg'
  },
  {
    name: 'Figura Capitán América',
    character: 'Captain America',
    price: '$22.99',
    image: '/img/comic6.jpg'
  },
  {
    name: 'Figura Thor Martillo',
    character: 'Thor',
    price: '$28.99',
    image: '/img/comic7.jpg'
  },
  {
    name: 'Peluche Rafatos',
    character: 'Rafatos',
    price: '$19.99',
    image: '/img/rafatos.png'
  }
])

// Movies data
const movies = ref([
  {
    title: 'Spider-Man: No Way Home',
    image: '/img/comic1.jpg',
    rating: 4.5,
    year: 2021,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 28m',
    trailerUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA'
  },
  {
    title: 'Batman: The Dark Knight',
    image: '/img/comic2.jpg',
    rating: 4.8,
    year: 2008,
    genre: 'Acción, Crimen, Drama',
    duration: '2h 32m',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY'
  },
  {
    title: 'X-Men: Days of Future Past',
    image: '/img/comic3.jpg',
    rating: 4.6,
    year: 2014,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 23m',
    trailerUrl: 'https://www.youtube.com/embed/pK2goFq8fTM'
  },
  {
    title: 'The Dark Knight Rises',
    image: '/img/comic4.jpg',
    rating: 4.7,
    year: 2012,
    genre: 'Acción, Crimen, Drama',
    duration: '2h 45m',
    trailerUrl: 'https://www.youtube.com/embed/g8evyE9TuYk'
  },
  {
    title: 'Avengers: Endgame',
    image: '/img/comic5.jpg',
    rating: 4.9,
    year: 2019,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '3h 2m',
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
  },
  {
    title: 'Captain America: Civil War',
    image: '/img/comic6.jpg',
    rating: 4.7,
    year: 2016,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 27m',
    trailerUrl: 'https://www.youtube.com/embed/dKrVegVI0Us'
  },
  {
    title: 'Thor: Ragnarok',
    image: '/img/comic7.jpg',
    rating: 4.6,
    year: 2017,
    genre: 'Acción, Aventura, Comedia',
    duration: '2h 10m',
    trailerUrl: 'https://www.youtube.com/embed/ue80QwXMRHg'
  },
  {
    title: 'Wonder Woman',
    image: '/img/rafatos.png',
    rating: 4.5,
    year: 2017,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 21m',
    trailerUrl: 'https://www.youtube.com/embed/VSB4wGIdDwo'
  },
  {
    title: 'Black Panther',
    image: '/img/n1.jpg',
    rating: 4.8,
    year: 2018,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 14m',
    trailerUrl: 'https://www.youtube.com/embed/xjDjIWPwcPU'
  },
  {
    title: 'Iron Man',
    image: '/img/n2.avif',
    rating: 4.7,
    year: 2008,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 6m',
    trailerUrl: 'https://www.youtube.com/embed/8ugaeA-nMTc'
  },
  {
    title: 'Guardians of the Galaxy',
    image: '/img/photo1.webp',
    rating: 4.6,
    year: 2014,
    genre: 'Acción, Aventura, Comedia',
    duration: '2h 1m',
    trailerUrl: 'https://www.youtube.com/embed/d96cjJhvlMA'
  },
  {
    title: 'Deadpool',
    image: '/img/m.webp',
    rating: 4.5,
    year: 2016,
    genre: 'Acción, Aventura, Comedia',
    duration: '1h 48m',
    trailerUrl: 'https://www.youtube.com/embed/ONHBaC-pfsk'
  },
  {
    title: 'Suicide Squad',
    image: '/img/most.jpg',
    rating: 4.3,
    year: 2016,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 3m',
    trailerUrl: 'https://www.youtube.com/embed/CmRih_VtVAs'
  },
  {
    title: 'Justice League',
    image: '/img/most2.jpg',
    rating: 4.4,
    year: 2017,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 0m',
    trailerUrl: 'https://www.youtube.com/embed/3cxixDgHUYw'
  },
  {
    title: 'Ant-Man',
    image: '/img/slide1.png',
    rating: 4.4,
    year: 2015,
    genre: 'Acción, Aventura, Comedia',
    duration: '1h 57m',
    trailerUrl: 'https://www.youtube.com/embed/pWdKf3MneyI'
  },
  {
    title: 'Doctor Strange',
    image: '/img/slide2.png',
    rating: 4.6,
    year: 2016,
    genre: 'Acción, Aventura, Fantasía',
    duration: '1h 55m',
    trailerUrl: 'https://www.youtube.com/embed/HSzx-zryEgM'
  },
  {
    title: 'Spider-Man: Homecoming',
    image: '/img/slide3.png',
    rating: 4.5,
    year: 2017,
    genre: 'Acción, Aventura, Comedia',
    duration: '2h 13m',
    trailerUrl: 'https://www.youtube.com/embed/U0D3AOldjMU'
  },
  {
    title: 'Aquaman',
    image: '/img/register.jpg',
    rating: 4.4,
    year: 2018,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 23m',
    trailerUrl: 'https://www.youtube.com/embed/WDkg3h8PCVU'
  },
  {
    title: 'Captain Marvel',
    image: '/img/comic1.jpg',
    rating: 4.3,
    year: 2019,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 4m',
    trailerUrl: 'https://www.youtube.com/embed/Z1BCujX3pw8'
  },
  {
    title: 'Black Widow',
    image: '/img/comic2.jpg',
    rating: 4.4,
    year: 2021,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 14m',
    trailerUrl: 'https://www.youtube.com/embed/Fp9pNPdNwjI'
  },
  {
    title: 'Shang-Chi',
    image: '/img/comic3.jpg',
    rating: 4.5,
    year: 2021,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 12m',
    trailerUrl: 'https://www.youtube.com/embed/8YjFbMbfXaQ'
  },
  {
    title: 'Eternals',
    image: '/img/comic4.jpg',
    rating: 4.2,
    year: 2021,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 36m',
    trailerUrl: 'https://www.youtube.com/embed/x_me3xsvDgk'
  },
  {
    title: 'Spider-Man: Far From Home',
    image: '/img/comic5.jpg',
    rating: 4.6,
    year: 2019,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 9m',
    trailerUrl: 'https://www.youtube.com/embed/Nt9L1jCKGnE'
  },
  {
    title: 'Avengers: Infinity War',
    image: '/img/comic6.jpg',
    rating: 4.8,
    year: 2018,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 29m',
    trailerUrl: 'https://www.youtube.com/embed/6ZfuNTqbHE8'
  },
  {
    title: 'Thor: Love and Thunder',
    image: '/img/comic7.jpg',
    rating: 4.3,
    year: 2022,
    genre: 'Acción, Aventura, Comedia',
    duration: '1h 59m',
    trailerUrl: 'https://www.youtube.com/embed/Go8nTmfrQd8'
  },
  {
    title: 'Black Adam',
    image: '/img/rafatos.png',
    rating: 4.1,
    year: 2022,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 5m',
    trailerUrl: 'https://www.youtube.com/embed/X0tOpBuYasI'
  },
  {
    title: 'The Batman',
    image: '/img/n1.jpg',
    rating: 4.7,
    year: 2022,
    genre: 'Acción, Crimen, Drama',
    duration: '2h 56m',
    trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4'
  },
  {
    title: 'Doctor Strange 2',
    image: '/img/n2.avif',
    rating: 4.4,
    year: 2022,
    genre: 'Acción, Aventura, Fantasía',
    duration: '2h 6m',
    trailerUrl: 'https://www.youtube.com/embed/aWzlQ2N6qqg'
  },
  {
    title: 'Thor: The Dark World',
    image: '/img/photo1.webp',
    rating: 4.2,
    year: 2013,
    genre: 'Acción, Aventura, Fantasía',
    duration: '1h 52m',
    trailerUrl: 'https://www.youtube.com/embed/npvJ9FTgZbM'
  },
  {
    title: 'Captain America: Winter Soldier',
    image: '/img/m.webp',
    rating: 4.7,
    year: 2014,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 16m',
    trailerUrl: 'https://www.youtube.com/embed/tbayiPxkUMM'
  },
  {
    title: 'Iron Man 2',
    image: '/img/most.jpg',
    rating: 4.3,
    year: 2010,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 4m',
    trailerUrl: 'https://www.youtube.com/embed/BoohRoVA9WQ'
  },
  {
    title: 'Iron Man 3',
    image: '/img/most2.jpg',
    rating: 4.4,
    year: 2013,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 10m',
    trailerUrl: 'https://www.youtube.com/embed/Ke1Y3P9D0Bc'
  },
  {
    title: 'Captain America: First Avenger',
    image: '/img/slide1.png',
    rating: 4.5,
    year: 2011,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '2h 4m',
    trailerUrl: 'https://www.youtube.com/embed/JerVrbLldXw'
  },
  {
    title: 'Thor',
    image: '/img/slide2.png',
    rating: 4.4,
    year: 2011,
    genre: 'Acción, Aventura, Fantasía',
    duration: '1h 55m',
    trailerUrl: 'https://www.youtube.com/embed/JOddp-nlNvQ'
  },
  {
    title: 'The Incredible Hulk',
    image: '/img/slide3.png',
    rating: 4.2,
    year: 2008,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '1h 52m',
    trailerUrl: 'https://www.youtube.com/embed/xbqNb2PFKKA'
  },
  {
    title: 'Deadpool 2',
    image: '/img/register.jpg',
    rating: 4.4,
    year: 2018,
    genre: 'Acción, Aventura, Comedia',
    duration: '1h 59m',
    trailerUrl: 'https://www.youtube.com/embed/D86RtevtfrA'
  },
  {
    title: 'Venom',
    image: '/img/comic1.jpg',
    rating: 4.1,
    year: 2018,
    genre: 'Acción, Aventura, Ciencia Ficción',
    duration: '1h 52m',
    trailerUrl: 'https://www.youtube.com/embed/u9Mv98Gr5pY'
  },
  {
    title: 'Joker',
    image: '/img/comic2.jpg',
    rating: 4.6,
    year: 2019,
    genre: 'Crimen, Drama, Thriller',
    duration: '2h 2m',
    trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY'
  },

])

// Juegos data (solo título y fecha de lanzamiento)
const games = ref([
  {
    name: 'Spider-Man: Miles Morales',
    releaseDate: '2020',
    image: '/img/comic1.jpg'
  },
  {
    name: 'Batman: Arkham Knight',
    releaseDate: '2015',
    image: '/img/comic2.jpg'
  },
  {
    name: 'Guardians of the Galaxy',
    releaseDate: '2021',
    image: '/img/comic3.jpg'
  },
  {
    name: "Marvel's Avengers",
    releaseDate: '2020',
    image: '/img/comic4.jpg'
  },
  {
    name: 'Injustice 2',
    releaseDate: '2017',
    image: '/img/comic5.jpg'
  },
  {
    name: 'LEGO Marvel Super Heroes',
    releaseDate: '2013',
    image: '/img/comic6.jpg'
  },
  {
    name: 'Spider-Man Remastered',
    releaseDate: '2020',
    image: '/img/comic7.jpg'
  },
  {
    name: 'Gotham Knights',
    releaseDate: '2022',
    image: '/img/rafatos.png'
  }
])

// Newsletter subscription
const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log('Email suscrito:', newsletterEmail.value)
    alert('¡Gracias por suscribirte! Te mantendremos informado.')
    newsletterEmail.value = ''
  }
}

// Agregar al carrito (ejemplo)
const addToCart = (toy) => {
  alert(`¡${toy.name} agregado al carrito!`)
}

// Comic selection
const selectComic = (comic) => {
  console.log('Comic seleccionado:', comic.title)
  // Aquí puedes agregar la lógica para mostrar detalles del cómic
}

// Blog selection
const selectBlog = (post) => {
  console.log('Blog seleccionado:', post.title)
  // Aquí puedes agregar la lógica para mostrar el artículo completo
}

// Watch movie (example)
const watchMovie = (movie) => {
  alert(`¡Estás a punto de ver el trailer de "${movie.title}"!`)
  // Aquí puedes agregar la lógica para abrir el modal o la ventana de YouTube
}

// Format date function
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = Math.abs(today - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Hoy'
  } else if (diffDays === 1) {
    return 'Ayer'
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  } else {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }
}

// Pausar y reanudar slider al pasar mouse
const sliderContainer = ref(null)

const handleSliderMouseEnter = () => {
  stopMainSliderAutoSlide()
}
const handleSliderMouseLeave = () => {
  startMainSliderAutoSlide()
}

onMounted(() => {
  startMainSliderAutoSlide()
  // Agregar listeners para pausar/reanudar
  if (sliderContainer.value) {
    sliderContainer.value.addEventListener('mouseenter', handleSliderMouseEnter)
    sliderContainer.value.addEventListener('mouseleave', handleSliderMouseLeave)
  }
})
onUnmounted(() => {
  stopMainSliderAutoSlide()
  if (sliderContainer.value) {
    sliderContainer.value.removeEventListener('mouseenter', handleSliderMouseEnter)
    sliderContainer.value.removeEventListener('mouseleave', handleSliderMouseLeave)
  }
})

// YouTube Videos data
const youtubeVideos = ref([
  {
    title: 'Top 10 Mejores Momentos de Spider-Man',
    channel: 'ComicsOnofrietti',
    thumbnail: '/img/comic1.jpg',
    duration: '12:34',
    views: '2.5M vistas',
    date: 'Hace 3 días',
    url: 'https://www.youtube.com/embed/JfVOs4VSpmA'
  },
  {
    title: 'Batman vs Superman: Análisis Completo',
    channel: 'DC Comics Fan',
    thumbnail: '/img/comic2.jpg',
    duration: '18:45',
    views: '1.8M vistas',
    date: 'Hace 1 semana',
    url: 'https://www.youtube.com/embed/EXeTwQWrcwY'
  },
  {
    title: 'Marvel Cinematic Universe Timeline',
    channel: 'Marvel Studios',
    thumbnail: '/img/comic3.jpg',
    duration: '25:12',
    views: '3.2M vistas',
    date: 'Hace 2 semanas',
    url: 'https://www.youtube.com/embed/pK2goFq8fTM'
  },
  {
    title: 'Los Mejores Villanos de Cómics',
    channel: 'ComicBook Central',
    thumbnail: '/img/comic4.jpg',
    duration: '15:30',
    views: '1.2M vistas',
    date: 'Hace 5 días',
    url: 'https://www.youtube.com/embed/g8evyE9TuYk'
  },
  {
    title: 'Avengers: Historia Completa',
    channel: 'Superhero News',
    thumbnail: '/img/comic5.jpg',
    duration: '22:18',
    views: '4.1M vistas',
    date: 'Hace 1 mes',
    url: 'https://www.youtube.com/embed/TcMBFSGVi1c'
  },
  {
    title: 'DC vs Marvel: Debate Final',
    channel: 'Comic Debate',
    thumbnail: '/img/comic6.jpg',
    duration: '28:45',
    views: '2.9M vistas',
    date: 'Hace 2 semanas',
    url: 'https://www.youtube.com/embed/dKrVegVI0Us'
  },
  {
    title: 'Thor: Ragnarok - Easter Eggs',
    channel: 'Movie Easter Eggs',
    thumbnail: '/img/comic7.jpg',
    duration: '14:22',
    views: '1.6M vistas',
    date: 'Hace 1 semana',
    url: 'https://www.youtube.com/embed/ue80QwXMRHg'
  },
  {
    title: 'Wonder Woman: Orígenes',
    channel: 'DC Universe',
    thumbnail: '/img/rafatos.png',
    duration: '16:33',
    views: '2.1M vistas',
    date: 'Hace 3 días',
    url: 'https://www.youtube.com/embed/VSB4wGIdDwo'
  },
  {
    title: 'Black Panther: Cultura y Tradición',
    channel: 'Marvel Entertainment',
    thumbnail: '/img/n1.jpg',
    duration: '19:47',
    views: '3.8M vistas',
    date: 'Hace 1 semana',
    url: 'https://www.youtube.com/embed/xjDjIWPwcPU'
  },
  {
    title: 'Iron Man: El Genio del Hierro',
    channel: 'Tech & Comics',
    thumbnail: '/img/n2.avif',
    duration: '21:15',
    views: '2.7M vistas',
    date: 'Hace 5 días',
    url: 'https://www.youtube.com/embed/8ugaeA-nMTc'
  }
])

// Play video function
const playVideo = (video) => {
  alert(`¡Reproduciendo "${video.title}"!`)
  // Aquí puedes agregar la lógica para abrir el video en modal o nueva ventana
}

// Acción al jugar
const playGame = (game) => {
  alert(`¡Vas a jugar a "${game.name}" de ${game.character}!`)
}
</script>

<style scoped>
/* Base styles */
.home-view {
  background: #0a0a0a;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s ease;
}

.home-view.light-mode {
  background: #ffffff;
  color: #0a0a0a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Theme toggle button */
.theme-toggle-btn {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 1000;
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  color: #007bff;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle-btn:hover {
  background: rgba(0, 123, 255, 0.2);
  transform: scale(1.1);
}

/* Main Slider Section */
.main-slider-section {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.mobile-content-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  margin: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.mobile-slide-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.mobile-slide-excerpt {
  font-family: 'Inter', 'Poppins', sans-serif;
  color: #666666;
  line-height: 1.6;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0 0 24px 0;
}

.mobile-slide-btn {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
}

.mobile-slide-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.4);
}



.main-slider {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-slider-track {
  display: flex;
  width: 100%;
  height: 100%;
}

.main-slide {
  min-width: 100%;
  width: 100%;
  height: 100vh;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease-in-out;
}

.main-slide.active {
  opacity: 1;
}

.main-slide-image {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.main-slide-content {
  text-align: left;
  max-width: 500px;
  padding: 60px;
  color: white;
  z-index: 10;
}

.main-slide-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.5px;
}

.main-slide-excerpt {
  font-family: 'Inter', 'Poppins', sans-serif;
  color: #ffffff;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 24px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.main-slide-btn {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
}

.main-slide-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.4);
}

/* Slider Navigation */
.slider-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 20;
  pointer-events: none;
}

.nav-btn {
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  pointer-events: all;
}

.nav-btn:hover {
  background: rgba(0, 123, 255, 0.8);
  border-color: #007bff;
  transform: scale(1.1);
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

/* News Slider */
.news-slider-container {
  width: 100%;
  background: transparent;
  padding: 30px 20px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.news-slider-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.news-slider-track::-webkit-scrollbar {
  display: none;
}

.news-slide-item {
  min-width: 280px;
  max-width: 350px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-align: left;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.news-slide-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  border-color: rgba(0, 123, 255, 0.3);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.2);
}

.news-slide-item.active {
  background: rgba(0, 123, 255, 0.15);
  border-color: #007bff;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

.news-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  background: transparent !important;
}

.news-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.news-icon svg {
  color: white;
  width: 16px;
  height: 16px;
}

.news-slide-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.2px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 123, 255, 0.2);
  overflow: hidden;
}

.news-progress {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  animation: news-progress-anim 5s linear forwards;
}

@keyframes news-progress-anim {
  from { width: 0%; }
  to { width: 100%; }
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 16px;
}

.section-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.section-title-image {
  width: 400px;
  height: 350px;
  transform: skew(-15deg);
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
}

.section-title-image:hover {
  transform: skew(-15deg) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 123, 255, 0.4);
}

.section-title-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: skew(15deg) scale(1.2);
  transition: transform 0.3s ease;
}

.section-title-image:hover img {
  transform: skew(15deg) scale(1.3);
}

.section-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-family: 'Inter', 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: #b3b3b3;
  max-width: 600px;
  margin: 0 0 6px 0;
  line-height: 1.6;
  text-align: left;
}

/* Featured Section */
.featured-section {
  padding: 100px 0;
  background: #0f0f0f;
}

.comics-scroll-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  scrollbar-width: thin;
  scrollbar-color: #2563eb transparent;
}

.comics-scroll-container::-webkit-scrollbar {
  height: 10px;
  background: transparent;
}

.comics-scroll-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 8px;
}

.comics-scroll-container::-webkit-scrollbar-thumb {
  background: #2563eb;
  border-radius: 8px;
  transition: background 0.3s;
}

.comics-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #1d4ed8;
}

.comics-scroll-container::-webkit-scrollbar-corner {
  background: transparent;
}

.comics-scroll-container::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}

.comics-scroll-track {
  display: flex;
  gap: 20px;
  padding: 0 20px;
  min-width: max-content;
}

.comic-card {
  background: #1a1a1a;
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 250px; /* Ensure cards have a minimum width */
  flex-shrink: 0; /* Prevent shrinking */
}

.comic-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
  border-color: rgba(0, 123, 255, 0.3);
}

.comic-image {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.comic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.comic-card:hover .comic-image img {
  transform: scale(1.05);
}

.comic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(0, 212, 255, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}



.comic-card:hover .comic-overlay {
  opacity: 1;
}

.comic-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.comic-icons {
  display: flex;
  gap: 2px;
  align-items: center;
}

.comic-svg {
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.3);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  transition: all 0.2s ease;
}

.comic-svg.active {
  color: #007bff;
  filter: drop-shadow(0 1px 3px rgba(0, 123, 255, 0.5));
}

.comic-svg:hover {
  transform: scale(1.1);
}



.comic-info {
  padding: 24px;
}

.comic-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -0.2px;
}

.comic-date {
  font-family: 'Inter', sans-serif;
  color: #666666;
  font-size: 0.75rem;
  font-weight: 400;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}





/* Categories Section */
.categories-section {
  padding: 100px 0;
  background: #0a0a0a;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.category-card {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
  border-color: rgba(0, 123, 255, 0.3);
}

.category-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-icon svg {
  width: 32px;
  height: 32px;
}

.category-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
  letter-spacing: -0.2px;
}

.category-description {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  margin-bottom: 16px;
  line-height: 1.6;
  font-weight: 400;
}

.category-count {
  color: #007bff;
  font-weight: 600;
  font-size: 0.875rem;
}

/* Toys Section */
.toys-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  position: relative;
  overflow: hidden;
}

.toys-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(0, 123, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.toys-scroll-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 0;
  scrollbar-width: thin;
  scrollbar-color: #2563eb transparent;
}

.toys-scroll-container::-webkit-scrollbar {
  height: 10px;
  background: transparent;
}

.toys-scroll-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 8px;
}

.toys-scroll-container::-webkit-scrollbar-thumb {
  background: #2563eb;
  border-radius: 8px;
  transition: background 0.3s;
}

.toys-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #1d4ed8;
}

.toys-scroll-container::-webkit-scrollbar-corner {
  background: transparent;
}

.toys-scroll-container::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}

.toys-scroll-track {
  display: flex;
  gap: 30px;
  padding: 0 30px;
  min-width: max-content;
}

.toy-card {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 320px;
  height: 480px;
  position: relative;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.toy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(145deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 20px;
  pointer-events: none;
}

.toy-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 123, 255, 0.3);
  border-color: rgba(0, 123, 255, 0.3);
}

.toy-card:hover::before {
  opacity: 1;
}

.toy-image {
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toy-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0.9) contrast(1.1);
}

.toy-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(0, 212, 255, 0.1));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.toy-card:hover .toy-image::before {
  opacity: 1;
}

.toy-card:hover .toy-image img {
  transform: scale(1.1);
  filter: brightness(1.1) contrast(1.2);
}

.toy-info {
  padding: 20px 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  min-height: 200px;
}

.toy-name {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.toy-character {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  font-size: 0.875rem;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: uppercase;
}

.toy-character span {
  color: #00d4ff;
  font-weight: 700;
  background: linear-gradient(135deg, #007bff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.toy-price {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.toy-cart-btn {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.toy-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.toy-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
}

.toy-cart-btn:hover::before {
  left: 100%;
}

.toy-cart-btn svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.toy-cart-btn:hover svg {
  transform: scale(1.1);
}

/* Movies Section */
.movies-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  position: relative;
  overflow: hidden;
}

.movies-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(0, 123, 255, 0.05) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(0, 212, 255, 0.05) 50%, transparent 52%);
  background-size: 60px 60px;
  pointer-events: none;
}

.movies-layout {
  display: grid;
  grid-template-columns: 1fr 650px;
  gap: 0;
  align-items: stretch;
  min-height: 600px;
}

/* Featured Movie */
.featured-movie-card {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 2px solid rgba(0, 123, 255, 0.2);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.featured-movie-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 123, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.featured-movie-card:hover {
  transform: translateY(-8px);
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
}

.featured-movie-card:hover::before {
  opacity: 1;
}

.featured-movie-image {
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #2a2a2a;
}

.featured-movie-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0.9) contrast(1.1);
}

.featured-movie-card:hover .featured-movie-image img {
  transform: scale(1.05);
  filter: brightness(1.1) contrast(1.2);
}

.featured-movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.movie-badge {
  background: rgba(0, 123, 255, 0.9);
  color: white;
  padding: 8px 16px;
  align-self: flex-start;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.movie-rating-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.7);
  border: 2px solid #007bff;
  box-shadow: 0 2px 16px 2px rgba(0,123,255,0.25), 0 1px 8px 0 rgba(0,0,0,0.10);
  backdrop-filter: blur(4px);
  padding: 10px 20px;
  border-radius: 0;
  transition: box-shadow 0.3s, background 0.3s;
  margin-left: auto;
}
.home-view:not(.light-mode) .movie-rating-badge {
  background: rgba(0,0,0,0.7);
  border: 2px solid #00d4ff;
}

.rating-star {
  font-size: 1.25rem;
  color: #00d4ff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3) !important;
}

.rating-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.125rem;
  font-weight: 800;
  color: #00d4ff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3) !important;
}
.home-view.light-mode .rating-text {
  color: #007bff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15);
  font-weight: 900;
}

.home-view.light-mode .rating-star {
  color: #007bff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15) !important;
}

.home-view.light-mode .featured-movie-card .movie-rating-badge .rating-text {
  color: #007bff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15) !important;
  font-weight: 900 !important;
}

.featured-movie-content {
  padding: 32px;
}

.movie-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.tag {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(0, 123, 255, 0.3);
}

.featured-movie-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.featured-movie-description {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  line-height: 1.6;
  margin-bottom: 32px;
  font-size: 1rem;
}

.featured-movie-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.play-btn {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 16px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.play-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.4);
}

.info-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

/* Netflix Style Collage */
.movies-collage {
  background: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(10px);
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.collage-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.collage-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.collage-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 123, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.collage-item:hover {
  transform: scale(1.05);
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.2);
  z-index: 10;
}

.collage-item:hover::before {
  opacity: 1;
}

.item-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2a2a2a;
  aspect-ratio: 1;
  min-width: 0;
  min-height: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  display: block;
}

.collage-item:hover .item-image img {
  transform: scale(1.1);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.collage-item:hover .item-overlay {
  opacity: 1;
}

.play-icon {
  background: rgba(0, 123, 255, 0.9);
  color: white;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 24px;
  height: 24px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.1px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 0.5rem;
  color: #ffd700;
}

.score {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.5rem;
  font-weight: 700;
  color: #00d4ff;
}

/* Blog Section */
.blog-section {
  padding: 100px 0;
  background: #0f0f0f;
}

.blog-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  align-items: start;
}

/* Featured Blog */
.featured-blog-card {
  background: transparent !important;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
}

.featured-blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
  border-color: rgba(0, 123, 255, 0.3);
}

.featured-blog-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.featured-blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-blog-card:hover .featured-blog-image img {
  transform: scale(1.05);
}

.featured-blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.blog-category {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

.blog-stats {
  display: flex;
  gap: 16px;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.blog-views, .blog-likes {
  display: flex;
  align-items: center;
  gap: 4px;
}

.featured-blog-content {
  padding: 32px;
}

.blog-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #b3b3b3;
}

.blog-author {
  color: #007bff;
  font-weight: 600;
}

.blog-date, .blog-read-time {
  color: #666666;
}

.featured-blog-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.featured-blog-excerpt {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 1rem;
}

.featured-blog-btn {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
}

.featured-blog-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
}

/* Recent Blogs */
.recent-blogs {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.recent-blogs-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #ffffff;
  letter-spacing: -0.2px;
}

.recent-blogs-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: 8px;
}

.recent-blogs-container::-webkit-scrollbar {
  display: none;
}

.recent-blog-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  display: flex;
  min-height: 120px;
  height: 140px;
  align-items: stretch;
}

.recent-blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 123, 255, 0.15);
  border-color: rgba(0, 123, 255, 0.2);
}

.recent-blog-image {
  width: 120px;
  height: 100%;
  min-height: 120px;
  max-height: none;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.recent-blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.recent-blog-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
}

.recent-blog-card:hover .recent-blog-overlay {
  opacity: 1;
  pointer-events: auto;
}

.blog-category-small {
  background: rgba(0, 123, 255, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.recent-blog-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.blog-meta-small {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #b3b3b3;
  margin-bottom: 8px;
}

.blog-author-small {
  color: #007bff;
  font-weight: 600;
}

.blog-date-small {
  color: #666666;
}

.recent-blog-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
  line-height: 1.4;
  letter-spacing: -0.2px;
  white-space: normal;
  overflow: visible;
  display: block;
}

.recent-blog-excerpt {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 8px;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.blog-stats-small {
  display: flex;
  gap: 12px;
  font-size: 0.7rem;
  color: #666666;
}

.blog-views-small, .blog-likes-small {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Newsletter Section */
.newsletter-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  position: relative;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.newsletter-title {
  font-family: 'Montserrat', 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.newsletter-subtitle {
  font-family: 'Inter', 'Poppins', sans-serif;
  color: #b3b3b3;
  margin-bottom: 40px;
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 12px;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.newsletter-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 16px 20px;
  font-size: 1rem;
  outline: none;
}

.newsletter-input::placeholder {
  color: #b3b3b3;
}

.newsletter-btn {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
}

/* Light mode adjustments */
.home-view.light-mode .main-slider-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.home-view.light-mode .main-slider-section::before {
  background: radial-gradient(circle at 30% 20%, rgba(0, 123, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 50%);
}

.home-view.light-mode .main-slide-title {
  color: #0a0a0a;
}

.home-view.light-mode .main-slide-excerpt {
  color: #666666;
}

.home-view.light-mode .main-slider {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
}

.home-view.light-mode .featured-section {
  background: #f8f9fa;
}

.home-view.light-mode .categories-section {
  background: #ffffff;
}

.home-view.light-mode .newsletter-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.home-view.light-mode .comic-card,
.home-view.light-mode .category-card {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
}

.home-view.light-mode .comics-scroll-container::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.home-view.light-mode .comics-scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #007bff, #00d4ff);
}

.home-view.light-mode .comics-scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #0056b3, #00b3cc);
}

.home-view.light-mode .comic-title,
.home-view.light-mode .category-name {
  color: #0a0a0a;
}

.home-view.light-mode .comic-author,
.home-view.light-mode .category-description {
  color: #666666;
}

.home-view.light-mode .blog-section {
  background: #f8f9fa;
}

.home-view.light-mode .featured-blog-card,
.home-view.light-mode .recent-blog-card {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
}

.home-view.light-mode .featured-blog-title,
.home-view.light-mode .recent-blog-title,
.home-view.light-mode .recent-blogs-title {
  color: #0a0a0a;
}

.home-view.light-mode .featured-blog-excerpt,
.home-view.light-mode .recent-blog-excerpt {
  color: #666666;
}

.home-view.light-mode .blog-meta,
.home-view.light-mode .blog-meta-small {
  color: #666666;
}

.home-view.light-mode .blog-date,
.home-view.light-mode .blog-read-time,
.home-view.light-mode .blog-date-small {
  color: #999999;
}

.home-view.light-mode .blog-stats-small {
  color: #999999;
}

.home-view.light-mode .input-group {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
}

.home-view.light-mode .newsletter-input {
  color: #0a0a0a;
}

.home-view.light-mode .newsletter-input::placeholder {
  color: #666666;
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Main Slider Responsive - Mobile Layout */
  .main-slider {
    height: auto;
    min-height: 100vh;
  }
  
  .main-slide {
    position: relative;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-slide-image {
    height: 50vh;
    min-height: 300px;
    position: relative;
  }
  
  .main-slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 20px;
  }
  
  .main-slide-content {
    padding: 30px;
    max-width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px 0 0;
    margin-top: -20px;
    z-index: 10;
  }
  
  .main-slide-title {
    font-size: 1.75rem;
    margin-bottom: 12px;
  }
  
  .main-slide-excerpt {
    font-size: 0.875rem;
    margin-bottom: 20px;
  }
  
  .main-slide-btn {
    padding: 12px 24px;
    font-size: 0.8rem;
  }
  
  /* Slider Navigation Responsive */
  .slider-navigation {
    padding: 0 10px;
    top: 25vh;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
  
  .nav-btn svg {
    width: 16px;
    height: 16px;
  }
  
  /* News Slider Responsive - Smaller and Compact */
  .news-slider-container {
    padding: 15px 10px;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }
  
  .news-slider-track {
    gap: 12px;
    padding: 0 5px;
  }
  
  .news-slide-item {
    min-width: 200px;
    max-width: 250px;
    padding: 12px;
    border-radius: 12px;
  }
  
  .news-item-content {
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .news-icon {
    width: 24px;
    height: 24px;
  }
  
  .news-icon svg {
    width: 12px;
    height: 12px;
  }
  
  .news-slide-title {
    font-size: 0.8rem;
    line-height: 1.3;
  }
  
  /* Section Headers Responsive */
  .section-content-container {
    gap: 20px;
    flex-direction: column;
  }
  
  .section-text-container {
    order: 1;
  }
  
  .section-title-image {
    order: 2;
    width: 200px;
    height: 180px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  /* Games Section Responsive */
  .games-mosaic {
    grid-template-columns: 1fr;
    width: 100%;
  }
  
  .game-mosaic-image {
    width: 180px;
    height: 180px;
  }
  
  .game-mosaic-content {
    padding: 16px 20px;
    min-height: 180px;
  }
  
  .game-mosaic-title {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
  
  .game-mosaic-date {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }
  
  .game-mosaic-btn {
    padding: 8px 16px;
    font-size: 0.7rem;
  }
  
  /* Theme Toggle Responsive */
  .theme-toggle-btn {
    bottom: 80px;
    right: 15px;
    padding: 10px;
  }
  
  /* Comics Section Responsive */
  .comics-scroll-container {
    padding: 15px 0;
  }
  
  .comics-scroll-track {
    gap: 15px;
    padding: 0 15px;
  }
  
  .comic-card {
    min-width: 220px;
  }
  
  /* Blog Section Responsive */
  .blog-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .featured-blog-title {
    font-size: 1.5rem;
  }
  
  .recent-blogs {
    height: 500px;
  }
  
  .recent-blog-card {
    height: 100px;
  }
  
  .recent-blog-image {
    width: 100px;
    height: 100px;
  }
  
  /* Categories Section Responsive */
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  /* Newsletter Section Responsive */
  .input-group {
    flex-direction: column;
  }
  
  .newsletter-btn {
    justify-content: center;
  }
  .main-slide-overlay,
  .desktop-only {
    display: none !important;
  }
  .mobile-slide-content {
    display: block !important;
    background: none;
    position: static;
    text-align: center;
    padding: 20px 10px 30px 10px;
    color: inherit;
    box-shadow: none;
    max-width: 100%;
  }
  .main-slide-image {
    position: static;
    height: auto;
    min-height: 200px;
    width: 100%;
  }
  .main-slide-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
}

@media (max-width: 480px) {
  /* Main Slider Mobile - Compact Layout */
  .main-slider {
    height: auto;
    min-height: 90vh;
  }
  
  .main-slide {
    min-height: 90vh;
  }
  
  .main-slide-image {
    height: 45vh;
    min-height: 250px;
  }
  
  .main-slide-content {
    padding: 20px;
    max-width: 100%;
    margin-top: -15px;
  }
  
  .main-slide-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .main-slide-excerpt {
    font-size: 0.875rem;
    margin-bottom: 16px;
  }
  
  .main-slide-btn {
    padding: 10px 20px;
    font-size: 0.75rem;
  }
  
  /* Slider Navigation Mobile */
  .slider-navigation {
    padding: 0 5px;
    top: 20vh;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .nav-btn svg {
    width: 14px;
    height: 14px;
  }
  
  /* News Slider Mobile - Even Smaller */
  .news-slider-container {
    padding: 10px 8px;
  }
  
  .news-slider-track {
    gap: 10px;
    padding: 0px;
  }
  
  .news-slide-item {
    min-width: 180px;
    max-width: 220px;
    padding: 10px;
  }
  
  .news-item-content {
    gap: 6px;
    margin-bottom: 6px;
  }
  
  .news-icon {
    width: 20px;
    height: 20px;
  }
  
  .news-icon svg {
    width: 10px;
    height: 10px;
  }
  
  .news-slide-title {
    font-size: 0.75rem;
    line-height: 1.2;
  }
  
  /* Section Headers Mobile */
  .section-content-container {
    gap: 15px;
  }
  
  .section-title-image {
    width: 180px;
    height: 160px;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  /* Games Section Mobile */
  .games-mosaic {
    grid-template-columns: 1fr;
  }
  
  .game-mosaic-item {
    flex-direction: column;
  }
  
  .game-mosaic-image {
    width: 100%;
    height: 150px;
  }
  
  .game-mosaic-content {
    padding: 16px;
    min-height: auto;
  }
  
  .game-mosaic-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  .game-mosaic-date {
    font-size: 0.875rem;
    margin-bottom: 12px;
  }
  
  .game-mosaic-btn {
    padding: 10px 20px;
    font-size: 0.8rem;
    align-self: stretch;
    text-align: center;
  }
  
  /* Theme Toggle Mobile */
  .theme-toggle-btn {
    bottom: 70px;
    right: 10px;
    padding: 8px;
  }
  
  /* Comics Section Mobile */
  .comics-scroll-container {
    padding: 10px 0;
  }
  
  .comics-scroll-track {
    gap: 12px;
    padding: 0 12px;
  }
  
  .comic-card {
    min-width: 200px;
  }
  
  .comic-image {
    height: 350px;
  }
  
  /* Blog Section Mobile */
  .blog-layout {
    gap: 20px;
  }
  
  .featured-blog-content {
    padding: 20px;
  }
  
  .featured-blog-title {
    font-size: 1.25rem;
  }
  
  .recent-blogs {
    height: 400px;
  }
  
  .recent-blog-card {
    height: 90px;
  }
  
  .recent-blog-image {
    width: 90px;
    height: 90px;
  }
  
  .recent-blog-content {
    padding: 12px;
  }
  
  .recent-blog-title {
    font-size: 0.875rem;
  }
  
  .recent-blog-excerpt {
    font-size: 0.75rem;
  }
}

/* YouTube Videos Section */
.youtube-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.youtube-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(0, 123, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.youtube-carousel {
  position: relative;
  overflow: hidden;
  margin-top: 60px;
}

.carousel-track {
  display: flex;
  gap: 24px;
  animation: carouselScroll 60s linear infinite;
  width: max-content;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@keyframes carouselScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.video-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(0, 123, 255, 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-width: 320px;
  max-width: 320px;
  position: relative;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 123, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.video-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
}

.video-card:hover::before {
  opacity: 1;
}

.video-thumbnail {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: #2a2a2a;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.1);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centrado vertical */
  align-items: center;     /* Centrado horizontal */
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .video-overlay {
  opacity: 1;
}

.play-button {
  background: rgba(0, 123, 255, 0.9);
  color: white;
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: rgba(0, 123, 255, 1);
  transform: scale(1.1);
}

.video-duration {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.video-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;
  letter-spacing: -0.2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.video-channel {
  font-family: 'Inter', sans-serif;
  color: #b3b3b3;
  font-size: 0.875rem;
  margin: 0;
  font-weight: 500;
}

.video-stats {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #666666;
}

.views {
  color: #007bff;
  font-weight: 600;
}

.date {
  color: #666666;
}

.games-section-unique {
  padding: 100px 0 60px 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #101c2c 100%);
  position: relative;
  z-index: 1;
}

.games-mosaic {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin-top: 40px;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.game-mosaic-item {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: stretch;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.game-mosaic-item:hover {
  background: #2a2a2a;
  border-color: rgba(0, 123, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.2);
}

.game-mosaic-image {
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  overflow: hidden;
  background: #2a2a2a;
  position: relative;
}

.game-mosaic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-mosaic-item:hover .game-mosaic-image img {
  transform: scale(1.1);
}

.game-mosaic-content {
  flex: 1;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 280px;
}

.game-mosaic-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.3;
  letter-spacing: -0.2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-mosaic-date {
  font-family: 'Inter', sans-serif;
  color: #007bff;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.game-mosaic-btn {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  align-self: flex-start;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
}

.game-mosaic-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

/* CSS al final del bloque de estilos */
.news-channel-header {
  width: 100%;
  background: #007bff;
  color: #fff;
  padding: 18px 0 14px 0;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  letter-spacing: 2px;
  box-shadow: 0 2px 12px rgba(0, 123, 255, 0.10);
  margin-bottom: 0;
  border-bottom: 2px solid #fff3;
  position: static; /* Asegura flujo normal */
  z-index: auto;
}

.news-channel-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.3em;
  text-transform: uppercase;
  color: #fff;
  background: none;
  text-shadow: none;
  letter-spacing: 2px;
  display: inline-block;
}

.enhanced-overlay {
  background: transparent;
}
.slider-indicators {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 16px;
  z-index: 20;
}
.slider-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: 2px solid #007bff;
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,123,255,0.15);
}
.slider-dot.active {
  background: #007bff;
  transform: scale(1.2);
  box-shadow: 0 4px 16px rgba(0,123,255,0.3);
}

@media (max-width: 768px) {
  .main-slider-track {
    display: block;
  }
  .main-slide {
    position: static !important;
    opacity: 1 !important;
    display: none;
  }
  .main-slide.active {
    display: block;
  }
  .main-slide-image {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}

@media (max-width: 768px) {
  .main-slider-section {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .main-slider {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .main-slide-image {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-content.mobile-slide-content {
    margin-top: 24px !important;
    margin-bottom: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 8px !important;
  }
  .main-slide-title {
    margin-top: 0 !important;
    margin-bottom: 4px !important;
    padding-top: 0 !important;
    font-size: 1.1rem !important;
  }
  .main-slide-excerpt {
    margin-top: 0 !important;
    margin-bottom: 4px !important;
    font-size: 0.95rem !important;
  }
  .main-slide-btn {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 8px 16px !important;
    font-size: 0.85rem !important;
  }
}

@media (max-width: 768px) {
  .main-slide-image {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: unset !important;
    display: block !important;
  }
  .main-slide-image img {
    width: 100%;
    height: auto !important;
    object-fit: contain !important;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .main-slide {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    max-height: none !important;
  }
  .main-slider-track {
    margin: 0 !important;
    padding: 0 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-image img {
    object-fit: contain !important;
    background: #000 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-title {
    margin-bottom: 10px !important;
  }
  .main-slide-excerpt {
    margin-bottom: 10px !important;
  }
}

@media (max-width: 768px) {
  .main-slide-content.mobile-slide-content {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
}

@media (max-width: 768px) {
  .slider-indicators {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .main-slide-btn {
    padding: 16px 32px !important;
    font-size: 1.1rem !important;
    border-radius: 10px !important;
  }
}

@media (max-width: 768px) {
  .main-slider,
  .main-slide,
  .main-slide-content.mobile-slide-content {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .main-slide-image {
    width: 100%;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    aspect-ratio: unset !important;
    display: block !important;
    margin: 0 auto 8px auto !important; /* 8px solo abajo para separar del texto */
    padding: 0 4px 0 4px !important; /* un poco de espacio a los lados */
    box-sizing: border-box;
  }
  .main-slide-image img {
    display: block !important;
    width: 100%;
    height: auto !important;
    object-fit: unset !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #000 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-image {
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    position: relative;
  }
  .main-slide-image img {
    display: block !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    object-fit: unset !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #000 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-content.mobile-slide-content {
    margin: 1rem 1.5rem !important;
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 768px) {
  .news-slider-container {
    padding: 8px 0 !important;
  }
  .news-slider-track {
    gap: 6px !important;
    padding: 0 2px !important;
  }
  .news-slide-item {
    min-width: 120px !important;
    max-width: 160px !important;
    padding: 6px !important;
    border-radius: 8px !important;
  }
  .news-slide-title {
    font-size: 0.7rem !important;
  }
}

@media (max-width: 768px) {
  .news-slider-track {
    gap: 4px !important;
    padding: 0 2px !important;
  }
  .news-slide-item {
    min-width: 32vw !important;
    max-width: 32vw !important;
    padding: 4px !important;
    border-radius: 8px !important;
    box-sizing: border-box;
  }
}

@media (max-width: 768px) {
  br {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .section-title,
  .section-subtitle {
    text-align: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 768px) {
  .toys-scroll-container {
    display: block !important;
    overflow-x: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .toys-scroll-track {
    display: flex !important;
    justify-content: flex-start !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    min-width: max-content !important;
  }
  .toy-card {
    margin-left: 0 !important;
    margin-right: 8px !important;
  }
  .toy-card:first-child {
    margin-left: 0 !important;
  }
}

@media (max-width: 768px) {
  .toy-card,
  .toy-image,
  .toy-info {
    width: unset !important;
    height: unset !important;
    padding: unset !important;
    min-width: unset !important;
    max-width: unset !important;
  }
}

@media (max-width: 768px) {
  .toy-card {
    min-width: 65vw !important;
    max-width: 65vw !important;
    width: 65vw !important;
    height: 320px !important;
    box-sizing: border-box;
    border-radius: 18px !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .toy-image {
    width: 100% !important;
    height: 180px !important;
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .toy-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
  }
  .toy-info {
    flex: 1 1 auto;
    text-align: center;
    padding: 10px 8px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .toy-card {
    min-width: 60vw !important;
    max-width: 70vw !important;
    width: 70vw !important;
    box-sizing: border-box;
  }
}

@media (max-width: 768px) {
  .toys-scroll-container {
    margin-bottom: 1rem !important;
  }
}

@media (max-width: 768px) {
  .games-mosaic {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .game-mosaic-item {
    flex-direction: column !important;
    min-height: unset !important;
    height: auto !important;
  }
  .game-mosaic-image {
    width: 100% !important;
    height: 180px !important;
    margin-bottom: 0 !important;
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
  }
  .game-mosaic-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
  }
  .game-mosaic-content {
    padding: 16px 12px !important;
    min-height: unset !important;
    text-align: center !important;
  }
}

@media (max-width: 768px) {
  .movies-collage {
    padding: 8px 0 !important;
  }
  .collage-grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .collage-item {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    aspect-ratio: unset !important;
    margin: 0 auto !important;
    border-radius: 16px !important;
  }
  .item-image {
    width: 100% !important;
    height: 180px !important;
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
  }
  .item-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
  }
}

@media (max-width: 768px) {
  .movies-layout {
    display: flex !important;
    flex-direction: column !important;
    gap: 0 !important;
  }
  .featured-movie {
    width: 100% !important;
    margin-bottom: 16px !important;
    order: 0 !important;
  }
  .movies-collage {
    width: 100% !important;
    order: 1 !important;
    padding: 0 !important;
  }
  .collage-grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .collage-item {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    aspect-ratio: unset !important;
    margin: 0 auto !important;
    border-radius: 16px !important;
  }
  .item-image {
    width: 100% !important;
    height: 180px !important;
    border-radius: 16px 16px 0 0 !important;
    overflow: hidden;
  }
  .item-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
  }
}

@media (max-width: 768px) {
  .item-info {
    padding: 12px 10px !important;
    gap: 6px !important;
  }
  .item-title {
    font-size: 1.1rem !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    margin-bottom: 4px !important;
  }
  .item-rating {
    font-size: 1rem !important;
    gap: 4px !important;
  }
  .star {
    font-size: 1.1rem !important;
  }
  .score {
    font-size: 1rem !important;
    font-weight: 700 !important;
  }
  .play-icon {
    width: 36px !important;
    height: 36px !important;
    padding: 6px !important;
  }
  .play-icon svg {
    width: 28px !important;
    height: 28px !important;
  }
}

.home-view.light-mode .section-title {
  background: linear-gradient(135deg, #1a237e, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.home-view.light-mode .section-subtitle {
  color: #111 !important;
}

.home-view.light-mode .newsletter-title {
  background: linear-gradient(135deg, #1a237e, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.home-view.light-mode .newsletter-subtitle {
  color: #111 !important;
}

.news-slide-title, .news-slide-excerpt, .news-item-content {
  color: #fff !important;
}
.home-view.light-mode .news-slide-title,
.home-view.light-mode .news-slide-excerpt,
.home-view.light-mode .news-item-content {
  color: #fff !important;
}

@media (min-width: 769px) {
  .home-view.light-mode .news-slide-title,
  .home-view.light-mode .news-slide-excerpt,
  .home-view.light-mode .news-item-content {
    color: #fff !important;
  }
}

/* SIEMPRE blanco en modo oscuro */
.news-slide-title, .news-slide-excerpt, .news-item-content {
  color: #fff;
}

/* SOLO blanco en modo claro y escritorio */
@media (min-width: 769px) {
  .home-view.light-mode .news-slide-title,
  .home-view.light-mode .news-slide-excerpt,
  .home-view.light-mode .news-item-content {
    color: #fff !important;
  }
}

/* Oscuro en modo claro y móvil/tablet */
@media (max-width: 768px) {
  .home-view.light-mode .news-slide-title,
  .home-view.light-mode .news-slide-excerpt,
  .home-view.light-mode .news-item-content {
    color: #222 !important;
  }
}

@media (min-width: 769px) {
  .home-view.light-mode .news-slider-container,
  .home-view.light-mode .news-slide-title,
  .home-view.light-mode .news-slide-excerpt,
  .home-view.light-mode .news-item-content {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%) !important;
    color: #fff !important;
  }
}

/* Oscuro en modo claro y móvil/tablet */
@media (max-width: 768px) {
  .home-view.light-mode .news-slide-title,
  .home-view.light-mode .news-slide-excerpt,
  .home-view.light-mode .news-item-content {
    color: #222 !important;
  }
}

.home-view.light-mode .main-slide-title,
.home-view.light-mode .main-slide-excerpt {
  color: #fff !important;
}

.home-view.light-mode .featured-blog-card {
  background: transparent !important;
  box-shadow: none !important;
}

/* Fuerza el mismo estilo de medidor de noticias en modo claro y oscuro */
.home-view.light-mode .news-progress-bar,
.home-view.light-mode .news-progress {
  background: unset !important;
}
.home-view.light-mode .news-progress-bar {
  background: rgba(0, 123, 255, 0.2) !important;
}
.home-view.light-mode .news-progress {
  background: linear-gradient(90deg, #007bff, #00d4ff) !important;
}

/* Fondos claros para modo claro en secciones de juguetes, juegos, películas y YouTube */
.home-view.light-mode .toys-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}
.home-view.light-mode .games-section-unique {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}
.home-view.light-mode .movies-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}
.home-view.light-mode .youtube-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

/* Tarjetas claras en modo claro */
.home-view.light-mode .toy-card {
  background: #fff;
  border-color: rgba(0,0,0,0.08);
}

.home-view.light-mode .game-mosaic-item {
  background: #fff;
  border-color: rgba(0,0,0,0.08);
}

.home-view.light-mode .featured-movie-card {
  background: #fff !important;
  border-color: rgba(0,0,0,0.08);
}

.home-view.light-mode .collage-item {
  background: #fff;
  border-color: rgba(0,0,0,0.08);
}

.home-view.light-mode .video-card {
  background: #fff;
  border-color: rgba(0,0,0,0.08);
}

.home-view.light-mode .movies-collage {
  background: #fff;
}

/* Texto negro en tarjetas para modo claro */
.home-view.light-mode .toy-card,
.home-view.light-mode .toy-card * {
  color: #111 !important;
}

.home-view.light-mode .game-mosaic-item,
.home-view.light-mode .game-mosaic-item * {
  color: #111 !important;
}

.home-view.light-mode .featured-movie-card,
.home-view.light-mode .featured-movie-card * {
  color: #111 !important;
}

.home-view.light-mode .collage-item,
.home-view.light-mode .collage-item * {
  color: #111 !important;
}

.home-view.light-mode .video-card,
.home-view.light-mode .video-card * {
  color: #111 !important;
}

.home-view.light-mode .movies-collage,
.home-view.light-mode .movies-collage * {
  color: #111 !important;
}

/* Permitir texto blanco en el collage de películas en modo claro */
.home-view.light-mode .collage-item,
.home-view.light-mode .collage-item * {
  color: #fff !important;
}

.home-view.light-mode .collage-item .item-title,
.home-view.light-mode .collage-item .item-rating,
.home-view.light-mode .collage-item .star,
.home-view.light-mode .collage-item .score {
  color: #fff !important;
}

/* Texto e íconos blancos en overlays de videos de YouTube en modo claro */
.home-view.light-mode .video-card .video-overlay,
.home-view.light-mode .video-card .video-overlay *,
.home-view.light-mode .video-card .play-button,
.home-view.light-mode .video-card .play-button *,
.home-view.light-mode .video-card .video-duration {
  color: #fff !important;
  fill: #fff !important;
}

@media (max-width: 480px) {
  .recent-blog-card {
    height: 120px;
  }
  .recent-blog-title {
    color: #111 !important;
  }
  .recent-blog-excerpt {
    -webkit-line-clamp: 3;
    color: #444 !important;
  }
}

.home-view.light-mode .recent-blog-title {
  color: #111 !important;
}
.home-view.light-mode .recent-blog-excerpt {
  color: #444 !important;
}

@media (max-width: 480px) {
  .recent-blog-card {
    height: auto;
    min-height: 120px;
  }
}

.recent-blog-title,
.recent-blog-excerpt,
.blog-stats-small {
  flex: unset !important;
  min-height: unset !important;
  max-height: unset !important;
}

@media (max-width: 768px) {
  .home-view:not(.light-mode) .news-slide-title,
  .home-view:not(.light-mode) .news-slide-excerpt,
  .home-view:not(.light-mode) .news-item-content {
    color: #fff !important;
  }
}

@media (max-width: 768px) {
  .home-view:not(.light-mode) .recent-blog-title,
  .home-view:not(.light-mode) .recent-blog-excerpt {
    color: #fff !important;
  }
  .home-view:not(.light-mode) .recent-blog-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    border-radius: 0 !important;
    background: #000 !important;
  }
  .home-view:not(.light-mode) .recent-blog-image {
    width: 90px !important;
    min-height: 90px !important;
    max-height: 140px !important;
    height: auto !important;
    display: flex !important;
    align-items: stretch !important;
    overflow: hidden !important;
  }
}

@media (max-width: 480px) {
  .theme-toggle-btn {
    bottom: 120px;
    right: 20px;
    padding: 12px;
  }
}
@media (max-width: 768px) {
  .theme-toggle-btn {
    bottom: 100px;
    right: 20px;
    padding: 12px;
  }
}

.home-view.light-mode .news-slider-container {
  background: #fff !important;
}

.home-view.light-mode .news-slide-item {
  background: #fff !important;
  color: #111 !important;
  border-color: rgba(0,0,0,0.08) !important;
}
.home-view.light-mode .news-slide-item:hover,
.home-view.light-mode .news-slide-item.active {
  background: #f3f4f6 !important;
  color: #111 !important;
  border-color: #007bff !important;
}
.home-view.light-mode .news-slide-title,
.home-view.light-mode .news-slide-excerpt,
.home-view.light-mode .news-item-content {
  color: #111 !important;
}

@media (min-width: 769px) {
  .home-view.light-mode .news-item-content {
    background: transparent !important;
    color: #111 !important;
    border-radius: 12px;
    padding: 8px 12px;
    box-shadow: none !important;
    background-image: none !important;
    background-color: transparent !important;
  }
}

.home-view.light-mode .news-slide-title {
  background: transparent !important;
}

@media (max-width: 768px) {
  .home-view.light-mode .main-slide-title,
  .home-view.light-mode .main-slide-excerpt {
    color: #111 !important;
  }
}

@media (max-width: 768px) {
  .main-slide-content.mobile-slide-content {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .main-slide-content.mobile-slide-content .main-slide-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
  }
}

@media (max-width: 768px) {
  /* Centrar contenido en sección de películas */
  .featured-movie-content,
  .item-info {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .featured-movie-content .play-btn,
  .featured-movie-content .info-btn,
  .item-info .play-icon {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
  }
  /* Centrar contenido en sección de juegos */
  .game-mosaic-content {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .game-mosaic-content .game-mosaic-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
  }
}

@media (max-width: 768px) {
  /* Centrar contenido en sección de blogs */
  .featured-blog-content {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .featured-blog-content .featured-blog-btn {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block !important;
  }
  /* Mostrar recent blogs en móviles */
  .recent-blogs {
    display: block !important;
    height: auto !important;
    margin-top: 32px !important;
  }
  .recent-blogs-container {
    display: block !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    max-height: 400px !important;
    padding-right: 0 !important;
  }
  .recent-blog-card {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    margin-bottom: 16px !important;
  }
}

@media (max-width: 768px) {
  .theme-toggle-btn {
    bottom: 40px !important;
  }
}

.rating-star {
  font-size: 1.25rem;
  color: #00d4ff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3) !important;
}
.home-view.light-mode .featured-movie-card .movie-rating-badge .rating-star {
  color: #007bff !important;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15) !important;
}

</style> 