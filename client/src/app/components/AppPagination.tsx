import {Box, Pagination, Typography} from "@mui/material";
import {MetaData} from "../models/pagination";
import {useState} from "react";

interface Props {
    metaData: MetaData
    onPageChange: (page: number) => void
}

export default function AppPagination({metaData, onPageChange}: Props) {
    const {currentPage, totalPages, totalCount, pageSize} = metaData
    const [pageNumber, setPageNumber] = useState(currentPage)

    function handlePageChange(page: number) {
        setPageNumber(page)
        onPageChange(page)
    }

    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>Displaying {(currentPage - 1) * pageSize + 1}-
                {(currentPage * pageSize) > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color={'secondary'}
                size={'large'}
                onChange={(e, page) => handlePageChange(page)}
                count={totalPages}
                page={pageNumber}/>
        </Box>
    )
}