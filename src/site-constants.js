/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @providesModule site-constants
 * @flow
 */

// NOTE: We can't just use `location.toString()` because when we are rendering
// the SSR part in node.js we won't have a proper location.
const urlRoot = 'https://bytom.binstd.org';
const version = '1.0.1';
const babelURL = '//unpkg.com/babel-standalone@6.26.0/babel.min.js';

export {urlRoot, version, babelURL};
