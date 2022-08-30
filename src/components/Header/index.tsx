interface HeaderProps {
  title: string
  className: string
}

export default function Header({ title, className }: HeaderProps) {
  return <h1 className={className}>{title}</h1>
}
