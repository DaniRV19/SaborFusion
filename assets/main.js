// Main JavaScript functionality for SaborFusion website

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu")
  if (menu) {
    menu.classList.toggle("hidden")
  }
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in-on-scroll")
  animatedElements.forEach((el) => observer.observe(el))
})

// Form validation utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(formId) {
  const form = document.getElementById(formId)
  if (!form) return false

  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("border-red-500")
      isValid = false
    } else {
      input.classList.remove("border-red-500")

      // Email validation
      if (input.type === "email" && !validateEmail(input.value)) {
        input.classList.add("border-red-500")
        isValid = false
      }
    }
  })

  return isValid
}

// Shopping cart functionality (basic)
const cart = JSON.parse(localStorage.getItem("saborfusion_cart")) || []

function addToCart(productId, productName, price) {
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: 1,
    })
  }

  localStorage.setItem("saborfusion_cart", JSON.stringify(cart))
  updateCartCount()
  showNotification("Producto añadido al carrito")
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartCountElement = document.getElementById("cartCount")
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("opacity-0", "translate-x-full")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount)

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("opacity-0")
        img.classList.add("opacity-100")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchResults = document.getElementById("searchResults")

  if (!searchInput || !searchResults) return

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim()

    if (query.length < 2) {
      searchResults.classList.add("hidden")
      return
    }

    // Simulate search results (in a real app, this would be an API call)
    const mockResults = [
      { name: "Pizza", url: "catalog.html#pizza" },
      { name: "Hamburguesa", url: "catalog.html#hamburguesa" },
      { name: "Tarta de queso", url: "catalog.html#tarta" },
    ].filter((item) => item.name.toLowerCase().includes(query))

    displaySearchResults(mockResults)
  })
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("searchResults")

  if (results.length === 0) {
    searchResults.innerHTML = '<p class="p-4 text-gray-500">No se encontraron resultados</p>'
  } else {
    searchResults.innerHTML = results
      .map(
        (result) =>
          `<a href="${result.url}" class="block p-4 hover:bg-gray-100 transition-colors duration-200">${result.name}</a>`,
      )
      .join("")
  }

  searchResults.classList.remove("hidden")
}

// Initialize search on page load
document.addEventListener("DOMContentLoaded", initializeSearch)
