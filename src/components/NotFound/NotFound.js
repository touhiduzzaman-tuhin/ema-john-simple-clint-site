import React from 'react';

const NotFound = () => {
    document.title = 'Not Found';
    return (
        <div className='text-center'>
            <h1 className='text-danger'>Error 404 !!!!!</h1>
            <h3>Sorry, Page Not Found!</h3>
        </div>
    );
};

export default NotFound;