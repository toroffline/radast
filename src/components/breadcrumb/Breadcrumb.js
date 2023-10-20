import { Link } from 'react-router-dom';

function Breadcrumb(props) {
    const { values } = props;

    return (
        <div className="breadcrumb">
            {values.map((breadcrumb, index) => (
                <span key={`breadcrumb-${index}`}>
                    {breadcrumb.redirect ? (
                        <Link
                            className="breadcrumb-link"
                            to={breadcrumb.redirect}
                        >
                            {breadcrumb.display}
                        </Link>
                    ) : (
                        <span>{breadcrumb.display}</span>
                    )}
                    {index !== values.length - 1 && <> / </>}
                </span>
            ))}
        </div>
    );
}

export default Breadcrumb;
