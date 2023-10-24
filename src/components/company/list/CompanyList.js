import { useEffect, useMemo, useState } from 'react';
import companyService from '../../../services/companyService';
import './CompanyList.css';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react';

function CompanyList() {
    const [companyList, setCompanyList] = useState([]);
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    function changeLanguage() {
        setLanguage(language === 'th' ? 'en' : 'th');
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
            {/* {companyList &&
                companyList.map((company, index) => (
                    <Company
                        {...company}
                        navigateToDetail={navigateToDetail}
                        language={language}
                        key={`company-${index}`}
                    />
                ))} */}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Company Name</Table.HeadCell>
                    <Table.HeadCell className="text-center">
                        F Type
                    </Table.HeadCell>
                    <Table.HeadCell className="text-right">
                        Market Cap
                    </Table.HeadCell>
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
                                <Link href={company.url} target="_blank">
                                    {company.url}
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}

function Company(props) {
    const {
        keywordDisplay,
        marketCapDisplay,
        name,
        fType,
        id,
        url,
        navigateToDetail,
    } = props;
    const { language } = props;
    const companyName = useMemo(() => {
        return language ? name[language] : name['en'];
    }, [name, language]);

    return (
        <div className="company" onClick={() => navigateToDetail(id)}>
            <div className="company-info">
                <div className="company-name">
                    <img src="./logo192.png" className="company-pic" />
                    <strong>{companyName}</strong>
                    <div>
                        <small>Market Cap: {marketCapDisplay}</small>
                    </div>
                </div>
                <div>F Type: {fType}</div>
                <div>
                    <strong>Website:</strong>{' '}
                    <a href={url} target="_blank">
                        {url}
                    </a>
                </div>
                {keywordDisplay ? <div>keywords: {keywordDisplay}</div> : <></>}
            </div>
        </div>
    );
}

export default CompanyList;
