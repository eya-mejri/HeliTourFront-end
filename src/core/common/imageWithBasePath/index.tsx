import React from 'react';
import { img_path} from '../../../environment';


interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string; // required
}
const ImageWithBasePath: React.FC<ImageProps> = ({ src, ...rest }) => {
  const fullSrc = `${img_path}${src}`;
  return <img src={fullSrc} {...rest} />;
};

export default ImageWithBasePath;
