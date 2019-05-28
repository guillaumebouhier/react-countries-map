import RequestPromiseNative from 'request-promise-native';

interface LatLong {
  lat: number, 
  long: number
}

class GeocodingData {
    public fetchLatLong(country: string): Promise<any> {
    const options = {
      uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+country+'&key='+process.env.REACT_APP_API_KEY_GEO,
    };

    const promise = new Promise(function(resolve, reject){
      RequestPromiseNative(options)
      .then((response) => {
        const latlong: LatLong = {
          lat: 0, 
          long: 0
        }

        response = JSON.parse(response);

        if(response.results.length > 0){
          const location = response.results[0].geometry.location;
          latlong.lat = location.lat;
          latlong.long = location.lng;
          resolve(latlong);
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
    return promise;
  }
}

export default GeocodingData;