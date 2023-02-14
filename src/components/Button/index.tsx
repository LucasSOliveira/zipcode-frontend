const Button = (props: any) => {
  const { type, className, children, onClick } = props

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-color-primary text-ui-white rounded-md p-2 h-12 cursor-pointer md:text-[18px] border-solid border-2 ${className}`}>
        {children}
    </button>
  )
}

export default Button;
