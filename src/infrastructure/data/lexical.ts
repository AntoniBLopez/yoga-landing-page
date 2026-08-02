/** Build a minimal Lexical editor state from plain paragraphs (seed / static blog). */
export function lexicalFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal" as const,
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}
