import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { GET_TOPICS } from "../App";
import { Topic } from "../shared/types";
import TopicList from "./TopicList";

const TopicContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #34a660;
    border-radius: 5px;
    margin: 1rem;
    padding: 1rem;
    h3 {
        span {
            font-size: 12px;
            padding-left: 1rem;
            color: #3e3535;
        }
    }
`;

const TopicHeader = styled('div')``;

interface TopicProps {
    topic: Topic;
    filter: string;
}

const TopicComponent = ({topic, filter}: TopicProps) => {
    const {name, relatedTopics, stargazerCount} = topic;
    const [showRelated, setShowRelated] = useState(false);
    const [relatedTopicName, setRelatedTopicName] = useState('');
    const [childTopics, setChildTopics] = useState(relatedTopics);
    const { data, refetch } = useQuery(GET_TOPICS, { variables: {name: ''}});
    const queryTopic = useCallback((topicName: string) => {
        refetch({
        name: topicName
        });
    }, [refetch]);

    const toggleRelated = (name: string) => {
        setRelatedTopicName(name);
        setShowRelated(!showRelated);
    }
    
    useEffect(() => {
        
        if (!childTopics && relatedTopicName !== '') {
            queryTopic(relatedTopicName)
        }
    }, [childTopics, relatedTopicName, queryTopic]);

    useEffect(() => {
        if (relatedTopics) return;
        const { topic } = data;
        if (!topic) return;
        const { relatedTopics: newChildTopics } = topic;
        if (newChildTopics) setChildTopics(newChildTopics);
    }, [childTopics, relatedTopics, data])

    return (
        <TopicContainer>
            <TopicHeader>
                <h3>Topic Name: {name} 
                    <span onClick={() => toggleRelated(name)}>{showRelated ? 'Hide' : 'Show'} related Topics</span>
                </h3>
                <p>Start counts: {stargazerCount}</p>
            </TopicHeader>
            {
                showRelated && <TopicList topics={childTopics} filter={filter} />
            }
        </TopicContainer>
    )
}

export default TopicComponent;