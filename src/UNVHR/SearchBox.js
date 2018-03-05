import React from 'react';
import ReactDOM from 'react-dom';
import './SearchBox.css';

export class SearchBox extends React.Component {


  render() {
    return (
          <div className="styleBOX">
            <form className="searchbox">
                <input 
                className="searchbox__input typeahead form-control" 
                type="text"
                placeholder="Search a name .. " />
              </form>
          </div>

    )
  }
}
