import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import companyService from '../../../services/companyService';
import CommonUtil from '../../../utils/commonUtil';
import './CompanyDetail.css';

function CompanyDetail() {
    const params = useParams();
    const [companyId, setCompanyId] = useState();
    const [companyDetail, setCompanyDetail] = useState();

    useEffect(() => {
        async function getCompanyDetail(companyId) {
            const companyDetail = await companyService.getDetail(companyId);

            setCompanyDetail({
                ...companyDetail,
            });
        }

        const companyId = +params['companyId'];
        if (CommonUtil.isFalsyExceptZero(companyId)) {
            setCompanyId(companyId);
            getCompanyDetail(companyId);
        }
    }, [params]);

    return (
        <>
            {companyDetail ? (
                <div className="company-detail">
                    <h4>General Information</h4>
                    <div className="table">
                        <div className="cell cell-header">Full Name</div>
                        <div className="cell">{companyDetail.fullName}</div>

                        <div className="cell cell-header">Alias Name</div>
                        <div className="cell">{companyDetail.alias || '-'}</div>

                        <div className="cell cell-header">Keywords</div>
                        <div className="cell">
                            {companyDetail.keywordDisplay || '-'}
                        </div>

                        <div className="cell cell-header">Market Cap</div>
                        <div className="cell">
                            {companyDetail.marketCapDisplay}
                        </div>

                        <div className="cell cell-header">
                            Company Name (TH)
                        </div>
                        <div className="cell">{companyDetail.name.th}</div>

                        <div className="cell cell-header">
                            Company Name (EN)
                        </div>
                        <div className="cell">{companyDetail.name.en}</div>

                        <div className="cell cell-header">Website</div>
                        <div className="cell">
                            <a
                                href={companyDetail.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {companyDetail.url}
                            </a>
                        </div>

                        <div className="cell cell-header">fType</div>
                        <div className="cell">{companyDetail.fType}</div>

                        <div className="cell cell-header">
                            Business Type(TH)
                        </div>
                        <div className="cell">
                            {companyDetail.businessType.th}
                        </div>

                        <div className="cell cell-header">
                            Business Type(EN)
                        </div>
                        <div className="cell">
                            {companyDetail.businessType.en}
                        </div>
                    </div>
                </div>
            ) : (
                <>downloading...</>
            )}
        </>
    );
}

export default CompanyDetail;
