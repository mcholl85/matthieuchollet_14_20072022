interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export default function Button({ title, ...props }: ButtonProps) {
  return <button {...props}>{title}</button>
}
