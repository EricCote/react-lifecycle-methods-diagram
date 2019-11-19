import PropTypes from 'prop-types';

export const supportedReactVersions = ['16.3', 'classes', 'hooks'];

export const isReactVersion = PropTypes.oneOf(supportedReactVersions);
