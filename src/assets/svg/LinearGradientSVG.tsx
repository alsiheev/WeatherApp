import * as React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

interface Props {
    colorTop: string;
    colorBottom: string;
}

const LinearGradientSVG = (props: Props) => (
    <Svg
        viewBox="0 0 700 700"
        height="100%"
        width="100%"
        preserveAspectRatio="none"
        style={{ position: 'absolute', zIndex: -10 }}
    >
        <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                <Stop stopColor={props.colorTop} offset="0%" />
                <Stop stopColor={props.colorBottom} offset="100%" />
            </LinearGradient>
        </Defs>
        <Path fill="url(#a)" d="M0 0h700v700H0z" />
    </Svg>
);
export default LinearGradientSVG;
