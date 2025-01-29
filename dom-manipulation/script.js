// Quote array containing objects with text and category
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

// Function to show a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text} - <em>${quotes[randomIndex].category}</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        // Add new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        // Show the newly added quote
        showRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Event listener to show a new quote when button is clicked
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show an initial random quote on page load
window.onload = showRandomQuote;