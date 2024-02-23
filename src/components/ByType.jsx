import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Dropdown } from 'semantic-ui-react'; 

const ByType = ({ getByType }) => {
    const [types, setTypes] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data));
    }, []);

    
    const options = types.results?.map((type) => ({
        key: type.url,
        text: type.name,
        value: type.url,
    }));

    return (
        <div>
            
            {/* <Dropdown
                placeholder="Select Type"
                // fluid
                // selection
                options={options}
                onChange={(e, data) => getByType(data.value)}
            /> */}
        </div>
    );
};

export default ByType;