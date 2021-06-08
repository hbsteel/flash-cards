import React from "react";
import styled from "styled-components";

interface MenuProps {
    shuffle: () => void;
    editCards: () => void;
}

export default function Menu(props: MenuProps) {
    const { shuffle, editCards } = props;
    return (
        <StyledMenu>
            <MenuButton onClick={editCards}>Edit Cards</MenuButton>
            <MenuButton onClick={shuffle}>Shuffle</MenuButton>
        </StyledMenu>
    );
}

const StyledMenu = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;
const MenuButton = styled.button``;
