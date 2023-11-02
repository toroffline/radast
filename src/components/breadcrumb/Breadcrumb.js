import { Breadcrumb as BreadcrumbFlow } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
    const { values } = props;

    return (
        <BreadcrumbFlow>
            {values.map((breadcrumb, index) => (
                <BreadcrumbFlow.Item
                    key={`breadcrub-${breadcrumb.display.toLowerCase()}-index`}
                >
                    <Link to={breadcrumb.redirect}>{breadcrumb.display}</Link>
                </BreadcrumbFlow.Item>
            ))}
        </BreadcrumbFlow>
    );
}

export default Breadcrumb;
