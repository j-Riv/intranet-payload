import type { Block, Field } from 'payload/types';

import { invertBackground } from '../../fields/invertBackground';
import link from '../../fields/link';
import richText from '../../fields/richText';

const cardFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        value: 'oneThird',
        label: 'One Third',
      },
      {
        value: 'half',
        label: 'Half',
      },
      {
        value: 'twoThirds',
        label: 'Two Thirds',
      },
      {
        value: 'OneFourth',
        label: 'One Fourth',
      },
      {
        value: 'full',
        label: 'Full',
      },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  richText(),
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
];

export const Cards: Block = {
  slug: 'cards',
  fields: [
    invertBackground,
    {
      name: 'cards',
      type: 'array',
      fields: cardFields,
    },
  ],
};
