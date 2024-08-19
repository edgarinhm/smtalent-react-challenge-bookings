import { ReactNode } from 'react';
interface TableProps {
  children: ReactNode | ReactNode[];
}
const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className=" table-auto min-w-full bg-white border border-gray-200">
        {children}
      </table>
    </div>
  );
};

export const TableHeaders = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="bg-gray-200">
      <tr>{children}</tr>
    </thead>
  );
};

export const TableHead = ({ children }: { children: ReactNode }) => {
  return (
    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
      {children}
    </th>
  );
};

export const TableBody = ({ children }: { children: ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: { children: ReactNode }) => {
  return <tr className="even:bg-gray-50">{children}</tr>;
};

export const TableColumn = ({ children }: { children: ReactNode }) => {
  {
    return (
      <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
        {children}
      </td>
    );
  }
};

export default Table;
