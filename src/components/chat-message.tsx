import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";
    
    return (
        <div className={cn(
            "group relative mb-2 flex items-start gap-2 px-3",
            isUser && "flex-row-reverse"
        )}>
            <div className={cn(
                "flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={cn(
                "relative flex flex-col gap-1 rounded-xl px-2.5 py-1.5",
                isUser ? "bg-primary text-primary-foreground" : "bg-secondary",
                "max-w-[75%]"
            )}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                </div>
            </div>
        </div>
    );
}
