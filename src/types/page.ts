/**
 * Общие свойства для страниц Next.js.
 * T - это тип для параметров маршрута (params).
 */
export interface PageProps<T = Record<string, string>> {
  params: Promise<T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Параметры маршрута для страницы пользователя.
 * Ожидается, что будет 'slug' для идентификации пользователя.
 */
export interface UserPageParams {
  slug: string;
} 