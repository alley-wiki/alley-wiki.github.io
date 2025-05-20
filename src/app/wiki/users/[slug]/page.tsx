import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageProps, UserPageParams } from '@/types/page';

// Импорт клиентского компонента
import UserPageContent from './UserPageContent';

/**
 * Генерация статических параметров (slug) для статического экспорта (output: 'export')
 */
export async function generateStaticParams() {
  const wikiDir = path.join(process.cwd(), 'public', 'wiki-content');
  const files = fs.readdirSync(wikiDir);

  const slugs = files
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));

  console.log('[generateStaticParams] Raw slugs from filenames:', slugs); // Добавлено для отладки
  const staticParams = slugs.map((slug) => ({ slug }));
  console.log('[generateStaticParams] Generated staticParams:', staticParams); // Добавлено для отладки
  // Возвращаем "сырые" слаги
  return staticParams;
}

/**
 * Генерация <head> метаданных
 */
export async function generateMetadata(props: PageProps<UserPageParams>): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  console.log('[generateMetadata] Received params.slug:', params.slug); // Добавлено для отладки
  // >>> НАЧАЛО ИЗМЕНЕНИЯ
  const decodedSlug = decodeURIComponent(params.slug);
  console.log('[generateMetadata] Decoded slug:', decodedSlug); // Добавлено для отладки
  // <<< КОНЕЦ ИЗМЕНЕНИЯ
  return {
    // >>> НАЧАЛО ИЗМЕНЕНИЯ
    title: `${decodedSlug} - Вишневые Аллеи Wiki`,
    description: `Профиль пользователя ${decodedSlug} на Вишневые Аллеи Wiki`,
    // <<< КОНЕЦ ИЗМЕНЕНИЯ
  };
}

/**
 * Парсим {{Участник_сервера|key=value|...}}
 */
function parseUserTemplate(template: string): Record<string, string> {
  const params = template.split('|');
  const data: Record<string, string> = {};

  for (const param of params) {
    if (param.includes('=')) {
      const [key, value] = param.split('=').map((p) => p.trim());
      if (key && value) {
        data[key] = value;
      }
    }
  }
  return data;
}

/**
 * Упрощённая функция для конвертации вики-разметки в HTML.
 * Добавили логику для [[Файл:имя файла.png|подпись]], с encodeURIComponent(fileName).
 */
