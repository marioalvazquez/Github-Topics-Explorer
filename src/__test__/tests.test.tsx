import { render, screen } from '@testing-library/react';
import TopicComponent from '../Topic/Topic';
import { Topic } from '../shared/types';
import TopicList from '../Topic/TopicList';

test('Render Topic Component', () => {
  const topic: Topic = {
    name: 'react',
    relatedTopics: [],
    stargazerCount: 0
  }
  render(<TopicComponent topic={topic} filter={''} />);
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
    render(<TopicList topics={topics} filter={'angular'} />);

    expect(screen.queryByText(/react/i)).not.toBeInTheDocument()
    expect(screen.getByText(/angular/i)).toBeInTheDocument()
});