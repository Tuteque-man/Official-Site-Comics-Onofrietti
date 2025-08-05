<template>
  <!-- Header Desktop -->
  <header :class="['menu-one', { 'light-mode': isLightMode }]">
    <div class="header-container">
      <!-- Contenedor específico para el logo -->
      <div class="logo-container">
        <div class="header-left">
          <div class="auth-buttons">
            <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
              </svg>
              <span class="tooltip">Regístrate</span>
            </div>
            <span class="separator">/</span>
            <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 0 1 .858.514"/>
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
              </svg>
              <span class="tooltip">Inicia sesión</span>
            </div>
          </div>
        </div>
        <div class="header-center">
          <img src="/img/Logo.png" class="logo" :class="{ 'logo-navigating': isNavigating }" alt="Logo Comics Onofrietti">
        </div>
        <div class="header-right">
          <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            <span class="tooltip">Buscar</span>
          </div>
        </div>
      </div>
      <nav class="desktop-nav">
        <a href="#new" class="nav-link">Nuevos</a>
        <a href="#comics" class="nav-link">Comics</a>
        <a href="#characters" class="nav-link">Personajes</a>
        <a href="#games" class="nav-link">Juegos</a>
        <a href="#more" class="nav-link">Más</a>
      </nav>
    </div>
  </header>

  <!-- Header Mobile/Tablet -->
  <header :class="['menu-two', { 'light-mode': isLightMode }]">
    <div class="mobile-container">
      <div class="mobile-header">
        <div class="mobile-logo">
          <img src="/img/Logo.png" class="logo-mobile" :class="{ 'logo-navigating': isNavigating }" alt="Logo Comics Onofrietti">
        </div>
        <div class="mobile-menu-toggle">
          <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Menú móvil desplegable -->
    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-header">
        <span class="mobile-menu-title">Menú</span>
        <button class="mobile-menu-close" id="menu-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav">
        <a href="#comics" class="mobile-nav-link">Comics</a>
        <a href="#characters" class="mobile-nav-link">Personajes</a>
        <a href="#games" class="mobile-nav-link">Juegos</a>
        <a href="#more" class="mobile-nav-link">Más</a>
        <a href="#search" class="mobile-nav-link">Buscar</a>
        <a href="#login" class="mobile-nav-link">Iniciar sesión</a>
        <a href="#register" class="mobile-nav-link">Regístrate</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  isLightMode: Boolean
})

const isNavigating = ref(false)

onMounted(() => {
  // Funcionalidad del menú móvil
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  const menuClose = document.getElementById('menu-close')

  if (menuToggle && mobileMenu && menuClose) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active')
    })

    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active')
    })

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active')
      }
    })
  }

  // Detectar navegación en la página
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link')
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      isNavigating.value = true
      setTimeout(() => {
        isNavigating.value = false
      }, 2000) // El efecto dura 2 segundos
    })
  })

  // Detectar scroll para efecto de navegación
  let scrollTimeout
  window.addEventListener('scroll', () => {
    isNavigating.value = true
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isNavigating.value = false
    }, 1000)
  })
})
</script>

<style scoped>
/* Estilos del menubar */

/* Header Desktop */
.menu-one {
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #fff;
  padding: 15px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Contenedor específico para el logo */
.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.header-left, .header-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-left {
  justify-content: flex-start;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.separator {
  color: #666;
  font-weight: 300;
}

.logo {
  width: 250px;
  height: auto;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: logoColorChange 8s ease-in-out infinite;
}

.logo:hover {
  transform: scale(1.1) rotateY(15deg) rotateX(5deg);
  filter: drop-shadow(0 8px 25px var(--logo-glow-color, rgba(0, 123, 255, 0.4))) brightness(1.1);
  clip-path: polygon(5% 5%, 95% 0%, 100% 95%, 0% 100%);
}

.logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--logo-bg-start, rgba(0, 123, 255, 0.1)), var(--logo-bg-end, rgba(0, 212, 255, 0.1)));
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: -1;
}

.logo:hover::before {
  opacity: 1;
  clip-path: polygon(10% 10%, 90% 5%, 95% 90%, 5% 95%);
  animation: logoGlow 2s ease-in-out infinite alternate;
}

