
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

export const Trigger = styled(Select.Trigger)`
	all: unset;
	display: inline-flex;
	justify-content: left;
	border-radius: 6px;
	padding: 1rem;
	gap: 5px;
	background: ${(props) => props.theme["gray-900"]};
	color: ${(props) => props.theme["gray-300"]};

	&[data-placeholder] {
		color: ${(props) => props.theme["gray-500"]};
	}
`

export const Icon = styled(Select.Icon)`
	color: Var(--violet-11);
`

export const Content = styled(Select.Content)`
	overflow: hidden;
	border-radius: 6px;
	border: 0;
	background: ${(props) => props.theme["gray-900"]};
	color: ${(props) => props.theme["gray-300"]};
	padding: 1rem;
`

export const Viewport = styled(Select.Viewport)`
	padding: 5px;
`

export const Item = styled(Select.Item)`
	font-size: 13px;
	line-height: 1;
	color: var(--violet-11);
	border-radius: 3px;
	display: flex;
	align-items: center;
	height: 25px;
	padding: 0 35px 0 25px;
	position: relative;
	user-select: none;
	&[data-disabled] {
		color: var(--mauve-8);
		pointer-events: none;
	}
	&[data-highlighted] {
		outline: none;
		background-color: var(--violet-9);
		color: var(--violet-1);
	}
`

// export const Label = styled(Select.Trigger)`
// 	padding: 0 25px;
// 	font-size: 12px;
// 	line-height: 25px;
// 	color: var(--mauve-11);
// `

// export const Separator = styled(Select.Separator)`
// 	height: 1px;
// 	background-color: var(--violet-6);
// 	margin: 5px;
// `

export const ItemIndicator = styled(Select.ItemIndicator)`
	position: absolute;
	left: 0;
	width: 25px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
`

const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: var(--violet-11);
  cursor: default;
`;

// Extensão para o ScrollUpButton
export const ScrollUpButton = styled(Select.ScrollUpButton)`
  ${ScrollButton}
`;

// Extensão para o ScrollDownButton
export const ScrollDownButton = styled(Select.ScrollDownButton)`
  ${ScrollButton}
`;