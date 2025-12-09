'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { FontFamily } from '@tiptap/extension-font-family';
import { Subscript } from '@/lib/tiptap/subscript'
import { Superscript } from '@/lib/tiptap/superscript'
import { CustomHeading, FontSize, LineHeight, LetterSpacing } from '@/lib/tiptap/extensions';
import {
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineIcon,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link2,
    Image as ImageIcon,
    Table as TableIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Minus,
    Maximize2,
    Palette,
    Type,
    ExternalLink,
    Edit2,
    Trash2,
    FileCode,
    Video,
    Anchor,
    IndentDecrease,
    IndentIncrease,
    ChevronDown,
    Superscript as SuperscriptIcon,
    Subscript as SubscriptIcon,
    Hash,
    Smile,
    Omega,
    Settings,
    Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useState, useEffect, useRef } from 'react';
import { DocumentLibraryModal } from '@/features/documents/components/document-library-modal';
import { EntityType } from '@/features/documents/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    onTOCChange?: (toc: string) => void;
    initialTOC?: string;
    placeholder?: string;
    entityType?: EntityType;
    entityId?: number;
    showTOC?: boolean;
    height?: 'small' | 'middle' | 'large' | string;
}

interface TOCItem {
    id: string;
    level: number;
    text: string;
}

interface LinkTooltipState {
    show: boolean;
    url: string;
    x: number;
    y: number;
    linkElement: HTMLAnchorElement | null;
}

// Common emojis
const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😶‍🌫️', '😵', '😵‍💫', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐', '🖖', '👋', '🤝', '💪', '🙏', '✍️', '💅', '🤳', '💃', '🕺'];

// Common symbols
const symbols = ['©', '®', '™', '°', '±', '×', '÷', '≠', '≈', '≤', '≥', 'α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'π', 'σ', 'φ', 'ω', 'Σ', 'Ω', '∞', '∫', '∂', '∇', '√', '∛', '∜', '∑', '∏', '∆', '←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '♠', '♣', '♥', '♦', '★', '☆', '♪', '♫', '☀', '☁', '☂', '☃', '☃', '⚡'];

