const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById("vendors-count"), 500);
      animateCounter(document.getElementById("suppliers-count"), 200);
      animateCounter(document.getElementById("connections-count"), 2500);
      animateCounter(document.getElementById("cities-count"), 15);
      statsObserver.unobserve(entry.target);
    }
  });
});

statsObserver.observe(document.querySelector(".stats"));

function showAlert(type) {
  if (type === "vendor") {
    alert(
      "Welcome Street Vendor! You would be redirected to the vendora buying page."
    );
  } else {
    alert("Welcome Supplier! You would be redirected to the supplier page.");
  }
}

function categoryClick(category) {
  alert(`Showing ${category} suppliers and vendors in your area...`);
}

document.querySelector(".search-btn").addEventListener("click", function () {
  const searchTerm = document.querySelector(".search-input").value;
  if (searchTerm.trim()) {
    alert(`Searching for: ${searchTerm}`);
  } else {
    alert("Please enter a search term");
  }
});

document
  .querySelector(".search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".search-btn").click();
    }
  });

document.querySelector(".mobile-menu").addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("mouseenter", function () {
    this.style.background = "linear-gradient(135deg, #4caf50, #8bc34a)";
    this.style.color = "white";
  });

  category.addEventListener("mouseleave", function () {
    this.style.background = "white";
    this.style.color = "#333";
  });
});

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;
  hero.style.transform = `translateY(${rate}px)`;
});

// Profile icon, username, and logout logic
function showProfileNav() {
  const userName = sessionStorage.getItem("userName");
  const profileNav = document.getElementById("profileNav");
  const profileName = document.getElementById("profileName");
  if (userName) {
    profileNav.style.display = "flex";
    profileName.textContent = userName;
    profileName.style.display = "inline";
  } else {
    profileNav.style.display = "none";
  }
}
showProfileNav();

const profileIcon = document.getElementById("profileIcon");
const profileDropdown = document.getElementById("profileDropdown");
profileIcon &&
  profileIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.style.display =
      profileDropdown.style.display === "block" ? "none" : "block";
    profileIcon.classList.toggle("active");
  });
document.addEventListener("click", function (e) {
  if (profileDropdown && profileDropdown.style.display === "block") {
    profileDropdown.style.display = "none";
    profileIcon.classList.remove("active");
  }
});
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn &&
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    window.location.href = "index.html";
  });


const vendorBtn = document.querySelector('.btn.btn-primary');
if (vendorBtn) {
  vendorBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'vendor.html';
  });
}

const supplierBtn = document.querySelector('.btn.btn-secondary');
if (supplierBtn) {
  supplierBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'vendora_supply.html';
  });
}
