import React, { useState } from "react";
import styled from "styled-components";

interface FlashCardProps {
    prompt: string;
    answer: string;
    onPreviousClicked?: () => void;
    onNextClicked?: () => void;
    onSaveForLater?: () => void;
}

export default function FlashCard(props: FlashCardProps) {
    const [flipped, setFlipped] = useState(false);
    const { prompt, answer, onPreviousClicked, onNextClicked } = props;

    if (flipped) {
        return (
            <StyledFlashCard>
                <FlashAnswer>
                    <span>{answer}</span>
                </FlashAnswer>
                <AnswerSection>
                    <Button onClick={onPreviousClicked}>Previous</Button>
                    <Button onClick={onNextClicked}>Next</Button>
                </AnswerSection>
            </StyledFlashCard>
        );
    }
    return (
        <StyledFlashCard onClick={() => setFlipped(true)}>
            <FlashPrompt>
                <span>{prompt}</span>
            </FlashPrompt>
        </StyledFlashCard>
    );
}

const StyledFlashCard = styled.div`
    aspect-ratio: 5 / 3;
    width: 100%;
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 2rem;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const FlashPrompt = styled.span`
    font-size: 2.5rem;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    cursor: pointer;
`;

const FlashAnswer = styled.span`
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
`;

const AnswerSection = styled.section`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button`
    cursor: pointer;
    min-width: 8rem;
    border-width: 3px;
    border-style: solid;
    border-radius: 50rem;
    padding: 8px 16px;
    border-color: transparent;
    background: linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #dee2e6, #adb5bd) border-box;
`;
