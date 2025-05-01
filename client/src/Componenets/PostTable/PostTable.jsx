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
  const [isAddMode, setIsAddMode] = useState(false);
  const [postFormData, setPostFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ title: "", buttonLabel: "" });
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openEditPostDialog = (post) => {
    setDialogInfo({ title: "Edit Post", buttonLabel: "Update Post" });
    setPostFormData(post);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const openAddPostDialog = () => {
    setDialogInfo({ title: "Add Post", buttonLabel: "Add Post" });
    setPostFormData({ title: "", content: "", author: "" });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/v1/posts/${id}`);
      fetchPosts();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const addPost = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/posts`, data);
      if (response) {
        fetchPosts();
        closeDialog();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const updatePost = async (data) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/v1/posts/${data.id}`,
        data
      );
      fetchPosts();
      closeDialog();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleFormSubmit = (data) => {
    if (!data.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!data.content?.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!data.author?.trim()) {
      toast.error("Author is required");
      return;
    }

    isAddMode ? addPost(data) : updatePost(data);
  };

  const closeDialog = () => {
    setIsModalOpen(false);
    setPostFormData(null);
  };

  const columns = [
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
            onClick={() => openEditPostDialog(row)}
          />
          <DeleteIcon onClick={() => deletePost(row.id)} />
        </div>
      ),
      width: "250px",
    },
  ];

  const dataItems = posts?.map((post) => ({
    title: post.title,
    content: post.content,
    author: post.author,
    id: post._id,
  }));

  return (
    <>
      <div className="flex flex-col items-center justify-center max-h-screen bg-gray-100 p-6">
        <div className="w-full flex justify-end mb-5">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={openAddPostDialog}
          >
            Add Post
          </button>
        </div>

        <div className="w-full max-w-8xl bg-white shadow-lg rounded-lg p-6">
          <DataTable
            data={dataItems}
            columns={columns}
            pagination
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 252px)"
            onRowClicked={(post) => navigate(`/post-details/${post.id}`)}
          />
        </div>

        <Dialog open={isModalOpen} onClose={closeDialog}>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {dialogInfo.title}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(postFormData);
              }}
              className="space-y-4"
            >
              <TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={postFormData?.title || ""}
                onChange={(e) =>
                  setPostFormData({ ...postFormData, title: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Content"
                type="text"
                fullWidth
                variant="outlined"
                value={postFormData?.content || ""}
                onChange={(e) =>
                  setPostFormData({ ...postFormData, content: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Author Name"
                type="text"
                fullWidth
                variant="outlined"
                value={postFormData?.author || ""}
                onChange={(e) =>
                  setPostFormData({ ...postFormData, author: e.target.value })
                }
              />
            </form>
          </DialogContent>
          <DialogActions className="p-4">
            <Button onClick={closeDialog} className="text-red-500">
              Cancel
            </Button>
            <Button
              onClick={() => handleFormSubmit(postFormData)}
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              {dialogInfo.buttonLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default PostTable;
