import { getRentals } from "../services/rentals";
import { AllCommunityModule, themeQuartz } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


function ListPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const PAGE_SIZE = 10;

    const datasource = useMemo(() => ({
        getRows: ({ startRow, endRow, successCallback, failCallback, sortModel }) => {
            const params = new URLSearchParams(searchParams);

            params.set("page", Math.floor(startRow / PAGE_SIZE) + 1);
            if (sortModel.length > 0) {
                params.set("sortBy", sortModel[0].colId);
                params.set("sortOrder", sortModel[0].sort);
            }
            getRentals(params).then(data => {
                successCallback(data.data, data.pagination.total);
            }).catch(error => {
                failCallback();
            });
        }
    }), [searchParams]);

    const columns = [
        { headerName: "Property", field: "title"},
        { headerName: "Weekly Rent ($)", field: "rent" },
        { headerName: "Postcode", field: "postcode"},
        { headerName: "State", field: "state"},
        { headerName: "Suburb", field: "suburb"},
        { headerName: "Bedrooms", field: "bedrooms" },
        { headerName: "Bathrooms", field: "bathrooms" },
        { headerName: "Parking Spaces", field: "parkingSpaces" },
        { headerName: "Rating", field: "averageRating", valueFormatter: (params) => params.value != null ? `${params.value} ★` : "-"},
        { headerName: "Number of Ratings", field: "numRatings" },
    ];

    return (
        <>
            <h1>All our Rentals</h1>
            <AgGridProvider modules={[AllCommunityModule]}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ height: "500px", width: "1500px", padding: "0 50px" }}>
                        <AgGridReact
                            defaultColDef={{ flex: 1 }}
                            theme={themeQuartz}
                            columnDefs={columns}
                            rowModelType="infinite"
                            datasource={datasource}
                            cacheBlockSize={PAGE_SIZE}
                            onRowClicked={(params) => navigate(`/property/${params.data.id}`)}
                        />
                    </div>
                </div>
            </AgGridProvider>

        </>
    );
}

export default ListPage;