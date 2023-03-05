import React, { useEffect } from "react";
import Select from 'react-select'

function SearchBar(props) {
    const [options, setOptions] = React.useState([]);

    function handleChange(e) {
        props.setSupply(e.name);
    }

    useEffect(() => {
        setOptions([{ "name": "socks", "code": 1 }, { "name": "chesse", "code": 2},
                    { "name": "shirts", "code": 3 }, { "name": "soap", "code": 4}]);

    }, [])

    const customStyles = {
        option: () => ({
            color: 'black',
            padding: 5
        })
    }

    return (
        <Select
            className="mb-6"
            placeholder="Choose supply"
            onChange={handleChange}
            getOptionLabel={option => {
                return option.name;
            }}
            getOptionValue={option => {
                return option.code;
            }}
            options={options}
            styles={customStyles}
        />
    )
}

export default SearchBar;