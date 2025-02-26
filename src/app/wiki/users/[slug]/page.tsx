import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Импортируем клиентский компонент
const UserPageContent = dynamic(() => import('./UserPageContent'), { ssr: true });

// Функция для обработки шаблона участника
function parseUserTemplate(template: string): Record<string, string> {
  const params = template.split('|');
  const data: Record<string, string> = {};
  
  for (const param of params) {
    if (param.includes('=')) {
      const [key, value] = param.split('=').map(part => part.trim());
      if (key && value) {
        data[key] = value;
      }
    }
  }
  
  return data;
}

// Функция для конвертации Wiki-разметки в HTML
function convertWikiToHtml(wikiText: string): { content: string; metadata: Record<string, string> } {
  let html = wikiText;
  const metadata: Record<string, string> = {};
  
  // Обработка шаблонов
  html = html.replace(/{{Участник_сервера\|(.*?)}}/g, (match, content) => {
    const data = parseUserTemplate(content);
    Object.assign(metadata, data);
    
    let result = '<div class="user-info bg-card border rounded-lg p-6 mb-8 space-y-4 text-foreground float-right ml-8 w-80">';
    
    // Добавляем аватарку, если она есть
    if (data.Аватарка) {
      result += `
        <div class="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
          <img 
            src="/wiki-content/images/${data.Аватарка}" 
            alt="${data.name || 'Аватар'}"
            class="object-cover w-full h-full"
          />
        </div>`;
    }
    
    // Имя в инфобоксе
    result += `<div class="text-xl font-semibold text-center mb-4">${metadata.name || ''}</div>`;
    
    // Основная информация
    if (data.Должность) {
      metadata.role = data.Должность;
      result += `<div class="grid grid-cols-3 gap-2">
        <div class="text-muted-foreground col-span-1">Должность:</div>
        <div class="col-span-2">${data.Должность}</div>
      </div>`;
    }
    
    if (data.Дата_захода_на_сервер) {
      result += `<div class="grid grid-cols-3 gap-2">
        <div class="text-muted-foreground col-span-1">Дата захода:</div>
        <div class="col-span-2">${data.Дата_захода_на_сервер}</div>
      </div>`;
    }
    
    if (data.Возраст) {
      result += `<div class="grid grid-cols-3 gap-2">
        <div class="text-muted-foreground col-span-1">Возраст:</div>
        <div class="col-span-2">${data.Возраст}</div>
      </div>`;
    }
    
    if (data.Дата_рождения) {
      result += `<div class="grid grid-cols-3 gap-2">
        <div class="text-muted-foreground col-span-1">Дата рождения:</div>
        <div class="col-span-2">${data.Дата_рождения}</div>
      </div>`;
    }
    
    if (data.Место_рождения) {
      result += `<div class="grid grid-cols-3 gap-2">
        <div class="text-muted-foreground col-span-1">Место рождения:</div>
        <div class="col-span-2">${data.Место_рождения}</div>
      </div>`;
    }
    
    result += '</div>';
    return result;
  });
  
  // Обработка изображений
  html = html.replace(/\[\[Файл:(.*?)\|(.*?)\]\]/g, (match, filename, caption) => {
    return `
      <figure class="my-4">
        <img 
          src="/wiki-content/images/${filename}" 
          alt="${caption}"
          class="rounded-lg max-w-full h-auto"
        />
        <figcaption class="text-center text-sm text-muted-foreground mt-2">${caption}</figcaption>
      </figure>
    `;
  });
  
  // Обработка изображений без подписи
  html = html.replace(/\[\[Файл:(.*?)\]\]/g, (match, filename) => {
    return `
      <img 
        src="/wiki-content/images/${filename}" 
        alt="${filename}"
        class="rounded-lg max-w-full h-auto my-4"
      />
    `;
  });
  
  // Обработка заголовков
  html = html.replace(/^== (.*?) ==$/gm, '<h2 class="text-2xl font-semibold mt-8 mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">$1</h2>');
  html = html.replace(/^=== (.*?) ===$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">$1</h3>');
  
  // Обработка ссылок на пользователей
  html = html.replace(/\[\[(.*?)\|(.*?)\]\]/g, (match, target, text) => {
    // Если это ссылка на пользователя (одно слово без пробелов и спецсимволов)
    if (/^[а-яА-ЯёЁ]+$/.test(target)) {
      return `<a href="/wiki/users/${encodeURIComponent(target.toLowerCase())}" class="text-pink-500 hover:text-purple-500 transition-colors duration-200">${text}</a>`;
    }
    // Иначе это обычная вики-ссылка
    return `<a href="/wiki/${encodeURIComponent(target)}" class="text-pink-500 hover:text-purple-500 transition-colors duration-200">${text}</a>`;
  });

  // Обработка простых ссылок на пользователей
  html = html.replace(/\[\[([а-яА-ЯёЁ]+)\]\]/g, (match, name) => {
    return `<a href="/wiki/users/${encodeURIComponent(name.toLowerCase())}" class="text-pink-500 hover:text-purple-500 transition-colors duration-200">${name}</a>`;
  });
  
  // Обработка остальных простых ссылок
  html = html.replace(/\[\[([^\]|]+)\]\]/g, (match, target) => {
    if (/^[а-яА-ЯёЁ]+$/.test(target)) {
      return match; // Пропускаем, так как это уже обработано выше
    }
    return `<a href="/wiki/${encodeURIComponent(target)}" class="text-pink-500 hover:text-purple-500 transition-colors duration-200">${target}</a>`;
  });
  
  // Обработка внешних ссылок
  html = html.replace(/\[(\S+)\s+(.*?)\]/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-pink-500 hover:text-purple-500 transition-colors duration-200">$2</a>');
  
  // Обработка списков
  html = html.replace(/^\* (.*?)$/gm, '<li class="ml-6 list-disc text-foreground">$1</li>');
  html = html.replace(/^- (.*?)$/gm, '<li class="ml-6 list-disc text-foreground">$1</li>');
  
  // Обработка параграфов (исключая специальные элементы)
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.trim().startsWith('<')) return paragraph;
    if (paragraph.trim().length === 0) return '';
    if (paragraph.trim().startsWith('[[Категория:')) return ''; // Пропускаем категории
    return `<p class="mb-4 text-foreground">${paragraph.trim()}</p>`;
  }).join('\n');
  
  // Обработка одиночных переносов строк
  html = html.replace(/\n(?![<\s])/g, '<br>');
  
  // Оборачиваем списки в ul
  html = html.replace(/(<li.*?>.*?<\/li>\n?)+/g, (match) => `<ul class="mb-4 text-foreground">${match}</ul>`);
  
  return { content: html, metadata };
}

export default function UserPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const filePath = path.join(process.cwd(), 'public', 'wiki-content', `${decodedSlug}.md`);
  
  // Проверяем существование файла
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  // Читаем содержимое файла
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: htmlContent, metadata } = convertWikiToHtml(content);
  
  // Получаем имя из слага, если нет в метаданных
  const name = decodedSlug.replace(/_/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
  
  return <UserPageContent name={name} role={metadata.role} htmlContent={htmlContent} />;
}
