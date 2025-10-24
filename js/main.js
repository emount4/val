// Данные о скинах (в будущем будет загрузка с API)
const skinsData = [
    {
        id: 1,
        name: "Reaver Vandal",
        image: "https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapon: "Vandal",
        rarity: "ultra",
        price: "2475 VP",
        rating: 85,
        votes: 1247,
        description: "Темная готическая коллекция с уникальными анимациями и звуками.",
        releaseDate: "2021-06-22"
    },
    {
        id: 2,
        name: "Prime Phantom",
        image: "https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VhcG9ufGVufDB8fDB8fHww&w=1000&q=80",
        weapon: "Phantom",
        rarity: "premium",
        price: "1775 VP",
        rating: 78,
        votes: 982,
        description: "Футуристичная коллекция с чистыми линиями и технологичным дизайном.",
        releaseDate: "2020-12-15"
    },
    {
        id: 3,
        name: "Elderflame Operator",
        image: "https://images.unsplash.com/photo-1583900985737-6d04991e2bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyYWdvbiUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapon: "Operator",
        rarity: "ultra",
        price: "2475 VP",
        rating: 82,
        votes: 875,
        description: "Оживите своих драконов с этой уникальной анимированной коллекцией.",
        releaseDate: "2021-03-02"
    },
    {
        id: 4,
        name: "Oni Phantom",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFwYW5lc2UlMjBndW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        weapon: "Phantom",
        rarity: "premium",
        price: "2175 VP",
        rating: 79,
        votes: 1105,
        description: "Вдохновленная японской мифологией, эта коллекция сочетает традиции и современность.",
        releaseDate: "2021-01-12"
    },
    {
        id: 5,
        name: "Sentinels of Light Sheriff",
        image: "https://images.unsplash.com/photo-1584992236310-6eddd5cf0611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapon: "Sheriff",
        rarity: "ultra",
        price: "2675 VP",
        rating: 76,
        votes: 934,
        description: "Коллекция, созданная в сотрудничестве с League of Legends.",
        releaseDate: "2021-07-20"
    },
    {
        id: 6,
        name: "Glitchpop Vandal",
        image: "https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVvbiUyMGd1bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        weapon: "Vandal",
        rarity: "premium",
        price: "2175 VP",
        rating: 81,
        votes: 802,
        description: "Киберпанк стиль с неоновыми цветами и футуристичным дизайном.",
        releaseDate: "2020-11-10"
    },
    {
        id: 7,
        name: "Ion Operator",
        image: "https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZW5lcmd5JTIwd2VhcG9ufGVufDB8fDB8fHww&w=1000&q=80",
        weapon: "Operator",
        rarity: "premium",
        price: "1775 VP",
        rating: 74,
        votes: 756,
        description: "Чистая энергия в форме оружия с минималистичным дизайном.",
        releaseDate: "2021-04-05"
    },
    {
        id: 8,
        name: "Ruination Phantom",
        image: "https://images.unsplash.com/photo-1583900985737-6d04991e2bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuY2llbnQlMjBndW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        weapon: "Phantom",
        rarity: "ultra",
        price: "2475 VP",
        rating: 83,
        votes: 998,
        description: "Темная коллекция, вдохновленная миром Руинации из League of Legends.",
        releaseDate: "2021-09-15"
    },
    {
        id: 9,
        name: "Magepunk Spectre",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RlYW1wdW5rJTIwd2VhcG9ufGVufDB8fDB8fHww&w=1000&q=80",
        weapon: "Spectre",
        rarity: "deluxe",
        price: "1275 VP",
        rating: 72,
        votes: 645,
        description: "Стимпанк дизайн с механическими элементами и паровой эстетикой.",
        releaseDate: "2021-05-18"
    },
    {
        id: 10,
        name: "Forsaken Classic",
        image: "https://images.unsplash.com/photo-1584992236310-6eddd5cf0611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsYXNzaWMlMjBndW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        weapon: "Classic",
        rarity: "premium",
        price: "1775 VP",
        rating: 68,
        votes: 523,
        description: "Заброшенный, но могущественный дизайн с мистическими элементами.",
        releaseDate: "2021-08-22"
    }
];

