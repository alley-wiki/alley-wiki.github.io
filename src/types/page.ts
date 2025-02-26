export interface PageProps<T = { [key: string]: string }> {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface UserPageParams {
  slug: string;
}
