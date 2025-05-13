'use client';

import {
  ChevronsUpDown,
  FilePenLine,
  Headphones,
  LogIn,
  LogOut,
  Newspaper,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

export function NavUser() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isMobile } = useSidebar();
  const router = useRouter();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={
                    isAuthenticated
                      ? (user?.detail.avatar_url ??
                        'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4')
                      : 'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4'
                  }
                  alt={user?.detail.first_name}
                />
                <AvatarFallback className='rounded-lg'>GU</AvatarFallback>
              </Avatar>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='start'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={
                      isAuthenticated
                        ? (user?.detail.avatar_url ??
                          'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4')
                        : 'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4'
                    }
                    alt={user?.detail.first_name}
                  />
                  <AvatarFallback className='rounded-lg'></AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user?.detail.first_name}</span>
                  <span className='truncate text-xs'>{user?.detail.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/check')}>
                <Sparkles />
                Analyze
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/results/papers')}>
                <Newspaper />
                Papers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/speeches')}>
                <Headphones />
                Past Recordings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {isAuthenticated ? (
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  router.push('');
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => router.push('/auth/signin')}>
                <LogIn />
                Log in
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
