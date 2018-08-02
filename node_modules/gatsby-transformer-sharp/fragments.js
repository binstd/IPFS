"use strict";

exports.__esModule = true;
/* eslint-disable */
var gatsbyImageSharpResolutions = exports.gatsbyImageSharpResolutions = graphql`
  fragment GatsbyImageSharpResolutions on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
  }
`;

var gatsbyImageSharpResolutionsTracedSVG = exports.gatsbyImageSharpResolutionsTracedSVG = graphql`
  fragment GatsbyImageSharpResolutions_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
  }
`;

var gatsbyImageSharpResolutionsPreferWebp = exports.gatsbyImageSharpResolutionsPreferWebp = graphql`
  fragment GatsbyImageSharpResolutions_withWebp on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;

var gatsbyImageSharpResolutionsPreferWebpTracedSVG = exports.gatsbyImageSharpResolutionsPreferWebpTracedSVG = graphql`
  fragment GatsbyImageSharpResolutions_withWebp_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;

var gatsbyImageSharpResolutionsNoBase64 = exports.gatsbyImageSharpResolutionsNoBase64 = graphql`
  fragment GatsbyImageSharpResolutions_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
  }
`;

var gatsbyImageSharpResolutionsPreferWebpNoBase64 = exports.gatsbyImageSharpResolutionsPreferWebpNoBase64 = graphql`
  fragment GatsbyImageSharpResolutions_withWebp_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`;

var gatsbyImageSharpSizes = exports.gatsbyImageSharpSizes = graphql`
  fragment GatsbyImageSharpSizes on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`;

var gatsbyImageSharpSizesTracedSVG = exports.gatsbyImageSharpSizesTracedSVG = graphql`
  fragment GatsbyImageSharpSizes_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`;

var gatsbyImageSharpSizesPreferWebp = exports.gatsbyImageSharpSizesPreferWebp = graphql`
  fragment GatsbyImageSharpSizes_withWebp on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;

var gatsbyImageSharpSizesPreferWebpTracedSVG = exports.gatsbyImageSharpSizesPreferWebpTracedSVG = graphql`
  fragment GatsbyImageSharpSizes_withWebp_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;

var gatsbyImageSharpSizesNoBase64 = exports.gatsbyImageSharpSizesNoBase64 = graphql`
  fragment GatsbyImageSharpSizes_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    sizes
  }
`;

var gatsbyImageSharpSizesPreferWebpNoBase64 = exports.gatsbyImageSharpSizesPreferWebpNoBase64 = graphql`
  fragment GatsbyImageSharpSizes_withWebp_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`;