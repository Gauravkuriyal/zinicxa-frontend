"use client";

import {
    useEditor,
    EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { useEffect } from "react";
import EditorToolbar from "./editorToolbar";


interface Props {
    value: string;

    onChange: (value: string) => void;
}

export default function RichTextEditor({
    value,
    onChange,
}: Props) {
    const editor = useEditor({
        immediatelyRender: false,

        extensions: [
            StarterKit,

            Underline,

            Highlight,

            Link.configure({
                openOnClick: false,
            }),

            Image.configure({
                inline: false,
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),
        ],

        content: value,

        editorProps: {
            attributes: {
                class:
                    "min-h-[350px] border rounded-b-lg p-5 focus:outline-none prose max-w-none",
            },
        },

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (
            editor &&
            value !== editor.getHTML()
        ) {
            editor.commands.setContent(value);
        }
    }, [value]);

    if (!editor) return null;

    return (
        <div className="rounded-lg border overflow-hidden bg-background">

            <EditorToolbar editor={editor} />

            <EditorContent editor={editor} className="tiptap" />

        </div>
    );
}