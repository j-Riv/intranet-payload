import React from 'react';

import { Page } from '../../../payload/payload-types';
import { Gutter } from '../../_components/Gutter';
import { Media } from '../../_components/Media';
import RichText from '../../_components/RichText';
import { VerticalPadding } from '../../_components/VerticalPadding';

import classes from './index.module.scss';

export type CardProps = Extract<Page['layout'][0], { blockType: 'cards' }>;

export const Cards: React.FC<
  CardProps & {
    id?: string;
  }
> = ({ invertBackground, cards }) => {
  return (
    <Gutter>
      <VerticalPadding
        className={[classes.callToAction, invertBackground && classes.invert]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={classes.grid}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={[classes.column, classes[`column--${card.size}`]].join(' ')}
            >
              <div className={classes.wrap}>
                {/* @ts-expect-error */}
                <Media resource={card.media} />
                <div className={classes.content}>
                  <RichText className={classes.richText} content={card.richText} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </VerticalPadding>
    </Gutter>
  );
};
