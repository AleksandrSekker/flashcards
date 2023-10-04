import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import Logo from '~/components/Logo/Logo';
import ThemeSwitch from '~/components/ThemeSwitch/ThemeSwitch';
import { routes } from '~/constants/general';

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav className="h-[68px] border-gray-200 bg-blue-500 px-4 dark:bg-gray-900 lg:px-6">
        <div className="m-auto flex h-full max-w-screen-xl flex-wrap items-center justify-between">
          <div className="my-auto flex items-center">
            <Link href={'/'}>
              <Logo />
            </Link>
            <div className="flex lg:hidden">
              <ThemeSwitch />
            </div>
          </div>
          <div className="flex items-center lg:order-2">
            <div className={'my-auto mr-8 hidden h-12 lg:flex'}>
              <div className={'my-auto ml-2'}>
                <ThemeSwitch />
              </div>
            </div>
            <div className={'flex bg-blue-600 lg:hidden'}>
              {/*<Sidebar />*/}
            </div>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col items-center font-medium lg:mt-0 lg:flex-row lg:space-x-1">
              {routes.map(({ title, link, id }) => (
                <Link
                  href={link}
                  key={id}
                  className={`mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white outline-none hover:bg-blue-400 focus:outline-none dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5
                    ${
                      router.pathname == link
                        ? 'bg-blue-400 dark:bg-gray-700'
                        : ''
                    }`}
                  aria-current="page"
                >
                  {title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
