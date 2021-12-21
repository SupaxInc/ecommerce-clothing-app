import React from "react";
import CollectionItem from "../../components/collection-item/collection-item";
import withRouter from "../../components/withRouter/withRouter";

import { connect } from "react-redux";
import { compose } from "redux";
import { selectShopCollectionsId } from "../../redux/shop/shop.selector";

import './collection.scss';

const CollectionPage = ({params, collection}) => {
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => {
                        return <CollectionItem key={item.id} item={item} />
                    })
                }
            </div>
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