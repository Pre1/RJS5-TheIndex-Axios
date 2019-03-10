import React, { Component } from "react";

class BookRow extends Component {
  // state = {
  //   book: [],
  //   loading: true
  // };

  // componentDidMount() {
  //   this.filterBooks();
  // }

  // componentDidUpdate(prevProps) {
  //   if(this.props.allBooks.length !== prevProps.allBooks.length) {
  //     this.filterBooks();
  //   }
  // }

  // filterBooks() {
  //   const bookID = this.props.book;
  //   const book = this.props.allBooks.find(book => {
  //     return book.id === bookID;
  //   });
  //   console.log("ALL DATA:", book, bookID, this.props.allBooks)
  //   this.setState({ book: book, loading: false });
  // }

  // bookInfo = async () => {
  //   const bookID = this.props.book;
  //   return await this.props.allBooks.find(book => {
  //     return book.id === bookID;
  //   });
  // };

  render() {
    const book = this.props.book;

    // console.log("BookRow =>", this.state.book);

    const author = this.props.author;
    const authorsList = book.authors.map(author=> <p>{author.name}</p>)
    // console.log("BookRow: ", book);
    // console.log("BookRow: ", author);

    return (
      <tr>
        <td>{book.title}</td>
        <td>
         {authorsList}
        </td>
        <td>
          <button
            className="btn"
            style={{
              backgroundColor: book.color
            }}
          />
        </td>
      </tr>
    );
  }
}

export default BookRow;
