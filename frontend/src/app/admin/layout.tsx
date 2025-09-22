'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import {
  Backpack,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Settings,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import ApolloWrapper from '../providers/ApolloWrapper'

const links = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    label: 'Library',
    href: '/admin/library',
    icon: <LibraryBig />,
  },
  {
    label: 'Log out',
    href: '/',
    icon: <LogOut />,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <ApolloWrapper>
      <div
        className={cn(
          'flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
          'h-screen'
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="h-screen flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {links.map((link, index) => {
                return <SidebarLink key={index} link={link} />
              })}
            </div>
            <div>
              <SidebarLink
                link={{
                  label: 'Admin',
                  href: '/admin/profile',
                  icon: (
                    <Avatar className="border ">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </div>
    </ApolloWrapper>
  )
}
