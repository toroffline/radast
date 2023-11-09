/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState } from 'react';
import { Button, Dropdown, TextInput } from 'flowbite-react';

import CommonUtil from '../../utils/commonUtil';

import './RangeInput.css';

const theme = {
    base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 w-full',
};

function RangeInput(props) {
    const { from, to, onApply } = props;
    const [_from, setFrom] = useState(from);
    const [_to, setTo] = useState(to);

    const dropdownDisplay = useMemo(() => {
        return CommonUtil.isFalsyIncludeZero(from) &&
            CommonUtil.isFalsyIncludeZero(to)
            ? 'Market Cap'
            : `${from && from >= 0 ? from.toLocaleString() : 'from'} - ${
                  to && to >= 0 ? to.toLocaleString() : 'to'
              }`;
    }, [from, to]);

    return (
        <>
            <Dropdown dismissOnClick={true} label={dropdownDisplay}>
                <Dropdown.Item theme={theme} as={'div'}>
                    <div id={`range-input-menu`} className="p-3">
                        <div className="flex items-center">
                            <TextInput
                                type="number"
                                placeholder="From"
                                value={_from || ''}
                                onChange={(e) => setFrom(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                                className="range"
                            />
                            <span className="mx-1"> — </span>
                            <TextInput
                                placeholder="To"
                                value={_to || ''}
                                onChange={(e) => setTo(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
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
                </Dropdown.Item>
            </Dropdown>
        </>
    );
}

export default RangeInput;
