import React from 'react';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection/collection';

import { Route, Routes } from 'react-router-dom';

const ShopPage = () => {
    return (
        <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionOverview />} />
                <Route path="/:categoryId" element={<CollectionPage />} />
            </Routes>
        </div>
    );
}

export default ShopPage;