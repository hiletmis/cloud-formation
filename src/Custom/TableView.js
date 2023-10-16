import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const TableView = ({ headers, parameters }) => {
  const getHeaders = () => {
    const titles = [];
    headers.forEach((title) => {
      titles.push(<Th>{title.value}</Th>);
    });
    return titles;
  };

  const getRows = () => {
    const rows = [];
    if (parameters === undefined || parameters === null) return rows;
    parameters.forEach((parameter) => {
      rows.push(
        <Tr>
          {headers.forEach((title) => {
            rows.push(<Td>{parameter[title.key]}</Td>);
          })}
        </Tr>
      );
    });
    return rows;
  };

  return (
    <TableContainer>
      <Table variant="striped" size={"sm"}>
        <Thead>
          <Tr>{getHeaders()}</Tr>
        </Thead>
        <Tbody>{getRows()}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
