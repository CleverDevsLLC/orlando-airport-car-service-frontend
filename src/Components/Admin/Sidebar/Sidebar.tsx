"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Building, Users, Settings, HelpCircle, Menu, ArrowLeftIcon, type LucideIcon } from 'lucide-react';
import Link from "next/link";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

interface SidebarProps {
  title: string;
  value: string;
  setValue: (value: string) => void;
}

const menuItems: MenuItem[] = [
  { icon: Settings, label: "Manage", value: "manage" },
  { icon: Users, label: "Leads", value: "leads" },
  { icon: HelpCircle, label: "Info", value: "info" },
  { icon: ArrowLeftIcon, label: "Back", value: "back", href: "/admin" },
];

export default function Sidebar({ title, value, setValue }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleItemClick = (itemValue: string) => {
    if (itemValue !== "back") {
      setValue(itemValue);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        className="absolute -right-3 top-9 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex h-16 items-center justify-center">
        {isCollapsed ? (
          <Menu size={24} />
        ) : (
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
            <Building /> {title}
          </h1>
        )}
      </div>

      <nav>
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.value} className="cursor-pointer">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`group flex items-center rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 ${
                    value === item.value ? "bg-gray-700" : ""
                  }`}
                >
                  <item.icon size={20} className="mr-3 flex-shrink-0" />
                  <span
                    className={`whitespace-nowrap ${
                      isCollapsed
                        ? "invisible absolute scale-0 opacity-0 group-hover:visible group-hover:relative group-hover:ml-2 group-hover:scale-100 group-hover:opacity-100"
                        : ""
                    } transition-all duration-200`}
                  >
                    {item.label}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => handleItemClick(item.value)}
                  className={`group flex w-full items-center rounded-md p-2 transition-colors duration-200 hover:bg-gray-700 ${
                    value === item.value ? "bg-gray-700" : ""
                  }`}
                >
                  <item.icon size={20} className="mr-3 flex-shrink-0" />
                  <span
                    className={`whitespace-nowrap ${
                      isCollapsed
                        ? "invisible absolute scale-0 opacity-0 group-hover:visible group-hover:relative group-hover:ml-2 group-hover:scale-100 group-hover:opacity-100"
                        : ""
                    } transition-all duration-200`}
                  >
                    {item.label}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

