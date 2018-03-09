import {connect} from 'react-redux';
import {setVisibilityFilter} from "../actions/index";
import Link from '../components/ToDoList/Link';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};

/**
 * получает текущий фильтр видимости и рендерит Link.
 */
const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink;