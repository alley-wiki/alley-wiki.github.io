import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageProps, UserPageParams } from '@/types/page';

// Импортируем клиентский компонент напрямую
import UserPageContent from './UserPageContent';

/**
 * Парсит строку вида "key=value|key2=value2" в объект: { key: "value", key2: "value2" }
 */
function parseUserTemplate(template: string): Record<string, string> {
  const params = template.split('|');
  const data: Record<string, string> = {};

  for (const param of params) {
    if (param.includes('=')) {
      const [key, value] = param.split('=').map((part) => part.trim());
      if (key && value) {
        data[key] = value;
      }
    }
  }

  return data;
}

/**
 * Упрощённая функция для конвертации части вики-разметки в HTML.
 * Добавлены:
 * - Шаблон {{Участник_сервера|...}}
 * - Заголовки (== / ===)
 * - Жирный/курсив
 * - Списки (*)
 * - Ссылки [[...]]
 * - Спец. стиль для "Основная информация"
 */
function convertWikiToHtml(wikiText: string): { content: string; metadata: Record<string, string> } {
  let html = wikiText;
  const metadata: Record<string, string> = {};

  // 1. Обработка шаблона {{Участник_сервера|...}}
  html = html.replace(/{{Участник_сервера\|(.*?)}}/g, (match, content) => {
    const data = parseUserTemplate(content);
    if (data.Должность) {
      metadata.role = data.Должность;
    }

    return `
      <div class="user-info bg-card border rounded-lg shadow-lg p-6 mb-8 space-y-4 text-foreground float-right ml-8 w-80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        ${
          data.Аватарка
            ? `
              <div class="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <img 
                  src="/wiki-content/images/${data.Аватарка}" 
                  alt="${data.name || 'Аватар'}"
                  class="object-cover w-full h-full"
                />
              </div>
            `
            : ''
        }
        <div class="text-xl font-semibold text-center mb-4">${data.name || ''}</div>
        ${
          data.Должность
            ? `
              <div class="grid grid-cols-3 gap-2">
                <div class="text-muted-foreground col-span-1">Должность:</div>
                <div class="col-span-2">${data.Должность}</div>
              </div>
            `
            : ''
        }
        ${
          data.Дата_захода_на_сервер
            ? `
              <div class="grid grid-cols-3 gap-2">
                <div class="text-muted-foreground col-span-1">Дата захода:</div>
                <div class="col-span-2">${data.Дата_захода_на_сервер}</div>
              </div>
            `
            : ''
        }
        ${
          data.Возраст
            ? `
              <div class="grid grid-cols-3 gap-2">
                <div class="text-muted-foreground col-span-1">Возраст:</div>
                <div class="col-span-2">${data.Возраст}</div>
              </div>
            `
            : ''
        }
        ${
          data.Дата_рождения
            ? `
              <div class="grid grid-cols-3 gap-2">
                <div class="text-muted-foreground col-span-1">Дата рождения:</div>
                <div class="col-span-2">${data.Дата_рождения}</div>
              </div>
            `
            : ''
        }
        ${
          data.Место_рождения
            ? `
              <div class="grid grid-cols-3 gap-2">
                <div class="text-muted-foreground col-span-1">Место рождения:</div>
                <div class="col-span-2">${data.Место_рождения}</div>
              </div>
            `
            : ''
        }
      </div>
    `;
  });

  // 2. Обработка заголовков
  // Сначала ищем спец. заголовок "Основная информация" и даём ему розовый цвет
  html = html.replace(
    /^==\s*(Основная информация)\s*==$/gm,
    `<h2 class="text-2xl font-bold mt-6 mb-2 text-pink-500">$1</h2>`
  );
  // Остальные заголовки уровня 2
  html = html.replace(
    /^==\s*(?!Основная информация)(.+?)\s*==$/gm,
    `<h2 class="text-2xl font-bold mt-6 mb-2">$1</h2>`
  );
  // Заголовки уровня 3
  html = html.replace(/^===\s*(.+?)\s*===$/gm, `<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>`);

  // 3. Жирный текст '''текст'''
  html = html.replace(/'''(.+?)'''/g, `<strong>$1</strong>`);

  // 4. Курсивный текст ''текст''
  html = html.replace(/''(.+?)''/g, `<em>$1</em>`);

  // 5. Списки (*)
  html = html.replace(/^\* (.+)$/gm, `<li>$1</li>`);
  html = html.replace(
    /(<li>.*?<\/li>\s*)+/g,
    (match) => `<ul class="list-disc list-inside ml-6">${match}</ul>`
  );

  // 6. Ссылки [[Имя]] или [[Имя|Отображаемый текст]]
  //  Превращаем в <a href="/wiki/users/Имя">Отображаемый текст</a>
  html = html.replace(/\[\[(.+?)(?:\|(.*?))?\]\]/g, (match, slug, text) => {
    if (!text) text = slug; // если нет "Отображаемого текста", берём slug
    // Можно дополнительно заменять пробелы на "_", делать encodeURIComponent и т.д.
    const href = `/wiki/users/${encodeURIComponent(slug)}`;
    return `<a href="${href}" class="text-pink-400 hover:underline">${text}</a>`;
  });

  return { content: html, metadata };
}

/**
 * Если нужно SSG — можно вернуть массив params
 * (Но раз убрали output: 'export', можно не использовать generateStaticParams)
 */
// export async function generateStaticParams() {
//   const wikiDir = path.join(process.cwd(), 'public', 'wiki-content');
//   const files = fs.readdirSync(wikiDir);

//   const slugs = files
//     .filter((fileName) => fileName.endsWith('.md'))
//     .map((fileName) => fileName.replace(/\.md$/, ''));

//   return slugs.map((slug) => ({ slug }));
// }

/**
 * Генерация <head> метаданных
 */
export async function generateMetadata({ params }: PageProps<UserPageParams>): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  return {
    title: `${decodedSlug} - Вишневые Аллеи Wiki`,
    description: `Профиль пользователя ${decodedSlug} на Вишневые Аллеи Wiki`,
  };
}

/**
 * Серверный компонент, рендерящий страницу
 */
export default async function UserPage({ params }: PageProps<UserPageParams>) {
  const decodedSlug = decodeURIComponent(params.slug);
  const filePath = path.join(process.cwd(), 'public', 'wiki-content', `${decodedSlug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const { content: htmlContent, metadata } = convertWikiToHtml(content);

  // Преобразуем slug в нормальный вид
  const name = decodedSlug
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Передаём данные в клиентский компонент
  return <UserPageContent name={name} role={metadata.role} htmlContent={htmlContent} />;
}
