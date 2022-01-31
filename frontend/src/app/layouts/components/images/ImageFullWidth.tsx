import React from 'react';

interface Props {
    url: string
}

const ImageFullWidth: React.FC<Props> = ({ url }) => {
    return (
        <div className="image__container border w-100 my-2">
            <img
                className='w-100'
                src={url}
                alt=""
            />
        </div>
    );
}

export default ImageFullWidth;
