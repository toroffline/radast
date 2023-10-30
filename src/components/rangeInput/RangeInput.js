import { Dropdown, TextInput } from 'flowbite-react';
import { useState } from 'react';

function RangeInput() {
    const [min, setMin] = useState();

    return (
        <>
            <Dropdown dismissOnClick={false} label="Market Cap">
                <Dropdown.Item>
                    <div className="flex">
                        <TextInput
                            type="number"
                            placeholder="From"
                            value={min}
                            onKeyUp={(e) => {
                                console.log(e.key);
                            }}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setMin(e.target.value);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                        <span>-</span>
                        <TextInput
                            type="number"
                            placeholder="To"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    </div>
                </Dropdown.Item>
            </Dropdown>
        </>
    );
}

export default RangeInput;
