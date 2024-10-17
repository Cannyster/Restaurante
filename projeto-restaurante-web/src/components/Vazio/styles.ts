import styled from "styled-components";

export const Container = styled.div`
    color: ${(props) => props.theme["gray-300"]};
    border-top: 1px solid ${(props) => props.theme["gray-400"]};
    
    display: flex;
    padding: 4rem 1rem;
    border-radius: 8px;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    p{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`