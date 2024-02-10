import React, { Fragment } from 'react';

import { AbsenceRequest } from '../../../payload/payload-types';
import { Gutter } from '../../_components/Gutter';
import { Media } from '../../_components/Media';
import RichText from '../../_components/RichText';

import classes from './index.module.scss';

export const AbsenceRequestHero: React.FC<{
  absenceRequest: AbsenceRequest;
}> = ({ absenceRequest }) => {
  const { title, categories, meta: { image: metaImage } = {}, populatedApprover } = absenceRequest;

  const split = title.split(' | ');
  const titleToUse = split[0];
  const subtitle = split[1];

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
          <h1 className={classes.title}>{titleToUse}</h1>
          <p className={classes.meta}>{subtitle}</p>
          <p className={classes.meta}>Approved by: {populatedApprover.name}</p>
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
