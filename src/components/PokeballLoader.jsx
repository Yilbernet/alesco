import React from 'react';
import { Image} from 'semantic-ui-react';

const PokeballLoader = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
             <Image src='./Fondos/LoaderP.gif'size='small' centered  style={{ padding: "0.1rem", marginTop:"-1.5rem", }}/> 
    </div>
  );
};

export default PokeballLoader;
