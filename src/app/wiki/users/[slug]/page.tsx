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

  // Берём только .md-файлы и убираем расширение
  const slugs = files
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));

  return slugs.map((slug) => ({ slug }));
}

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
  // == Заголовок ==
  html = html.replace(
    /^==\s*(.+?)\s*==$/gm,
    `<h2 class="text-2xl font-bold mt-6 mb-3 text-pink-500">$1</h2>`
  );
  // === Подзаголовок ===
  html = html.replace(
    /^===\s*(.+?)\s*===$/gm,
    `<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>`
  );

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
    // p2 может быть пустой строкой (например, [[Файл:ТГК Черр.png|]])
    const raw = p1.trim();
    const text = p2 ? p2.trim() : '';

    if (raw.toLowerCase().startsWith('файл:')) {
      // Убираем "Файл:"
      const fileName = raw.slice(5).trim(); // "ТГК Черр.png"
      const safeFileName = encodeURIComponent(fileName); 
      const caption = text; // Может быть пустой

      // Выводим <figure> с <img>, если caption не пустой - <figcaption>
      return `
        <figure class="my-4">
          <img
            src="/wiki-content/images/${safeFileName}"
            alt="${caption}"
            class="max-w-full h-auto rounded-md"
          />
          ${
            caption
              ? `<figcaption class="text-sm text-center mt-2 text-muted-foreground">${caption}</figcaption>`
              : ''
          }
        </figure>
      `;
    } else {
      // Обычная ссылка [[Черр|...]]
      // Делаем slug в нижнем регистре
      const slug = encodeURIComponent(raw.toLowerCase());
      // Если нет подписи, используем raw
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
export default async function UserPage({ params }: PageProps<UserPageParams>) {
  const decodedSlug = decodeURIComponent(params.slug);
  const filePath = path.join(process.cwd(), 'public', 'wiki-content', `${decodedSlug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Считываем .md
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Парсим
  const { content: htmlContent } = convertWikiToHtml(fileContent);

  // Формируем красивое имя (замена _ на пробел, капитализация)
  const name = decodedSlug
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return <UserPageContent name={name} htmlContent={htmlContent} />;
}
