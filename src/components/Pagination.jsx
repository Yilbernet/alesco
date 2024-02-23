import React from 'react';
import { Button,Image } from 'semantic-ui-react';

const Pagination = ({ num, setPage }) => {
    return (
        <Button animated onClick={() => setPage(num)}>
            <Button.Content visible>{num}</Button.Content>
            <Button.Content hidden>{num}
            <Image src='./pikachu2.png' style={{ marginTop: '-10px' }}  /> 
            </Button.Content>
        </Button>
    );
};

export default Pagination;
