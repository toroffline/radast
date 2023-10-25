import { useEffect, useState } from 'react';
import companyService from '../../../services/companyService';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Table, TextInput } from 'flowbite-react';
import {
    FiExternalLink,
    FiEye,
    FiSearch,
    FiTrendingDown,
    FiTrendingUp,
} from 'react-icons/fi';

import './CompanyList.css';
import ButtonIcon from '../../buttonIcon/ButtonIcon';
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

    function navigateToDetail(companyId) {
        navigate(`/company/detail/${companyId}`);
    }

    useEffect(() => {
        async function fetchData() {
            const data = await companyService.getList();
            console.log(data);
            setCompanyList(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <Card>
                <div>
                    <TextInput
                        className="company-input-search"
                        icon={FiSearch}
                        placeholder="Company name, Alias name"
                    />
                </div>

                <Table hoverable>
                    <Table.Head>
                        <TableHeaderSortable
                            {...sorting.companyName}
                            onClickSorting={() => onClickSorting('companyName')}
                        />
                        <Table.HeadCell className="text-center">
                            F Type
                        </Table.HeadCell>
                        <TableHeaderSortable
                            {...sorting.marketCap}
                            onClickSorting={() => onClickSorting('marketCap')}
                            className="text-right"
                        />
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {companyList.map((company, index) => (
                            <Table.Row
                                className="bg-white"
                                key={`company-list-${index}`}
                                onClick={() => navigateToDetail(company.id)}
                            >
                                <Table.Cell>
                                    <div className="flex">
                                        <img
                                            src="/favicon.ico"
                                            className="company-logo"
                                            alt="company logo"
                                        />
                                        <div>
                                            <h3>{company.aliasName}</h3>
                                            <small>{company.name['en']}</small>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-center">
                                    {company.fType}
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    {company.marketCapDisplay}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-1">
                                        <ButtonIcon
                                            icon={<FiEye />}
                                            onClick={() =>
                                                navigateToDetail(company.id)
                                            }
                                        />
                                        <ButtonIcon
                                            icon={<FiExternalLink />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(company.url);
                                            }}
                                        />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
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
            <span
                className={`table-header-icon ml-auto ${
                    isActive ? 'active' : ''
                }`}
            >
                {sortDirection === 'asc' ? (
                    <FiTrendingUp />
                ) : (
                    <FiTrendingDown />
                )}
            </span>
        </Table.HeadCell>
    );
}

export default CompanyList;
