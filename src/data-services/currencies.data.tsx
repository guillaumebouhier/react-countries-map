import RequestPromiseNative from 'request-promise-native';

class CurrenciesData {

  constructor(){
    this.fetchCurrencies();
  }

  /**
   * 
   */
   public fetchCurrencies(): Promise<any> {
    const options = {
      uri: 'https://restcountries.eu/rest/v2/all',
    };

    const promise = new Promise(function(resolve, reject){
      RequestPromiseNative(options)
      .then((response) => {
        const currencies = new Map<string, string>();

        response = JSON.parse(response);
        response.forEach((country: any) => {
          if(country.currencies.length < 1){
            return;
          }
          currencies.set(country.name, country.currencies[0]);
        });
        resolve(currencies);
      })
      .catch((err) => {
        reject(err);
      });
    });
    return promise;
  } 
}

export default CurrenciesData;