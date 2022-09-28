import styled from "@emotion/styled";
import { useState } from "react";
import { Topic } from "../shared/types";
import TopicList from "./TopicList";

const TopicContainer = styled('div')`
    display: flex;
    flex-direction: row;
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

interface TopicProps {
    topic: Topic;
    filter: string;
}

const TopicComponent = ({topic, filter}: TopicProps) => {
    const {name, relatedTopics, stargazerCount} = topic;
    console.log({name, relatedTopics, stargazerCount});

    const [showRelated, setShowRelated] = useState(false);

    const toggleRelated = () => {
        console.log({showRelated, relatedTopics});
        
        if (showRelated || !relatedTopics) setShowRelated(false);
        else if (!showRelated && relatedTopics) setShowRelated(true);
    }

    return (
        <TopicContainer>
            <h3>Topic Name: {name} 
                <span onClick={() => toggleRelated()}>{showRelated ? 'Hide' : 'Show'} related Topics</span>
            </h3>
            <p>Start counts: {stargazerCount}</p>
            {
                showRelated && <TopicList topics={relatedTopics} filter={filter} />
            }
        </TopicContainer>
    )
}

export default TopicComponent;