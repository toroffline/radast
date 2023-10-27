import { useEffect, useState } from 'react';
import companyService from '../../../services/companyService';
import { useNavigate } from 'react-router-dom';
import { Card, Table, TextInput } from 'flowbite-react';
import {
    FiArrowDown,
    FiArrowUp,
    FiExternalLink,
    FiEye,
    FiSearch,
} from 'react-icons/fi';

import './CompanyList.css';
import ButtonIcon from '../../buttonIcon/ButtonIcon';
import Loading from '../../loading/Loading';
const defaultSorting = {
    isActive: false,
    sortDirection: 'desc',
};

function CompanyList() {
    const navigate = useNavigate();
    const [companyList, setCompanyList] = useState([]);
    const [sorting, setSorting] = useState({
        companyName: {
            display: 'Company Name',
            isActive: true,
            sortDirection: 'asc',
        },
        marketCap: {
            display: 'Market Cap',
            isActive: false,
            sortDirection: 'asc',
        },
    });
    const [searchKeyword, setSearchKeyword] = useState();
    const [isProcessing, setIsProcessing] = useState(true);

    function onClickSorting(field) {
        const tempSorting = { ...sorting };
        Object.keys(tempSorting).forEach((sortField) => {
            if (sortField === field) {
                if (tempSorting[field].isActive) {
                    tempSorting[field].sortDirection =
                        tempSorting[field].sortDirection === 'asc'
                            ? 'desc'
                            : 'asc';
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
        setSorting(tempSorting);
    }

    async function search(searchKeyword) {
        setIsProcessing(true);
        await companyService
            .search(searchKeyword)
            .then((data) => setCompanyList(data))
            .finally(() => setIsProcessing(false));
    }

    function navigateToDetail(companyId) {
        navigate(`/company/detail/${companyId}`);
    }

    useEffect(() => {
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
        const sortField = Object.keys(sorting).find(
            (key) => sorting[key].isActive
        );
        setIsProcessing(true);
        async function fetch() {
            await companyService
                .sort(sortField, sorting[sortField].sortDirection)
                .then((data) => setCompanyList(data))
                .finally(() => setIsProcessing(false));
        }
        fetch();
    }, [sorting]);

    return (
        <>
            <Card>
                <div>
                    <TextInput
                        className="company-input-search"
                        icon={FiSearch}
                        placeholder="Search by name or relavant keyword"
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                search(searchKeyword);
                            }
                        }}
                    />
                </div>
                <div className="content">
                    {companyList && companyList.length > 0 ? (
                        <Table hoverable>
                            <Table.Head>
                                <TableHeaderSortable
                                    {...sorting.companyName}
                                    onClickSorting={() =>
                                        onClickSorting('companyName')
                                    }
                                />
                                <Table.HeadCell className="text-center">
                                    F Type
                                </Table.HeadCell>
                                <TableHeaderSortable
                                    {...sorting.marketCap}
                                    onClickSorting={() =>
                                        onClickSorting('marketCap')
                                    }
                                    className="justify-end"
                                />
                                <Table.HeadCell>Actions</Table.HeadCell>
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
                                            <Table.Cell>
                                                <div className="flex">
                                                    <img
                                                        src="/favicon.ico"
                                                        className="company-logo"
                                                        alt="company logo"
                                                    />
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
                                            <Table.Cell>
                                                <div className="flex gap-1">
                                                    <ButtonIcon
                                                        icon={<FiEye />}
                                                        onClick={() =>
                                                            navigateToDetail(
                                                                company.id
                                                            )
                                                        }
                                                    />
                                                    <ButtonIcon
                                                        icon={
                                                            <FiExternalLink />
                                                        }
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(
                                                                company.url
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    ) : (
                        <>
                            {!isProcessing && (
                                <div className="no-data">There is no data</div>
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
    const { display, sortDirection, isActive, className, onClickSorting } =
        props;

    return (
        <Table.HeadCell
            className={`flex hover:underline ${className || ''}`}
            onClick={() => onClickSorting()}
        >
            {display}
            <span className={`table-header-icon ${isActive ? 'active' : ''}`}>
                {sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </span>
        </Table.HeadCell>
    );
}

export default CompanyList;
