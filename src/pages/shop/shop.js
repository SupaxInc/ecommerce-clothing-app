import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { Route, Routes } from 'react-router-dom';

// Wrapping CollectionOverview and CollectionPage with WithSpinner HOC
const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component{
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        // Get the collection reference object of the collections
        const collectionRef = firestore.collection('collections');

        // onSnapshot attaches a listener and creates a snapshot immediately
        // compared to get() where it only receives the snapshot once
        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }

    render() {
        const { loading } = this.state;

        return (
            <div className='shop-page'>
                <Routes>
                    <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={loading} />} />
                    <Route path="/:categoryId" element={<CollectionPageWithSpinner isLoading={loading} />} />
                </Routes>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    }
}

export default connect(null, mapDispatchToProps)(ShopPage);