
export const BaseButton = ({ children, onClick, className = '', ...others }) => {
    return (
        <button onClick={onClick} className={className} {...others}>
            {children}
        </button>
    )
}


export const PrimaryButton = ({ children, onClick, className = '', ...others }) => {
    return (
        <BaseButton onClick={onClick} className={`btn-primary ${className}`} {...others}>
            {children}
        </BaseButton>
    )
}

export const SecondaryButton = ({ children, onClick, className = '', ...others }) => {
    return (
        <BaseButton onClick={onClick} className={`btn-secondary ${className}`} {...others}>
            {children}
        </BaseButton>
    )
}
