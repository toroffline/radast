import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';

import { useAppContext } from '../../context/appContext';
import Breadcrumb from '../breadcrumb/Breadcrumb';

import './Header.css';

function Header() {
    const { header, breadcrumb, isMobile, displayBackBtn } = useAppContext();
    const navigation = useNavigate();

    return (
        <div>
            {isMobile && (
                <button
                    type="button"
                    data-drawer-target="drawer-sidebar"
                    data-drawer-show="drawer-sidebar"
                    data-drawer-backdrop="true"
                >
                    <FiMenu />
                </button>
            )}
            <div className="header">
                {!isMobile && breadcrumb && <Breadcrumb values={breadcrumb} />}

                {isMobile && displayBackBtn && (
                    <button
                        type="button"
                        onClick={() => {
                            navigation(-1);
                        }}
                        className="back"
                    >
                        <FiArrowLeft />
                    </button>
                )}
                <h1>{header}</h1>
            </div>
        </div>
    );
}

export default Header;
