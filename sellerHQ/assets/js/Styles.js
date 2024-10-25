
function uploadFiles() {
            const fileInput = document.getElementById('fileInput');
            const files = fileInput.files;  // Get the uploaded files
            const displayArea = document.getElementById('fileDisplayArea');
            
            displayArea.innerHTML = ''; // Clear previous files before uploading new ones

            // Loop through each file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Create a file reader to read the file content
                const reader = new FileReader();

                reader.onload = function(e) {
                    const fileContent = e.target.result;

                    // If the file is an image, display it
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = fileContent;
                        img.style.maxWidth = '300px';  // Set a max width for images
                        displayArea.appendChild(img);
                    }
                    // If it's a text file, display the text content
                    else if (file.type === 'text/plain') {
                        const text = document.createElement('p');
                        text.textContent = fileContent;
                        displayArea.appendChild(text);
                    }
                    // For other files, just show the file name
                    else {
                        const fileName = document.createElement('p');
                        fileName.textContent = 'Uploaded: ' + file.name;
                        displayArea.appendChild(fileName);
                    }
                };

                // Read the file content (for images or text files)
                if (file.type.startsWith('image/') || file.type === 'text/plain') {
                    reader.readAsDataURL(file); // For images
                } else {
                    reader.readAsText(file); // For text files
                }
            }
        }

        // Function to clear the display area
        function clearDisplay() {
            const displayArea = document.getElementById('fileDisplayArea');
            displayArea.innerHTML = '';  // Clear the content of the display area
            document.getElementById('fileInput').value = '';  // Reset the file input
        }
        

document.addEventListener('DOMContentLoaded', function () {
    // Example function to simulate login status check (replace with actual login check)
    function isLoggedIn() {
        // Replace this with actual logic to check user login status
        // For example, check if a session cookie/token is present
        return !!localStorage.getItem('loggedIn'); // Example using localStorage
    }

    // Toggle visibility based on login status
    if (isLoggedIn()) {
        document.getElementById('login-btn').style.display = 'none';  // Hide login button
        document.getElementById('logout-btn').style.display = 'block';  // Show logout button
    } else {
        document.getElementById('login-btn').style.display = 'block';  // Show login button
        document.getElementById('logout-btn').style.display = 'none';  // Hide logout button
    }
});

// Function to show logout modal
function showLogoutModal() {
    // Here you can display the modal asking the user to confirm logout
    // For now, we just log out
    alert("Logging out...");
    // Perform actual logout action here (e.g., remove session, clear tokens)
    localStorage.removeItem('loggedIn'); // Example using localStorage
    // Reload the page or update the UI
    location.reload(); 
}




document.getElementById("registerForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let user = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phoneNumber: document.getElementById("phoneNumber").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            };

            let users = JSON.parse(localStorage.getItem("users")) || [];

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful!");
        });
        
        




document.getElementById("signinForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let username = document.getElementById("signinUsername").value;
            let password = document.getElementById("signinPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("loggedIn", JSON.stringify(user));
                alert("Sign In successful!");
            } else {
                alert("Invalid credentials!");
            }
        });        
        
        
        
 
document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let username = document.getElementById("forgotUsername").value;
            let newPassword = document.getElementById("newPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            
            let userIndex = users.findIndex(user => user.username === username);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Password reset successful!");
            } else {
                alert("Username not found!");
            }
        });



document.getElementById("logoutButton").addEventListener("click", function() {
            localStorage.removeItem("loggedIn");
            alert("Logged out successfully!");
        });       
        
        
        
