import React, { useState } from "react";
import styled from "styled-components";
import EditCardModal from "./components/EditCardModal";
import FlashCard from "./components/FlashCard";
import Menu from "./components/Menu";

export interface Flash {
    prompt: string;
    answer: string;
}

const defaultFlashes: Flash[] = [
    {
        prompt: "Hello",
        answer: "Ola",
    },
    {
        prompt: "Goodbye",
        answer: "adiós",
    },
];

function App() {
    const [index, setIndex] = useState(0);
    const [shuffleNum, setShuffleNum] = useState(0);
    const [flashes, setFlashes] = useState(defaultFlashes);
    const [editing, setEditing] = useState(false);

    const shuffle = (flashes: Flash[]) => {
        // Fisher yates shuffle
        const shuffledFlashes = [...flashes];

        for (let i = shuffledFlashes.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const temp = shuffledFlashes[i];
            shuffledFlashes[i] = shuffledFlashes[randomIndex];
            shuffledFlashes[randomIndex] = temp;
        }

        setFlashes(shuffledFlashes);
        setIndex(0);
        setShuffleNum(shuffleNum + 1);
    };

    return (
        <StyledFullScreen>
            {editing ? (
                <EditCardModal
                    currentFlashes={flashes}
                    close={() => setEditing(false)}
                    updateFlashes={(flashes) => shuffle(flashes)}
                />
            ) : null}
            <Menu
                shuffle={() => shuffle(flashes)}
                editCards={() => setEditing(true)}
            />
            <FlashCard
                key={`${index},${shuffleNum}`}
                {...flashes[index]}
                onPreviousClicked={() => setIndex((index - 1) % flashes.length)}
                onNextClicked={() => setIndex((index + 1) % flashes.length)}
            />
        </StyledFullScreen>
    );
}

const StyledFullScreen = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default App;
