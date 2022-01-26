import './form.scss'

interface Props {
    title: string
    children: any
}

const FormContainer = ({ title, children }: Props) => {
    return (
        <>
            <h3 className="form__title w-100 d-flex align-items-center px-4">{title}</h3>

            <div className="form__container px-5 py-4 mx-5 my-4">
                {children}
            </div>
        </>
    )
}

export default FormContainer;