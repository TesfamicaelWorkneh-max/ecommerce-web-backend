// utils/scrollUtils.js

// Function to smoothly scroll to an element
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Function to check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Function to add scroll-to-top button
export const initScrollToTop = () => {
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = "↑";
  scrollToTopButton.className = "scroll-to-top";
  scrollToTopButton.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopButton);

  const toggleScrollToTop = () => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.add("visible");
    } else {
      scrollToTopButton.classList.remove("visible");
    }
  };

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleScrollToTop);
  toggleScrollToTop(); // Initial check
};

// Function to handle section reveal animations
export const initScrollAnimations = () => {
  const sections = document.querySelectorAll(".section-hidden");

  const revealSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
};

// Function to handle smooth page transitions
export const handlePageTransition = () => {
  document.body.classList.add("page-transition");
  setTimeout(() => {
    document.body.classList.remove("page-transition");
  }, 300);
};

// Initialize all scroll utilities
export const initScrollUtilities = () => {
  if (typeof window !== "undefined") {
    initScrollToTop();
    initScrollAnimations();

    // Add hash scroll handling
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.replace("#", "");
        scrollToElement(hash);
      }, 100);
    }
  }
};