function convertWikiToHtml(wikiText: string): { content: string; metadata: Record<string, string> } {
  let html = wikiText;
  const metadata: Record<string, string> = {};

  // 1. Обработка {{Участник_сервера|...}}
  html = html.replace(/{{Участник_сервера\|(.*?)}}/g, (match, content) => {
    const data = parseUserTemplate(content);

    return `
      <div class="infobox mb-6 md:float-right md:w-64 w-full md:ml-6 ml-0 bg-card border border-border shadow-md p-4 rounded-md">
        ${
          data.Аватарка
            ? `<div class="mb-4 overflow-hidden rounded-md">
                 <img
                   src="/wiki-content/images/${encodeURIComponent(data.Аватарка)}"
                   alt="${data.Имя || data.name || 'Аватар'}"
                   class="object-cover w-full h-auto rounded-md"
                   onError="this.style.display='none';"
                 />
               </div>`
            : ''
        }
        <div class="text-sm space-y-1">
          ${data.Имя ? `<div><strong>Имя:</strong> ${data.Имя}</div>` : ''}
          ${data.Возраст ? `<div><strong>Возраст:</strong> ${data.Возраст}</div>` : ''}
          ${data.Дата_рождения ? `<div><strong>Дата рождения:</strong> ${data.Дата_рождения}</div>` : ''}
          ${
            data.Дата_захода_на_сервер
              ? `<div><strong>Дата захода на сервер:</strong> ${data.Дата_захода_на_сервер}</div>`
              : ''
          }
          ${data.Должность ? `<div><strong>Должность:</strong> ${data.Должность}</div>` : ''}
          ${data.Место_рождения ? `<div><strong>Место рождения:</strong> ${data.Место_рождения}</div>` : ''}
        </div>
      </div>
    `;
  });

  // 2. Заголовки (==, ===)
  html = html.replace(
    /^==\s*(.+?)\s*==$/gm,
    `<h2 class="text-2xl font-bold mt-6 mb-3 text-pink-500">$1</h2>`
  );
  html = html.replace(
    /^===\s*(.+?)\s*===$/gm,
    `<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>`  );

  // 3. Жирный/курсив
  html = html.replace(/'''(.+?)'''/g, `<strong>$1</strong>`);
  html = html.replace(/''(.+?)''/g, `<em>$1</em>`);

  // 4. Списки (*)
  html = html.replace(/^\* (.+)$/gm, `<li>$1</li>`);
  html = html.replace(
    /(<li>[\s\S]*?<\/li>\s*)+/g,
    `<ul class="list-disc list-inside ml-6">$&</ul>`
  );

  // 5. Внутренние ссылки и [[Файл:...|Подпись]]
  html = html.replace(/\[\[([^|\]]+)(?:\|([^\]]*))?\]\]/g, (match, p1, p2) => {
    const raw = p1.trim();
    const text = p2 ? p2.trim() : '';

    if (raw.toLowerCase().startsWith('файл:')) {
      const fileName = raw.slice(5).trim();
      const safeFileName = encodeURIComponent(fileName);
      const caption = text;

      return `
        <figure class="my-4">
          <img
            src="/wiki-content/images/${safeFileName}"
            alt="${caption}"
            class="max-w-full h-auto rounded-md"
            onError="this.style.display='none';"
          />
          ${
            caption
              ? `<figcaption class="text-sm text-center mt-2 text-muted-foreground">${caption}</figcaption>`
              : ''
          }
        </figure>
      `;
    } else {
      const slug = raw.toLowerCase();
      const linkText = text || raw;
      return `<a href="/wiki/users/${slug}" class="text-primary hover:underline">${linkText}</a>`;
    }
  });

  // 6. Внешние ссылки [https://... Текст]
  html = html.replace(
    /\[(https?:\/\/[^\s]+)\s+([^\]]+)\]/g,
    (match, url, linkText) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${linkText}</a>`;
    }
  );

  return { content: html, metadata };
}

/**
 * Серверный компонент
 */
export default async function UserPage(props: PageProps<UserPageParams>) {
  const params = await Promise.resolve(props.params);

  // >>> НАЧАЛО ИЗМЕНЕНИЯ
  const decodedSlug = decodeURIComponent(params.slug);
  // <<< КОНЕЦ ИЗМЕНЕНИЯ

  // >>> НАЧАЛО ИЗМЕНЕНИЯ
  const filePath = path.join(process.cwd(), 'public', 'wiki-content', `${decodedSlug}.md`);
  // <<< КОНЕЦ ИЗМЕНЕНИЯ

  // Используем ваши детальные логи, заменив slug на decodedSlug
  console.log(`[UserPage] Received params.slug: "${params.slug}"`); // Изменено для ясности и добавлено UserPage
  // >>> НАЧАЛО ИЗМЕНЕНИЯ
  console.log(`[UserPage] Decoded slug to: "${decodedSlug}"`); // Изменено для ясности
  console.log(`[UserPage] Attempting to read file at: "${filePath}"`); // Изменено для ясности

  if (!fs.existsSync(filePath)) {
    console.error(`[UserPage] ERROR: File NOT FOUND for decoded slug "${decodedSlug}" at path: "${filePath}". Calling notFound().`);
    // <<< КОНЕЦ ИЗМЕНЕНИЯ
    notFound();
  } else {
  // >>> НАЧАЛО ИЗМЕНЕНИЯ
    console.log(`[UserPage] SUCCESS: File FOUND for decoded slug "${decodedSlug}" at path: "${filePath}".`);
  // <<< КОНЕЦ ИЗМЕНЕНИЯ
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content: htmlContent } = convertWikiToHtml(fileContent);

  // >>> НАЧАЛО ИЗМЕНЕНИЯ
  // Используем decodedSlug для формирования имени
  const name = decodedSlug
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  // <<< КОНЕЦ ИЗМЕНЕНИЯ

  return <UserPageContent name={name} htmlContent={htmlContent} />;
}