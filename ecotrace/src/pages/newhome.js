import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import { Hero, GetReports, MapComponent, EnvironmentalStats} from '../components';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const NewHome = () => {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <div className="bg-white pb-20" >
        <div className="flex flex-wrap mx-auto container"> {/* Flex container for the layout */}
          <div className="w-full lg:w-1/2 p-4"> {/* Adjusts width and padding, Hero and Reports might go here */}
            <Hero />
  
          </div>
          <div className="w-full lg:w-1/2 p-4"> {/* Adjusts width and padding, MapComponent might go here */}
            <MapComponent />
            <EnvironmentalStats />
            
          </div>
          <div className="w-full lg:w-1/2 p-4"> {/* Adjusts width and padding, EnvironmentalStats might go here */}
              
            </div>

        </div>
      </div>
    </LoadScript>
  );
};

export default NewHome;
