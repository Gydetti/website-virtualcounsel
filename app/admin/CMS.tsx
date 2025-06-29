'use client';

import PropTypes from 'prop-types';

// Suppress prop-types validation warnings (e.g., ErrorBoundary children prop type)
if (typeof window !== 'undefined') {
  PropTypes.checkPropTypes = () => {};
}

import { useEffect, useRef } from 'react';

import { config } from '@/lib/cms/config';

const CMS = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    (async () => {
      const DecapCMS = (await import('decap-cms-app')).default;
      // @ts-ignore
      DecapCMS.init({ config });
    })();
  }, []);

  return <div id="nc-root" />;
};

export default CMS;
