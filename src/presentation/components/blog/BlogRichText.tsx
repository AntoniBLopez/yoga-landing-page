import { RichText } from "@payloadcms/richtext-lexical/react";

import type { RichTextContent } from "@/domain/entities";

export function BlogRichText({ content }: { content: RichTextContent }) {
  return (
    <RichText
      // Payload Lexical JSON shape matches SerializedEditorState
      data={content as never}
      className="blog-content space-y-5 text-base leading-relaxed text-ink [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-teal [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-medium [&_h2]:text-deep [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:text-deep [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-ink/95 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
    />
  );
}
