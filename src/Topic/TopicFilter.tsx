import styled from "@emotion/styled";
const FilterContainer = styled('div')`
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
        input {
            min-width: 30%;
            border-radius: 5px;
            line-height: 2rem;
        }
`;
interface TopicFilterProps {
    setTopicFilter: (filter: string) => void;
    topicFilter: string;
}
const TopicFilter = ({setTopicFilter, topicFilter}: TopicFilterProps) => {
    return (
        <FilterContainer>
            <input
                type="text"
                onChange={(e) => setTopicFilter(e.target.value)}
                value={topicFilter}
                placeholder={'Type to filter topics...'}
            />
        </FilterContainer>
    )
}

export default TopicFilter;