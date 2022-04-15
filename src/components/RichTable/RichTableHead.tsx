import { HeadRender } from "../Table/TableHead";

export const RichTableHead: HeadRender = ({ children }) => {
  return (
    <tr>
      <th></th>
      {children}
      <th></th>
    </tr>
  )
}