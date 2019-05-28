import React from 'react';
import CurrenciesData from '../../data-services/currencies.data';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import './currencies.css';

interface Currency {
  name: string, 
  code: string
}

interface Props {
  classes: any, 
  onChange: any,
  selected: string
} 

interface State {
  countries: Map<string, Currency>
};

const styles = {
  listItemPrimary: {
    color: 'white',
  },
  listItemSecondary: {
    color: '#d4d4d4',
  },
};

class Currencies extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      countries: new Map<string, Currency>()
    };

    // fetch data
    // ----------
    const curr = new CurrenciesData();
    curr.fetchCurrencies().then((data)=> {
      this.setState({countries: data});
    });
  }

  /**
   * 
   */
  public generate() {
    const result = new Array<any>();
    this.state.countries.forEach((currency: Currency, key: string) =>
      result.push(
        <ListItem 
          className="list-item"
          onClick = {(e) => {    
            e.preventDefault();
            this.props.onChange(key);
          }}
          selected = {this.props.selected === key}
          key={key}>

          <ListItemText
            primary = {`${key}: `}
            secondary = {`${currency.name} (${currency.code})`}
            classes = {{
              primary: this.props.classes.listItemPrimary,
              secondary: this.props.classes.listItemSecondary,
            }}
            
          />
        </ListItem>
      )
    );
    return result;
  }
  
  /**
   *
   */
  render(){
    return (
      <div>
        <List className="list">
          {this.generate()}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Currencies);