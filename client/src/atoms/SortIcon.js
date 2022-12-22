import React from 'react';

function SortIcon(props) {
    return (
        <div onClick={props.onClick} className={`flex justify-center items-center h-10 w-10 border border-Gray-200 rounded cursor-pointer   ${props.onClick}`}>
            <img src='/images/Sort.png' alt='icon' />
        </div>
    );
}

export default SortIcon;
