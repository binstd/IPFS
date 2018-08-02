/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {sharedStyles} from 'theme';

// $FlowFixMe This is a valid path
import versions from '../../content/versions.yml';

const Versions = () => (
  <Container>
    <div css={sharedStyles.articleLayout.container}>
      <div css={sharedStyles.articleLayout.content}>
        <Header>IPFS Versions</Header>
        <TitleAndMetaTags title="Bytom - Versions" />
        <div css={sharedStyles.markdown}>
          <p>
            A complete release history for IPFS is available{' '}
            <a
              href="https://github.com/binstd/IPFS"
              target="_blank"
              rel="noopener">
              on GitHub
            </a>.<br />
            Documentation for recent releases can also be found below:
          </p>
          {versions.map(version => (
            <div key={version.title}>
              <h3>{version.title}</h3>
              <ul>
                <li>
                  <a href={version.changelog} target="_blank" rel="noopener">
                    Changelog
                  </a>
                </li>
                {version.path && (
                  <li>
                    <a href={version.path} rel="nofollow">
                      Documentation
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
);

export default Versions;
