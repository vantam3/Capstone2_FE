import {
  BellIcon,
  GlobeAltIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Personal information",
      path: "personal-information",
      icon: <UserIcon className="w-4 h-4 text-white" />,
    },
    {
      name: "Security",
      path: "security",
      icon: <LockClosedIcon className="w-4 h-4 text-white" />,
    },
    {
      name: "Language",
      path: "language",
      icon: <GlobeAltIcon className="w-4 h-4 text-white" />,
    },
    {
      name: "Notification",
      path: "notification",
      icon: <BellIcon className="w-4 h-4 text-white" />,
    },
  ];

  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const pathParams = searchParams.get("path");
  const activePath = pathParams || menu[0].path;

  return (
    <>
      <div className="w-full bg-[#170a38] border border-[#2d1c65] rounded-[16px] mt-4 shadow-sm p-4 space-y-2">
        <p className="text-white text-lg font-bold">Account settings</p>
        {menu.map((item) => (
          <div
            className={`${
              item.path === activePath ? "bg-[#4c2e90]" : ""
            } hover:bg-[#4c2e90] cursor-pointer p-2 gap-1 flex items-center rounded-[8px]`}
            key={item.path}
            onClick={() => router(`/public/profile?path=${item.path}`)}
          >
            {item.icon}
            <p className="text-base text-white sm:text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
