import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flash } from "../App";

interface EditCardModalProps {
    currentFlashes: Flash[];
    updateFlashes: (newFlashes: Flash[]) => void;
    close: () => void;
}

const invalidCharactersRegex = /[^a-zA-z 0-9-\n]/gi;
const removeInvalidChars = (text: string) => {
    return text.replaceAll(invalidCharactersRegex, "");
};
const flashesToText = (flashes: Flash[]) => {
    return flashes
        .map((flash) => `${flash.prompt} - ${flash.answer}`)
        .join("\n");
};
export default function EditCardModal(props: EditCardModalProps) {
    const [text, setText] = useState("");
    const [error, setError] = useState<string>();

    useEffect(() => {
        setText(flashesToText(props.currentFlashes));
    }, [props.currentFlashes]);

    const parseText = () => {
        const cleanedText = removeInvalidChars(text);
        const lines = cleanedText.split("\n");

        const flashes: Flash[] = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === "") {
                continue;
            }

            const parts = lines[i].split("-");
            if (parts.length !== 2) {
                setError(`Invalid line ${i + 1}, wrong number of delmiters`);
                return null;
            }
            flashes.push({ prompt: parts[0].trim(), answer: parts[1].trim() });
        }
        return flashes;
    };

    const reverseFlashes = () => {
        const flashes = parseText();
        if (flashes) {
            const reversed = flashes.map(({ prompt, answer }) => {
                return { answer: prompt, prompt: answer };
            });
            setText(flashesToText(reversed));
        }
    };

    const save = () => {
        const flashes = parseText();
        if (flashes) {
            props.updateFlashes(flashes);
            props.close();
        }
    };

    return (
        <StyledEditCardModal>
            <ModalContents>
                <p>
                    Edit flash card values below, one per line using '-' to
                    delimit between prompt and answer.
                </p>
                <FlashTextarea
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {error ? <Error>Error parsing: {error}</Error> : null}
                <ButtonSection>
                    <button onClick={props.close}>Close</button>
                    <button onClick={reverseFlashes}>Reverse</button>
                    <button onClick={save}>Save</button>
                </ButtonSection>
            </ModalContents>
        </StyledEditCardModal>
    );
}

const StyledEditCardModal = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContents = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5rem;
    gap: 5rem;
`;

const FlashTextarea = styled.textarea`
    width: 100%;
`;

const Error = styled.p`
    color: red;
`;

const ButtonSection = styled.div``;
