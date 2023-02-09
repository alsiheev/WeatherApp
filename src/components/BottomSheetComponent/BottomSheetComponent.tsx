import { useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackground from './Background/Background';

interface Props {
    children: React.ReactNode;
}

const BottomSheetComponent = ({ children }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['30%', '100%'], []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundComponent={CustomBackground}
        >
            {children}
        </BottomSheet>
    );
};

export default BottomSheetComponent;
