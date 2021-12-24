import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { Route, Routes } from 'react-router-dom';

class ShopPage extends Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }

    render() {

        return (
            <div className='shop-page'>
                <Routes>
                    <Route path="/" element={<CollectionsOverviewContainer />} />
                    <Route path="/:categoryId" element={<CollectionPageContainer />} />
                </Routes>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
    }
}

export default connect(null, mapDispatchToProps)(ShopPage);