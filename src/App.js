import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import withFirebaseAuth from 'react-with-firebase-auth'
import logo from './logo.svg';
import 'firebase/auth';
import firebaseConfig from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
      <div>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          user
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }

        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
    </div>
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Book</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
