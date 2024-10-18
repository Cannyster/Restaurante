import styled from "styled-components";

export const Comment = styled.div`
  background: ${(props) => props.theme["gray-800"]};
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  border-radius: 8px;
`;

export const CommentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CommentContent = styled.div`
  background: ${(props) => props.theme["gray-700"]};
  border-radius: 8px;
  padding: 1rem;
  color: ${(props) => props.theme["gray-100"]};

  p {
    margin-top: 1rem;
    color: ${(props) => props.theme["gray-300"]};
    font-size: 0.875rem;
    line-height: 1.6;
  }

  button {
    background: transparent;
    border: 0;
    color: ${(props) => props.theme["gray-400"]};
    cursor: pointer;
    line-height: 0;
    border-radius: 4px;

    &:hover {
      color: ${(props) => props.theme["red-500"]};
    }
  }

`;

export const AuthorAndTime = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  align-items: center;

  strong {
    display: inline;
    font-size: 1rem;
    color: ${(props) => props.theme["gray-100"]};
  }

  time {
    display: inline;
    font-size: 0.875rem;
    color: ${(props) => props.theme["gray-400"]};
  }
`;

export const CommentFooter = styled.footer`
  display: flex;
  top: 0;
  bottom: 0;
  justify-content: space-between;

  p {
    margin: 0 0 0 0;
  }

  button {
    background: transparent;
    border: 0;
    color: ${(props) => props.theme["gray-400"]};
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: ${(props) => props.theme["red-300"]};
    }

    span::before {
      padding: 0 0.25rem;
      content: "•";
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;

  Search{
    &:hover {
      color: ${(props) => props.theme["green-300"]};
    }
  }

`
