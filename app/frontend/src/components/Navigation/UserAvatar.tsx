'use client';

import Image from 'next/image';

interface UserAvatarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar = ({ user, size = 'md', className = '' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  const userInitial =
    user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';

  const avatarClasses = `${sizeClasses[size]} ${className}`;

  if (user.image) {
    return (
      <div className={`relative ${avatarClasses}`}>
        <Image
          src={user.image}
          alt={user.name || 'User'}
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white ${avatarClasses}`}
    >
      {userInitial}
    </div>
  );
};
