"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import hukLogo from "../../public/huk_logo.png";
import Image from "next/image";
import Link from "next/link";

// Max Count 8
const navigation = [
  { name: "스케줄", href: "/client/schedule", isAdmin: false },
  { name: "이벤트", href: "/client/event-history", isAdmin: false },
  { name: "맴버 관리", href: "/admin/member", isAdmin: true },
  { name: "슈퍼 스케줄", href: "/admin/schedule", isAdmin: true },
  { name: "연차 관리", href: "/admin/annual", isAdmin: true },
  { name: "이벤트 모델", href: "/admin/event-model", isAdmin: true },
  { name: "운영", href: "/admin/management", isAdmin: true },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image className="h-8 w-auto" src={hukLogo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation
            .filter((i) => i.isAdmin === adminMenu)
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user && (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
          {user && (
            <div>
              {user.isAdmin && (
                <button
                  onClick={() => setAdminMenu((prev) => !prev)}
                  className="mr-4 text-sm font-semibold leading-6 text-gray-900"
                >
                  {adminMenu ? "관리자" : "일반"}
                </button>
              )}
              <button
                onClick={() => signOut()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {user.name}
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image className="h-8 w-auto" src={hukLogo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation
                  .filter((i) => i.isAdmin === adminMenu)
                  .map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
              <div className="py-6">
                {!user && (
                  <button
                    onClick={() => signIn()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </button>
                )}
                {user && (
                  <div>
                    {user.isAdmin && (
                      <button
                        onClick={() => setAdminMenu((prev) => !prev)}
                        className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {adminMenu ? "관리자" : "일반"}
                      </button>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {user.name}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
