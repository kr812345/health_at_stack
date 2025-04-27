'use client';

import { useEffect, useState } from 'react';

export function BarbaProvider({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const initializeBarba = async () => {
      try {
        const [barba, barbaPrefetch] = await Promise.all([
          import('@barba/core'),
          import('@barba/prefetch')
        ]);

        // Initialize Barba plugins
        barba.default.use(barbaPrefetch.default);

        // Initialize Barba core
        barba.default.init({
          debug: process.env.NODE_ENV === 'development',
          prefetch: true,
          prevent: ({ el }) => {
            // Prevent Barba from handling file downloads, external links, etc.
            return (
              el.classList.contains('no-barba') ||
              el.closest('[data-no-barba]') ||
              el.getAttribute('href')?.startsWith('http') ||
              el.getAttribute('href')?.includes('#') ||
              el.getAttribute('target') === '_blank'
            );
          },
          transitions: [
            {
              name: 'fade-transition',
              once: ({ next }) => {
                // Initial page load animation
                next.container.classList.add('fade-enter');
                setTimeout(() => {
                  next.container.classList.add('fade-enter-active');
                }, 50);
              },
              leave: ({ current }) => {
                // Animate out current page
                return new Promise(resolve => {
                  current.container.classList.add('fade-exit');
                  setTimeout(() => {
                    current.container.classList.add('fade-exit-active');
                    setTimeout(resolve, 300);
                  }, 50);
                });
              },
              enter: ({ next }) => {
                // Animate in next page
                next.container.classList.add('fade-enter');
                setTimeout(() => {
                  next.container.classList.add('fade-enter-active');
                  setTimeout(() => {
                    next.container.classList.remove('fade-enter', 'fade-enter-active');
                  }, 300);
                }, 50);
              },
            },
            {
              name: 'slide-transition',
              from: {
                custom: ({ trigger }) => trigger.dataset.transition === 'slide',
              },
              leave: ({ current }) => {
                return new Promise(resolve => {
                  current.container.classList.add('slide-exit');
                  setTimeout(() => {
                    current.container.classList.add('slide-exit-active');
                    setTimeout(resolve, 300);
                  }, 50);
                });
              },
              enter: ({ next }) => {
                next.container.classList.add('slide-enter');
                setTimeout(() => {
                  next.container.classList.add('slide-enter-active');
                  setTimeout(() => {
                    next.container.classList.remove('slide-enter', 'slide-enter-active');
                  }, 300);
                }, 50);
              },
            },
          ],
        });

        // Add hooks for cleaning up and reinitializing page-specific JavaScript
        barba.default.hooks.after(() => {
          // Re-initialize any page-specific JavaScript here
          window.dispatchEvent(new Event('barba:after'));
        });

        setIsClient(true);
      } catch (error) {
        console.error('Failed to initialize Barba:', error);
      }
    };

    initializeBarba();

    return () => {
      if (isClient) {
        // Clean up Barba if it was initialized
        import('@barba/core').then(barba => {
          barba.default.destroy();
        });
      }
    };
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
}