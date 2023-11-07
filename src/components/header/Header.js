import { useAppContext } from '../../context/appContext';
import Breadcrumb from '../breadcrumb/Breadcrumb';

function Header() {
    const { header, breadcrumb } = useAppContext();

    return (
        <div>
            <div className="header">
                {breadcrumb && <Breadcrumb values={breadcrumb} />}
                <h1>{header}</h1>
            </div>
        </div>
    );
}

export default Header;
