import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProps {
  image?: string;
  name?: string;
}

const getInitials = (name?: string): string => {
  if (!name) return '';

  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function UserAvatar({ image, name }: AvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
