import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';





// ProductRow
class ProductRow extends React.Component {
    render() {
        let row_style = {};
        let name_style = {};

        if (!this.props.product.stocked) {
            row_style = {border: "1px solid red"};
            name_style = {"color": "red"};
        }

        return (
            <tr style={row_style}>
                <td style={name_style}>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}



// ProductCategoryRow
class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        );
    }
}






// ProductTable
class ProductTable extends React.Component {

    render() {
        var rows = [];
        var lastCategory = null;
        var inStockOnly = this.props.inStockOnly;
        var filterText = this.props.filterText;
        this.props.products.forEach(function(product){
            if(inStockOnly && !product.stocked) {
                return;
            }
            else if(filterText && product.name.indexOf(filterText) === -1) {
                return;
            }
            else {
                if (product.category !== lastCategory) {
                    rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
                }
                rows.push(<ProductRow product={product} key={product.name}/>);
                lastCategory = product.category;
            }
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}


// SearchBar
class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockOnlyInputChange = this.handleInStockOnlyInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockOnlyInputChange(e) {
        this.props.onInStockOnlyInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} style={{"display":"block"}} onChange={this.handleFilterTextInputChange}/>
                <div>
                    <input name="showProductsInStock" type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockOnlyInputChange}/>
                    <label for="showProductsInStock">Only show products in stock</label>
                </div>
            </form>
        );
    }
}




// FilterableProductTable
class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterText: 'ball',
            inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
    }

    handleFilterTextChange(filterText){
        this.setState({
            filterText: filterText
        });
    }

    handleInStockOnlyChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return (
            <div style={{"border": "1px solid orange"}}>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onFilterTextInput={this.handleFilterTextChange} onInStockOnlyInput={this.handleInStockOnlyChange}/>
                <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
            </div>
        );
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


ReactDOM.render(<FilterableProductTable products={PRODUCTS} />, document.getElementById('root'));

