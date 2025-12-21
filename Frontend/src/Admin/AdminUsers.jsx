import React, { useEffect, useState } from "react";
import Select from "react-select";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // React-Select Options
  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "blocked", label: "Blocked" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "name", label: "Name A-Z" },
  ];

  useEffect(() => {
    if (!admin?.accessToken) return;
    loadUsers();
  }, [search, role, status, sort, page]);

  const loadUsers = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users?search=${search}&role=${role}&status=${status}&sort=${sort}&page=${page}&limit=10`
      );
      const data = await res.json();
      setUsers(data.users || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBlock = async (id, isBlocked) => {
    try {
      await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${id}/${isBlocked ? "unblock" : "block"}`,
        {
          method: "PUT",
        }
      );
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleRole = async (id, role) => {
    try {
      await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${id}/${role === "admin" ? "remove-admin" : "make-admin"}`,
        {
          method: "PUT",
        }
      );
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/admin/users/${id}`, {
        method: "DELETE",
      });
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // Custom styles for React-Select (Dark Mode)
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      padding: "2px",
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#22c55e"
        : state.isFocused
          ? "#334155"
          : "#1e293b",
      color: "white",
    }),
  };

  return (
    <div className="min-h-screen  text-white">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-400">
        Manage Users
      </h1>

      {/* Filters Section */}
      <div className="bg-slate-800  rounded-xl mb-10 grid lg:grid-cols-3 md:grid-cols-2 gap-2 shadow-lg">
        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 rounded bg-slate-700 w-full focus:border-green-400 border"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* Role */}
        <Select
          options={roleOptions}
          onChange={(opt) => {
            setPage(1);
            setRole(opt.value);
          }}
          styles={selectStyles}
          placeholder="Role"
        />

        {/* Status */}
        <Select
          options={statusOptions}
          onChange={(opt) => {
            setPage(1);
            setStatus(opt.value);
          }}
          styles={selectStyles}
          placeholder="Status"
        />

        {/* Sort */}
        <Select
          options={sortOptions}
          onChange={(opt) => setSort(opt.value)}
          styles={selectStyles}
          defaultValue={sortOptions[0]}
          placeholder="Sort"
        />
      </div>

      {/* USERS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:border-green-400 transition-all hover:shadow-green-500/20"
          >
            <h2 className="text-xl font-semibold">{u.name}</h2>
            <p className="text-gray-400 break-all">{u.email}</p>

            {/* Role Badge */}
            <p className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  u.role === "admin" ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {u.role}
              </span>
            </p>

            {/* Status Badge */}
            <p className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  u.isBlocked ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {u.isBlocked ? "Blocked" : "Active"}
              </span>
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => toggleBlock(u._id, u.isBlocked)}
                className={`w-full py-2 rounded font-semibold ${
                  u.isBlocked ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {u.isBlocked ? "Unblock User" : "Block User"}
              </button>

              <button
                onClick={() => toggleRole(u._id, u.role)}
                className="w-full py-2 rounded font-semibold bg-blue-600"
              >
                {u.role === "admin" ? "Remove Admin" : "Make Admin"}
              </button>

              <button
                onClick={() => deleteUser(u._id)}
                className="w-full py-2 rounded font-semibold bg-yellow-600"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 items-center gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-slate-700 rounded disabled:bg-slate-600"
        >
          Prev
        </button>

        <span className="text-lg">
          Page <span className="text-green-400">{page}</span> /{" "}
          <span className="text-green-400">{pages}</span>
        </span>

        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-slate-700 rounded disabled:bg-slate-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
