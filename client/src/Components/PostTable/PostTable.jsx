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
      const response = await axios.get(`${apiUrl}/api/v1/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
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
      const response = await axios.delete(`${apiUrl}/api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchPosts();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const addPost = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/posts`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
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
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
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
      cursor: "pointer",
    },
    {
      name: "Content",
      selector: (row) => row.content,
      sortable: true,
      width: "350px",
      cursor: "pointer",
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
      width: "250px",
      cursor: "pointer",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <button
            onClick={() => openEditPostDialog(row)}
            className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
            title="Edit"
          >
            <EditIcon className="text-xl" />
          </button>
          <button
            onClick={() => deletePost(row.id)}
            className="text-red-600 hover:text-red-800 transition cursor-pointer"
            title="Delete"
          >
            <DeleteIcon className="text-xl" />
          </button>
        </div>
      ),
      width: "200px",
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
      <div className="h-screen w-full flex flex-col items-center justify-start bg-gray-100 px-4 py-8 overflow-hidden">
        <div className="w-full max-w-6xl flex justify-end mb-6">
          <button
            className="bg-indigo-600 text-white font-medium py-2 px-5 rounded-md shadow hover:bg-indigo-700 transition cursor-pointer"
            onClick={openAddPostDialog}
          >
            Add Post
          </button>
        </div>

        <div className="w-full max-w-6xl flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
          <DataTable
            data={dataItems}
            columns={columns}
            pagination
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="100%"
            onRowClicked={(post) => navigate(`/post-details/${post.id}`)}
          />
        </div>

        <Dialog open={isModalOpen} onClose={closeDialog}>
          <DialogTitle className="text-3xl font-bold text-gray-800 text-center w-[500px]">
            {dialogInfo.title}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(postFormData);
              }}
              className="gap-4 flex flex-col mt-4"
            >
              <TextField
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
          <DialogActions className="px-6 pb-6">
            <Button
              onClick={closeDialog}
              className="text-red-600 hover:text-red-800 font-medium cursor-pointer px-4 py-2 rounded-md shadow transition"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleFormSubmit(postFormData)}
              className="bg-green-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
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
