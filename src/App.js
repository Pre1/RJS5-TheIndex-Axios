import React, { Component } from "react";

// import authors from "./data.js";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

import Loading from "./Loading"
class App extends Component {
  state = {
    currentAuthor: null,
    filteredAuthors: [],
    authors: [],
    loading: true,
  };

  selectAuthor = async author => {

    this.setState({loading: true})

    try {
      const reqURL = `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      const response = await axios.get(reqURL)
      const auth = response.data
      console.log("===selectAuthor => data: ", auth)

      this.setState({
        currentAuthor: auth,
        loading: false,
      })
    
    } catch(e) {
      console.error("something is really broken...")
      console.error(e);
    }
  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };


  componentDidMount = async () => {
    try {
      const response = await axios.get('https://the-index-api.herokuapp.com/api/authors/')
      const auth = response.data
      console.log("===componentDidMount => data: ", auth)

      this.setState({
        authors: auth,
        loading: false,
      })
    
    } catch(e) {
      console.error("something is really broken...")
      console.error(e);
    }

  }

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
            {this.state.loading ? 
              <img src={require('./images/loading.gif')} className='col-6' alt="test"/> : 
            <div className="content col-10">{this.getContentView()}</div>}
        </div>
      </div>
    );
  }
}

export default App;
