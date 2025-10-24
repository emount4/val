// Получаем ID скина из URL
const urlParams = new URLSearchParams(window.location.search);
const skinId = urlParams.get('id');

// Элементы DOM
const skinName = document.getElementById('skin-name');
const skinImage = document.getElementById('skin-img');
const skinWeapon = document.getElementById('skin-weapon');
const skinRarity = document.getElementById('skin-rarity');
const skinPrice = document.getElementById('skin-price');
const ratingForm = document.getElementById('rating-form');
const totalScore = document.getElementById('total-score');
const sumScore = document.getElementById('sum-score');
const reviewText = document.getElementById('review-text');
const charCounter = document.getElementById('char-counter');
const reviewsList = document.getElementById('reviews-list');

// Текущие оценки
let currentRatings = {
    visuals: 5,
    animations: 5,
    sounds: 5,
    value: 5,
    uniqueness: 5
};

class SkinDetailsManager {
    constructor() {
        this.skin = null;
        this.init();
    }

    async init() {
        await this.loadSkinData();
        this.setupEventListeners();
        await this.loadApprovedReviews();
    }

    async loadSkinData() {
        try {
            // Загружаем данные скина из Firebase
            const doc = await db.collection('skins').doc(skinId).get();
            if (doc.exists) {
                this.skin = { id: doc.id, ...doc.data() };
                this.renderSkinInfo();
            } else {
                this.showError('Скин не найден');
            }
        } catch (error) {
            console.error('Ошибка загрузки скина:', error);
            this.showError('Ошибка загрузки данных скина');
        }
    }

    renderSkinInfo() {
        if (!this.skin) return;

        skinName.textContent = this.skin.name;
        skinImage.src = this.skin.image;
        skinImage.alt = this.skin.name;
        skinWeapon.textContent = this.skin.weapon;
        skinRarity.textContent = this.skin.rarity;
        skinPrice.textContent = this.skin.price;

        // Обновляем title страницы
        document.title = `${this.skin.name} - Оценка скина`;
    }

    setupEventListeners() {
        // Обработчики слайдеров
        const sliders = document.querySelectorAll('.criteria-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleSliderChange(e.target);
            });
        });

        // Обработчик текстового поля
        reviewText.addEventListener('input', (e) => {
            this.updateCharCounter(e.target.value.length);
        });

        // Обработчик отправки формы
        ratingForm.addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
    }

    handleSliderChange(slider) {
        const criterion = slider.dataset.criterion;
        const value = parseInt(slider.value);
        const valueDisplay = slider.nextElementSibling;

        // Обновляем значение
        currentRatings[criterion] = value;
        valueDisplay.textContent = value;

        // Пересчитываем общий балл
        this.updateTotalScore();
    }

    updateTotalScore() {
        const sum = Object.values(currentRatings).reduce((a, b) => a + b, 0);
        const total = Math.round(sum * 1.8); // Умножаем на 1.8 для получения шкалы 0-90

        sumScore.textContent = sum;
        totalScore.textContent = total;
    }

    updateCharCounter(length) {
        charCounter.textContent = length;

        // Изменяем цвет в зависимости от длины
        charCounter.className = '';
        if (length < 50) {
            charCounter.classList.add('error');
        } else if (length > 1800) {
            charCounter.classList.add('warning');
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const reviewContent = reviewText.value.trim();
        const total = parseInt(totalScore.textContent);

        // Валидация
        if (reviewContent.length < 50) {
            alert('Рецензия должна содержать минимум 50 символов');
            return;
        }

        if (reviewContent.length > 2000) {
            alert('Рецензия не должна превышать 2000 символов');
            return;
        }

        // Создаем объект рецензии
        const review = {
            skinId: skinId,
            skinName: this.skin.name,
            ratings: { ...currentRatings },
            totalScore: total,
            reviewText: reviewContent,
            author: this.getUserIdentifier(),
            status: 'pending', // pending, approved, rejected
            createdAt: new Date(),
            updatedAt: new Date()
        };

        try {
            // Сохраняем в Firebase
            await db.collection('reviews').add(review);
            
            this.showSuccess('Рецензия отправлена на модерацию!');
            this.resetForm();
            
        } catch (error) {
            console.error('Ошибка сохранения рецензии:', error);
            alert('Ошибка при отправке рецензии. Попробуйте еще раз.');
        }
    }

    getUserIdentifier() {
        // Генерируем уникальный идентификатор пользователя
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    resetForm() {
        // Сбрасываем слайдеры к значениям по умолчанию
        const sliders = document.querySelectorAll('.criteria-slider');
        sliders.forEach(slider => {
            slider.value = 5;
            slider.nextElementSibling.textContent = 5;
        });

        // Сбрасываем текущие оценки
        currentRatings = {
            visuals: 5,
            animations: 5,
            sounds: 5,
            value: 5,
            uniqueness: 5
        };

        // Сбрасываем текстовое поле
        reviewText.value = '';
        this.updateCharCounter(0);
        this.updateTotalScore();
    }

    async loadApprovedReviews() {
        try {
            const snapshot = await db.collection('reviews')
                .where('skinId', '==', skinId)
                .where('status', '==', 'approved')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();

            if (snapshot.empty) {
                reviewsList.innerHTML = '<div class="no-reviews">Пока нет одобренных рецензий для этого скина</div>';
                return;
            }

            reviewsList.innerHTML = '';
            snapshot.forEach(doc => {
                const review = { id: doc.id, ...doc.data() };
                this.renderReview(review);
            });

        } catch (error) {
            console.error('Ошибка загрузки рецензий:', error);
            reviewsList.innerHTML = '<div class="no-reviews">Ошибка загрузки рецензий</div>';
        }
    }

    renderReview(review) {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-card';
        
        const criteriaHTML = Object.entries(review.ratings)
            .map(([key, value]) => {
                const label = this.getCriterionLabel(key);
                return `<div>${label}: ${value}/10</div>`;
            })
            .join('');

        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-author">Анонимный пользователь</div>
                <div class="review-rating">${review.totalScore}/90</div>
            </div>
            <div class="review-criteria">
                ${criteriaHTML}
            </div>
            <div class="review-text">${this.escapeHtml(review.reviewText)}</div>
            <div class="review-date">
                ${review.createdAt.toDate().toLocaleDateString('ru-RU')}
            </div>
        `;

        reviewsList.appendChild(reviewElement);
    }

    getCriterionLabel(key) {
        const labels = {
            visuals: 'Визуалы',
            animations: 'Анимации',
            sounds: 'Звуки',
            value: 'Цена/качество',
            uniqueness: 'Уникальность'
        };
        return labels[key] || key;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showSuccess(message) {
        // Можно заменить на красивый toast
        alert(message);
    }

    showError(message) {
        // Можно заменить на красивый toast
        alert(message);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (skinId) {
        new SkinDetailsManager();
    } else {
        document.body.innerHTML = '<h1>Скин не указан</h1>';
    }
});