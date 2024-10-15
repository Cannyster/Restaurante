import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Viewport,
} from "./styles";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { value: string; children: React.ReactNode }
>(({ children, ...props }, forwardedRef) => {
  return (
    <Item {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <ItemIndicator>
        <CheckIcon />
      </ItemIndicator>
    </Item>
  );
});

export function SelectMenu() {
  return (
    <Select.Root>
      <Trigger aria-label="Food">
        <Select.Value placeholder="Tipo de Cozinha" />
        <Icon>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Select.Portal>
        <Content>
          <ScrollUpButton>
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport>
            <Select.Group>
              <SelectItem value="Baiana">Baiana</SelectItem>
              <SelectItem value="Mineira">Mineira</SelectItem>
              <SelectItem value="Goiâna">Goiâna</SelectItem>
              <SelectItem value="Paraense">Paraense</SelectItem>
              <SelectItem value="Catarinense">Catarinense</SelectItem>
              <SelectItem value="Pernanbucana">Pernanbucana</SelectItem>
              <SelectItem value="Amazonense">Amazonense</SelectItem>
              <SelectItem value="Cearense">Cearense</SelectItem>
              <SelectItem value="Paulista">Paulista</SelectItem>
            </Select.Group>
          </Viewport>
          <ScrollDownButton>
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Select.Portal>
    </Select.Root>
  );
}
