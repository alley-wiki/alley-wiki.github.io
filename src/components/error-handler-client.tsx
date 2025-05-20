'use client';

import { useEffect } from 'react';

export default function ErrorHandlerClient() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Перехват и обработка глобальных ошибок
      window.onerror = (msg) => {
        if (String(msg).includes('Connection closed')) {
          console.log('Обработка ошибки Connection closed в ErrorHandlerClient');
          
          // Обработка URL для предотвращения проблемы с не-ASCII символами
          try {
            const currentUrl = new URL(window.location.href);
            let needsUpdate = false;
            
            // Перекодируем все параметры URL
            currentUrl.searchParams.forEach((value, key) => {
              try {
                // Двойное декодирование и кодирование для обеспечения корректного формата
                const decodedValue = decodeURIComponent(decodeURIComponent(value));
                const encodedValue = encodeURIComponent(decodedValue);
                
                if (value !== encodedValue) {
                  currentUrl.searchParams.set(key, encodedValue);
                  needsUpdate = true;
                }
              } catch {
                // Если декодирование не удалось, пробуем просто новое кодирование
                try {
                  const encodedValue = encodeURIComponent(value);
                  if (value !== encodedValue) {
                    currentUrl.searchParams.set(key, encodedValue);
                    needsUpdate = true;
                  }
                } catch {
                  console.warn(`Не удалось перекодировать параметр ${key}`);
                }
              }
            });
            
            // Если были изменения, то перенаправляем на исправленный URL
            if (needsUpdate) {
              console.log('Обнаружены не-ASCII символы в URL, исправляем...');
              window.location.href = currentUrl.toString();
              return true; // Предотвращаем стандартную обработку ошибки
            }
          } catch (urlError) {
            console.error('Ошибка при обработке URL:', urlError);
          }
          
          // Если нет проблем с URL или произошла ошибка при его обработке, 
          // просто перезагружаем страницу
          window.location.reload();
          return true;
        }
        return false;
      };
      
      // Обработка непойманных Promise ошибок
      window.onunhandledrejection = (event) => {
        if (String(event.reason).includes('Connection closed')) {
          console.log('Обработка Promise ошибки Connection closed');
          event.preventDefault();
          
          // Аналогичная логика обработки URL
          try {
            const currentUrl = new URL(window.location.href);
            let needsUpdate = false;
            
            currentUrl.searchParams.forEach((value, key) => {
              try {
                const decodedValue = decodeURIComponent(decodeURIComponent(value));
                const encodedValue = encodeURIComponent(decodedValue);
                
                if (value !== encodedValue) {
                  currentUrl.searchParams.set(key, encodedValue);
                  needsUpdate = true;
                }
              } catch {
                try {
                  const encodedValue = encodeURIComponent(value);
                  if (value !== encodedValue) {
                    currentUrl.searchParams.set(key, encodedValue);
                    needsUpdate = true;
                  }
                } catch {
                  console.warn(`Не удалось перекодировать параметр ${key}`);
                }
              }
            });
            
            if (needsUpdate) {
              console.log('Обнаружены не-ASCII символы в URL, исправляем...');
              window.location.href = currentUrl.toString();
              return;
            }
          } catch (urlError) {
            console.error('Ошибка при обработке URL:', urlError);
          }
          
          window.location.reload();
        }
      };
    }
  }, []);
  
  return null;
} 