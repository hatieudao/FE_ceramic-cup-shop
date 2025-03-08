import * as React from 'react';
import { Link } from 'react-router';

import { Head } from '../seo';

import { Header } from './header';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <Header />

      <div
        className="relative flex h-64 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(assets/images/page_title_bg.webp)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold">{title}</h1>
          <div className="flex items-center justify-center space-x-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
          {children}
        </div>
      </div>
    </>
  );
};
