'use client';

import { memo, forwardRef } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { UrlObject } from 'url';

interface LinkWrapperProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Используем memo и forwardRef для оптимизации
export const LinkWrapper = memo(
  forwardRef<HTMLAnchorElement, LinkWrapperProps>(
    function LinkWrapperInner({ children, className, onClick, ...props }, ref) {
      // Обрабатываем URL перед навигацией для предотвращения ошибок с не-ASCII символами
      const processHref = (href: string | URL | UrlObject) => {
        try {
          const urlString = typeof href === 'object' && 'pathname' in href 
            ? `${href.pathname || ''}${href.search || ''}${href.hash || ''}`
            : href.toString();
            
          const url = new URL(urlString, window.location.origin);
          
          // Проходим по всем параметрам и обеспечиваем корректное кодирование
          url.searchParams.forEach((value, key) => {
            try {
              // Двойное декодирование/кодирование для корректной обработки Unicode
              const decodedValue = decodeURIComponent(decodeURIComponent(value));
              const encodedValue = encodeURIComponent(decodedValue);
              url.searchParams.set(key, encodedValue);
            } catch (e) {
              // Если декодирование не удалось, используем значение как есть
              console.warn(`Проблема с декодированием параметра ${key}:`, e);
            }
          });
          
          // Возвращаем обработанный URL
          if (url.origin === window.location.origin) {
            return url.pathname + url.search + url.hash;
          }
          return url.toString();
        } catch (e) {
          console.warn('Ошибка при обработке URL:', e);
          return href;
        }
      };

      // Отключаем перехватывание ошибок для отладки
      const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        try {
          // Вызываем пользовательский обработчик если он есть
          if (onClick) {
            onClick(e);
          }
        } catch (error) {
          console.error('Ошибка при клике на ссылку:', error);
          // Предотвращаем ошибку Connection closed
          if (String(error).includes('Connection closed')) {
            e.preventDefault();
            const safeHref = processHref(props.href);
            // Преобразуем результат в строку для window.location.href
            window.location.href = typeof safeHref === 'string' 
              ? safeHref 
              : safeHref.toString();
          }
        }
      };

      // Обрабатываем href перед передачей его компоненту Link
      const safeHref = processHref(props.href);

      return (
        <Link
          {...props}
          href={safeHref}
          className={className}
          onClick={handleLinkClick}
          prefetch={false}
          scroll={false}
          ref={ref}
        >
          {children}
        </Link>
      );
    }
  )
); 