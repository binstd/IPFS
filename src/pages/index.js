/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import ButtonLink from 'components/ButtonLink';
import Container from 'components/Container';
import Flex from 'components/Flex';
import mountCodeExample from 'utils/mountCodeExample';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import {colors, media, sharedStyles} from 'theme';
import createOgUrl from 'utils/createOgUrl';
import loadScript from 'utils/loadScript';
import {babelURL} from 'site-constants';
import ReactDOM from 'react-dom';
import logoWhiteSvg from 'icons/logo-white.svg';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    const {data} = props;

    const code = data.code.edges.reduce((map, {node}) => {
      map[node.id] = JSON.parse(node.internal.contentDigest);

      return map;
    }, {});

    const examples = data.examples.edges.map(({node}) => ({
      content: node.html,
      id: node.fields.slug.replace(/^.+\//, '').replace('.html', ''),
      title: node.frontmatter.title,
    }));

    const marketing = data.marketing.edges.map(({node}) => ({
      title: node.frontmatter.title,
      content: node.html,
    }));

    this.state = {
      code,
      examples,
      marketing,
    };
  }

  render() {
    const {examples, marketing} = this.state;

    return (
      <div css={{width: '100%'}}>
        <TitleAndMetaTags
          title="IPFS中文开发文档"
          ogUrl={createOgUrl('index.html')}
        />
        <header
          css={{
            backgroundColor: colors.dark,
            color: colors.white,
          }}>
          <div
            css={{
              paddingTop: 45,
              paddingBottom: 20,

              [media.greaterThan('small')]: {
                paddingTop: 60,
                paddingBottom: 70,
              },

              [media.greaterThan('xlarge')]: {
                paddingTop: 95,
                paddingBottom: 85,
                maxWidth: 1500, // Positioning of background logo
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
                '::before': {
                  content: ' ',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  backgroundImage: `url(${logoWhiteSvg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '100% 100px',
                  backgroundSize: '50% auto',
                  opacity: 0.05,
                },
              },
            }}>
            <div
              css={{
                // Content should be above absolutely-positioned hero image
                position: 'relative',
              }}>
              <Container>
                <h1
                  css={{
                    color: colors.brand,
                    textAlign: 'center',
                    margin: 0,
                    fontSize: 45,
                    letterSpacing: '0.01em',
                    [media.size('xsmall')]: {
                      fontSize: 30,
                    },
                    [media.greaterThan('xlarge')]: {
                      fontSize: 60,
                    },
                  }}>
                  IPFS文档
                </h1>
                <p
                  css={{
                    paddingTop: 15,
                    textAlign: 'center',
                    fontSize: 24,
                    letterSpacing: '0.01em',
                    fontWeight: 200,

                    [media.size('xsmall')]: {
                      fontSize: 16,
                      maxWidth: '12em',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    },

                    [media.greaterThan('xlarge')]: {
                      paddingTop: 20,
                      fontSize: 30,
                    },
                  }}>
                  IPFS中文技术文档
                </p>
                <Flex
                  valign="center"
                  css={{
                    paddingTop: 40,

                    [media.greaterThan('xlarge')]: {
                      paddingTop: 65,
                    },
                  }}>
                  <CtaItem>
                    <ButtonLink to="/docs/getting-started.html" type="primary">
                      文档
                    </ButtonLink>
                  </CtaItem>
                  <CtaItem>
                    <ButtonLink to="/docs/getting-started.html" type="secondary">
                      快速开始
                    </ButtonLink>
                  </CtaItem>
                </Flex>
              </Container>
            </div>
          </div>
        </header>

        <Container>
          <div css={sharedStyles.markdown}>
            <section
              css={[
                sectionStyles,
                {
                  [media.lessThan('medium')]: {
                    marginTop: 0,
                    marginBottom: 0,
                    overflowX: 'auto',
                    paddingTop: 30,
                    WebkitOverflowScrolling: 'touch',
                    position: 'relative',
                    maskImage:
                      'linear-gradient(to right, transparent, white 10px, white 90%, transparent)',
                  },
                },
              ]}>
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'row',

                  [media.lessThan('medium')]: {
                    display: 'block',
                    whiteSpace: 'nowrap',
                  },
                }}>
                {marketing.map((column, index) => (
                  <div
                    key={index}
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '0 1 33%',
                      marginLeft: 40,

                      '&:first-of-type': {
                        marginLeft: 0,

                        [media.lessThan('medium')]: {
                          marginLeft: 10,
                        },
                      },

                      [media.lessThan('medium')]: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        marginLeft: 0,
                        whiteSpace: 'normal',
                        width: '75%',
                        marginRight: 20,
                        paddingBottom: 40,

                        '&:first-of-type': {
                          marginTop: 0,
                        },
                      },
                    }}>
                    <h3
                      css={[
                        headingStyles,
                        {
                          '&&': {
                            // Make specificity higher than the site-wide h3 styles.
                            color: colors.subtle,
                            paddingTop: 0,
                            fontWeight: 300,
                            fontSize: 20,

                            [media.greaterThan('xlarge')]: {
                              fontSize: 24,
                              fontWeight: 200,
                            },
                          },
                        },
                      ]}>
                      {column.title}
                    </h3>
                    <div dangerouslySetInnerHTML={{__html: column.content}} />
                  </div>
                ))}
              </div>
            </section>
            <hr
              css={{
                height: 1,
                marginBottom: -1,
                border: 'none',
                borderBottom: `1 solid ${colors.divider}`,
              }}
            />

            
          </div>
        </Container>

    
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.object.isRequired,
    examples: PropTypes.object.isRequired,
    marketing: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};



const CtaItem = ({children, primary = false}) => (
  <div
    css={{
      width: '50%',

      [media.between('small', 'large')]: {
        paddingLeft: 20,
      },

      [media.greaterThan('xlarge')]: {
        paddingLeft: 40,
      },

      '&:first-child': {
        textAlign: 'right',
        paddingRight: 15,
      },

      '&:nth-child(2)': {
        [media.greaterThan('small')]: {
          paddingLeft: 15,
        },
      },
    }}>
    {children}
  </div>
);

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexMarkdown {
    code: allExampleCode {
      edges {
        node {
          id
          internal {
            contentDigest
          }
        }
      }
    }
    examples: allMarkdownRemark(
      filter: {id: {regex: "//home/examples//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          html
        }
      }
    }
    marketing: allMarkdownRemark(
      filter: {id: {regex: "//home/marketing//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

export default Home;

const sectionStyles = {
  marginTop: 20,
  marginBottom: 15,

  [media.greaterThan('medium')]: {
    marginTop: 60,
    marginBottom: 65,
  },
};

const headingStyles = {
  '&&': {
    marginBottom: 20,
  },
};
