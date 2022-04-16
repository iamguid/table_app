import '../../index.css';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CircleButton } from './CircleButton';
import { CheckIcon } from '../Icons/icons/CheckIcon';

export default {
  title: 'CircleButton',
  component: CircleButton,
} as ComponentMeta<typeof CircleButton>;

const CircleButtonTemplate: ComponentStory<typeof CircleButton> = (args) => {
  return (
    <CircleButton {...args}>
      <CheckIcon width={10} height={10} />
    </CircleButton>
  );
};

export const BackgroundCircleButton = CircleButtonTemplate.bind({});
BackgroundCircleButton.args = {
  size: 20,
  bgColor: 'aqua',
}

export const BorderedCircleButton = CircleButtonTemplate.bind({});
BorderedCircleButton.args = {
  size: 20,
  borderColor: 'black',
}
