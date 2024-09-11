import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';


const TAGS = {
  'on-sale': {
    "--display": "block",
    "--saleDisplay": "block",
    "--backgroundColor": COLORS.primary,
    "--text-decoration": "line-through"
  },
  'new-release': {
    "--saleDisplay": "none",
    "--display": "block",
    "--backgroundColor": COLORS.secondary,
    "--text-decoration": "none"
  },
  'default': {
    "--saleDisplay": "none",
    "--display": "none",
    "--backgroundColor": COLORS.primary,
    "--text-decoration": "none"
  }
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  
  const tagStyles = TAGS[variant];
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Tag style={tagStyles}>{variant}</Tag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={tagStyles}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          
          <SalePrice  style={tagStyles}>{formatPrice(salePrice)}</SalePrice>            
          
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Tag = styled.div`
  position: absolute;
  background-color: var(--backgroundColor);
  display: var(--display);
  min-width: fit-content;
  border-radius: 4px;
  padding: 4px;
  color: white;
  font-weight:${WEIGHTS.medium}; 
  font-size: ${14 / 16}rem;
  top: 6px;
  right: -5px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 273px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: ${COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  // text-decoration: line-through;
  display: var(--saleDisplay);
  `;

export default ShoeCard;
