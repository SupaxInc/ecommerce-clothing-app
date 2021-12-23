import { connect } from "react-redux";

import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner";
import CollectionOverview from "./collection-overview";

const mapStateToProps = (state) => {
    return {
        isLoading: !selectIsCollectionsLoaded(state)
    }
};

// New container component that passes the props as well as wraps it with HOC's
// Uses compose, currying all the functions together and evaluates from right to left.
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;

