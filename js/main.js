// Данные о коллекциях скинов
const collectionsData = [
    {
        id: 1,
        name: "Reaver Collection",
        image: "https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapons: 5,
        rating: 4.8,
        votes: 1247,
        releaseDate: "2021-06-22",
        price: "2475 VP",
        rarity: "Ultra",
        description: "Темная готическая коллекция с уникальными анимациями и звуками."
    },
    {
        id: 2,
        name: "Prime Collection",
        image: "https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VhcG9ufGVufDB8fDB8fHww&w=1000&q=80",
        weapons: 4,
        rating: 4.6,
        votes: 982,
        releaseDate: "2020-12-15",
        price: "1775 VP",
        rarity: "Premium",
        description: "Футуристичная коллекция с чистыми линиями и технологичным дизайном."
    },
    {
        id: 3,
        name: "Elderflame Collection",
        image: "https://images.unsplash.com/photo-1583900985737-6d04991e2bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyYWdvbiUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapons: 4,
        rating: 4.3,
        votes: 875,
        releaseDate: "2021-03-02",
        price: "2475 VP",
        rarity: "Ultra",
        description: "Оживите своих драконов с этой уникальной анимированной коллекцией."
    },
    {
        id: 4,
        name: "Oni Collection",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFwYW5lc2UlMjBndW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        weapons: 5,
        rating: 4.7,
        votes: 1105,
        releaseDate: "2021-01-12",
        price: "2175 VP",
        rarity: "Premium",
        description: "Вдохновленная японской мифологией, эта коллекция сочетает традиции и современность."
    },
    {
        id: 5,
        name: "Sentinels of Light",
        image: "https://images.unsplash.com/photo-1584992236310-6eddd5cf0611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapons: 6,
        rating: 4.5,
        votes: 934,
        releaseDate: "2021-07-20",
        price: "2675 VP",
        rarity: "Ultra",
        description: "Коллекция, созданная в сотрудничестве с League of Legends."
    },
    {
        id: 6,
        name: "Glitchpop Collection",
        image: "https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVvbiUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapons: 4,
        rating: 4.4,
        votes: 802,
        releaseDate: "2020-11-10",
        price: "2175 VP",
        rarity: "Premium",
        description: "Киберпанк стиль с неоновыми цветами и футуристичным дизайном."
    },
    {
        id: 7,
        name: "Ion Collection",
        image: "https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZW5lcmd5JTIwd2VhcG9ufGVufDB8fDB8fHww&w=1000&q=80",
        weapons: 3,
        rating: 4.2,
        votes: 756,
        releaseDate: "2021-04-05",
        price: "1775 VP",
        rarity: "Premium",
        description: "Чистая энергия в форме оружия с минималистичным дизайном."
    },
    {
        id: 8,
        name: "Ruination Collection",
        image: "https://images.unsplash.com/photo-1583900985737-6d04991e2bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuY2llbnQlMjBndW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        weapons: 5,
        rating: 4.6,
        votes: 998,
        releaseDate: "2021-09-15",
        price: "2475 VP",
        rarity: "Ultra",
        description: "Темная коллекция, вдохновленная миром Руинации из League of Legends."
    }
];

// Функция для отображения звезд рейтинга
function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Полные звезды
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="rating-stars">★</span>';
    }
    
    // Половина звезды
    if (halfStar) {
        starsHTML += '<span class="rating-stars">☆</span>';
    }
    
    // Пустые звезды
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="rating-stars" style="color: #555;">★</span>';
    }
    
    return starsHTML;
}

// Функция для отображения коллекций
function renderCollections(collections) {
    const container = document.getElementById('collections-container');
    container.innerHTML = '';
    
    collections.forEach(collection => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.innerHTML = `
            <div class="collection-badge">${collection.rarity}</div>
            <img src="${collection.image}" alt="${collection.name}" class="collection-image">
            <div class="collection-info">
                <h3 class="collection-name">${collection.name}</h3>
                <p class="collection-description">${collection.description}</p>
                <div class="collection-stats">
                    <div class="collection-rating">
                        ${renderRatingStars(collection.rating)}
                        <span>${collection.rating}</span>
                    </div>
                    <div class="collection-price">${collection.price}</div>
                </div>
            </div>
        `;
        
        // Добавляем обработчик события для перехода на страницу оценки
        card.addEventListener('click', () => {
            // В будущем здесь будет переход на страницу с детальной информацией
            alert(`Переход на страницу оценки коллекции "${collection.name}". Эта функция будет реализована позже.`);
        });
        
        container.appendChild(card);
    });
}

// Функция для применения фильтров
function applyFilters() {
    const weaponFilter = document.getElementById('weapon-filter').value;
    const rarityFilter = document.getElementById('rarity-filter').value;
    
    let filteredCollections = collectionsData;
    
    // Фильтрация по оружию (в реальном приложении здесь будет более сложная логика)
    if (weaponFilter !== 'all') {
        // В демо-версии просто фильтруем по ID для примера
        filteredCollections = filteredCollections.filter(collection => 
            collection.id % 2 === (weaponFilter === 'vandal' ? 0 : 1)
        );
    }
    
    // Фильтрация по редкости
    if (rarityFilter !== 'all') {
        filteredCollections = filteredCollections.filter(collection => 
            collection.rarity.toLowerCase() === rarityFilter.toLowerCase()
        );
    }
    
    renderCollections(filteredCollections);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Отображаем все коллекции при загрузке
    renderCollections(collectionsData);
    
    // Назначаем обработчики событий для фильтров
    document.getElementById('weapon-filter').addEventListener('change', applyFilters);
    document.getElementById('rarity-filter').addEventListener('change', applyFilters);
    
    // Обработчик для кнопки сброса фильтров
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('weapon-filter').value = 'all';
        document.getElementById('rarity-filter').value = 'all';
        renderCollections(collectionsData);
    });
});