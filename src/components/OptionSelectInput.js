import React from "react";
import PropTypes from 'prop-types';

export const OptionSelectInput = ({name, value, options, handleChange}) => (
    <div>
        <label htmlFor={name}>{name}: </label>
        <select name={name} value={value}
                onChange={handleChange}
                required>
            <option key={0} value={0} className={'defaultOption'}>None</option>
            {
                options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))
            }
        </select>
    </div>
);

OptionSelectInput.displayName = 'OptionSelectInput';

OptionSelectInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    options: PropTypes.array,
    handleChange: PropTypes.func
};