import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Footer from './components/Footer';
import './App.css';

let data = [];

let deuspiCategories = ["MUSIC", "RAP", "SKATE"];

function parseData(appData) {
  JSON.parse(appData).forEach(element => {
    new Promise((resolve, reject) => {
      resolve();
    }).then(() => {
      getCategories(data, element);
    }).then(() => {
      parseItemsByCategory(data, element);        
    }).catch(() => {

    }).finally(() => {

    });
  })

  console.log("DATA: ", data);
}

function getCategories(_data, item) {
  deuspiCategories.forEach(category => {
    if (item.category === category) {
      if (item.category !== Object.keys(_data)) {
        _data[item.category.toLowerCase()] = [];
      }  
    }
  })
}

function parseItemsByCategory(_data, item) {
  Object.keys(_data).forEach(category => {
    if (item.category.toLowerCase() === category) {
      _data[category].push(item);
    }
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };

    this.videoPlayerRef = React.createRef();
  }

  componentDidMount() {
    parseData(this.props.appData);
  }

  componentWillUnmount() {
    
  }

  render() {

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/">
            <div className="App">
              <div className="app-container w-50">
                <div className="row">
                  <div className="col-lg">
                    <VideoPlayer data={data} ref={this.videoPlayerRef} />
                    {/* <button onClick={() => this.videoPlayerRef.current.onUpdateVideo()}>RANDOM</button> */}
                    <Footer />
                  </div>
                </div>
              </div>    
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;