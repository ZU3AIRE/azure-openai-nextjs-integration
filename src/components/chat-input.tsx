import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input.trim());
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
                onSend(input.trim());
                setInput("");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="min-h-[60px] flex-1"
                disabled={disabled}
            />
            <Button type="submit" size="icon" disabled={disabled || !input.trim()}>
                <SendHorizontal className="h-4 w-4" />
                <span className="sr-only">Send message</span>
            </Button>
        </form>
    );
}