export function RichTextEditor({
    content,
    onChange,
    onTOCChange,
    initialTOC,
    placeholder,
    entityType = 'general',
    entityId,
    showTOC = true,
    height = 'middle'
}: RichTextEditorProps) {
    const getHeightClass = (h: string | undefined) => {
        switch (h) {
            case 'small': return 'min-h-[200px]';
            case 'middle': return 'min-h-[400px]';
            case 'large': return 'min-h-[600px]';
            default: return h || 'min-h-[400px]';
        }
    };

    const heightClass = getHeightClass(height);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [tocItems, setTocItems] = useState<TOCItem[]>([]);
    const [showTOCBox, setShowTOCBox] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [isHTMLMode, setIsHTMLMode] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [linkTooltip, setLinkTooltip] = useState<LinkTooltipState>({
        show: false,
        url: '',
        x: 0,
        y: 0,
        linkElement: null,
    });
    const [showLinkEditDialog, setShowLinkEditDialog] = useState(false);
    const [linkEditData, setLinkEditData] = useState({ text: '', url: '', protocol: 'https://' });
    const [textColor, setTextColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffff00');
    const [videoUrl, setVideoUrl] = useState('');
    const [anchorName, setAnchorName] = useState('');
    const editorRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            CustomHeading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 px-4 py-2 bg-gray-100 font-bold',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 px-4 py-2',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            FontFamily,
            FontSize,
            Subscript,
            Superscript,
            LineHeight,
            LetterSpacing,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none ${heightClass} max-w-none p-6`,
            },
            handleClick: (view, pos, event) => {
                const target = event.target as HTMLElement;
                if (target.tagName === 'A') {
                    event.preventDefault();
                    const link = target as HTMLAnchorElement;
                    const rect = link.getBoundingClientRect();
                    const editorRect = editorRef.current?.getBoundingClientRect();

                    if (editorRect) {
                        setLinkTooltip({
                            show: true,
                            url: link.href,
                            x: rect.left - editorRect.left,
                            y: rect.bottom - editorRect.top + 5,
                            linkElement: link,
                        });
                    }
                    return true;
                }
                return false;
            },
        },
        immediatelyRender: false,
    });

    // Close link tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                linkTooltip.show &&
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                event.target !== linkTooltip.linkElement
            ) {
                setLinkTooltip({ show: false, url: '', x: 0, y: 0, linkElement: null });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [linkTooltip.show, linkTooltip.linkElement]);

    // Load initial TOC if provided
    useEffect(() => {
        if (initialTOC && initialTOC.trim() !== '') {
            try {
                const items = JSON.parse(initialTOC);
                if (Array.isArray(items) && items.length > 0) {
                    setTocItems(items);
                    setShowTOCBox(true);
                }
            } catch (error) {
                console.error('Failed to parse initial TOC:', error);
            }
        }
    }, [initialTOC]);

    const generateTOC = useCallback(() => {
        if (!editor) return;

        const html = editor.getHTML();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const existingTOC = doc.querySelector('.toc-box');
        if (existingTOC) {
            existingTOC.remove();
        }

        const headings = doc.querySelectorAll('h2, h3, h4');
        const items: TOCItem[] = [];
        let hasChanges = false;

        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.substring(1));
            const text = heading.textContent || '';
            const id = `heading-${index}`;

            if (!heading.id) {
                heading.id = id;
                hasChanges = true;
            }

            items.push({
                id: heading.id || id,
                level,
                text,
            });
        });

        setTocItems(items);
        setShowTOCBox(true);

        if (onTOCChange) {
            onTOCChange(JSON.stringify(items));
        }

        if (hasChanges || existingTOC) {
            editor.commands.setContent(doc.body.innerHTML);
        }
    }, [editor, onTOCChange]);

    const removeTOC = useCallback(() => {
        if (!editor) return;

        const html = editor.getHTML();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const tocBox = doc.querySelector('.toc-box');

        if (tocBox) {
            tocBox.remove();
            editor.commands.setContent(doc.body.innerHTML);
        }

        setShowTOCBox(false);
        setTocItems([]);

        if (onTOCChange) {
            onTOCChange('');
        }
    }, [editor, onTOCChange]);

    const scrollToHeading = (id: string) => {
        if (!editor) return;
        const element = editor.view.dom.querySelector(`#${id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const toggleHTMLMode = useCallback(() => {
        if (!editor) return;

        if (!isHTMLMode) {
            setHtmlContent(editor.getHTML());
            setIsHTMLMode(true);
        } else {
            editor.commands.setContent(htmlContent);
            onChange(htmlContent);
            setIsHTMLMode(false);
        }
    }, [editor, isHTMLMode, htmlContent, onChange]);

    const handleHTMLContentChange = (value: string) => {
        setHtmlContent(value);
    };

    const handleLinkEdit = () => {
        if (linkTooltip.linkElement) {
            const text = linkTooltip.linkElement.textContent || '';
            const url = linkTooltip.linkElement.href;
            const protocol = url.startsWith('https://') ? 'https://' : url.startsWith('http://') ? 'http://' : 'https://';
            const urlWithoutProtocol = url.replace(/^https?:\/\//, '');

            setLinkEditData({ text, url: urlWithoutProtocol, protocol });
            setShowLinkEditDialog(true);
            setLinkTooltip({ show: false, url: '', x: 0, y: 0, linkElement: null });
        }
    };

    const handleLinkRemove = () => {
        if (editor && linkTooltip.linkElement) {
            const text = linkTooltip.linkElement.textContent || '';
            editor.commands.insertContentAt(
                editor.state.selection.from,
                text
            );
            setLinkTooltip({ show: false, url: '', x: 0, y: 0, linkElement: null });
        }
    };

    const handleLinkOpen = () => {
        if (linkTooltip.url) {
            window.open(linkTooltip.url, '_blank', 'noopener,noreferrer');
        }
    };

    const applyLinkEdit = () => {
        if (editor && linkTooltip.linkElement) {
            const fullUrl = linkEditData.protocol + linkEditData.url;
            editor.commands.setLink({ href: fullUrl });
            editor.commands.insertContent(linkEditData.text);
            setShowLinkEditDialog(false);
            setLinkTooltip({ show: false, url: '', x: 0, y: 0, linkElement: null });
        }
    };

    const addImage = useCallback(() => {
        setDocumentModalOpen(true);
    }, []);

    const handleDocumentSelect = (selections: { url: string, type: 'image' | 'file' }[]) => {
        if (editor) {
            selections.forEach(({ url, type }) => {
                if (type === 'image') {
                    editor.chain().focus().setImage({ src: url }).run();
                } else {
                    const fileName = url.split('/').pop() || 'Download';
                    editor.chain().focus().insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${fileName}</a>`).run();
                }
            });
        }
    };

    const setLink = useCallback(() => {
        if (editor) {
            const previousUrl = editor.getAttributes('link').href;
            setLinkUrl(previousUrl || '');
            setShowLinkInput(true);
        }
    }, [editor]);

    const applyLink = useCallback(() => {
        if (editor && linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setShowLinkInput(false);
            setLinkUrl('');
        }
    }, [editor, linkUrl]);

    const addTable = useCallback(() => {
        if (!editor) return;

        editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();

        const firstRow = 0;
        const cols = 3;

        for (let col = 0; col < cols; col++) {
            editor
                .chain()
                .focus()
                .setCellSelection({
                    anchorCell: { row: firstRow, col },
                    headCell: { row: firstRow, col },
                })
                .insertContent(`<strong>Header ${col + 1}</strong>`)
                .run();
        }
    }, [editor]);

    const insertHorizontalRule = useCallback(() => {
        if (editor) {
            editor.chain().focus().setHorizontalRule().run();
        }
    }, [editor]);

    const insertEmoji = useCallback((emoji: string) => {
        if (editor) {
            editor.chain().focus().insertContent(emoji).run();
        }
    }, [editor]);

    const insertSymbol = useCallback((symbol: string) => {
        if (editor) {
            editor.chain().focus().insertContent(symbol).run();
        }
    }, [editor]);

    const insertVideo = useCallback(() => {
        if (editor && videoUrl) {
            let embedCode = '';
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                const videoId = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
                embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            } else if (videoUrl.includes('vimeo.com')) {
                const videoId = videoUrl.split('/').pop();
                embedCode = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
            } else {
                embedCode = `<video controls width="560"><source src="${videoUrl}" type="video/mp4"></video>`;
            }

            editor.chain().focus().insertContent(embedCode).run();
            setVideoUrl('');
        }
    }, [editor, videoUrl]);

    const insertAnchor = useCallback(() => {
        if (editor && anchorName) {
            editor.chain().focus().insertContent(`<a id="${anchorName}"></a>`).run();
            setAnchorName('');
        }
    }, [editor, anchorName]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div ref={editorRef} className={`border rounded-lg overflow-hidden bg-background ${isMaximized ? 'fixed inset-4 z-50' : ''}`}>
                {/* TOC Controls */}
                {showTOC && (
                    <div className="bg-muted/30 border-b p-3 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="default"
                                size="sm"
                                onClick={generateTOC}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Hash className="h-4 w-4 mr-2" />
                                Tạo chỉ mục
                            </Button>
                            {showTOCBox && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={removeTOC}
                                >
                                    Xóa chỉ mục
                                </Button>
                            )}
                        </div>

                        {/* TOC Box Preview */}
                        {showTOCBox && tocItems.length > 0 && (
                            <div className="toc-box mt-2 p-4 rounded-md border border-border bg-card shadow-sm">
                                <h3 className="font-semibold mb-2 text-foreground">Mục lục</h3>
                                <ul className="list-none space-y-1 max-h-[200px] overflow-y-auto">
                                    {tocItems.map(item => (
                                        <li
                                            key={item.id}
                                            style={{ marginLeft: `${(item.level - 2) * 16}px` }}
                                        >
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToHeading(item.id);
                                                }}
                                                className="text-primary dark:text-blue-400 hover:underline text-sm cursor-pointer transition-colors"
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Compact Toolbar */}
                <div className="bg-muted/50 border-b">
                    <div className="p-2 flex flex-wrap gap-1 items-center">
                        {/* View Controls */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={toggleHTMLMode}
                            className={isHTMLMode ? 'bg-muted' : ''}
                            title="Mã HTML"
                        >
                            <FileCode className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMaximized(!isMaximized)}
                            title={isMaximized ? 'Thu nhỏ' : 'Phóng to'}
                            className={isMaximized ? 'bg-muted' : ''}
                        >
                            {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Undo/Redo */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Hoàn tác"
                        >
                            <Undo className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Làm lại"
                        >
                            <Redo className="h-4 w-4" />
                        </Button>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Format Dropdown */}
                        <Select
                            value={editor.isActive('heading', { level: 1 }) ? 'h1' :
                                editor.isActive('heading', { level: 2 }) ? 'h2' :
                                    editor.isActive('heading', { level: 3 }) ? 'h3' :
                                        editor.isActive('heading', { level: 4 }) ? 'h4' :
                                            editor.isActive('heading', { level: 5 }) ? 'h5' :
                                                editor.isActive('heading', { level: 6 }) ? 'h6' : 'p'}
                            onValueChange={(value) => {
                                if (value === 'p') {
                                    editor.chain().focus().setParagraph().run();
                                } else {
                                    const level = parseInt(value.substring(1)) as 1 | 2 | 3 | 4 | 5 | 6;
                                    editor.chain().focus().toggleHeading({ level }).run();
                                }
                            }}
                        >
                            <SelectTrigger className="w-28 h-8">
                                <SelectValue placeholder="Kiểu" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="p">Đoạn văn</SelectItem>
                                <SelectItem value="h1">Tiêu đề 1</SelectItem>
                                <SelectItem value="h2">Tiêu đề 2</SelectItem>
                                <SelectItem value="h3">Tiêu đề 3</SelectItem>
                                <SelectItem value="h4">Tiêu đề 4</SelectItem>
                                <SelectItem value="h5">Tiêu đề 5</SelectItem>
                                <SelectItem value="h6">Tiêu đề 6</SelectItem>
                            </SelectContent>
                        </Select>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Text Formatting */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'bg-muted' : ''}
                            title="Đậm"
                        >
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'bg-muted' : ''}
                            title="Nghiêng"
                        >
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive('underline') ? 'bg-muted' : ''}
                            title="Gạch chân"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'bg-muted' : ''}
                            title="Gạch ngang"
                        >
                            <Strikethrough className="h-4 w-4" />
                        </Button>

                        {/* More Formatting Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" title="Thêm định dạng">
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => editor.chain().focus().toggleSubscript().run()}>
                                    <SubscriptIcon className="h-4 w-4 mr-2" />
                                    Chỉ số dưới
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().focus().toggleSuperscript().run()}>
                                    <SuperscriptIcon className="h-4 w-4 mr-2" />
                                    Chỉ số trên
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().focus().toggleCode().run()}>
                                    <Code className="h-4 w-4 mr-2" />
                                    Code
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Colors */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" title="Màu sắc">
                                    <Palette className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-xs">Màu chữ</Label>
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                type="color"
                                                value={textColor}
                                                onChange={(e) => {
                                                    setTextColor(e.target.value);
                                                    editor.chain().focus().setColor(e.target.value).run();
                                                }}
                                                className="w-full h-8 rounded cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Màu nền</Label>
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={(e) => {
                                                    setBgColor(e.target.value);
                                                    editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
                                                }}
                                                className="w-full h-8 rounded cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Lists */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
                            title="Danh sách dấu đầu dòng"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'bg-muted' : ''}
                            title="Danh sách có số"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                            disabled={!editor.can().sinkListItem('listItem')}
                            title="Tăng thụt lề"
                        >
                            <IndentIncrease className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                            disabled={!editor.can().liftListItem('listItem')}
                            title="Giảm thụt lề"
                        >
                            <IndentDecrease className="h-4 w-4" />
                        </Button>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Alignment */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}
                            title="Căn trái"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}
                            title="Căn giữa"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}
                            title="Căn phải"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}
                            title="Căn đều"
                        >
                            <AlignJustify className="h-4 w-4" />
                        </Button>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        {/* Insert Elements */}
                        <Button type="button" variant="ghost" size="icon" onClick={addImage} title="Chèn ảnh">
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={setLink} title="Chèn liên kết">
                            <Link2 className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={addTable} title="Chèn bảng">
                            <TableIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'bg-muted' : ''}
                            title="Trích dẫn"
                        >
                            <Quote className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={insertHorizontalRule} title="Đường ngang">
                            <Minus className="h-4 w-4" />
                        </Button>

                        {/* More Insert Options */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" title="Chèn thêm">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Popover>
                                        <PopoverTrigger className="w-full flex items-center px-2 py-1.5 cursor-pointer hover:bg-muted">
                                            <Video className="h-4 w-4 mr-2" />
                                            Chèn video
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="space-y-2">
                                                <Label>URL Video (YouTube, Vimeo)</Label>
                                                <Input
                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                    value={videoUrl}
                                                    onChange={(e) => setVideoUrl(e.target.value)}
                                                />
                                                <Button onClick={insertVideo} className="w-full">Chèn</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Popover>
                                        <PopoverTrigger className="w-full flex items-center px-2 py-1.5 cursor-pointer hover:bg-muted">
                                            <Anchor className="h-4 w-4 mr-2" />
                                            Chèn neo
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="space-y-2">
                                                <Label>Tên neo (anchor)</Label>
                                                <Input
                                                    placeholder="ten-neo"
                                                    value={anchorName}
                                                    onChange={(e) => setAnchorName(e.target.value)}
                                                />
                                                <Button onClick={insertAnchor} className="w-full">Chèn</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Popover>
                                        <PopoverTrigger className="w-full flex items-center px-2 py-1.5 cursor-pointer hover:bg-muted">
                                            <Smile className="h-4 w-4 mr-2" />
                                            Biểu tượng cảm xúc
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
                                                {emojis.map((emoji, index) => (
                                                    <Button
                                                        key={index}
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertEmoji(emoji)}
                                                        className="text-xl h-8 w-8 p-0"
                                                    >
                                                        {emoji}
                                                    </Button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Popover>
                                        <PopoverTrigger className="w-full flex items-center px-2 py-1.5 cursor-pointer hover:bg-muted">
                                            <Omega className="h-4 w-4 mr-2" />
                                            Ký tự đặc biệt
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
                                                {symbols.map((symbol, index) => (
                                                    <Button
                                                        key={index}
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertSymbol(symbol)}
                                                        className="text-lg h-8 w-8 p-0"
                                                    >
                                                        {symbol}
                                                    </Button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Advanced Typography Row (Collapsible) */}
                    <details className="border-t">
                        <summary className="px-2 py-1.5 cursor-pointer hover:bg-muted/50 text-xs font-medium flex items-center gap-2">
                            <Type className="h-3 w-3" />
                            Tùy chọn nâng cao
                        </summary>
                        <div className="p-2 flex flex-wrap gap-2 items-center bg-muted/30">
                            {/* Font Family */}
                            <Select
                                onValueChange={(value) => {
                                    if (value === 'default') {
                                        editor.chain().focus().unsetFontFamily().run();
                                    } else {
                                        editor.chain().focus().setFontFamily(value).run();
                                    }
                                }}
                            >
                                <SelectTrigger className="w-36 h-8">
                                    <SelectValue placeholder="Phông chữ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Mặc định</SelectItem>
                                    <SelectItem value="Arial">Arial</SelectItem>
                                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                    <SelectItem value="Courier New">Courier New</SelectItem>
                                    <SelectItem value="Georgia">Georgia</SelectItem>
                                    <SelectItem value="Verdana">Verdana</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Font Size */}
                            <Select
                                onValueChange={(value) => {
                                    if (value === 'default') {
                                        (editor.chain().focus() as any).unsetFontSize().run();
                                    } else {
                                        (editor.chain().focus() as any).setFontSize(value).run();
                                    }
                                }}
                            >
                                <SelectTrigger className="w-24 h-8">
                                    <SelectValue placeholder="Cỡ chữ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Mặc định</SelectItem>
                                    <SelectItem value="12px">12px</SelectItem>
                                    <SelectItem value="14px">14px</SelectItem>
                                    <SelectItem value="16px">16px</SelectItem>
                                    <SelectItem value="18px">18px</SelectItem>
                                    <SelectItem value="20px">20px</SelectItem>
                                    <SelectItem value="24px">24px</SelectItem>
                                    <SelectItem value="32px">32px</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Line Height */}
                            <Select
                                onValueChange={(value) => {
                                    if (value === 'default') {
                                        (editor.chain().focus() as any).unsetLineHeight().run();
                                    } else {
                                        (editor.chain().focus() as any).setLineHeight(value).run();
                                    }
                                }}
                            >
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue placeholder="Khoảng cách dòng" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Mặc định</SelectItem>
                                    <SelectItem value="1">1.0</SelectItem>
                                    <SelectItem value="1.15">1.15</SelectItem>
                                    <SelectItem value="1.5">1.5</SelectItem>
                                    <SelectItem value="2">2.0</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Letter Spacing */}
                            <Select
                                onValueChange={(value) => {
                                    if (value === 'default') {
                                        (editor.chain().focus() as any).unsetLetterSpacing().run();
                                    } else {
                                        (editor.chain().focus() as any).setLetterSpacing(value).run();
                                    }
                                }}
                            >
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue placeholder="Khoảng cách chữ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Mặc định</SelectItem>
                                    <SelectItem value="0px">0px</SelectItem>
                                    <SelectItem value="1px">1px</SelectItem>
                                    <SelectItem value="2px">2px</SelectItem>
                                    <SelectItem value="3px">3px</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </details>
                </div>

                {/* Link Input */}
                {showLinkInput && (
                    <div className="bg-muted/30 border-b p-3 flex gap-2 items-center">
                        <Input
                            type="url"
                            placeholder="Nhập URL"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="button" size="sm" onClick={applyLink}>
                            Áp dụng
                        </Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
                            Hủy
                        </Button>
                    </div>
                )}

                {/* Editor Content or HTML Source */}
                <div
                    className={isMaximized ? 'overflow-y-auto' : 'overflow-y-auto max-h-[600px]'}
                    style={isMaximized ? { height: 'calc(100vh - 400px)' } : {}}
                >
                    {isHTMLMode ? (
                        <Textarea
                            value={htmlContent}
                            onChange={(e) => handleHTMLContentChange(e.target.value)}
                            className="min-h-[400px] font-mono text-sm p-6 border-0 focus-visible:ring-0"
                            placeholder="Chỉnh sửa mã HTML..."
                        />
                    ) : (
                        <EditorContent editor={editor} />
                    )}
                </div>

                {/* Link Tooltip */}
                {linkTooltip.show && (
                    <div
                        ref={tooltipRef}
                        className="absolute z-50 bg-background border rounded-lg shadow-lg p-3"
                        style={{
                            left: `${linkTooltip.x}px`,
                            top: `${linkTooltip.y}px`,
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <a
                                href={linkTooltip.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline max-w-[200px] truncate"
                            >
                                {linkTooltip.url}
                            </a>
                        </div>
                        <div className="flex gap-1">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleLinkEdit}
                                className="h-7 px-2"
                            >
                                <Edit2 className="h-3 w-3 mr-1" />
                                Sửa
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleLinkRemove}
                                className="h-7 px-2"
                            >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Xóa
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleLinkOpen}
                                className="h-7 px-2"
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Mở
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Link Edit Dialog */}
            <Dialog open={showLinkEditDialog} onOpenChange={setShowLinkEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa liên kết</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="link-text">Văn bản hiển thị</Label>
                            <Input
                                id="link-text"
                                value={linkEditData.text}
                                onChange={(e) => setLinkEditData({ ...linkEditData, text: e.target.value })}
                                placeholder="Văn bản liên kết"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link-url">URL</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={linkEditData.protocol}
                                    onValueChange={(value) => setLinkEditData({ ...linkEditData, protocol: value })}
                                >
                                    <SelectTrigger className="w-28">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="https://">https://</SelectItem>
                                        <SelectItem value="http://">http://</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="link-url"
                                    value={linkEditData.url}
                                    onChange={(e) => setLinkEditData({ ...linkEditData, url: e.target.value })}
                                    placeholder="example.com"
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLinkEditDialog(false)}>
                            Hủy
                        </Button>
                        <Button onClick={applyLinkEdit}>
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DocumentLibraryModal
                open={documentModalOpen}
                onOpenChange={setDocumentModalOpen}
                onSelect={handleDocumentSelect}
                entityType={entityType}
                entityId={entityId}
                allowMultiple={true}
            />
        </>
    );
}
