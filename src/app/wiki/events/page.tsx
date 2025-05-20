import { Metadata } from "next";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";

export const metadata: Metadata = {
  title: "События сервера | Вишневые Аллеи",
};

interface EventInfo {
  title: string;
  slug: string;
  preview: string;
}

/**
 * Ищем первую «живую» строку для превью, пропуская служебные конструкции:
 * - Пустые строки
 * - # (заголовок)
 * - == (подзаголовок)
 * - {{Событие_сервера...
 * - Начало: / Конец:
 */
function extractPreviewLine(lines: string[]): string {
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("==")) continue;
    if (trimmed.startsWith("{{Событие_сервера")) continue;
    if (trimmed.startsWith("Начало:")) continue;
    if (trimmed.startsWith("Конец:")) continue;
    return trimmed; // Первая нормальная строка
  }
  return "";
}

/**
 * Преобразуем первую букву (или каждое слово) в верхний регистр
 * Здесь — каждое слово в заголовке
 */
function capitalizeTitle(rawTitle: string): string {
  return rawTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Парсим один .md-файл, чтобы получить:
 * - title (автоматически капитализируем)
 * - slug (имя файла без .md)
 * - preview (первая «живая» строка)
 */
async function parseEventFile(filePath: string): Promise<EventInfo | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const slug = path.basename(filePath, ".md");

    // Ищем заголовок "# ..."
    const titleMatch = content.match(/^# (.*)/);
    const rawTitle = titleMatch ? titleMatch[1].trim() : slug;
    // Делаем заглавной каждое слово
    const title = capitalizeTitle(rawTitle);

    // Ищем «превью»
    const preview = extractPreviewLine(lines);

    return {
      title,
      slug,
      preview,
    };
  } catch (error) {
    console.error(`Ошибка при парсинге файла события ${filePath}:`, error);
    return null;
  }
}

export default async function EventsPage() {
  const eventsDir = path.join(process.cwd(), "public", "events");
  // Собираем все файлы .md
  const files = readdirSync(eventsDir).filter((file) => file.endsWith(".md"));

  // Парсим их
  const eventsPromises = files.map((file) =>
    parseEventFile(path.join(eventsDir, file))
  );
  const eventsArray = await Promise.all(eventsPromises);
  // Фильтруем null
  const events = eventsArray.filter((event): event is EventInfo => event !== null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        🎉 События сервера
      </h1>
      <p className="text-center text-muted-foreground mb-6">
        Все события на сервере Вишневые Аллеи
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/wiki/events/${encodeURIComponent(event.slug)}`}
            className="block group"
          >
            <div className="p-4 rounded-lg border bg-card shadow hover:shadow-lg transition-shadow">
              {/* Заголовок (уже капитализирован) */}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {event.title}
              </h2>
              {/* Превью (без служебных строк) */}
              <p className="text-sm text-foreground/80 line-clamp-2">
                {event.preview}
              </p>
              <div className="mt-3 text-sm text-pink-500 group-hover:underline">
                Подробнее →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
