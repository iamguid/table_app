import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { Search } from './Search';

export default {
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => {
  const [text, setText] = useState('');
  return <Search value={text} onChange={setText} />;
};

export const SimpleTable = Template.bind({});