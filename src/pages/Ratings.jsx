import { getRatings } from "../services/ratings.js";
import { AllCommunityModule, themeQuartz } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Ratings() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getRatings().then(data => {
            setRows(data.data);
        });
    }, []);


    const columns = [
        { headerName: "Rental", field: "rentalId", valueFormatter: (params) => `Rental ${params.value}` },
        { headerName: "Rating Given", field: "rating", valueFormatter: (params) => `${params.value} ★` },
        { 
            headerName: "Date Rated",
            field: "dateTime",
            valueFormatter: (params) => new Date(params.value).toLocaleDateString()
        },
    ];

    return (
        <>
            <h1>All your Ratings</h1>
            <AgGridProvider modules={[AllCommunityModule]}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ height: "500px", width: "1500px", padding: "0 50px" }}>
                        <AgGridReact
                            modules={[AllCommunityModule]}
                            theme={themeQuartz}
                            columnDefs={columns}
                            rowData={rows}
                            defaultColDef={{ flex: 1 }}
                            onRowClicked={(params) => navigate(`/property/${params.data.rentalId}`)}
                        />
                    </div>
                </div>
            </AgGridProvider>

        </>
    );
}

export default Ratings;