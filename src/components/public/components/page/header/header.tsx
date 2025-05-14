import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Practice", href: "/practice" },
  { name: "Conversation", href: "/conversation" },
  { name: "Challenges", href: "/challenges" },
  { name: "Leaderboard", href: "/leader-board" },
  { name: "About", href: "/about" },
];

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {pathname !== "/sign-in" && (
        <header className="absolute inset-x-0 top-0 z-50 max-w-screen-2xl mx-auto">
          <nav className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <img
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFhlxCnORmJv-1GfXj6N70XwssHGRSwEuew&s"
                  className="h-8 w-auto rounded-[8px]"
                />
              </Link>
              <div className="hidden lg:flex lg:gap-x-8 px-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-semibold ${
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
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-gray-700"
              >
                <Bars3Icon className="size-6" />
              </button>
            </div>

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center cursor-pointer font-semibold text-sm overflow-hidden"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    (user?.name?.split(" ").map((n) => n[0]).join("") || "U").toUpperCase()
                  )}
                </div>

                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white divide-y rounded-lg shadow w-44">
                    <div className="px-4 py-3 text-sm">
                      <div>{user?.name}</div>
                      <div className="text-gray-500 truncate">{user?.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
                <Link to="/sign-in" className="text-white text-sm font-semibold">
                  Sign In
                </Link>
                <button
                  onClick={() => router("/sign-in?tab=register")}
                  className="rounded-[10px] bg-[#9061F9] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7f4ded]"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>
        </header>
      )}
    </>
  );
}

export default Header;
