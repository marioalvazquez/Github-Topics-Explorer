import { Topic } from "../shared/types";
import TopicComponent from "./Topic";
import styled from '@emotion/styled';
import buildTopicsSelectors from "../selectors";

const TopicsContainer = styled('div')`
`;
const TopicListContainer = styled('div')`
    
`;

interface TopicListProps {
    topics: Array<Topic>;
    filter: string;
}
const TopicList = ({topics, filter}: TopicListProps) => {
    const selectors = buildTopicsSelectors(topics, filter);
    const filteredTopics = selectors.getTopicsMatchingFilters();
    if (!!filteredTopics.length) {
        return (
            <TopicsContainer>
                <TopicListContainer>
                    {filteredTopics.map(t => <TopicComponent topic={t} key={t.name} filter={filter} />)}
                </TopicListContainer>
            </TopicsContainer>
        )
    }
    return (
        <h3>No topics found, try a different search!</h3>
    );
}

export default TopicList;