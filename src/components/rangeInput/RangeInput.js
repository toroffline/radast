import { Button, Dropdown, TextInput } from 'flowbite-react';
import { useRef } from 'react';
import './RangeInput.css';

function RangeInput(props) {
    const { from, to, setFrom, setTo, onApply } = props;
    const fromInputRef = useRef();
    const toInputRef = useRef();

    return (
        <>
            <Dropdown dismissOnClick={true} label="Market Cap">
                <div id={`range-input-menu`} className="p-3">
                    <div className="flex items-center">
                        <TextInput
                            placeholder="From"
                            ref={fromInputRef}
                            defaultValue={from ?? ''}
                            onKeyUp={(e) => {
                                console.log(e.key);
                                if (/^[0-9]*$/.test(e.key)) {
                                    setFrom((prev) => (prev ?? '') + e.key);
                                } else if (e.key === 'Backspace') {
                                    setFrom((prev) => prev.slice(0, -1));
                                } else if (e.key === 'Enter') {
                                    toInputRef.current &&
                                        toInputRef.current.focus();
                                }
                            }}
                            className="range"
                        />
                        <span className="mx-1"> — </span>
                        <TextInput
                            placeholder="To"
                            ref={toInputRef}
                            defaultValue={to ?? ''}
                            onKeyUp={(e) => {
                                if (/^[0-9]*$/.test(e.key)) {
                                    setTo((prev) => prev + e.key);
                                } else if (e.key === 'Backspace') {
                                    setTo((prev) => prev.slice(0, -1));
                                } else if (e.key === 'Enter') {
                                }
                            }}
                            className="range"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            className="hover:underline cursor-pointer text-cyan-800"
                        >
                            Clear
                        </a>
                        <Button onClick={() => onApply()} className="apply">
                            Apply
                        </Button>
                    </div>
                </div>
            </Dropdown>
        </>
    );
}

export default RangeInput;
