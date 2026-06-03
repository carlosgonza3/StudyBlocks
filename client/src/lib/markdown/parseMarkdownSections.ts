// Custom type that defines structure of every study section
import type { StudySection } from "@/types/study-section.ts";

// Helper function that creates a unique section ID using the heading title and level
function createSectionId(title: string, index: number) {
    const temp = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    return `${temp || "section"}-${index}`;
}

// Helper function that checks if a line is a Markdown heading: #, ##, ###, ...
function getHeadingLevel(line: string) {

    const match = line.match(/^(#{1,6})\s+(.+)$/);

    if (!match) {
        return null;
    }

    return {
        level: match[1].length,
        title: match[2].trim(),
    };
}

// Main function that receives the full Markdown text and returns an array of root sections
export function parseMarkdownSections(markdown: string): StudySection[] {

    // Splits Markdown into an array of lines
    const lines: string[]  = markdown.split("\n");

    // Stores top-level sections
    const rootSections: StudySection[] = [];

    // Stores top-level sections
    const stack: StudySection[] = [];

    // Stores the section for normal content
    let currentSection: StudySection | null = null;
    let sectionCount = 0;

    // For every line, the parser checks if it is a heading or not
    for (const line of lines) {

        const heading = getHeadingLevel(line);

        if (heading) {

            // Increment section count for every heading
            sectionCount += 1;

            // Creates new StudySection
            const newSection: StudySection = {
                id: createSectionId(heading.title, sectionCount),
                title: heading.title,
                level: heading.level,
                content: "",
                children: [],
                parentId: null,
                order: sectionCount,
            };

            // While there are stacks, and the last section is at the same level
            // or deeper than the new section we remove it
            while (stack.length > 0 && stack[stack.length - 1].level >= newSection.level) {
                stack.pop();
            }

            // This stack now becomes a parent
            const parent = stack[stack.length - 1];

            // If there is a parent, we add the new section as a child of the parent
            if (parent) {
                newSection.parentId = parent.id;
                parent.children.push(newSection);
            } else {
                rootSections.push(newSection);
            }
            stack.push(newSection);
            currentSection = newSection;
            continue;
        }

        // If the line is normal content, it gets added to the current section.
        if (currentSection) {
            currentSection.content += `${line}\n`;
        }
    }

    return rootSections;
}