import { Breadcrumb as BreadcrumbFlow } from 'flowbite-react';

function Breadcrumb(props) {
    const { values } = props;

    return (
        <BreadcrumbFlow>
            {values.map((breadcrumb, index) => (
                <BreadcrumbFlow.Item
                    href={breadcrumb.redirect}
                    key={`breadcrub-${breadcrumb.display.toLowerCase()}-index`}
                >
                    <p>{breadcrumb.display}</p>
                </BreadcrumbFlow.Item>
            ))}
        </BreadcrumbFlow>
    );
}

export default Breadcrumb;
