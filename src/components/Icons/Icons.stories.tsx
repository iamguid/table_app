import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { IIconProps } from './IIconProps';
import { CheckIcon } from './icons/CheckIcon';
import { MinusIcon } from './icons/MinusIcon';

export default {
  title: 'Icons',
};

const defaultIconProps: Partial<IIconProps> = {
  width: 30,
  height: 30,
  onClick: () => console.log('clicked'),
  style: {
    color: 'aqua',
  }
}

const icons: React.FC<IIconProps>[] = [
  CheckIcon,
  MinusIcon,
]

const IconsTableTemplate: React.FC = () => (
  <div style={{
    padding: '20px',
    display: 'flex',
    flexFlow: 'row wrap',
    color: 'white',
    background: 'grey',
  }}>
    {icons.map(Icon => (
      <div key={Icon.displayName} style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        padding: '20px',
      }}>
        <Icon {...defaultIconProps} /> 
        <span>{Icon.displayName}</span>
      </div>
    ))}
  </div>
)

export const IconsTable = IconsTableTemplate.bind({});