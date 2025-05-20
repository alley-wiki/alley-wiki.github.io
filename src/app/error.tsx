'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логируем ошибку для анализа
    console.error('Ошибка:', error);
    
    // Если это ошибка Connection closed, пытаемся перезагрузить страницу
    if (error.message.includes('Connection closed')) {
      console.log('Обнаружена ошибка Connection closed, перезагрузка...');
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h2 className="text-2xl font-bold mb-4">Что-то пошло не так</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Произошла ошибка при загрузке страницы
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Попробовать снова
      </button>
    </div>
  );
} 