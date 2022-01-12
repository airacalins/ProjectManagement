import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import TableBody from "../../app/layouts/components/table/TableBody";
import TableComponent from "../../app/layouts/components/table/TableComponent";
import TableHeader from "../../app/layouts/components/table/TableHeader";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { Announcement } from "../../app/models/announcement";

interface Props {
    announcements: Announcement[]
}

const AnnouncementTable = ({ announcements }: Props) => {
    return (
        <TableComponent
            tableHeader={
                <>
                    <TableHeader name="Date Created" />
                    <TableHeader name="Subject" />
                    <TableHeader name="Message" />
                    <TableHeader name="" />
                </>
            }

            tableBody={
                !announcements.length ?
                    <TableBody colSpan="5" content="No slots..." />
                    :
                    announcements.map(a => (
                        <Table.Row>
                            <TableBody content={dateFormatter(a.dateCreated)} />
                            <TableBody content={a.subject} singleLine={true} />
                            <TableBody content={a.message} />
                            <TableBody content=">" navigateTo={`/announcements/${a.id}/details`} />
                        </Table.Row>
                    ))

            } />);
}

export default observer(AnnouncementTable);