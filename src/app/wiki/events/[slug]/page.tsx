import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import EventPageContent from "./EventPageContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const eventsDir = path.join(process.cwd(), "public", "events");
  const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith(".md"));

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.slug);
  return {
    title: `${decodedSlug} — Событие | Вишневые Аллеи`,
  };
}

/**
 * Преобразуем каждое слово в заголовке в верхний регистр
 * (если нужно автоматически "подправлять" регистр).
 */
function capitalizeTitle(rawTitle: string): string {
  return rawTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Парсим {{Событие_сервера|Аватарка=...|Название=...|Начало=...|Конец=...|Место=...}}
 */
function parseEventTemplate(template: string): Record<string, string> {
  const params = template.split("|");
  const data: Record<string, string> = {};

  for (const param of params) {
    if (param.includes("=")) {
      const [key, value] = param.split("=").map((p) => p.trim());
      if (key && value) {
        data[key] = value;
      }
    }
  }
  return data;
}

/**
 * Упрощённый парсер вики-текста -> HTML
 * - Убираем розовый цвет с заголовков (==, ===)
 * - Оставляем поле "Место" в инфобоксе
 */
function convertWikiToHtml(wikiText: string): { content: string } {
  let html = wikiText;

  // 1. Инфобокс {{Событие_сервера|...}}
  html = html.replace(/{{Событие_сервера\|(.*?)}}/g, (match, content) => {
    const data = parseEventTemplate(content);

    return `
      <div class="infobox mb-6 md:float-right md:w-64 w-full md:ml-6 ml-0 bg-card border border-border shadow-md p-4 rounded-md">
        ${
          data.Аватарка
            ? `<div class="mb-4 overflow-hidden rounded-md">
                 <img 
                   src="/wiki-content/images/${encodeURIComponent(data.Аватарка)}" 
                   alt="${data.Название || data.Аватарка}" 
                   class="object-cover w-full h-auto rounded-md"
                 />
               </div>`
            : ""
        }
        <div class="text-sm space-y-1">
          ${data.Название ? `<div><strong>Название:</strong> ${data.Название}</div>` : ""}
          ${data.Начало ? `<div><strong>Начало:</strong> ${data.Начало}</div>` : ""}
          ${data.Конец ? `<div><strong>Конец:</strong> ${data.Конец}</div>` : ""}
          ${data.Место ? `<div><strong>Место:</strong> ${data.Место}</div>` : ""}
        </div>
      </div>
    `;
  });

  // 2. Заголовки (==, ===) — убираем розовый цвет
  // == Заголовок ==
  html = html.replace(
    /^==\s*(.+?)\s*==$/gm,
    `<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>`
  );
  // === Подзаголовок ===
  html = html.replace(
    /^===\s*(.+?)\s*===$/gm,
    `<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>`
  );

  // 3. Жирный/курсив ('''...''', ''...'')
  html = html.replace(/'''(.+?)'''/g, `<strong>$1</strong>`);
  html = html.replace(/''(.+?)''/g, `<em>$1</em>`);

  // 4. Списки (*)
  html = html.replace(/^\* (.+)$/gm, `<li>$1</li>`);
  html = html.replace(
    /(<li>[\s\S]*?<\/li>\s*)+/g,
    `<ul class="list-disc list-inside ml-6">$&</ul>`
  );

  // 5. [[Внутренние ссылки]] и [[Файл:...]]
  html = html.replace(/\[\[([^|\]]+)(?:\|([^\]]*))?\]\]/g, (match, p1, p2) => {
    const raw = p1.trim();
    const text = p2 ? p2.trim() : "";

    if (raw.toLowerCase().startsWith("файл:")) {
      const fileName = raw.slice(5).trim();
      const safeFileName = encodeURIComponent(fileName);
      const caption = text;
      return `
        <figure class="my-4">
          <img
            src="/events/images/${safeFileName}"
            alt="${caption}"
            class="max-w-full h-auto rounded-md"
          />
          ${
            caption
              ? `<figcaption class="text-sm text-center mt-2 text-muted-foreground">${caption}</figcaption>`
              : ""
          }
        </figure>
      `;
    } else {
      // Обычная внутренняя ссылка [[Событие_Весны|Весенний ивент]]
      const slug = encodeURIComponent(raw.toLowerCase());
      const linkText = text || raw;
      return `<a href="/wiki/events/${slug}" class="text-primary hover:underline">${linkText}</a>`;
    }
  });

  // 6. Внешние ссылки [https://... Текст]
  html = html.replace(
    /\[(https?:\/\/[^\s]+)\s+([^\]]+)\]/g,
    (match, url, linkText) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${linkText}</a>`;
    }
  );

  return { content: html };
}

export default async function EventPage(props: PageProps) {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.slug);
  const filePath = path.join(process.cwd(), "public", "events", `${decodedSlug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Считываем .md
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Преобразуем wiki -> HTML
  const { content: htmlContent } = convertWikiToHtml(fileContent);

  // Если хотите брать заголовок из "# ..."
  const titleMatch = fileContent.match(/^# (.*)/);
  const rawTitle = titleMatch ? titleMatch[1].trim() : decodedSlug;
  const title = capitalizeTitle(rawTitle);

  return (
    <EventPageContent
      title={title}
      htmlContent={htmlContent}
    />
  );
}
