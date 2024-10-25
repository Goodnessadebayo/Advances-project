     document.getElementById('searchInput').addEventListener('input', function() {
    var searchTerm = this.value.trim().toLowerCase();
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    // Define your search results mapping here
    var searchResults = {
        "All categories": "all categories.html",
        "Automotive & Motorcycle": "#Automotive & Motorcycle",
        "Education & Office supplies": "#Education & Office supplies",
        "Health & Food": "#Health & Food",
        "Home décor": "#Home décor",
        "Jewelry & Accessories": "#Jewelry & Accessories",
        "Shoes": "#Shoes",
        "Skin care": "#cosmetics",
        "Smart phone": "#smart phone",
        "Smart devices": "#smart devices",
        "Sports & outdoors": "#sports & outdoors",
        "Toys & Hobbies": "#Toys & Hobbies",
        "Wears": "#Wears", 
        "Watches": "#Watches", 
        "Women clothes": "#Women clothes",
    };

    // Loop through search results and check for matches
    for (var contentText in searchResults) {
        if (contentText.toLowerCase().includes(searchTerm)) {
            var p = document.createElement('p');
            var link = document.createElement('a');
            link.textContent = contentText;
            link.href = searchResults[contentText];
            link.target = "_blank"; // Opens in a new tab/window
            p.appendChild(link);
            resultsContainer.appendChild(p);
        }
    }
});
 
 
expandImg.parentElement.style.display = "block";

       
  document.getElementById('clearSearch').addEventListener('click', function() {
    document.getElementById('searchInput').value = ''; // Clear the search input
    document.getElementById('searchResults').innerHTML = ''; // Clear the search results
});
 
 
 function searchGoogle() {
            var query = document.getElementById('search-query').value;
            if (query.trim() !== '') {
                document.getElementById('search-form').submit();
            }
        }
  
 function saveDocuments() {
            var query = document.getElementById('save-info').value;
            if (query.trim() !== '') {
                document.getElementById('save-form').submit();
            }
        }
        
        
