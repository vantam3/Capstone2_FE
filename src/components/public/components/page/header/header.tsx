import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
// import cookies from "js-cookie"; // Removed js-cookie
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Practice", href: "/practice" },
  { name: "Conversation", href: "/conversation" },
  { name: "Challenges", href: "/challenges" },
  { name: "Leaderboard", href: "/leader-board" },
  { name: "About", href: "/about" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate(); // Changed from router to navigate for consistency

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = sessionStorage.getItem("user");
      try {
        if (storedUserData) {
          setLoggedInUser(JSON.parse(storedUserData));
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage:", error);
        setLoggedInUser(null);
        // Optionally clear corrupted data
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }
    }
  }, [pathname]); // Re-check user status on route change

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
    setLoggedInUser(null);
    setIsOpen(false);
    navigate("/sign-in");
  };

  const getInitials = (user) => {
    if (!user) return "U";
    if (user.first_name && user.last_name) {
      return (user.first_name[0] + user.last_name[0]).toUpperCase();
    }
    if (user.username) { // Assuming 'username' is available from the user object
      return user.username[0].toUpperCase();
    }
    return "U";
  };

  const getDisplayName = (user) => {
    if (!user) return "Guest";
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.username) {
      return user.username;
    }
    return "User";
  };


  return (
    <>
      {pathname !== "/sign-in" && (
        <header className="fixed inset-x-0 top-0 z-50 max-w-screen-2xl mx-auto bg-[#6e4dbf]/20 backdrop-blur-sm">
          <nav className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="/home" className="-m-1.5 p-1.5"> {/* Usually links to home or dashboard */}
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
                    to={item.href}
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
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-200" // Adjusted text color for better visibility
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" /> {/* Adjusted size to h-6 w-6 for consistency */}
              </button>
            </div>

            {loggedInUser ? (
              <div className="relative hidden lg:flex" ref={dropdownRef}> {/* Ensured this part is also hidden on small screens initially */}
                <button // Changed div to button for accessibility
                  type="button"
                  id="avatarButton"
                  onClick={toggleDropdown} // Simplified toggle, profile navigation can be a dropdown item
                  className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center cursor-pointer font-semibold text-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {loggedInUser.avatar ? (
                    <img
                      src={loggedInUser.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover" // Removed redundant rounded-full here
                    />
                  ) : (
                    getInitials(loggedInUser)
                  )}
                </button>

                {isOpen && (
                  <div
                    className="absolute right-0 z-10 mt-12 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:divide-gray-600"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="avatarButton"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{getDisplayName(loggedInUser)}</div>
                      <div className="font-medium truncate">
                        {loggedInUser.email || "No email"}
                      </div>
                    </div>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" role="none">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1" role="none">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                <Link
                  to="/sign-in"
                  className="text-sm/6 font-semibold text-white hover:text-gray-300"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => navigate("/sign-in?tab=register")}
                  className="rounded-[10px] cursor-pointer bg-[#9061F9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#7a52cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9061F9]"
                >
                  Get Started
                </button>
              </div>
            )}
          </nav>

          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <a href="/home" className="-m-1.5 p-1.5">
                  <span className="sr-only">SpeakAI</span>
                  <img
                    alt="logo"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFhlxCnORmJv-1GfXj6N70XwssHGRSwEuew&s"
                    className="h-8 w-auto rounded-[8px]"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link // Changed from <a> to <Link>
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {loggedInUser ? (
                       <>
                        <div className="px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-white">
                          {getDisplayName(loggedInUser)} ({loggedInUser.email})
                        </div>
                         <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                        >
                          Sign Out
                        </button>
                       </>
                    ) : (
                      <Link // Changed from <a> to <Link>
                        to="/sign-in"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
                      >
                        Sign In / Register
                      </Link>
                    )}
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