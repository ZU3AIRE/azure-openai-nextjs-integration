import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Chat } from "@/types/chat";
import { MessageSquarePlus } from "lucide-react";

interface ChatHistoryProps {
    chats: Chat[];
    currentChatId: string | null;
    onSelectChat: (chatId: string) => void;
    onNewChat: () => void;
}

export function ChatHistory({
    chats,
    currentChatId,
    onSelectChat,
    onNewChat,
}: ChatHistoryProps) {    return (
        <div className="flex h-[100vh] flex-col">
            <div className="flex-shrink-0 p-4 border-b">
                <h2 className="mb-2 text-lg font-semibold">Chat History</h2>
                <Button
                    variant="secondary"
                    className="w-full justify-start gap-2"
                    onClick={onNewChat}
                >
                    <MessageSquarePlus className="h-4 w-4" />
                    New Chat
                </Button>
            </div>
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                        {chats.map((chat) => (
                            <Button
                                key={chat.id}
                                variant={currentChatId === chat.id ? "secondary" : "ghost"}
                                className="w-full justify-start truncate"
                                onClick={() => onSelectChat(chat.id)}
                            >
                                {chat.title}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
