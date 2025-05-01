import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PostTable = () => {
  const [posts, setPosts] = useState();
  // const [report, setReport] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState(null); // To manage edit state
  const [isEditing, setIsEditing] = useState(false); // To toggle between add and edit modes
  const [modelInfo, setModelInfo] = useState({ title: "", buttonLabel: "" });
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  async function newFun() {
    try {
      const respone = await axios.get(`${apiUrl}/api/v1/posts`);
      setPosts(respone.data);
      // setReport(respone.data);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  }

  useEffect(() => {
    newFun();
  }, []);

  const tableColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "270px",
    },
    {
      name: "Content",
      selector: (row) => row.content,
      sortable: true,
      width: "350px",
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
      width: "250px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <EditIcon
            className="editIcon"
            onClick={() => handleEdit(row)}
          ></EditIcon>
          <DeleteIcon onClick={() => handleDelete(row.id)}></DeleteIcon>
        </div>
      ),
      width: "250px",
    },
  ];

  const tableDataItems = posts?.map((post) => {
    return {
      title: post.title,
      content: post.content,
      author: post.author,
      //   "manage": ,
      id: post._id,
    };
  });

  const handleEdit = (row) => {
    setModelInfo({ title: "Edit Post", buttonLabel: "UPDATE Post" });
    setEditData(row);

    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/v1/posts/${id}`);
      newFun();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleAddUpdate = async (data) => {
    try {
      if (!data.title || data.title === "") {
        toast.error("Title is required");
        return;
      }
      if (!data.content || data.content === "") {
        toast.error("Content is required");
        return;
      }
      if (!data.author || data.author === "") {
        toast.error("Author is required");
        return;
      }
      console.log(isAdd);
      if (isAdd) {
        const response = await axios.post(`${apiUrl}/api/v1/posts`, data);
        if (response) {
          newFun();
          setIsEditing(false);
          setEditData(null);
          toast.success(response.data.message);
        }
      } else {
        const response = await axios.patch(
          `${apiUrl}/api/v1/posts/${data.id}`,
          data
        );
        newFun();
        setIsEditing(false);
        setEditData(null);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleOpenAddModel = () => {
    setModelInfo({ title: "Add Post ", buttonLabel: "ADD " });
    setEditData("");
    // setIsAdd(true);
    setIsEditing(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-h-screen bg-gray-100 p-6">
        {/* Add Post Button - Right Aligned */}
        <div className="w-full flex justify-end mb-5">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={handleOpenAddModel}
          >
            Add Post
          </button>
        </div>

        {/* Table Container */}
        <div className="w-full max-w-8xl bg-white shadow-lg rounded-lg p-6">
          <DataTable
            data={tableDataItems}
            columns={tableColumns}
            pagination
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 252px)"
            onRowClicked={(post) => navigate(`/post-details/${post.id}`)}
          />
        </div>

        {/* Dialog Modal */}
        <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {modelInfo.title}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUpdate(editData);
              }}
              className="space-y-4"
            >
              <TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="border rounded-md p-2 w-full"
              />
              <TextField
                margin="dense"
                label="Content"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.content || ""}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                className="border rounded-md p-2 w-full"
              />
              <TextField
                margin="dense"
                label="Author Name"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.author || ""}
                onChange={(e) =>
                  setEditData({ ...editData, author: e.target.value })
                }
                className="border rounded-md p-2 w-full"
              />
            </form>
          </DialogContent>
          <DialogActions className="p-4">
            <Button
              onClick={() => setIsEditing(false)}
              className="text-red-500"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAddUpdate(editData)}
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              {modelInfo.buttonLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default PostTable;
