import { Button } from 'flowbite-react';

function ButtonIcon(props) {
    return (
        <Button
            type="button"
            outline
            pill
            size="xs"
            className="round-full"
            onClick={(e) => props.onClick(e)}
        >
            {props.icon}
        </Button>
    );
}

export default ButtonIcon;
