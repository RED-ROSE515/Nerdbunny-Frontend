import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import ErrorContent from '../paper/error-content';

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
    id: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <Card
        className={cn(
          message.role === 'user'
            ? 'max-w-[80%] bg-primary text-primary-foreground'
            : 'max-w-[100%] rounded-lg border border-border/20 bg-gradient-to-b from-background/80 to-background/40 p-2 shadow-xl backdrop-blur-lg'
        )}
      >
        <CardContent className={cn(message.role === 'user' ? 'p-3' : 'p-1')}>
          {message.role === 'user' ? (
            <p className='text-sm'>{message.content}</p>
          ) : (
            <ErrorContent content={message.content} />
          )}
        </CardContent>
      </Card>

      {message.role === 'user' && (
        <Avatar>
          <AvatarImage src='/placeholder.svg?height=40&width=40' alt='User' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
