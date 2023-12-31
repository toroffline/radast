/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Dropdown } from 'flowbite-react';
import { useCallback, useMemo, useState } from 'react';

const theme = {
    base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 w-full',
};

function DropdownFilter(props) {
    const { filters, onApply } = props;
    const [_filters, setFilters] = useState([...filters]);

    const getSelectCount = useCallback((filters) => {
        let isSelectAll = false;
        let countDeselect = 0;
        let countSelect = 0;

        for (let f of filters) {
            if (f.value === 'all') {
                if (f.isActive) {
                    isSelectAll = true;
                }
                continue;
            } else if (f.isActive) {
                countSelect += 1;
            } else {
                countDeselect += 1;
            }
        }
        let isDeselectAll = countDeselect === filters.length - 1;
        isSelectAll = isSelectAll || countSelect === filters.length - 1;

        return { isSelectAll, isDeselectAll };
    }, []);

    const dropdownDisplay = useMemo(() => {
        const { isSelectAll } = getSelectCount(filters);
        if (isSelectAll) {
            return filters
                .filter((f) => f.value === 'all')
                .map((f2) => f2.display);
        } else {
            return filters
                .filter((f) => f.isActive)
                .map((f2) => f2.display)
                .join(', ');
        }
    }, [filters]);

    function handlePostSelect() {
        const { isSelectAll, isDeselectAll } = getSelectCount(_filters);
        let temp;
        if (isSelectAll) {
            const result = _filters.map((p) => ({
                ...p,
                isActive: p.value === 'all',
            }));
            temp = result;

            setFilters(result);
        } else {
            const result = _filters.map((p) => ({
                ...p,
                isActive: isDeselectAll
                    ? p.isDefault
                    : p.value === 'all'
                    ? false
                    : p.isActive,
            }));
            temp = result;

            setFilters(result);
        }

        onApply(temp);
    }

    return (
        <Dropdown
            dismissOnClick={true}
            label={dropdownDisplay}
            onBlur={() => setFilters([...filters])}
        >
            <Dropdown.Item as="div" theme={theme}>
                <div className="p-3">
                    <div className="flex flex-row gap-1">
                        {_filters.map((filter, index) => (
                            <Button
                                color={filter.isActive ? undefined : 'light'}
                                onClick={(e) => {
                                    e.stopPropagation();
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
                                const newValue = _filters.map((f) => ({
                                    ...f,
                                    isActive: f.isDefault,
                                }));
                                setFilters(newValue);
                                onApply(newValue);
                            }}
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
            </Dropdown.Item>
        </Dropdown>
    );
}

export default DropdownFilter;
