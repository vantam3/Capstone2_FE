"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Practice", href: "/practice" },
  { name: "Challenges", href: "/challenges" },
  { name: "Leaderboard", href: "/leader-board" },
  { name: "About", href: "/about" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname !== "/sign-in" && (
        <header className="absolute inset-x-0 top-0 z-50 max-w-screen-2xl mx-auto">
          <nav className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">SpeakAI</span>
                <img
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFhlxCnORmJv-1GfXj6N70XwssHGRSwEuew&s"
                  className="h-8 w-auto rounded-[8px]"
                />
              </a>
              <div className="hidden lg:flex lg:gap-x-8 px-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm/6 font-semibold ${
                      pathname === item.href ? "text-[#6e4dbf]" : "text-white"
                    } `}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
              <Link
                href="/sign-in"
                className="text-sm/6 font-semibold text-white"
              >
                Sign In
              </Link>
              <button
                onClick={() => router.push("/sign-in?tab=register")}
                className="rounded-[10px] cursor-pointer bg-[#9061F9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#9061F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9061F9]"
              >
                Get Started
              </button>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFhlxCnORmJv-1GfXj6N70XwssHGRSwEuew&s"
                    className="h-8 w-auto rounded-[8px]"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      )}
    </>
  );
}

export default Header;
