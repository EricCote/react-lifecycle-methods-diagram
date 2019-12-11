import PropTypes from 'prop-types';

export const supportedReactVersions = ['16.3', 'classes', 'hooks', 'legacy'];

export const isReactVersion = PropTypes.oneOf(supportedReactVersions);
