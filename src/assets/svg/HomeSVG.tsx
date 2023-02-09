import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
    color?: string;
}

const HomeSVG = (props: Props) => (
    <Svg
        fill={props.color || '#000000'}
        width="40px"
        height="40px"
        viewBox="-0.281 0 2 2"
    >
        <Path d="M1.217 0.787l0.227 0.207c0.027 0.025 0.02 0.045 -0.018 0.045h-0.17v0.541c0 0.037 -0.031 0.07 -0.068 0.07h-0.295v-0.379c0 -0.037 -0.033 -0.07 -0.07 -0.07h-0.186c-0.037 0 -0.07 0.033 -0.07 0.07v0.379h-0.295c-0.037 0 -0.07 -0.033 -0.07 -0.07v-0.541h-0.168c-0.037 0 -0.045 -0.02 -0.018 -0.045l0.662 -0.602c0.027 -0.025 0.074 -0.025 0.103 0l0.15 0.135v-0.107c0 -0.037 0.033 -0.07 0.07 -0.07h0.146c0.037 0 0.068 0.033 0.068 0.07v0.367z" />
    </Svg>
);
export default HomeSVG;
