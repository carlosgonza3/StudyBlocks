export type StudySection = {
    id: string;
    title: string;
    level: number;
    content: string;
    children: StudySection[];
    parentId: string | null;
    order: number;
}