// Load users from local storage and display in the table
        function loadUsers() {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let tableBody = document.querySelector("#userTable tbody");
            tableBody.innerHTML = ""; // Clear table before rendering

            users.forEach((user, index) => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>
                     <div class="btn-group ms-2">
                  <button onclick="editUser(${index})" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  <button onclick="deleteUser(${index})"   type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        // Delete a user from the local storage and refresh the table
        function deleteUser(index) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.splice(index, 1); // Remove the user from the array
            localStorage.setItem("users", JSON.stringify(users)); // Update local storage
            loadUsers(); // Refresh table
            alert("User deleted successfully!");
        }

        // Edit a user from the local storage
        function editUser(index) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users[index];

            // Populate the edit form with user details
            document.getElementById("editFirstName").value = user.firstName;
            document.getElementById("editLastName").value = user.lastName;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editPhoneNumber").value = user.phoneNumber;
            document.getElementById("editUsername").value = user.username;
            document.getElementById("editPassword").value = user.password;

            document.getElementById("editModal").style.display = "block";

            // Save the changes when the form is submitted
            document.getElementById("editForm").onsubmit = function(event) {
                event.preventDefault();

                users[index] = {
                    firstName: document.getElementById("editFirstName").value,
                    lastName: document.getElementById("editLastName").value,
                    email: document.getElementById("editEmail").value,
                    phoneNumber: document.getElementById("editPhoneNumber").value,
                    username: document.getElementById("editUsername").value,
                    password: document.getElementById("editPassword").value
                };

                localStorage.setItem("users", JSON.stringify(users)); // Update local storage
                loadUsers(); // Refresh table
                document.getElementById("editModal").style.display = "none"; // Hide modal
                alert("User details updated successfully!");
            };
        }

        // Initial load of users on page load
        loadUsers();        
        
        
        
        
        
        
// Load products from LocalStorage when the page loads
        document.addEventListener("DOMContentLoaded", displayProducts);

        // Save product to LocalStorage
        function saveDocuments(event) {
            event.preventDefault();

            const productTitle = document.getElementById("productTitle").value;
            const productBrand = document.getElementById("productBrand").value;
            const productPrice = document.getElementById("productPrice").value;
            const phoneNumber = document.getElementById("number").value;
            const description = document.getElementById("description").value;

            // Handle file inputs
            const fileInput = document.getElementById("fileInput");
            let filesArray = [];
            for (let i = 0; i < fileInput.files.length; i++) {
                filesArray.push(fileInput.files[i].name);
            }

            const product = {
                title: productTitle,
                brand: productBrand,
                price: productPrice,
                phone: phoneNumber,
                description: description,
                files: filesArray // store the file names
            };

            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));

            displayProducts();
            document.getElementById("save-form").reset();
        }

        // Display products in the table
        function displayProducts() {
            const products = JSON.parse(localStorage.getItem("products")) || [];
            const productTable = document.getElementById("productTable").querySelector("tbody");
            productTable.innerHTML = "";

            products.forEach((product, index) => {
                const row = productTable.insertRow();
                row.insertCell(0).textContent = product.title;
                row.insertCell(1).textContent = product.brand;
                row.insertCell(2).textContent = product.price;
                row.insertCell(3).textContent = product.phone;
                row.insertCell(4).textContent = product.description;

                // Display file names
                const fileCell = row.insertCell(5);
                product.files.forEach(file => {
                    fileCell.innerHTML += `<p>${file}</p>`;
                });

                const actionCell = row.insertCell(6);
                actionCell.innerHTML = `
                    <div class="btn-group ms-2">
                  <button onclick="editProduct(${index})" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  <button onclick="deleteProduct(${index})"   type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                `;
            });
        }

        // Edit a product
        function editProduct(index) {
            const products = JSON.parse(localStorage.getItem("products"));
            const product = products[index];

            document.getElementById("productTitle").value = product.title;
            document.getElementById("productBrand").value = product.brand;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("number").value = product.phone;
            document.getElementById("description").value = product.description;

            // Optionally handle file uploads (not updating here, but can be extended)
            document.getElementById("fileInput").value = ""; // Clear the file input for new uploads

            products.splice(index, 1); // Remove the product being edited
            localStorage.setItem("products", JSON.stringify(products)); // Save updated products list

            displayProducts();
        }

        // Delete a product
        function deleteProduct(index) {
            let products = JSON.parse(localStorage.getItem("products"));
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));

            displayProducts();
        }

         