import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type MarkdownPreviewProps = {
    content: string;
};

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
    return (
        <div className="max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mb-5 mt-0 text-4xl font-bold tracking-tight text-foreground">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-4 mt-8 border-b border-border pb-2 text-2xl font-bold tracking-tight text-foreground">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mb-3 mt-6 text-xl font-semibold text-foreground">
                            {children}
                        </h3>
                    ),

                    p: ({ children }) => (
                        <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
                    ),

                    ul: ({ children }) => (
                        <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => <li className="pl-1">{children}</li>,

                    hr: () => <hr className="my-8 border-border" />,

                    strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                            {children}
                        </strong>
                    ),

                    em: ({ children }) => (
                        <em className="text-foreground">{children}</em>
                    ),

                    blockquote: ({ children }) => (
                        <blockquote className="my-5 border-l-4 border-border bg-muted px-4 py-3 text-muted-foreground">
                            {children}
                        </blockquote>
                    ),

                    code: ({ children, className }) => {
                        const isMath = className?.includes("language-math");

                        if (isMath) {
                            return <code className={className}>{children}</code>;
                        }

                        return (
                            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
                                {children}
                            </code>
                        );
                    },

                    pre: ({ children }) => (
                        <pre className="my-5 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm text-zinc-50 dark:bg-zinc-950">
              {children}
            </pre>
                    ),

                    table: ({ children }) => (
                        <div className="my-6 overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                {children}
                            </table>
                        </div>
                    ),

                    th: ({ children }) => (
                        <th className="border border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="border border-border px-3 py-2 text-muted-foreground">
                            {children}
                        </td>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}