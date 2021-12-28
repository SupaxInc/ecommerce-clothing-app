import React, { useEffect, Suspense, lazy } from 'react';

import { useDispatch } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

import { Route, Routes } from 'react-router-dom';

const CollectionsOverviewContainer = lazy(() => import('../../components/collection-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

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
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<CollectionsOverviewContainer />} />
                        <Route path="/:categoryId" element={<CollectionPageContainer />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </div>
    );

}
export default ShopPage;