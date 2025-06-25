import React, { useEffect, useState } from 'react'
import { getIngredients } from '../../requests/fetch-ingredients';
import { Table } from 'react-bootstrap';

function IngredientsTable() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIngredients();
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div >{loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value:any, i) => (
                    <td key={i}>{JSON.stringify(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

        )}</div>
  )
}

export default IngredientsTable