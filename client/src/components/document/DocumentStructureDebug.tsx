import type { StudySection } from "@/types/study-section";

type DocumentStructureDebugProps = {
    sections: StudySection[];
};

function SectionNode({ section }: { section: StudySection }) {
    return (
        <li>
            <div className="rounded-md px-2 py-1 text-sm text-foreground">
                <span className="font-medium">{section.title}</span>
                <span className="ml-2 text-xs text-muted-foreground">
          H{section.level}
        </span>
            </div>

            {section.children.length > 0 && (
                <ul className="ml-4 border-l border-border pl-3">
                    {section.children.map((childSection) => (
                        <SectionNode key={childSection.id} section={childSection} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function DocumentStructureDebug({
                                                   sections,
                                               }: DocumentStructureDebugProps) {
    if (sections.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No headings found. Add headings using #, ##, or ###.
            </p>
        );
    }

    return (
        <ul className="space-y-1">
            {sections.map((section) => (
                <SectionNode key={section.id} section={section} />
            ))}
        </ul>
    );
}