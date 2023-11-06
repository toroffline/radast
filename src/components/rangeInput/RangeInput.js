/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Dropdown, TextInput } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import './RangeInput.css';
import CommonUtil from '../../utils/commonUtil';

function RangeInput(props) {
    const { from, to, onApply } = props;
    const [_from, setFrom] = useState();
    const [_to, setTo] = useState();

    function handleInput(value, setFn) {
        if (/^[0-9]*$/.test(value)) {
            setFn((prev) => (prev ?? '') + value);
        } else if (value === 'Backspace') {
            setFn((prev) => prev.toString().slice(0, -1));
        }
    }

    const dropdownDisplay = useMemo(() => {
        return CommonUtil.isFalsyIncludeZero(from) &&
            CommonUtil.isFalsyIncludeZero(to)
            ? 'Market Cap'
            : `${from && from >= 0 ? from.toLocaleString() : 'from'} - ${
                  to && to >= 0 ? to.toLocaleString() : 'to'
              }`;
    }, [from, to]);

    useEffect(() => setFrom(from || ''), [from]);
    useEffect(() => setTo(to || ''), [to]);

    return (
        <>
            <Dropdown dismissOnClick={true} label={dropdownDisplay}>
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
                                setFrom(0);
                                setTo(0);
                                onApply(0, 0);
                            }}
                        >
                            Clear
                        </a>
                        <Button
                            onClick={() => {
                                onApply(+_from, +_to);
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
