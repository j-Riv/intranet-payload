import React from 'react';

import { Page } from '../../../payload/payload-types';
import { Gutter } from '../../_components/Gutter';
// import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media';
// import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding';

import classes from './index.module.scss';

export type ProductBlocksProps = Extract<Page['layout'][0], { blockType: 'productBlock' }>;

export const ProductBlock: React.FC<
  ProductBlocksProps & {
    id?: string;
  }
> = ({ invertBackground, media, title, sku }) => {
  return (
    <Gutter>
      <VerticalPadding
        className={[classes.callToAction, invertBackground && classes.invert]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={classes.wrap}>
          {/* @ts-expect-error */}
          <Media resource={media} />
          <div className={classes.content}>
            {/* <RichText className={classes.richText} content={richText} /> */}
            <h3>{title.value}</h3>
            <p>{sku.value}</p>
          </div>
        </div>
      </VerticalPadding>
    </Gutter>
  );
};
