import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

// ----------------- Style -----------------

const UlItemList = styled.ul`
    margin-top: 20px;

    li {
        cursor: pointer;
    }
`

// ----------------- App -----------------

export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false
    };
    
    static defaultProps = {
        onItemSelected: () => {}
    }
    static PropTypes = {
        onItemSelected: PropTypes.func
    }

    componentDidMount() {
        const {getData, maxPage, minPage} = this.props;
        const page = Math.floor(Math.random() * maxPage + minPage);

        getData(page)
            .then(itemList => this.setState({itemList}))
            .catch(err => this.setState({
                itemList : null,
                error: true
            }));
    }

    renderItem = (arr) => {
        return arr.map(info => {
            const {id} = info
            const label = this.props.renderItem(info);
            return (
                <li 
                    key={id} 
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >{label}
                </li>
            );
        })
    }

    render() {
        const {itemList, error} = this.state;

        const content = error ? <ErrorMessage/> : 
                        !itemList ? <Spinner/> : this.renderItem(itemList) ;

        return (
            <UlItemList className="list-group">
                {content}
            </UlItemList>
        );
    }
}