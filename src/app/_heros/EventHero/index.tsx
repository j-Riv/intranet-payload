import React, { Fragment } from 'react';
import moment from 'moment';

import { Event } from '../../../payload/payload-types';
import { Gutter } from '../../_components/Gutter';
import { Media } from '../../_components/Media';
import RichText from '../../_components/RichText';

import classes from './index.module.scss';

export const EventHero: React.FC<{
  event: Event;
}> = ({ event }) => {
  const { title, categories, meta: { image: metaImage } = {}, dateFrom, dateTo } = event;

  const startDate = moment(dateFrom).format('MM-DD-YYYY');
  const endDate = moment(dateTo).format('MM-DD-YYYY');

  return (
    <Fragment>
      <Gutter className={classes.postHero}>
        <div className={classes.content}>
          <div className={classes.leader}>
            <div className={classes.categories}>
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category;

                  const titleToUse = categoryTitle || 'Untitled category';

                  const isLast = index === categories.length - 1;

                  return (
                    <Fragment key={index}>
                      {titleToUse}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.meta}>
            {startDate} to {endDate}
          </p>
        </div>
        <div className={classes.media}>
          <div className={classes.mediaWrapper}>
            {!metaImage && <div className={classes.placeholder}>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              // @ts-expect-error
              <Media imgClassName={classes.image} resource={metaImage} fill />
            )}
          </div>
          {/* @ts-expect-error */}
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            // @ts-expect-error
            <RichText content={metaImage.caption} className={classes.caption} />
          )}
        </div>
      </Gutter>
    </Fragment>
  );
};
