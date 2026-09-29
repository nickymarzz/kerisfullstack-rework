import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell"; // Separate import
import TableHeader from "@tiptap/extension-table-header"; // Separate import
import TableRow from "@tiptap/extension-table-row"; // Separate import
import { useState, useEffect } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const [htmlContent, setHtmlContent] = useState(value || "<p></p>");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [tableSize, setTableSize] = useState({ rows: 3, cols: 3 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bold: {},
        italic: {},
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "bg-white border border-gray-300 m-4",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-gray-300",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "p-2 border-r border-gray-300",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "p-2 border-r border-gray-300",
        },
      }),
    ],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlContent(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none min-h-[200px] border p-4 w-full max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== htmlContent) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [value, editor, htmlContent]);

  const handleAddLink = () => {
    if (linkUrl.trim() === "") return;

    if (editor.view.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().toggleLink({ href: linkUrl }).run();
    }

    setLinkUrl("");
    setShowLinkInput(false);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    setShowLinkInput(false);
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: tableSize.rows,
        cols: tableSize.cols,
        withHeaderRow: true,
      })
      .run();
    setShowTableMenu(false);
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const addColumn = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRow = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const toggleHeaderCell = () => {
    editor.chain().focus().toggleHeaderCell().run();
  };

  if (!editor) {
    return (
      <div className="border rounded p-4 min-h-[200px] w-full">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rich-text-editor w-full max-w-none">
      <div className="toolbar flex flex-wrap gap-1 mb-2 p-1 bg-gray-100 rounded-t-lg w-full relative">
        {/* Bold Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>

        {/* Italic Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>

        {/* Link Button */}
        <button
          type="button"
          onClick={() => {
            if (editor.isActive("link")) {
              handleRemoveLink();
            } else {
              setShowLinkInput(!showLinkInput);
            }
          }}
          className={`p-2 rounded ${
            editor.isActive("link") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>

        {/* Link Input */}
        {showLinkInput && (
          <div className="absolute bg-white p-2 shadow-md rounded z-10 mt-10 flex gap-2">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="border p-1 rounded"
              onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
            />
            <button
              onClick={handleAddLink}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("");
              }}
              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Heading Buttons */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
          title="Heading 3"
        >
          H3
        </button>

        {/* List Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Bullet List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Numbered List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>

        {/* Blockquote Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive("blockquote") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Blockquote"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        {/* Table Button */}
        <button
          type="button"
          onClick={() => setShowTableMenu(!showTableMenu)}
          className={`p-2 rounded ${
            editor.isActive("table") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
          title="Table"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
            <line x1="12" y1="3" x2="12" y2="21"></line>
          </svg>
        </button>
        {/* Table Menu */}

        <div className="relative">
          {showTableMenu && (
            <div className="absolute bg-white p-2 shadow-md rounded z-10 mt-1 left-0 w-64">
              {!editor.isActive("table") ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Rows
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={tableSize.rows}
                        onChange={(e) =>
                          setTableSize({
                            ...tableSize,
                            rows: parseInt(e.target.value) || 1,
                          })
                        }
                        className="border p-1 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Columns
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={tableSize.cols}
                        onChange={(e) =>
                          setTableSize({
                            ...tableSize,
                            cols: parseInt(e.target.value) || 1,
                          })
                        }
                        className="border p-1 rounded w-full"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addTable}
                    className="w-full bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mb-1"
                  >
                    Insert Table
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={addColumn}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mb-1"
                  >
                    Add Column
                  </button>
                  <button
                    onClick={deleteColumn}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mb-1"
                  >
                    Delete Column
                  </button>
                  <button
                    onClick={addRow}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mb-1"
                  >
                    Add Row
                  </button>
                  <button
                    onClick={deleteRow}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mb-1"
                  >
                    Delete Row
                  </button>
                  <button
                    onClick={toggleHeaderCell}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mb-1"
                  >
                    Toggle Header
                  </button>
                  <button
                    onClick={deleteTable}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-500"
                  >
                    Delete Table
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="border-t-0 rounded-b-lg w-full"
      />
    </div>
  );
};

export default RichTextEditor;
