import { Button, Container } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  const [page, setPage] = useState(0);
  const [Pagination, setPagination] = useState([]);
 
  const API_URL = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;

  useEffect(() => {
    window.page = 0;
    call_interval();
  }, []);

  useEffect(() => {
    setPage(page + 1);
    let tempPaginition = [...Pagination];
    tempPaginition.push(page + 1);
    setPagination(tempPaginition);
    console.log('updated data ', data);
  }, [data]);

  const call_interval = () => {
    window.data = [];
    setselectedData(data[0]);
    setInterval(() => {
      set_data()
      window.page++
    }, 10000);
  };

  const set_data = () => {
    axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${window.page}`)
      .then(res => {
        let hits = res.data.hits;
        window.data.push(hits);
        setData([...window.data]);
      })
  }
  const set_view_data = (pageNO) => {
    setselectedData(data[pageNO]);
  }
  return (
    <div className="App">
      {
        <Container fixed>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'blue' }}>Fetched Data Are Showing after 10 seceonds...</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedData?.length ? selectedData.map((row) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell>Data not found</TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      }
      {
        <Container fixed>
          <Stack spacing={2}>

            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                listStyle: 'none'
              }}
            >
              {Pagination.map((i) => (
                i <= 50 ?
                  <li onClick={() => set_view_data(i - 1)} key={i}><Button sx={{ margin: "3px" }} size="small" variant="outlined">{i}</Button></li>
                  : <li></li>
              ))}
            </ul>
          </Stack>
        </Container>
      }
    </div>
  );
}

export default App;
