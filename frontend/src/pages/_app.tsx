import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { isUserLoggedIn } from '../utils/auth';
import { ThemeProvider } from '../contexts/ThemeContext';

const publicPages = ['/login'];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const logged = isUserLoggedIn();
    const isPublicPage = publicPages.includes(router.pathname);

    if (!logged && !isPublicPage) {
      router.replace('/login');
      return;
    }

    if (logged && router.pathname === '/login') {
      router.replace('/orcamentos');
      return;
    }

    setReady(true);
  }, [router.isReady, router.pathname]);

  if (!ready) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <AppContent {...props} />
    </ThemeProvider>
  );
}
