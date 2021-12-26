import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { Route, Routes } from 'react-router-dom';

const ShopPage = () => {
    const dispatch = useDispatch();
    // componentDidMount using useEffect
    // fetchCollectionsStart is added into the array because it is a dispatch prop that is passed in from redux
    // If it is not added into the array, it can possibly trigger twice because the parent component might re-render
    // which triggers this component to re-render as well.
    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch])

    return (
        <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionsOverviewContainer />} />
                <Route path="/:categoryId" element={<CollectionPageContainer />} />
            </Routes>
        </div>
    );

}
export default ShopPage;