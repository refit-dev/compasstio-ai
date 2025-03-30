"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor,
  defaultBlockSchema,
  defaultInlineContentSchema,
  defaultStyleSchema,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteViewRaw as BlockNoteView,
  useBlockNote
} from "@blocknote/react";
import "@blocknote/core/style.css";

//import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  // const { edgestore } = useEdgeStore();

  // const handleUpload = async (file: File) => {
  //   const response = await edgestore.publicFiles.upload({
  //     file
  //   });

  //   return response.url;
  // }

  const editor = useBlockNote({
    initialContent:
      initialContent
        ? JSON.parse(initialContent) as PartialBlock<typeof defaultBlockSchema, typeof defaultInlineContentSchema, typeof defaultStyleSchema>[]
        : undefined,
    // uploadFile: handleUpload
  })

  editor.onEditorContentChange(() => {
    onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  });

  return (
    <div className="text-left" >
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
      />
    </div>
  )
}

export default Editor;
