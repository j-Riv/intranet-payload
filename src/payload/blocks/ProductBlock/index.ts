import type { Block } from 'payload/types';

import { invertBackground } from '../../fields/invertBackground';
import textField from '../../fields/text';

export const ProductBlock: Block = {
  slug: 'productBlock',
  fields: [
    invertBackground,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    textField({
      label: 'Title',
      name: 'title',
      required: true,
    }),
    textField({
      label: 'SKU',
      name: 'sku',
      required: true,
    }),
  ],
};
