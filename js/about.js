// Функция для анимированного счетчика чисел
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Функция для обработки FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий вопрос
            item.classList.toggle('active');
        });
    });
}

// Функция для обработки формы обратной связи
function initContactForm() {
    const form = document.getElementById('feedback-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // В реальном приложении здесь был бы AJAX-запрос к серверу
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Простая валидация
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        
        // Имитация отправки
        alert(`Спасибо, ${data.name}! Ваше сообщение отправлено. Мы ответим вам в ближайшее время.`);
        form.reset();
    });
}

// Функция для запуска анимации счетчиков при прокрутке
function initCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                const target = parseInt(numberElement.getAttribute('data-target'));
                
                animateCounter(numberElement, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initContactForm();
    initCounters();
});