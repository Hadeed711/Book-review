
// JavaScript for search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const bookGrid = document.getElementById('bookGrid');
const books = document.querySelectorAll('.book-card');
const noResults = document.querySelector('.no-results'); // Element for no results message

function searchBooks() {
  const query = searchInput.value.toLowerCase();
  let foundResults = false; // Flag to check if any books match

  books.forEach((book) => {
    const bookName = book.getAttribute('data-name').toLowerCase();
    if (bookName.includes(query)) {
      book.style.display = 'block'; // Show matching books
      foundResults = true; // Set the flag to true if we found at least one match
    } else {
      book.style.display = 'none'; // Hide non-matching books
    }
  });

  // Show or hide the no-results message
  if (foundResults) {
    noResults.style.display = 'none'; // Hide no results message
  } else {
    noResults.style.display = 'block'; // Show no results message if no matches found
  }
}

searchButton.addEventListener('click', searchBooks);

// Optional: Trigger search on pressing "Enter"
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') searchBooks();
});

// JavaScript for dark mode toggle
const toggleButton = document.querySelector('.toggle-dark-mode');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('header').classList.toggle('dark-mode');
  document.querySelector('.book-list-form').classList.toggle('dark-mode');
  document.querySelectorAll('.book-card').forEach(card => {
    card.classList.toggle('dark-mode');
  });
});

// DOM Elements for the popup
const detailsButtons = document.querySelectorAll('.details-btn');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const popupDetails = document.getElementById('popup-details');

// Function to open the popup and display dynamic content
function openPopup(bookName, bookDescription) {
  // Get the saved rating for the book from localStorage, if it exists
  const savedRating = localStorage.getItem(bookName) || 0;

  // Dynamically update content based on the clicked card
  popupDetails.innerHTML = `
<h2 style="font-family: 'Arial', sans-serif; font-size: 24px; font-weight: bold; color: #333;">
  ${bookName.split(',')[0].trim()}
</h2>
<p>${bookDescription}</p>
<div class="rating-stars">
  <span class="star" data-value="1">★</span>
  <span class="star" data-value="2">★</span>
  <span class="star" data-value="3">★</span>
  <span class="star" data-value="4">★</span>
  <span class="star" data-value="5">★</span>
</div>
<div class="rating-info" style="display: flex; justify-content: space-between; align-items: center;">
  <p id="rating-value" style="margin-top: 10px; font-size: 16px; font-weight: bold; color: #555;">
    Rating: ${savedRating ? savedRating : 'Not Rated'}
  </p>
</div>
`;
  popup.style.display = 'flex'; // Show the popup

  // Add functionality to the star ratings
  const stars = document.querySelectorAll('.rating-stars .star');
  const ratingValueElement = document.getElementById('rating-value');
  const popupLink = document.querySelector('.popup-link');

  // Function to highlight stars based on saved rating
  function highlightStars(rating) {
    stars.forEach(star => {
      const starValue = star.getAttribute('data-value');
      if (starValue <= rating) {
        star.style.color = '#FFD700'; // Highlighted (gold)
      } else {
        star.style.color = '#bbb'; // Default (gray)
      }
    });
  }

  // Initially highlight the stars based on saved rating
  highlightStars(savedRating);

  stars.forEach(star => {
    star.addEventListener('click', (e) => {
      const rating = e.target.getAttribute('data-value');
      localStorage.setItem(bookName, rating); // Save the selected rating to localStorage
      ratingValueElement.textContent = `Rating: ${rating} Star${rating > 1 ? 's' : ''}`;
      highlightStars(rating); // Highlight stars up to the selected rating
    });

    star.addEventListener('mouseover', (e) => {
      const hoverRating = e.target.getAttribute('data-value');
      highlightStars(hoverRating); // Temporarily highlight stars while hovering
    });

    star.addEventListener('mouseleave', () => {
      // Reset the star colors when mouse leaves
      highlightStars(savedRating);
    });
  });
}



// Add event listeners to each details button
detailsButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Get the book name and its description
    const bookCard = button.closest('.book-card');
    const bookName = bookCard.getAttribute('data-name');
    const bookDescription = bookCard.querySelector('.hide-disp').textContent;

    // Open the popup with the details
    openPopup(bookName, bookDescription);
  });
});

// Close the popup when the close button is clicked
closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none'; // Hide the popup
});

// Close the popup if the user clicks outside the popup content area
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none'; // Hide the popup when the background is clicked
  }
});
