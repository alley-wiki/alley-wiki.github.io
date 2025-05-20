'use client';

import { useEffect, useState } from 'react';

export default function ErrorFallback() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Глобальный обработчик ошибок
    const originalOnError = window.onerror;
    window.onerror = (msg, source, line, col, error) => {
      if (String(msg).includes('Connection closed')) {
        console.log('Обработка ошибки Connection closed...');
        setHasError(true);
        
        // Очистка URL от не-ASCII символов, которые могут вызывать проблему
        try {
          const currentUrl = new URL(window.location.href);
          // Проходим по всем параметрам и перекодируем их
          currentUrl.searchParams.forEach((value, key) => {
            // Дважды декодируем и затем кодируем параметры для обеспечения корректной кодировки
            const decodedValue = decodeURIComponent(decodeURIComponent(value));
            const encodedValue = encodeURIComponent(decodedValue);
            currentUrl.searchParams.set(key, encodedValue);
          });
          
          // Сохраняем исправленный URL для будущей перезагрузки
          window.history.replaceState({}, '', currentUrl.toString());
        } catch (urlError) {
          console.error('Ошибка при обработке URL:', urlError);
        }
        
        return true; // Предотвращаем стандартную обработку ошибки
      }
      
      // Вызываем оригинальный обработчик для других ошибок
      if (originalOnError) {
        return originalOnError.call(window, msg, source, line, col, error);
      }
      return false;
    };

    // Обработчик непойманных promise ошибок
    const originalUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      if (String(event.reason).includes('Connection closed')) {
        console.log('Обработка Promise ошибки Connection closed...');
        setHasError(true);
        
        // Очистка URL от не-ASCII символов, которые могут вызывать проблему
        try {
          const currentUrl = new URL(window.location.href);
          // Проходим по всем параметрам и перекодируем их
          currentUrl.searchParams.forEach((value, key) => {
            // Дважды декодируем и затем кодируем параметры для обеспечения корректной кодировки
            const decodedValue = decodeURIComponent(decodeURIComponent(value));
            const encodedValue = encodeURIComponent(decodedValue);
            currentUrl.searchParams.set(key, encodedValue);
          });
          
          // Сохраняем исправленный URL для будущей перезагрузки
          window.history.replaceState({}, '', currentUrl.toString());
        } catch (urlError) {
          console.error('Ошибка при обработке URL:', urlError);
        }
        
        event.preventDefault();
        return;
      }
      
      // Вызываем оригинальный обработчик для других ошибок
      if (originalUnhandledRejection) {
        originalUnhandledRejection.call(window, event);
      }
    };

    return () => {
      window.onerror = originalOnError;
      window.onunhandledrejection = originalUnhandledRejection;
    };
  }, []);

  // Если обнаружена ошибка
  if (hasError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Произошла ошибка</h2>
          <p className="text-muted-foreground mb-4">Перезагрузка страницы...</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded"
          >
            Перезагрузить сейчас
          </button>
          {/* Автоматически перезагружаем страницу через 2 секунды */}
          <script dangerouslySetInnerHTML={{ __html: `
            setTimeout(() => { window.location.reload(); }, 2000);
          `}} />
        </div>
      </div>
    );
  }

  // Если ошибки нет, не рендерим ничего
  return null;
} 