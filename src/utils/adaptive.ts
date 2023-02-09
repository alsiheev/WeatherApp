import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const designWidth = 420;
const designHeight = 800;

const w = (px: number) => (width / designWidth) * px;
const h = (px: number) => (height / designHeight) * px;
const fontScale = (size: number) => w(size);

export { w, h, fontScale };
