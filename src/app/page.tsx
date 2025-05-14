"use client";

import { ChatHistory } from "@/components/chat-history";
import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Chat, Message } from "@/types/chat";
import { useCallback, useState } from "react";
import { generateChatResponse } from "@/lib/chat-service";

export default function Home() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    const currentChat = chats.find((chat) => chat.id === currentChatId);

    const handleNewChat = useCallback(() => {
        const newChat: Chat = {
            id: Math.random().toString(36).substring(7),
            title: `New Chat ${chats.length + 1}`,
            messages: [],
            createdAt: Date.now(),
        };
        setChats((prevChats) => [...prevChats, newChat]);
        setCurrentChatId(newChat.id);
    }, [chats.length]);

    const handleSendMessage = useCallback(
        async (content: string) => {
            if (!currentChatId) return;

            const newMessage: Message = {
                id: Math.random().toString(36).substring(7),
                content,
                role: "user",
                timestamp: Date.now(),
            };

            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === currentChatId
                        ? {
                              ...chat,
                              messages: [...chat.messages, newMessage],
                          }
                        : chat
                )
            );

            try {
                const currentMessages = [...chats.find(chat => chat.id === currentChatId)!.messages, newMessage];
                const response = await generateChatResponse(currentMessages);
                
                const assistantMessage: Message = {
                    id: Math.random().toString(36).substring(7),
                    content: response,
                    role: "assistant",
                    timestamp: Date.now(),
                };

                setChats((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === currentChatId
                            ? {
                                  ...chat,
                                  messages: [...chat.messages, assistantMessage],
                              }
                            : chat
                    )
                );
            } catch (error) {
                console.error("Failed to get chat response:", error);
                // You might want to show an error message to the user here
            }
        },
        [currentChatId]
    );

    return (
        <div className="flex h-[100vh] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-80 border-r flex-shrink-0 overflow-hidden">
                <ChatHistory
                    chats={chats}
                    currentChatId={currentChatId}
                    onSelectChat={setCurrentChatId}
                    onNewChat={handleNewChat}
                />
            </aside>

            {/* Main chat area */}
            <main className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-hidden p-4">
                    {currentChat ? (
                        <ScrollArea className="h-full">
                            <div className="pr-4">
                                {currentChat.messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                            Start a new chat or select an existing one
                        </div>
                    )}
                </div>
                <div className="p-4 border-t">
                    <ChatInput
                        onSend={handleSendMessage}
                        disabled={!currentChatId}
                    />
                </div>
            </main>
        </div>
    );
}
