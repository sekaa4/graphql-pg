import '@/shared/design/globals.scss';

import type { AppProps } from 'next/app';
import MainLayout from "@/widgets/layouts/main";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>);
}
