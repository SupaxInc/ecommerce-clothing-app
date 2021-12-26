import { connect } from "react-redux";
import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";

import WithSpinner from "../../components/with-spinner/with-spinner";
import CollectionPage from "../collection/collection";

const mapStateToProps = (state) => {
    return {
        isLoading: !selectIsCollectionsLoaded(state)
    }
}

const CollectionPageContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
