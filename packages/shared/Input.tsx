interface Props {
  id: string
}

export const Input = ({ id }: Props) => (
  <input
    className="
      inline-flex
      items-center
      justify-center
      rounded
      px-2
      h-9
      text-base
      leading-none
      shadow
      focus:shadow-sm
    "
    id={id}
    type="text"
  />
)
