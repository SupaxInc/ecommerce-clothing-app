import React from 'react';
import CollectionItem from '../collection-item/collection-item';

import { useNavigate } from "react-router-dom";

import './collection-preview.scss';

const CollectionPreview = ({ title, routeName, items}) => {
    const navigate = useNavigate();
    return (
        <div className='collection-preview'>
            <h1 className='title' onClick={() => navigate(routeName)}>{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items
                        // Use filter if you need to use filter out what needs to be rendered using map
                        .filter((item, index) => index < 4)
                        .map((item) => {
                            return <CollectionItem key={item.id} item={item} />
                        })
                }
            </div>
        </div>
    );

}

export default CollectionPreview;