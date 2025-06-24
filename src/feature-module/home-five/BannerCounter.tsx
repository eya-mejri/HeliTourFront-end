import React from 'react';

interface BannerCounterProps {
    value: number;
    onChange: (count: number) => void;
    min?: number;
    max?: number;
}

const BannerCounter: React.FC<BannerCounterProps> = ({ 
    value, 
    onChange, 
    min = 1, 
    max = 10 
}) => {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = parseInt(inputValue, 10);

        if (inputValue === "") {
            onChange(min); // Reset to min if input is empty
        } else if (!isNaN(numericValue)) {
            if (numericValue >= min && numericValue <= max) {
                onChange(numericValue);
            } else if (numericValue < min) {
                onChange(min);
            } else if (numericValue > max) {
                onChange(max);
            }
        }
    };

    return (
        <div className="custom-increment">
            <div className="input-group">
                <span className="input-group-btn float-start">
                    <button
                        type="button"
                        className="quantity-left-minus btn btn-light btn-number"
                        data-type="minus"
                        onClick={handleDecrement}
                        disabled={value <= min}
                    >
                        <span>
                            <i className="isax isax-minus" />
                        </span>
                    </button>
                </span>
                <input
                    type="text"
                    name="quantity"
                    className="input-number text-center"
                    value={value.toString()}
                    onChange={handleChange}
                />
                <span className="input-group-btn float-end">
                    <button
                        type="button"
                        className="quantity-right-plus btn btn-light btn-number"
                        data-type="plus"
                        onClick={handleIncrement}
                        disabled={value >= max}
                    >
                        <span>
                            <i className="isax isax-add" />
                        </span>
                    </button>
                </span>
            </div>
        </div>
    );
};

export default BannerCounter;