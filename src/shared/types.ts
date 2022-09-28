export interface Topic {
    name: string;
    relatedTopics: Array<Topic>;
    stargazerCount: number;
}