"use client";

import { Editor } from "@tiptap/react";

import {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Code,
    Undo,
    Redo,
    ImageIcon,
    Link2,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthApi } from "@/hooks/useAuthApi";
import { useAuth } from "@/context/AuthContext";
import { useRef } from "react";

interface Props {
    editor: Editor;
}

export default function EditorToolbar({
    editor,
}: Props) {
    if (!editor) return null;
    const api = useAuthApi();
    const { user } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);

    const addImage = () => {
        const url = window.prompt(
            "Enter Image URL"
        );

        if (!url) return;

        editor
            .chain()
            .focus()
            .setImage({
                src: url,
            })
            .run();
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!user) return;
        if (user.role !== "SUPER_ADMIN") return;
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("image", file);

        const res = await api.post("/api/superAdmin/editor/upload/editor-image", formData);

        editor
            .chain()
            .focus()
            .setImage({
                src: process.env.NEXT_PUBLIC_BACKEND_DOMAIN+res.data.url,
            })
            .run();
    };

    const addLink = () => {
        const url =
            window.prompt("Enter URL");

        if (!url) return;

        editor
            .chain()
            .focus()
            .setLink({
                href: url,
            })
            .run();
    };

    return (
        <div className="flex flex-wrap gap-2 border-b p-2 bg-muted">

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
            >
                <Bold size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
            >
                <Italic size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run()
                }
            >
                <Underline size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleHighlight()
                        .run()
                }
            >
                <Highlighter size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({
                            level: 1,
                        })
                        .run()
                }
            >
                <Heading1 size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({
                            level: 2,
                        })
                        .run()
                }
            >
                <Heading2 size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBulletList()
                        .run()
                }
            >
                <List size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleOrderedList()
                        .run()
                }
            >
                <ListOrdered size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBlockquote()
                        .run()
                }
            >
                <Quote size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleCodeBlock()
                        .run()
                }
            >
                <Code size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                // onClick={addImage}
                onClick={() => inputRef.current?.click()}
            >
                <ImageIcon size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={addLink}
            >
                <Link2 size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(
                            "left"
                        )
                        .run()
                }
            >
                <AlignLeft size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(
                            "center"
                        )
                        .run()
                }
            >
                <AlignCenter size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setTextAlign(
                            "right"
                        )
                        .run()
                }
            >
                <AlignRight size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                <Undo size={18} />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                <Redo size={18} />
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
            />
        </div>
    );
}