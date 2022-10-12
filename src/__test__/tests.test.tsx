import { act, render, screen } from '@testing-library/react';
import TopicComponent from '../Topic/Topic';
import { Topic } from '../shared/types';
import TopicList from '../Topic/TopicList';
import { MockedProvider } from "@apollo/client/testing";
import { GET_TOPICS } from '../App';
import userEvent from '@testing-library/user-event'

test('Render Topic Component', () => {
  const topic: Topic = {
    name: 'react',
    relatedTopics: [],
    stargazerCount: 0
  }
  render(
    <MockedProvider mocks={[]}>
      <TopicComponent topic={topic} filter={''} />
    </MockedProvider>
  );
  expect(screen.getByText(/react/i)).toBeInTheDocument();
  expect(screen.getByText(/0/i)).toBeInTheDocument();
});

test('Render Topic List Component with filters', () => {
    const topics: Array<Topic> = [
        {
            name: 'react',
            relatedTopics: [],
            stargazerCount: 10
        },
        {
            name: 'angular',
            relatedTopics: [],
            stargazerCount: 20
        }
    ];
    render(
      <MockedProvider mocks={[]}>
        <TopicList topics={topics} filter={'angular'} />
      </MockedProvider>
    );

    expect(screen.queryByText(/react/i)).not.toBeInTheDocument()
    expect(screen.getByText(/angular/i)).toBeInTheDocument()
});

test('Apollo Client implementation', async () => {
  const mocks = [
    {
      request: {
        query: GET_TOPICS,
        variables: {
          name: 'angular'
        }
      },
      result: {
        data: {
          topic: {
            name: 'angular',
            stargazerCount:	46413,
            relatedTopics: [
              {
                name:	"react",
                stargazerCount: 78952,
                relatedTopics: []
              }
            ]
          }
        }
      }
    }
  ]
  const topic: Topic = {
    name: 'angular',
    relatedTopics: [],
    stargazerCount: 0
  }
  act(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TopicComponent topic={topic} filter={''}/>
      </MockedProvider>
    );
  });

  act(async () => {
    await userEvent.click(screen.getByText(/Hide related Topics/i));
    expect(await screen.findByText(/react/i)).toBeInTheDocument()
  });
});