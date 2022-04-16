import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { Input } from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = () => {
  const [text, setText] = useState('');
  return <Input value={text} onChange={setText} />;
};

export const SimpleInput = Template.bind({});