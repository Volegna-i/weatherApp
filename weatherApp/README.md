# Weather App

Приложение для отслеживания погоды с простой авторизацией и визуализацией данных.

## Технологии

- React 19
- TypeScript
- Redux Toolkit
- Ant Design
- SCSS Modules
- Vite

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/Volegna-i/weatherApp.git

# Установка зависимостей
cd weatherApp
npm install

# Запуск в режиме разработки
npm run dev

# Сборка
npm run build
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_OPEN_WEATHER_API_KEY=your_api_key_here
```

## Структура проекта

```
weatherApp/
├── src/
│   ├── components/    # React компоненты
│   ├── contexts/      # React контексты
│   ├── hooks/         # Кастомные хуки
│   ├── store/         # Redux store
│   ├── types/         # TypeScript типы
│   └── styles/        # SCSS модули
```

## Деплой

Приложение развернуто на Vercel: [Weather App](https://weather-dnx25yirv-volands-projects-7267ee5e.vercel.app)