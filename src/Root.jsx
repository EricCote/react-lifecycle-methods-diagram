import React, { useEffect, useState } from 'react';

import T from './i18n';

import Options from './Options';
import DiagramWithLegend from './DiagramWithLegend';
import Footer from './Footer';

import { supportedReactVersions } from './propTypes';
import { getMatchingLocale } from './i18n/i18n';

import logo from './static/logoReact.svg';

/**
 * Workaround for Google Chrome bug that causes grid to jump when hovered
 * after each rerender. Seems like Chrome can't figure out proper sizes until
 * we give it width explicitly.
 */
function fixChromeGridSizingBug(ref) {
  if (!ref) {
    return;
  }
  requestAnimationFrame(() => {
    /* eslint-disable no-param-reassign */
    ref.style.width = `${ref.clientWidth}px`;
    requestAnimationFrame(() => {
      ref.style.width = null;
    });
  });
}

function getLocalStorage(key, defaultValue) {
  return key in localStorage ? localStorage[key] : defaultValue;
}

function setLocaleToDocument(locale) {
  document.documentElement.setAttribute('lang', locale);
}

const userLocale = getLocalStorage('locale', getMatchingLocale());
const latestReactVersion =
  supportedReactVersions[supportedReactVersions.length - 1];
setLocaleToDocument(userLocale);

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(getLocalStorage(key, defaultValue));

  useEffect(() => {
    try {
      localStorage[key] = value;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to safe settings.');
    }
  }, [value]);

  return [value, setValue];
}

function useLocalStorageFlag(key, defaultValue) {
  const [value, setValue] = useLocalStorage(key, defaultValue);
  const valueBoolean = typeof value === 'boolean' ? value : value === 'true';
  function onChange(valueOrFunction) {
    setValue(
      typeof valueOrFunction === 'function'
        ? valueOrFunction(valueBoolean)
        : valueOrFunction
    );
  }
  return [valueBoolean, onChange];
}

export default function Root() {
  const [advanced, setAdvanced] = useLocalStorageFlag('showAdvanced', false);
  const [locale, setLocale] = useLocalStorage('locale', userLocale);
  const [reactVersion, setReactVersion] = useLocalStorage(
    'reactVersion',
    latestReactVersion
  );

  function toggleAdvanced() {
    setAdvanced(prevAdvanced => !prevAdvanced);
  }

  function toggleLocale(event) {
    const { value } = event.target;
    setLocale(value);
  }

  function toggleReactVersion(event) {
    const { value } = event.target;
    setReactVersion(value);
  }

  useEffect(() => {
    setLocaleToDocument(locale);
  }, [locale]);

  return (
    <div ref={fixChromeGridSizingBug}>
      <div class="logo">
        <div class="logo-wrapper">
          <img src={logo} alt="React Academy" title="React Academy" />
        </div>

        <div class="company">
          <p>
            React <br /> Academy
          </p>
        </div>
      </div>

      <h1>
        <T>
          React lifecycle methods (
          {reactVersion.charAt(0).toUpperCase() + reactVersion.substr(1)})
        </T>
      </h1>
      <Options
        advanced={advanced}
        locale={locale}
        reactVersion={reactVersion}
        toggleAdvanced={toggleAdvanced}
        toggleLocale={toggleLocale}
        toggleReactVersion={toggleReactVersion}
      />
      <DiagramWithLegend advanced={advanced} reactVersion={reactVersion} />
      <Footer />
    </div>
  );
}
