import React, {Component} from 'react';
import './App.css';
import Currencies from './views/currencies/currencies';
import Card from '@material-ui/core/Card';
import MapContainer from './views/map/map-container';

interface Props {
} 

interface State {
  selected: string;
};


export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: ""
    }
  }

  /**
   *
   */
  public onCurrencyChange(key: string){
    this.setState({
      selected: key
    });
  }
  
  /**
   *
   */
  public render() {
    return (
      <div className="App">
        <h1>
          World Currencies
        </h1>
        <div className="container">
          <Card>
            <Currencies 
              onChange={this.onCurrencyChange.bind(this)} 
              selected={this.state.selected}/>
          </Card> 
          <MapContainer 
            country={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default App;
