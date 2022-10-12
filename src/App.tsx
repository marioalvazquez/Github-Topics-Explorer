import { useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import Search from './Search';
import TopicList from './Topic/TopicList';
import TopicFilter from './Topic/TopicFilter';

const useTopicFilters = () => {
  const [filters, setFilter] = useState<string | undefined>(undefined);

  const updateFilter = (filter: string) => {
    setFilter(filter)
  }
  return {
    models: { filters },
    operations: { updateFilter }
  }
}

export const GET_TOPICS = gql`
query ($name: String!) {
  topic(name:$name) {
    name
    stargazerCount
    relatedTopics(first:10) {
      name
      stargazerCount
      relatedTopics(first:10) {
        name
        stargazerCount
      }
    }
  }
}
`;

const AppContainer = styled('div')`
  margin: 5px;
`;

const AppHeader = styled('h1')`
  text-align: center;
`

function App() {
  const { operations, models } = useTopicFilters();
  const {loading, error, data, refetch} = useQuery(GET_TOPICS, { variables: {name: 'react'}});
  const [topicFilter, setTopicFilter] = useState('');

  const queryTopic = (topicName: string) => {
    refetch({
      name: topicName
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong, please try again!</p>;
  return (
    <AppContainer>
      <AppHeader>Github Topic Explorer!</AppHeader>
      <Search 
        queryTopic={queryTopic}
        setTopicSearch={operations.updateFilter}  
        topicSearch={models.filters ?? 'react'}  
      />
      {
        data.topic?.relatedTopics ? 
          <div>
            <TopicFilter setTopicFilter={setTopicFilter} topicFilter={topicFilter} />
            <TopicList topics={data.topic.relatedTopics} filter={topicFilter} /> 
          </div>
        : 
        <h4>No related topics found!</h4>
      }
    </AppContainer>
  );
}

export default App;
