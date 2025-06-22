import chainCoing from '@/chainConfig';
import useStyles from '@/components/ChainIcon/useStyles';
import Image, { type ImageProps } from 'next/image';
import baseIconLight from 'shared-utils/assets/icons/base-light.svg?url';
import provenanceIconDark from 'shared-utils/assets/icons/provenance-dark.svg?url';
import wormholeIconDark from 'shared-utils/assets/icons/wormhole.svg?url';
import baseLogoLight from 'shared-utils/assets/logos/base-light.svg?url';
import provenanceLogoDark from 'shared-utils/assets/logos/provenance-dark.svg?url';
import thorchainLogoLight from 'shared-utils/assets/logos/thorchain-light.png';
import thorchainLogoDark from 'shared-utils/assets/logos/thorchain-dark.png';
import wormholeLogoDark from 'shared-utils/assets/logos/wormhole.svg?url';

interface IconProps extends Omit<ImageProps, 'id' | 'src'> {
  type: 'icon' | 'logo';
  chainName?: string;
}

const ChainIcon = ({
  className,
  type,
  chainName = chainCoing().chainName,
  ...props
}: IconProps) => {
  const { classes, cx } = useStyles();

  let [iconDark, iconLight] =
    type === 'icon' ? [baseIconLight, baseIconLight] : [baseLogoLight, baseLogoLight];
  switch (chainName) {
    case 'provenance':
      [iconDark, iconLight] =
        type === 'icon'
          ? [provenanceIconDark, provenanceIconDark]
          : [provenanceLogoDark, provenanceLogoDark];
      break;
    case 'thorchain':
      [iconDark, iconLight] =
        type === 'icon'
          ? [thorchainLogoDark, thorchainLogoLight]
          : [thorchainLogoDark, thorchainLogoLight];
      break;
    case 'wormhole':
      [iconDark, iconLight] =
        type === 'icon'
          ? [wormholeIconDark, wormholeIconDark]
          : [wormholeLogoDark, wormholeLogoDark];
      break;
    default:
      throw new Error(`chain ${chainName} not supported`);
  }
  return (
    <span className={cx(className, classes.container)}>
      <Image width={0} height={0} src={iconDark} {...props} className={classes.dark} unoptimized />
      <Image
        width={0}
        height={0}
        src={iconLight}
        {...props}
        className={classes.light}
        unoptimized
      />
    </span>
  );
};

export default ChainIcon;
