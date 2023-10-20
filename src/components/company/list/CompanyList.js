import { useEffect, useMemo, useState } from 'react';
import companyService from '../../../services/companyService';
import './CompanyList.css';
import { useNavigate } from 'react-router-dom';

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
            {companyList &&
                companyList.map((company, index) => (
                    <Company
                        {...company}
                        navigateToDetail={navigateToDetail}
                        language={language}
                        key={`company-${index}`}
                    />
                ))}
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
