import React from 'react';

import T, { useTranslation } from './i18n';

export default function GitHub() {
  return (
    <>
      <a
        className='GitHub'
        href='https://www.ReactAcademy.live/'
        target='_blank'
        rel='noopener noreferrer'
        title='React Academy'
      >
        React Academy,
      </a>{' '}
      <T>Advanced training on React Js</T>
    </>
  );
}
