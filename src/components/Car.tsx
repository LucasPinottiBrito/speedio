import Image, { StaticImageData } from 'next/image';

interface MovingImageProps {
    imageUrl: StaticImageData | string; 
    position: number;
}

const MovingImage: React.FC<MovingImageProps> = ({ imageUrl, position}) => {
    return (
        <div className="w-full h-24 overflow-hidden relative">
            <Image
                src={imageUrl}
                alt="Moving"
                className="absolute top-1/2 transform -translate-y-1/2 w-14 sm:w-20 lg:w-28"
                style={{ left: position }}
            />
        </div>
    );
};

export default MovingImage;
