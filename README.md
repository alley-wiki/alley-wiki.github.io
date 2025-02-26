# Вишневые Аллеи Wiki

Веб-сайт для вики-проекта сервера Вишневые Аллеи. Сайт включает в себя:

- Вики-страницы с информацией о сервере и участниках
- Галерею артов с музыкальным плеером
- FAQ с ответами на частые вопросы
- Современный и адаптивный дизайн

## Технологии

- Next.js 13
- TypeScript
- Tailwind CSS
- Framer Motion для анимаций
- Shadcn/ui для компонентов интерфейса

## Features

- View wiki content without authentication
- Edit pages with proper authorization
- Real-time updates
- Role-based access control
- Admin dashboard for user management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project and get your credentials

4. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- `src/app/*` - App router pages and layouts
- `src/components/*` - React components
- `src/lib/*` - Utility functions and configurations

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT
