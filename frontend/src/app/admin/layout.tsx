'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { LayoutDashboard, LibraryBig, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import ApolloWrapper from '../providers/ApolloWrapper'

const links = [
  {
    label: 'Сурагчдын мэдээлэл',
    href: '/admin/dashboard',
    icon: <LayoutDashboard />,
  },
  { label: 'Сургалтын материал', href: '/admin/library', icon: <LibraryBig /> },
  { label: 'Log out', href: '/', icon: <LogOut /> },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  const sidebarWidth = desktopCollapsed ? 'w-0' : 'w-44'
  const mainMargin = desktopCollapsed ? 'md:ml-20' : 'md:ml-64'

  return (
    <ApolloWrapper>
      <div className="flex h-screen dark:bg-neutral-800 gap-3">
        {/* Mobile header */}
        <div className="flex items-center justify-between w-full p-4 fixed bg-white dark:bg-neutral-900 border-b md:hidden top-0 left-0 z-50">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            EchoMind
          </span>
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            'flex flex-col gap-4 mt-16 md:mt-0 px-2 inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out',
            desktopCollapsed && 'px-0 gap-2',
            mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}
        >
          <Sidebar open={mobileOpen} setOpen={setMobileOpen}>
            <SidebarBody className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4 mt-16 md:mt-0 px-2">
                {links.map((link, index) => (
                  <SidebarLink
                    key={index}
                    link={{
                      ...link,
                      label: desktopCollapsed ? '' : link.label,
                    }}
                  />
                ))}
              </div>

              {/* Admin Avatar */}
              <div className="px-2 mb-4">
                <SidebarLink
                  link={{
                    label: desktopCollapsed ? '' : 'Admin',
                    href: '/admin/profile',
                    icon: (
                      <Avatar className="border">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        <main
          className={`flex-1 transition-all duration-300 ease-in-out mt-16 md:mt-0 p-4 md:ml-${sidebarWidth}`}
        >
          {children}
        </main>
      </div>
    </ApolloWrapper>
  )
}
