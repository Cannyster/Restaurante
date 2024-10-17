import styled from "styled-components";

export const Comment = styled.div`
  background: ${(props) => props.theme["gray-900"]};
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`

export const CommentBox = styled.div`
 flex: 1;
`

export const CommentContent = styled.div`
  background: var(--gray-700);
  border-radius: 8px;
  padding: 1rem;

  p{
    margin-top: 1rem;
    color: var(--gray-300);
  }

  button{
    background: transparent;
    border: 0;
    color: var(--gray-400);
    cursor: pointer;
    line-height: 0;
    border-radius: 2px;

    :hover{
        color: var(--red-500);
    }
  }
`
export const AuthorAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  
  strong{
    display: inline;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  time{
    display: inline;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--gray-400);
  }
`

export const Footer = styled.footer`
    margin-top: 1rem;

    button{
        background: transparent;
        border: 0;
        color: var(--gray-400);
        cursor: pointer;
        display: flex;
        align-items: center;

        :hover{
            color: var(--green-300);
        }

        span{
            ::before{
                padding: 0 0.25rem;
                content: "\2022";
            }
        }
    }
`

export const Header = styled.header`
    display: block;
    align-items: center;
    justify-content: space-between;

    button{
        background: transparent;
        border: 0;
        color: var(--gray-400);
        cursor: pointer;
        line-height: 0;
        border-radius: 2px; 

        :hover{
            color: var(--red-500);
        }
    }

`

