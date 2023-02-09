import React, { useMemo } from 'react';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import Animated, {
    useAnimatedStyle,
    interpolateColor,
} from 'react-native-reanimated';
import useThemeContext from '../../../hooks/useThemeContext';

const hexTransparencyValues = ['A0', 'F0'];

const Background: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
}) => {
    const theme = useThemeContext();

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedIndex.value,
            [0, 1],
            [
                `${theme.colors.bgdark}${hexTransparencyValues[0]}`,
                `${theme.colors.bgdark}${hexTransparencyValues[1]}`,
            ],
        ),
    }));
    const containerStyle = useMemo(
        () => [style, containerAnimatedStyle],
        [style, containerAnimatedStyle],
    );

    return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default Background;
