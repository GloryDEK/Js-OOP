document.addEventListener('DOMContentLoaded', () => {

    class Product {
        constructor(id, name, price) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

    class CartItem {
        constructor(product, quantity = 1) {
            this.product = product;
            this.quantity = quantity;
        }

        // Calcule le total du prix de cet article
        getTotalPrice() {
            return this.product.price * this.quantity;
        }
    }

    class ShoppingCart {
        constructor() {
            this.initEventListeners();
        }

        // Initialisation des écouteurs d'événements
        initEventListeners() {
            document.querySelectorAll('.fa-plus').forEach(button => {
                button.addEventListener('click', (event) => this.updateQuantity(event, 1));
            });

            document.querySelectorAll('.fa-minus').forEach(button => {
                button.addEventListener('click', (event) => this.updateQuantity(event, -1));
            });

            document.querySelectorAll('.fa-heart').forEach(button => {
                button.addEventListener('click', (event) => this.toggleHeartColor(event));
            });

            document.querySelectorAll('.qtite').forEach(input => {
                input.addEventListener('change', (event) => this.quantityChanged(event));
            });

            document.querySelectorAll('.button').forEach(button => {
                button.addEventListener('click', (event) => this.removeCartItem(event));
            });
        }

        // Méthode pour incrémenter ou décrémenter la quantité
        updateQuantity(event, increment) {
            const articleContainer = event.target.closest('.col-md-4');
            const quantityInput = articleContainer.querySelector('.qtite');
            const priceElement = articleContainer.querySelector('.price');
            const itemTotalSpan = articleContainer.querySelector('.sum');

            const newQuantity = Math.max(1, parseInt(quantityInput.value) + increment);
            quantityInput.value = newQuantity;

            const price = parseFloat(priceElement.innerText.replace('Prix: ', '').replace('€', '').trim());
            const itemTotal = price * newQuantity;
            itemTotalSpan.innerText = itemTotal.toFixed(2) + ' €';

            this.updateCartTotal();
        }

        // Méthode pour changer la couleur de l'icône coeur
        toggleHeartColor(event) {
            const heartIcon = event.target;
            heartIcon.style.color = heartIcon.style.color === 'red' ? '' : 'red';
        }

        // Méthode pour gérer les changements manuels de quantité
        quantityChanged(event) {
            const input = event.target;
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            const articleContainer = input.closest('.col-md-4');
            const priceElement = articleContainer.querySelector('.price');
            const itemTotalSpan = articleContainer.querySelector('.sum');

            const price = parseFloat(priceElement.innerText.replace('Prix: ', '').replace('€', '').trim());
            const itemTotal = price * parseInt(input.value);
            itemTotalSpan.innerText = itemTotal.toFixed(2) + ' €';

            this.updateCartTotal();
        }

        // Méthode pour supprimer un article du panier
        removeCartItem(event) {
            const buttonClicked = event.target;
            buttonClicked.closest('.col-md-4').remove();
            this.updateCartTotal();
        }

        // Méthode pour mettre à jour le prix total général
        updateCartTotal() {
            const itemTotals = document.querySelectorAll('.sum');
            let grandTotal = 0;

            itemTotals.forEach(item => {
                const itemPrice = parseFloat(item.innerText.replace('€', '').trim());
                if (!isNaN(itemPrice)) {
                    grandTotal += itemPrice;
                }
            });

            const totalSpan = document.getElementById('total').querySelector('span');
            totalSpan.innerText = '€' + grandTotal.toFixed(2);
        }
    }

    // Création de l'instance du panier
    const cart = new ShoppingCart();
});
