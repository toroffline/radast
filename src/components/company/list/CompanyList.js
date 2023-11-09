import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Table, TextInput } from 'flowbite-react';
import {
    FiAlertCircle,
    FiArrowDown,
    FiArrowUp,
    FiSearch,
} from 'react-icons/fi';

import { useAppContext } from '../../../context/appContext';
import companyService from '../../../services/companyService';

import Loading from '../../loading/Loading';
import RangeInput from '../../rangeInput/RangeInput';
import DropdownFilter from '../../dropdownFilter/DropdownFilter';

import './CompanyList.css';
import CommonUtil from '../../../utils/commonUtil';

const defaultSorting = {
    isActive: false,
    direction: 'desc',
};

const defaultCompanyLogoSrc = CommonUtil.defaultCompanyLogoSrc;

function CompanyList() {
    const navigate = useNavigate();
    const { isMobile, setDisplayBackBtn } = useAppContext();
    const [companyList, setCompanyList] = useState([]);
    const [filter, setFilter] = useState({
        sort: {
            companyName: {
                display: 'Company Name',
                isActive: true,
                direction: 'desc',
            },
            marketCap: {
                display: 'Market Cap',
                isActive: false,
                direction: 'asc',
            },
        },
        marketCap: {
            from: null,
            to: null,
        },
        search: '',
        fType: [
            {
                display: 'All',
                value: 'all',
                isActive: false,
            },
            {
                display: 'Type S',
                value: 'S',
                isActive: true,
                isDefault: true,
            },
            {
                display: 'Type A',
                value: 'A',
                isActive: false,
            },
        ],
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isProcessing, setIsProcessing] = useState(true);

    function onClickSorting(field) {
        const tempSorting = { ...filter.sort };
        Object.keys(tempSorting).forEach((sortField) => {
            if (sortField === field) {
                if (tempSorting[field].isActive) {
                    tempSorting[field].direction =
                        tempSorting[field].direction === 'asc' ? 'desc' : 'asc';
                } else {
                    tempSorting[field].isActive = true;
                }
            } else {
                tempSorting[sortField] = {
                    ...tempSorting[sortField],
                    ...defaultSorting,
                };
            }
        });
        setFilter((prev) => ({ ...prev, sort: tempSorting }));
    }

    function navigateToDetail(companyId) {
        navigate(`/company/detail/${companyId}`);
    }

    useEffect(() => {
        setDisplayBackBtn(false);
        setIsProcessing(true);

        async function fetch() {
            await companyService
                .getList()
                .then((data) => setCompanyList(data))
                .finally(() => setIsProcessing(false));
        }

        fetch();
    }, []);

    useEffect(() => {
        setIsProcessing(true);
        async function fetch() {
            let _sort = { field: undefined, direction: undefined };
            for (let s of Object.keys(filter.sort)) {
                if (filter.sort[s].isActive) {
                    _sort.field = s;
                    _sort.direction = filter.sort[s].direction;
                    break;
                }
            }

            let _fType = [];
            let isSelectAllFType = false;
            for (let f of filter.fType) {
                if (f.value === 'all') {
                    isSelectAllFType = f.isActive;
                }
                if (f.isActive || isSelectAllFType) {
                    _fType.push(f.value);
                }
            }
            const _filter = {
                ...filter,
                sort: _sort,
                fType: _fType,
            };

            await companyService
                .search(_filter)
                .then((data) => setCompanyList(data))
                .finally(() => setIsProcessing(false));
        }
        fetch();
    }, [filter]);

    return (
        <>
            <Card className="overflow-scroll sm:overflow-auto">
                <div className="main-filter">
                    <TextInput
                        icon={FiSearch}
                        value={searchKeyword ?? ''}
                        placeholder="Search by name or relavant keyword"
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                setFilter((prev) => ({
                                    ...prev,
                                    search: searchKeyword,
                                }));
                            }
                        }}
                        className="company-input-search"
                    />
                    <div className="sub-filter">
                        <DropdownFilter
                            filters={filter.fType}
                            onApply={(values) => {
                                setFilter((prev) => ({
                                    ...prev,
                                    fType: values,
                                }));
                            }}
                        />
                        <RangeInput
                            from={filter.marketCap.from}
                            to={filter.marketCap.to}
                            onApply={(from, to) => {
                                setFilter((prev) => ({
                                    ...prev,
                                    marketCap: {
                                        from,
                                        to,
                                    },
                                }));
                            }}
                        />
                    </div>
                </div>
                <div
                    className={`content ${
                        !companyList || companyList.length === 0
                            ? 'processing'
                            : ''
                    }`}
                >
                    {companyList && companyList.length > 0 ? (
                        <Table hoverable>
                            <Table.Head>
                                {isMobile && <Table.HeadCell></Table.HeadCell>}
                                <TableHeaderSortable
                                    {...filter.sort.companyName}
                                    onClickSorting={() =>
                                        onClickSorting('companyName')
                                    }
                                />
                                <Table.HeadCell className="text-center">
                                    F Type
                                </Table.HeadCell>
                                <TableHeaderSortable
                                    {...filter.sort.marketCap}
                                    onClickSorting={() =>
                                        onClickSorting('marketCap')
                                    }
                                    className="justify-end"
                                />
                                {!isMobile && (
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                )}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {companyList.length > 0 &&
                                    companyList.map((company, index) => (
                                        <Table.Row
                                            className="bg-white"
                                            key={`company-list-${index}`}
                                            onClick={() =>
                                                navigateToDetail(company.id)
                                            }
                                        >
                                            {isMobile && (
                                                <Table.Cell className="whitespace-nowrap px-4">
                                                    <div className="flex flex-col text-center">
                                                        <img
                                                            src={
                                                                defaultCompanyLogoSrc
                                                            }
                                                            className="company-logo"
                                                            alt="company logo"
                                                        />
                                                        <small>
                                                            <Link
                                                                to={`/company/detail/${company.id}`}
                                                            >
                                                                See info
                                                            </Link>
                                                        </small>
                                                        <small>
                                                            <Link
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    window.open(
                                                                        company.url
                                                                    );
                                                                }}
                                                            >
                                                                Visit site
                                                            </Link>
                                                        </small>
                                                    </div>
                                                </Table.Cell>
                                            )}
                                            <Table.Cell>
                                                <div className="flex">
                                                    {!isMobile && (
                                                        <img
                                                            src={
                                                                defaultCompanyLogoSrc
                                                            }
                                                            className="company-logo"
                                                            alt="company logo"
                                                        />
                                                    )}
                                                    <div>
                                                        <h3>
                                                            {company.aliasName}
                                                        </h3>
                                                        <small>
                                                            {company.name['en']}
                                                        </small>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                {company.fType}
                                            </Table.Cell>
                                            <Table.Cell className="text-right">
                                                {company.marketCapDisplay ||
                                                    'NA'}
                                            </Table.Cell>
                                            {!isMobile && (
                                                <Table.Cell>
                                                    <div className="flex gap-1">
                                                        <Link
                                                            to={`/company/detail/${company.id}`}
                                                        >
                                                            See info
                                                        </Link>
                                                        {' | '}
                                                        <Link
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.open(
                                                                    company.url
                                                                );
                                                            }}
                                                        >
                                                            Visit site
                                                        </Link>
                                                    </div>
                                                </Table.Cell>
                                            )}
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    ) : (
                        <>
                            {!isProcessing && (
                                <div className="no-data">
                                    <FiAlertCircle className="icon" />
                                    <h3 className="mb-0">No data found</h3>
                                    <small>
                                        Check your spelling or try other
                                        keywords
                                    </small>
                                </div>
                            )}
                        </>
                    )}

                    {isProcessing && <Loading />}
                </div>
            </Card>
        </>
    );
}

function TableHeaderSortable(props) {
    const { display, direction, isActive, className, onClickSorting } = props;

    return (
        <Table.HeadCell
            className={`flex hover:underline ${className || ''}`}
            onClick={() => onClickSorting()}
        >
            {display}
            <span className={`table-header-icon ${isActive ? 'active' : ''}`}>
                {direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </span>
        </Table.HeadCell>
    );
}

export default CompanyList;
