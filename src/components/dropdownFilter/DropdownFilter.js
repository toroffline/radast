/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Dropdown } from 'flowbite-react';
import { useState } from 'react';

function DropdownFilter(props) {
    const { filters, onApply } = props;
    const [_filters, setFilters] = useState([...filters]);

    function isSelectAll(filters) {
        return (
            filters.some((f) => f.value === 'all' && f.isActive) ||
            filters.filter((f) => f.value !== 'all').every((f2) => f2.isActive)
        );
    }

    function handlePostSelect() {
        if (isSelectAll(_filters)) {
            setFilters((prev) =>
                prev.map((p) => ({ ...p, isActive: p.value === 'all' }))
            );
        } else {
            setFilters((prev) =>
                prev.map((p) => ({
                    ...p,
                    isActive: p.value === 'all' ? false : p.isActive,
                }))
            );
        }
        onApply(_filters);
    }

    return (
        <Dropdown
            dismissOnClick={true}
            label="F Type"
            onBlur={() => setFilters([...filters])}
        >
            <div className="p-3">
                <div className="flex flex-row gap-1">
                    {_filters.map((filter, index) => (
                        <Button
                            color={filter.isActive ? undefined : 'light'}
                            onClick={() => {
                                setFilters((prev) =>
                                    prev.map((p, i) => ({
                                        ...p,
                                        isActive:
                                            p.value === 'all' && p.isActive
                                                ? false
                                                : index === i
                                                ? !p.isActive
                                                : p.isActive,
                                    }))
                                );
                            }}
                            key={`dropdown-filter-${index}`}
                        >
                            {filter.display}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                    <a
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            setFilters((prev) =>
                                prev.map((p) => ({
                                    ...p,
                                    isActive: p.value === 'all',
                                }))
                            );
                            onApply(_filters);
                        }}
                        className="hover:underline cursor-pointer text-cyan-800"
                    >
                        Clear
                    </a>
                    <Button
                        onClick={() => {
                            handlePostSelect();
                        }}
                        className="apply"
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </Dropdown>
    );
}

export default DropdownFilter;
