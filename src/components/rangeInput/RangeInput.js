/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Dropdown, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import './RangeInput.css';

function RangeInput(props) {
    const { from, to, onApply } = props;
    const [_from, setFrom] = useState();
    const [_to, setTo] = useState();

    function handleInput(value, setFn) {
        if (/^[0-9]*$/.test(value)) {
            setFn((prev) => (prev ?? '') + value);
        } else if (value === 'Backspace') {
            setFn((prev) => prev.slice(0, -1));
        }
    }

    useEffect(() => setFrom(from || ''), [from]);
    useEffect(() => setTo(to || ''), [to]);

    return (
        <>
            <Dropdown dismissOnClick={true} label="Market Cap">
                <div id={`range-input-menu`} className="p-3">
                    <div className="flex items-center">
                        <TextInput
                            placeholder="From"
                            defaultValue={_from || ''}
                            onKeyUp={(e) => handleInput(e.key, setFrom)}
                            className="range"
                        />
                        <span className="mx-1"> — </span>
                        <TextInput
                            placeholder="To"
                            defaultValue={_to || ''}
                            onKeyUp={(e) => handleInput(e.key, setTo)}
                            className="range"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                onApply(0, 0);
                            }}
                            className="hover:underline cursor-pointer text-cyan-800"
                        >
                            Clear
                        </a>
                        <Button
                            onClick={() => {
                                onApply(_from, _to);
                            }}
                            className="apply"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </Dropdown>
        </>
    );
}

export default RangeInput;
