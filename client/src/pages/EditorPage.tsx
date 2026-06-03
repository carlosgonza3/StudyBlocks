import { useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE_MARKDOWN = `# Calculus 2 Study Guide

## Series

### Geometric Series

A geometric series has the form:

$$
a + ar + ar^2 + ar^3 + \\cdots
$$

It converges when:

$$
|r| < 1
$$

The sum is:

$$
S = \\frac{a}{1-r}
$$

---

### Ratio Test

Use the ratio test when the series has factorials, exponentials, or powers.

For a series $\\sum a_n$, compute:

$$
L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|
$$

- If $L < 1$, the series converges absolutely.
- If $L > 1$, the series diverges.
- If $L = 1$, the test is inconclusive.

## Integrals

### Integration by Parts

The formula is:

$$
\\int u\\,dv = uv - \\int v\\,du
$$
`;

export default function EditorPage() {
    const { documentId } = useParams();
    const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

    return (
        <AppLayout>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <Button asChild variant="ghost" className="mb-3 px-0">
                        <Link to="/">
                            <ArrowLeft size={16} />
                            Back to dashboard
                        </Link>
                    </Button>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Demo Study Guide
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500">
                        Document ID: {documentId}
                    </p>
                </div>

                <Button>
                    <Play size={16} />
                    Study
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Card className="overflow-hidden p-0 gap-0">
                    <div className="border-b px-4 py-3">
                        <h2 className="font-semibold">Markdown Editor</h2>
                    </div>

                    <Textarea
                        value={markdown}
                        onChange={(event) => setMarkdown(event.target.value)}
                        className="min-h-[650px] resize-none rounded-none border-0 bg-muted font-mono text-sm leading-7 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                    />
                </Card>

                <Card className="overflow-hidden p-0 gap-0">
                    <div className="border-b px-4 py-3">
                        <h2 className="font-semibold">Live Preview</h2>
                    </div>

                    <div className="min-h-[650px] overflow-y-auto p-6">
                        <MarkdownPreview content={markdown} />
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}