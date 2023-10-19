import { useEffect, useMemo, useState } from 'react'
import companyService from '../../../services/companyService'
import './CompanyList.css'

function CompanyList() {
    const [companyList, setCompanyList] = useState([])
    const [language, setLanguage] = useState('en')

    function changeLanguage() {
        setLanguage(language === 'th' ? 'en' : 'th')
    }

    useEffect(() => {
        async function fetchData() {
            const data = await companyService.getList()
            console.log(data)
            setCompanyList(data)
        }
        fetchData()
    }, [])

    return (
        <div className="content">
            <button onClick={() => changeLanguage()}>change lang</button>
            {companyList &&
                companyList.map((company, index) => (
                    <Company
                        {...company}
                        language={language}
                        key={`company-${index}`}
                    />
                ))}
        </div>
    )
}

function Company(props) {
    const { keywords: _keywords, marketCap, name, fType } = props
    const { language } = props
    const companyName = useMemo(() => {
        return language ? name[language] : name['en']
    }, [name, language])

    const keywords = useMemo(
        () =>
            _keywords && _keywords.length > 0
                ? _keywords.join(', ')
                : undefined,
        [_keywords]
    )

    return (
        <div className="company">
            <div className="company-info">
                <div className="company-name">
                    <img src="./logo192.png" className="company-pic" />
                    <strong>{companyName}</strong>
                    <div>
                        <small>Market Cap: {marketCap}</small>
                    </div>
                </div>
                <div>F Type: {fType}</div>
                <div>
                    <strong>Website:</strong>{' '}
                    <a href="http://www.apexpcl.com" target="_blank">
                        www.apexpcl.com
                    </a>
                </div>
                {keywords ? <div>keywords: {keywords}</div> : <></>}
            </div>
        </div>
    )
}

export default CompanyList
