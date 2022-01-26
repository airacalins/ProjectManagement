import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchAnnouncementsAsync } from "./announcementSlice";
import moment from "moment";
import history from '../../app/utils/history';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";

const Announcement = () => {
    const [searchKey, setSearchKey] = useState('');
    const { announcements, isFetching: isFetchingAnnouncements } = useAppSelecter(state => state.announcement);

    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return announcements.filter(i => i.title.toLowerCase().includes(searchKey.toLowerCase()));
        }
        return announcements;
    }, [announcements, searchKey])

    useEffect(() => {
        dispatch(fetchAnnouncementsAsync());
    }, [])

    if (isFetchingAnnouncements) return <LoadingComponent content="Loading Announcements..." />

    const columns = [
        { title: 'Date Created' },
        { title: 'Subject' },
        { title: 'Message' },
        { title: '' },
    ]

    return (
        <MainPage
            title="Announcements"
            content={
                <CustomTable
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Announcement"
                    navigateTo="/announcements/create"
                    columns={columns}
                    rows=
                    {
                        announcements.map(announcement =>
                            <TableRow key={announcement.id}>

                                <TableCell align="center">
                                    {moment(announcement.dateCreated).format("MMM DD, YYYY")}
                                </TableCell>

                                <TableCell align="center">
                                    {announcement.title}
                                </TableCell>

                                <TableCell align="center">
                                    {announcement.message}
                                </TableCell>

                                <TableCell align="right">
                                    <NavigateNextOutlinedIcon onClick={() => history.push(`/announcements/${announcement.id}/details`)} />
                                </TableCell>

                            </TableRow>
                        )
                    }
                />
            }
        />
    );
}

export default Announcement;