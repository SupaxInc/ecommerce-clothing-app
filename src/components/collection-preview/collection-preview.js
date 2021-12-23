import React from 'react';
import CollectionItem from '../collection-item/collection-item';
import './collection-preview.scss';

const CollectionPreview = ({ title, items}) => {
    return (
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items
                        // Use filter if you need to use filter out what needs to be rendered using map
                        .filter((item, index) => index < 4)
                        .map((item) => {
                            console.log(item);
                            return <CollectionItem key={item.id} item={item} />
                        })
                }
            </div>
        </div>
    );

}

export default CollectionPreview;