type ButtonProps = {
    id?: string,
    type: "button" | "submit"
    label: string,
    onClick?: (...args: any[]) => any
}

type InputProps = {
    id?: string,
    type: string,
    placeholder: string,
    name?: string,
    value: string,
    onChange: (...args: any[]) => any
}

const Button = (props: ButtonProps) => {
    const { label, type = "button", ...rest } = props;
    return <button type={type} {...rest}>{label}</button>;
};


const Input = (props: InputProps) => {
    const { type = "text", ...rest } = props;
    return <input type={type} {...rest} />;
};


export {
    Button,
    Input
};

