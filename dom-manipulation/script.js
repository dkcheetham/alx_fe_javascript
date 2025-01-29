const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
];

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text} - <em>${quotes[randomIndex].category}</em></p>`;
}

function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        saveQuotes();
        populateCategories(); 

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";

        showRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

window.onload = () => {
    showRandomQuote();
    createAddQuoteForm();
    populateCategories();
    restoreFilter();
};

function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.style.marginTop = "20px";

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    quoteInput.style.marginBottom = "10px";
    quoteInput.style.padding = "8px";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    categoryInput.style.marginBottom = "10px";
    categoryInput.style.padding = "8px";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
    addButton.style.marginTop = "10px";
    addButton.style.padding = "8px";

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.innerHTML = `${quote.text} - <em>${quote.category}</em>`;
        quoteDisplay.appendChild(quoteElement);
    });

    localStorage.setItem("selectedCategory", selectedCategory);
}

function restoreFilter() {
    const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";
    document.getElementById("categoryFilter").value = lastSelectedCategory;
    filterQuotes();
}

function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategories();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading the file. Please ensure it is a valid JSON file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById("exportButton").onclick = exportToJson;
document.getElementById("importFile").onchange = importFromJsonFile;