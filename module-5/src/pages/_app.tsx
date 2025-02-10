import HeaderLayout from '@/components/layouts/HeaderLayout';
import WithoutHeader from '@/components/layouts/WithoutHeader';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = () => {
    const layout = (Component as NextPage).layout;
    if (layout === 'Auth') {
      return (
        <WithoutHeader>
          <Component {...pageProps} />
        </WithoutHeader>
      )
    } else {
      return (
        <HeaderLayout>
          <Component {...pageProps} />
        </HeaderLayout>
      )
    }
  }
  return (
    <AuthProvider>
      {getLayout()}
    </AuthProvider>
  );
}
