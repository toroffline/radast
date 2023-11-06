import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Tooltip } from 'flowbite-react';
import { FiExternalLink } from 'react-icons/fi';

import companyService from '../../../services/companyService';
import CommonUtil from '../../../utils/commonUtil';
import Loading from '../../loading/Loading';
import { useAppContext } from '../../../context/appContext';
import './CompanyDetail.css';

function CompanyDetail() {
    const params = useParams();
    const { setHeader, setLatestDisplayBreadcrumb } = useAppContext();
    const [companyId, setCompanyId] = useState();
    const [companyDetail, setCompanyDetail] = useState();

    useEffect(() => {
        async function getCompanyDetail(companyId) {
            const companyDetail = await companyService.getDetail(companyId);
            setHeader(companyDetail.fullName);
            setLatestDisplayBreadcrumb(companyDetail.fullName);
            setCompanyDetail({
                ...companyDetail,
            });
        }

        const companyId = +params['companyId'];
        if (CommonUtil.isNotFalsyExceptZero(companyId)) {
            setCompanyId(companyId);
            getCompanyDetail(companyId);
        }
    }, [params]);

    return (
        <>
            <Card>
                <div className="company-detail">
                    {companyDetail ? (
                        <>
                            <div className="flex">
                                <Tooltip content="Company Logo">
                                    <img
                                        className="company-logo"
                                        src="/favicon.ico"
                                        alt="company logo"
                                    />
                                </Tooltip>
                                <h2>General Information</h2>
                            </div>

                            <div className="table">
                                <div className="cell cell-header">
                                    Full Name
                                </div>
                                <div className="cell">
                                    {companyDetail.fullName}
                                </div>

                                <div className="cell cell-header">
                                    Alias Name
                                </div>
                                <div className="cell">
                                    {companyDetail.aliasName || '-'}
                                </div>

                                <div className="cell cell-header">F Type</div>
                                <div className="cell">
                                    {companyDetail.fType}
                                </div>

                                <div className="cell cell-header">
                                    Market Cap
                                </div>
                                <div className="cell">
                                    {companyDetail.marketCapDisplay}
                                </div>

                                <div className="cell cell-header">
                                    Company Name (TH)
                                </div>
                                <div className="cell">
                                    {companyDetail.name.th}
                                </div>

                                <div className="cell cell-header">
                                    Company Name (EN)
                                </div>
                                <div className="cell">
                                    {companyDetail.name.en}
                                </div>

                                <div className="cell cell-header">
                                    Business Type (TH)
                                </div>
                                <div className="cell">
                                    {companyDetail.businessType.th}
                                </div>

                                <div className="cell cell-header ">
                                    Business Type (EN)
                                </div>
                                <div className="cell">
                                    {companyDetail.businessType.en}
                                </div>

                                <div className="cell cell-header">Website</div>
                                <div className="cell">
                                    {companyDetail.url ? (
                                        <Link
                                            to={companyDetail.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex
                                            text-gray-600 hover:underline"
                                        >
                                            {companyDetail.url}
                                            <FiExternalLink className="icon-external" />
                                        </Link>
                                    ) : (
                                        '-'
                                    )}
                                </div>

                                <div className="cell cell-header last-cell-header">
                                    Keywords
                                </div>
                                <div className="cell">
                                    {companyDetail.keywordDisplay || '-'}
                                </div>
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </Card>
        </>
    );
}

export default CompanyDetail;
