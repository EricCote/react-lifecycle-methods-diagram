import React from 'react';
import { render } from 'react-dom';

import './index.less';

import Root from './Root';
import LangObserver from './i18n/LangObserver';

render(
  window.location.hash === '#pdf' ? (
    <LangObserver>
      <Root advanced={true} reactVersion="classes" />

      <Root advanced={true} reactVersion="hooks" />
    </LangObserver>
  ) : (
    <LangObserver>
      <Root />
    </LangObserver>
  ),

  document.getElementById('react-container')
);
