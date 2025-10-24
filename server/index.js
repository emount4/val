const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// ==================== ПОДКЛЮЧЕНИЕ К POSTGRESQL ====================
const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'valorant_skins',
    password: 'postgre1234', // ⚠️ ПРОВЕРЬТЕ ПАРОЛЬ!
    port: 5432,
};

console.log('🔧 Конфигурация подключения к БД:', { ...poolConfig, password: '***' });

const pool = new Pool(poolConfig);

// Тестирование подключения к БД
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Подключение к PostgreSQL установлено');
        const result = await client.query('SELECT NOW() as current_time');
        console.log('⏰ Время сервера БД:', result.rows[0].current_time);
        client.release();
    } catch (err) {
        console.error('❌ Ошибка подключения к PostgreSQL:', err.message);
        console.log('💡 Проверьте:');
        console.log('   1. Запущен ли PostgreSQL сервер');
        console.log('   2. Правильный ли пароль в настройках');
        console.log('   3. Существует ли база данных "valorant_skins"');
    }
}

testConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

app.use((req, res, next) => {
    console.log(`📨 ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// ==================== API ENDPOINTS ====================

// Тестовый endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Сервер работает!', 
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Получить все скины из базы данных
app.get('/api/skins', async (req, res) => {
    try {
        console.log('📥 Запрос на получение скинов...');
        const result = await pool.query('SELECT * FROM skins ORDER BY rating DESC');
        console.log(`✅ Получено ${result.rows.length} скинов из БД`);
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Ошибка при получении скинов:', err.message);
        
        // Более информативный fallback
        const fallbackData = [
            {
                id: 1,
                name: "Reaver Vandal",
                weapon: "Vandal",
                rarity: "Ultra",
                price: "2475 VP",
                rating: 8.5,
                votes: 1247,
                description: "Темная готическая коллекция с уникальными анимациями и звуками.",
                image_url: "https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&w=1000&q=80"
            },
            {
                id: 2,
                name: "Prime Phantom",
                weapon: "Phantom",
                rarity: "Premium",
                price: "1775 VP",
                rating: 7.8,
                votes: 982,
                description: "Футуристичная коллекция с чистыми линиями и технологичным дизайном.",
                image_url: "https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&w=1000&q=80"
            },
            {
                id: 3,
                name: "Oni Phantom",
                weapon: "Phantom",
                rarity: "Premium",
                price: "2175 VP",
                rating: 7.9,
                votes: 1105,
                description: "Вдохновленная японской мифологией, эта коллекция сочетает традиции и современность.",
                image_url: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&w=1000&q=80"
            }
        ];
        
        console.log('🔄 Использую локальные данные');
        res.json(fallbackData);
    }
});

// Инициализация базы данных (создание таблицы если не существует)
app.get('/api/init-db', async (req, res) => {
    try {
        console.log('🗄️ Инициализация базы данных...');
        
        // Создаем таблицу
        await pool.query(`
            CREATE TABLE IF NOT EXISTS skins (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                weapon VARCHAR(100) NOT NULL,
                rarity VARCHAR(50) NOT NULL,
                price VARCHAR(50) NOT NULL,
                image_url TEXT,
                rating DECIMAL(3,1),
                votes INTEGER DEFAULT 0,
                description TEXT,
                release_date DATE,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log('✅ Таблица skins создана/проверена');
        
        // Проверяем, есть ли данные
        const countResult = await pool.query('SELECT COUNT(*) FROM skins');
        const skinCount = parseInt(countResult.rows[0].count);
        
        if (skinCount === 0) {
            console.log('📝 Добавляю тестовые данные...');
            await pool.query(`
                INSERT INTO skins (name, weapon, rarity, price, rating, votes, description, image_url) VALUES 
                ('Reaver Vandal', 'Vandal', 'Ultra', '2475 VP', 8.5, 1247, 'Темная готическая коллекция с уникальными анимациями и звуками.', 'https://images.unsplash.com/photo-1618335829737-3dfa5d4f1e8c?ixlib=rb-4.0.3&w=1000&q=80'),
                ('Prime Phantom', 'Phantom', 'Premium', '1775 VP', 7.8, 982, 'Футуристичная коллекция с чистыми линиями и технологичным дизайном.', 'https://images.unsplash.com/photo-1595599512947-92e0b69c37a1?ixlib=rb-4.0.3&w=1000&q=80'),
                ('Oni Phantom', 'Phantom', 'Premium', '2175 VP', 7.9, 1105, 'Вдохновленная японской мифологией, эта коллекция сочетает традиции и современность.', 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&w=1000&q=80'),
                ('Elderflame Vandal', 'Vandal', 'Ultra', '2475 VP', 8.2, 893, 'Огненный дракон, оживающий в ваших руках.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=1000&q=80'),
                ('Sentinels of Light Vandal', 'Vandal', 'Premium', '1775 VP', 7.5, 756, 'Чистый свет и элегантный дизайн.', 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?ixlib=rb-4.0.3&w=1000&q=80')
            `);
            console.log('✅ Тестовые данные добавлены');
        } else {
            console.log(`✅ В таблице уже есть ${skinCount} записей`);
        }
        
        res.json({ 
            message: 'База данных инициализирована', 
            status: 'OK',
            skinCount: skinCount
        });
    } catch (err) {
        console.error('❌ Ошибка инициализации БД:', err.message);
        res.status(500).json({ 
            error: 'Ошибка инициализации БД',
            details: err.message 
        });
    }
});

// Получить скин по ID
app.get('/api/skins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM skins WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Скин не найден' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Ошибка при получении скина:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
    console.log(`📡 Тестовый endpoint: http://localhost:${port}/api/test`);
    console.log(`🎮 Скины: http://localhost:${port}/api/skins`);
    console.log(`🗄️ Инициализация БД: http://localhost:${port}/api/init-db`);
    console.log(`⚠️ Убедитесь что PostgreSQL запущен и пароль правильный!`);
        setTimeout(() => {
        console.log('🌐 Открываю браузер...');
        exec(`start http://localhost:${port}/index.html`);
    }, 1000);
});