.logo::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--logo-border-start, #007bff), var(--logo-border-middle, #00d4ff), var(--logo-border-end, #007bff));
  background-size: 200% 200%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: -2;
  animation: borderGlow 3s ease-in-out infinite;
}

.logo:hover::after {
  opacity: 1;
  clip-path: polygon(2% 2%, 98% 0%, 100% 98%, 0% 100%);
}

/* Efecto de recorte durante navegación */
.logo-navigating {
  animation: navigateClip 2s ease-in-out infinite;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.logo-navigating::before {
  animation: navigateGlow 2s ease-in-out infinite;
}

.logo-navigating::after {
  animation: navigateBorder 2s ease-in-out infinite;
}

@keyframes navigateClip {
  0%, 100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  25% {
    clip-path: polygon(10% 5%, 90% 0%, 95% 95%, 5% 100%);
  }
  50% {
    clip-path: polygon(5% 10%, 95% 5%, 100% 90%, 0% 95%);
  }
  75% {
    clip-path: polygon(0% 15%, 100% 10%, 105% 85%, -5% 90%);
  }
}

@keyframes navigateGlow {
  0%, 100% {
    opacity: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  25% {
    opacity: 1;
    clip-path: polygon(15% 10%, 85% 5%, 90% 90%, 10% 95%);
  }
  50% {
    opacity: 1;
    clip-path: polygon(10% 15%, 90% 10%, 95% 85%, 5% 90%);
  }
  75% {
    opacity: 1;
    clip-path: polygon(5% 20%, 95% 15%, 100% 80%, 0% 85%);
  }
}

@keyframes navigateBorder {
  0%, 100% {
    opacity: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  25% {
    opacity: 1;
    clip-path: polygon(8% 3%, 92% -2%, 97% 97%, 3% 102%);
  }
  50% {
    opacity: 1;
    clip-path: polygon(3% 8%, 97% 3%, 102% 92%, -2% 97%);
  }
  75% {
    opacity: 1;
    clip-path: polygon(-2% 13%, 102% 8%, 107% 83%, -7% 88%);
  }
}

@keyframes logoGlow {
  0% {
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
  }
}

@keyframes borderGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.svg-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.svg-container:hover {
  background: rgba(0, 123, 255, 0.2);
  transform: scale(1.1);
}

.svg-container svg {
  width: 18px;
  height: 18px;
  color: #fff;
  transition: all 0.3s ease;
}

.svg-container:hover svg {
  color: #007bff;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #007bff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  margin-top: 5px;
}

.tooltip::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(0, 0, 0, 0.9);
}

.svg-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.desktop-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px 0;
}

.nav-link:hover {
  color: #007bff;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Header Mobile/Tablet */
.menu-two {
  display: none;
  width: 100%;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #fff;
  padding: 10px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.mobile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.mobile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Logo móvil con colores dinámicos */
.logo-mobile {
  width: 150px;
  height: auto;
  transition: all 0.3s ease;
  animation: logoColorChange 8s ease-in-out infinite;
}

.logo-mobile:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 2px 4px var(--logo-glow-color, rgba(0, 123, 255, 0.3)));
}

/* Efecto de recorte durante navegación para móvil */
.logo-mobile.logo-navigating {
  animation: navigateClipMobile 2s ease-in-out infinite;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

@keyframes navigateClipMobile {
  0%, 100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  25% {
    clip-path: polygon(15% 10%, 85% 5%, 90% 90%, 10% 95%);
  }
  50% {
    clip-path: polygon(10% 15%, 90% 10%, 95% 85%, 5% 90%);
  }
  75% {
    clip-path: polygon(5% 20%, 95% 15%, 100% 80%, 0% 85%);
  }
}

.mobile-menu-toggle {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
}

.mobile-menu-toggle:hover {
  background: rgba(0, 123, 255, 0.2);
  transform: scale(1.1);
}

.mobile-menu-toggle svg {
  color: #fff;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover svg {
  color: #007bff;
}

/* Menú móvil desplegable */
.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.mobile-menu.active {
  left: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.mobile-menu-close {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.mobile-menu-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.mobile-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.mobile-nav-link {
  display: block;
  padding: 15px 20px;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link:hover {
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1));
  color: #007bff;
  transform: translateX(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .menu-one {
    display: none !important;
  }
  .menu-two {
    display: block !important;
  }
  .menu-two.light-mode .mobile-menu-toggle svg {
    color: #111 !important;
  }
}

@media (min-width: 769px) {
  .menu-one {
    display: block !important;
  }
  .menu-two {
    display: none !important;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu.active {
  animation: fadeIn 0.3s ease;
}

/* Animación de cambio de colores del logo */
@keyframes logoColorChange {
  0%, 25% {
    --logo-glow-color: rgba(233, 30, 99, 0.4);
    --logo-bg-start: rgba(233, 30, 99, 0.1);
    --logo-bg-end: rgba(156, 39, 176, 0.1);
    --logo-border-start: #e91e63;
    --logo-border-middle: #9c27b0;
    --logo-border-end: #2196f3;
  }
  25%, 50% {
    --logo-glow-color: rgba(33, 150, 243, 0.4);
    --logo-bg-start: rgba(33, 150, 243, 0.1);
    --logo-bg-end: rgba(0, 188, 212, 0.1);
    --logo-border-start: #2196f3;
    --logo-border-middle: #00bcd4;
    --logo-border-end: #4caf50;
  }
  50%, 75% {
    --logo-glow-color: rgba(255, 152, 0, 0.4);
    --logo-bg-start: rgba(255, 152, 0, 0.1);
    --logo-bg-end: rgba(255, 87, 34, 0.1);
    --logo-border-start: #ff9800;
    --logo-border-middle: #ff5722;
    --logo-border-end: #ffeb3b;
  }
  75%, 100% {
    --logo-glow-color: rgba(233, 30, 99, 0.4);
    --logo-bg-start: rgba(233, 30, 99, 0.1);
    --logo-bg-end: rgba(255, 193, 7, 0.1);
    --logo-border-start: #e91e63;
    --logo-border-middle: #ffc107;
    --logo-border-end: #ff5722;
  }
}

.menu-one.light-mode {
  background: linear-gradient(135deg, #fff 0%, #f3f6fa 100%);
  color: #111;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.menu-one.light-mode .header-container,
.menu-one.light-mode .logo-container,
.menu-one.light-mode .header-left,
.menu-one.light-mode .header-right,
.menu-one.light-mode .header-center {
  color: #111;
}
.menu-one.light-mode .nav-link,
.menu-one.light-mode .auth-buttons .svg-container svg,
.menu-one.light-mode .separator {
  color: #111 !important;
}
.menu-one.light-mode .nav-link:hover {
  color: #007bff !important;
}
.menu-one.light-mode .svg-container {
  background: rgba(0,0,0,0.06) !important;
}
.menu-one.light-mode .svg-container svg {
  color: #111;
}
.menu-one.light-mode .svg-container:hover svg {
  color: #007bff !important;
}
.menu-one.light-mode .tooltip {
  background: rgba(255,255,255,0.95);
  color: #007bff;
  border: 1px solid #007bff;
}
.menu-one.light-mode .tooltip::before {
  border-bottom-color: rgba(255,255,255,0.95);
}
.menu-one.light-mode .logo {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));
}

.menu-two.light-mode {
  background: #fff !important;
  color: #111;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.menu-two.light-mode .mobile-header {
  background: #fff !important;
  border-bottom: 1px solid #111 !important;
}
.menu-two.light-mode .mobile-menu {
  background: #fff !important;
}
.menu-two.light-mode .mobile-menu-header {
  border-bottom: 1px solid #111 !important;
}
.menu-two.light-mode .mobile-nav-link {
  border-bottom: 1px solid #111 !important;
}
.menu-two.light-mode .mobile-nav-link,
.menu-two.light-mode .mobile-menu-title,
.menu-two.light-mode .mobile-menu-close svg {
  color: #111 !important;
}
.menu-two.light-mode .mobile-nav-link:hover {
  color: #007bff !important;
}
.menu-two.light-mode .mobile-menu-close {
  background: rgba(0,0,0,0.06) !important;
}
.menu-two.light-mode .logo-mobile {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));
}
</style> 