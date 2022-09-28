import styled from '@emotion/styled';

const SearchContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    input {
        line-height: 2rem;
        font-size: 1.5rem;
        border-radius: 5px;
    }
`;

const SearchBar = styled('input')`
    width: 200px;
    padding-left: 1rem;
    margin-right: 1rem;
    
`;
const SearchInput = styled('input')`
    padding: 0 1rem;
    background-color: #12bf12;
    color: white;
    border: none;
`;

interface SearchProps {
    setTopicSearch: (topic: string) => void;
    queryTopic: (topic: string) => void;
    topicSearch: string;
};

const Search = ({setTopicSearch, queryTopic, topicSearch}: SearchProps) => {
    return (
        <SearchContainer>
            <SearchBar 
                type="text" 
                value={topicSearch} 
                placeholder={'Type topic name...'}
                onChange={(e) => setTopicSearch(e.target.value)} 
            />
            <SearchInput type="button" value="Search Topic" onClick={() => queryTopic(topicSearch)} />
        </SearchContainer>
    )
}

export default Search;