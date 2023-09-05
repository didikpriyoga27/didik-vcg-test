import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const FavFilledSvg = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path
      fill="rgba(255,26,26,1)"
      d="M20.243 4.757a6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 6.74-9.553L6.343 7.358l1.414 1.415L12 4.53l-.013-.014.014.013a5.998 5.998 0 0 1 8.242.228Z"
    />
  </Svg>
);
export default FavFilledSvg;
