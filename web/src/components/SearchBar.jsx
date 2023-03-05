import React, { useEffect } from "react";
import Select from 'react-select'

function SearchBar(props) {
  const [options, setOptions] = React.useState([]);

  function handleChange(e) {
    props.setSupply(e.name);
  }

  useEffect(() => {
    setOptions([
        { "name": "socks", "code": 1 },
        { "name": "cheese", "code": 2 },
        { "name": "shirts", "code": 3 },
        { "name": "soap", "code": 4 },
        { "name": "egg", "code": 5 },
        { "name": "bread", "code": 6 },
        { "name": "cheese", "code": 7 },
        { "name": "water", "code" : 8 },
        { "name": "pants", "code" : 9 },
        { "name": "blanket", "code" : 10 },
        { "name": "soap", "code" : 11 },
        { "name": "toothpaste", "code" : 12 },
        { "name": "jacket", "code" : 13 },
        { "name": "socks", "code" : 14 },
        { "name": "shirt", "code" : 15 },
        { "name": "tomato", "code" : 16 }
    ]);

  }, [])

  const customStyles = {
    option: () => ({
      color: 'black',
      padding: 5
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "60px"
    })
  }

  return (
    <Select
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