// Функция для отображения рейтинга в виде звезд
function renderRatingStars(rating) {
    // Конвертируем рейтинг 0-90 в 0-5 звезд для отображения
    const starRating = rating / 18;
    const fullStars = Math.floor(starRating);
    const halfStar = starRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Полные звезды
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    // Половина звезды
    if (halfStar) {
        starsHTML += '☆';
    }
    
    // Пустые звезды
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span style="color: #555;">★</span>';
    }
    
    return starsHTML;
}

// Функция для отображения скинов
function renderSkins(skins) {
    const container = document.getElementById('collections-container');
    container.innerHTML = '';
    
    skins.forEach(skin => {
        const card = document.createElement('div');
        card.className = 'skin-card collection-card';
        card.innerHTML = `
            <div class="rating-badge">
                ${renderRatingStars(skin.rating)}
                <span>${skin.rating}/90</span>
            </div>
            <img src="${skin.image}" alt="${skin.name}" class="collection-image">
            <div class="collection-info">
                <h3 class="collection-name">${skin.name}</h3>
                <div class="skin-meta">
                    <span class="skin-weapon">${skin.weapon}</span>
                    <span class="skin-rarity ${skin.rarity}">${skin.rarity}</span>
                </div>
                <p class="collection-description">${skin.description}</p>
                <div class="collection-stats">
                    <div class="collection-rating">
                        <span>${skin.votes} оценок</span>
                    </div>
                    <div class="collection-price">${skin.price}</div>
                </div>
                <div class="quick-rating">
                    <span>Оценить скин</span>
                    <button class="rate-button" data-id="${skin.id}">Оценить</button>
                </div>
            </div>
        `;
        
        // Обработчик клика по карточке
        card.addEventListener('click', (e) => {
            // Если клик не по кнопке "Оценить"
            if (!e.target.classList.contains('rate-button')) {
                window.location.href = `pages/skin-details.html?id=${skin.id}`;
            }
        });
        
        // Обработчик для кнопки "Оценить"
        const rateButton = card.querySelector('.rate-button');
        rateButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем срабатывание клика по карточке
            window.location.href = `pages/skin-details.html?id=${skin.id}`;
        });
        
        container.appendChild(card);
    });
}

// Функция для применения фильтров
function applyFilters() {
    const weaponFilter = document.getElementById('weapon-filter').value;
    const rarityFilter = document.getElementById('rarity-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    let filteredSkins = [...skinsData];
    
    // Фильтрация по оружию
    if (weaponFilter !== 'all') {
        filteredSkins = filteredSkins.filter(skin => 
            skin.weapon.toLowerCase() === weaponFilter.toLowerCase()
        );
    }
    
    // Фильтрация по редкости
    if (rarityFilter !== 'all') {
        filteredSkins = filteredSkins.filter(skin => 
            skin.rarity.toLowerCase() === rarityFilter.toLowerCase()
        );
    }
    
    // Сортировка
    switch (sortFilter) {
        case 'rating-desc':
            filteredSkins.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-asc':
            filteredSkins.sort((a, b) => a.rating - b.rating);
            break;
        case 'name':
            filteredSkins.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filteredSkins.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
    }
    
    renderSkins(filteredSkins);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Отображаем все скины при загрузке
    renderSkins(skinsData);
    
    // Назначаем обработчики событий для фильтров
    document.getElementById('weapon-filter').addEventListener('change', applyFilters);
    document.getElementById('rarity-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    
    // Обработчик для кнопки сброса фильтров
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('weapon-filter').value = 'all';
        document.getElementById('rarity-filter').value = 'all';
        document.getElementById('sort-filter').value = 'rating-desc';
        renderSkins(skinsData);
    });
});