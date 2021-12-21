import React from "react";
import CollectionItem from "../../components/collection-item/collection-item";
import withRouter from "../../components/withRouter/withRouter";

import { connect } from "react-redux";
import { compose } from "redux";
import { selectShopCollectionsId } from "../../redux/shop/shop.selector";

import './collection.scss';

const CollectionPage = ({params, collection}) => {
    console.log(params, collection);

    return (
        <div className="collection">
            <h2>COLLECTION PAGE</h2>
        </div>
    )
}

// ownProps parameter gives us all of the properties that CollectionPage uses
const mapStateToProps = (state, ownProps) => {
    return {
        // createSelector returns a function so we need to call the function again that passes state
        collection: selectShopCollectionsId(ownProps.params.categoryId)(state)
    }
}

export default compose(withRouter, connect(mapStateToProps))(CollectionPage);