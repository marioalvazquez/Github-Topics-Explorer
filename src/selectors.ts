import { Topic } from "./shared/types";

export const createFilterFunction = (filter: string) => (topic: Topic) => {    
    const { name, relatedTopics } = topic;
    let matchesFilters = true;
    matchesFilters &&= filter ? name.toLowerCase().includes(filter) : matchesFilters;
    matchesFilters ||= (filter && relatedTopics) ? 
        relatedTopics.some(({name}) => name.toLowerCase().includes(filter)) 
        : matchesFilters;
    return matchesFilters;
}

export const buildTopicsSelectors = (topics: Array<Topic>, filter: string) => ({
    getTopicsMatchingFilters: () => {
        return (topics || []).filter(createFilterFunction(filter))
    }
});

export default buildTopicsSelectors;