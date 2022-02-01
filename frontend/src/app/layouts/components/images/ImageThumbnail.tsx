
import React from 'react';

interface Props {
    url: string
}

const ImageThumbnail: React.FC<Props> = ({ url }) => {
    return (
        <div className="border my-2">
            <img
                className='image__thumbnail w-100'
                src={url}
                alt=""
            />
        </div>
    );
}

export default ImageThumbnail;
