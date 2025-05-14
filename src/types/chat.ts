export type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
};

export type Chat = {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
};
