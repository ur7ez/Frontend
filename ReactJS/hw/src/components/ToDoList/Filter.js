import React from "react";
import {VisibilityFilters} from "../../actions/index";
import FilterLink from '../../containers/FilterLink'

/**
 * область, где мы позволим пользователю менять текущую видимость todos.
 */
const Filter = () => (
    <p>
        Filter:
        {" "}
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All
        </FilterLink>
        {", "}
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterLink>
        {", "}
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterLink>
    </p>
);

export default Filter;