import { getUsers, deleteUser } from "./api/baseApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

// กำหนดชนิดข้อมูลสำหรับผู้ใช้
interface Data {
  id: string;
  name: string;
  age: number;
}

// ฟังก์ชัน getServerSideProps สำหรับดึงข้อมูลในฝั่งเซิร์ฟเวอร์ทุกครั้งที่มีการร้องขอหน้าเว็บ
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getUsers();

  return {
    props: { data },
  };
};

// กำหนดชนิดข้อมูลสำหรับ props ของคอมโพเนนต์
interface GetUserProps {
  data: Data[];
}

// คอมโพเนนต์ User สำหรับแสดงข้อมูลผู้ใช้
const User = ({ data }: GetUserProps) => {
  const router = useRouter();

  // ฟังก์ชันสำหรับลบข้อมูลผู้ใช้
  const deleteData = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;
    if (confirmed) {
      try {
        const status = await deleteUser(id);
        if (status === 200) {
          window.location.reload();
        } else {
          alert("Something went wrong!");
        }
      } catch {
        alert("Something went wrong!");
      }
    }
  };

  // ฟังก์ชันสำหรับแก้ไขข้อมูลผู้ใช้
  const handleEdit = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <CardContent>
      <TableContainer
        sx={{
          width: 900,
          height: 500,
          display: "flex",
          justifyContent: "center",
          ml: 65,
          mt: 20,
        }}
        aria-label="simple table"
        component={Paper}
      >
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  backgroundColor: "whitesmoke",
                  minWidth: 100,
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => deleteData(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ ml: 65, mt: 5 }}
        onClick={() => router.push("/")}
      >
        Back
      </Button>
    </CardContent>
  );
};

export default User;
