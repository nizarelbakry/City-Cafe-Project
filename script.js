function showSpecial() {
    var specialText = document.getElementById('specialText');
    var specialBtn = document.getElementById('specialBtn');

    if (specialText.style.display === 'none' || specialText.style.display === '') {
        specialText.style.display = 'block';
        specialBtn.textContent = 'Hide Special';
    } else {
        specialText.style.display = 'none';
        specialBtn.textContent = ' Today Special';
    }
}

function validateForm() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');

    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';

    var isValid = true;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        nameError.style.display = 'block';
        isValid = false;
    }
    if (!email || !emailRegex.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    }
    if (!message) {
        messageError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}


 function loadProducts() {
    var menuTableBody = document.getElementById('menuTableBody');
    if (!menuTableBody) return;

    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            var output = '';
            data.forEach(function (product) {
                output += '<tr>' +
                    '<td>' + product.name + '</td>' +
                    '<td>' + product.price + '</td>' +
                    '<td>' + product.description + '</td>' +
                    '</tr>';
            });
            menuTableBody.innerHTML = output;
        });
}

loadProducts();

/*
function loadFromAPI() {
    var apiTableBody = document.getElementById('apiTableBody');
    if (!apiTableBody) return;

    fetch('http://localhost:3001/products')
        .then(response => response.json())
        .then(data => {
            var output = '';
            data.forEach(function (product) {
                output += '<tr>' +
                    '<td>' + product.name + '</td>' +
                    '<td>' + product.price + '</td>' +
                    '<td>' + product.description + '</td>' +
                    '</tr>';
            });
            apiTableBody.innerHTML = output;
        });
}
*/

function addProduct() {
    var newName = document.getElementById('newName').value.trim();
    var newPrice = document.getElementById('newPrice').value.trim();
    var newDescription = document.getElementById('newDescription').value.trim();

    if (!newName || !newPrice || !newDescription) {
        alert('Please fill in all fields');
        return;
    }

    fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            price: newPrice,
            description: newDescription
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('newName').value = '';
            document.getElementById('newPrice').value = '';
            document.getElementById('newDescription').value = '';
            loadFromAPI();
        });
}

function removeLastProduct() {
    fetch('http://localhost:3001/products')
        .then(function (response) { return response.json(); })
        .then(function (products) {
            if (products.length === 0) {
                alert('No products to remove.');
                return;
            }
            var last = products[products.length - 1];
            return fetch('http://localhost:3001/products/' + last.id, {
                method: 'DELETE'
            }).then(function () { return last.id; });
        })
        .then(function (removedId) {
            loadFromAPI();
        })
        .catch(function (error) {
            alert('Error removing product.');
        });
}

loadFromAPI();

function loadOffers() {
    var offersList = document.getElementById('offersList');
    if (!offersList) return;

    fetch('offers.json')
        .then(response => response.json())
        .then(data => {
            var output = '';
            data.forEach(function (offer) {
                output += '<div class="offer-item">' +
                    '<h3>' + offer.title + '</h3>' +
                    '<p>' + offer.description + '</p>' +
                    '<span>' + offer.price + '</span>' +
                    '<small>' + offer.discount + '</small>' +
                    '</div>';
            });
            document.getElementById('offersList').innerHTML = output;
        });
}

loadOffers();
