import styled from 'styled-components';

const Button = styled.button`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border: none;
  font-size: 1.3em;
  border-radius: 5px;
  margin: .5em .25em;  
  padding: .25em 2em;
  box-sizing: border-box;
  cursor: pointer;
  background-color: white;
  :hover {
    transform:  translateY(-2px);
    transition: .3s ease;
  }
`;

Button.displayName = 'Button';

export default Button;