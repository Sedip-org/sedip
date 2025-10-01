"use client";
import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface News {
  id?: string;
  created_at: string;
  name: string;
  author: string;
  content: string;
  image: string;
  gallery?: string[] | string;
}

export default function SedipNews() {
  const [news, setNews] = useState<News[]>([]);
  const [form, setForm] = useState<News>({
    created_at: "",
    name: "",
    author: "",
    content: "",
    image: "",
    gallery: [],
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data, error } = await supabase.from("news").select("*");
    if (error) toast.error(`Failed to load data ${error.message}`);
    else setNews(data || []);
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...form,
      gallery: Array.isArray(form.gallery)
        ? JSON.stringify(form.gallery)
        : form.gallery,
    };

    if (editId) {
      const { error } = await supabase
        .from("news")
        .update([payload])
        .eq("id", editId);
      if (error) toast.error(`Failed to update the data ${error.message}`);
      else {
        toast.success("Updated successfully");
        fetchNews();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("news").insert([payload]);
      if (error) toast.error(`Failed to create ${error.message}`);
      else {
        toast.success("News added successfully");
        fetchNews();
        resetForm();
      }
    }
  }

  function resetForm() {
    setForm({
      created_at: "",
      name: "",
      author: "",
      content: "",
      image: "",
      gallery: [],
    });
    setEditId(null);
  }

  function handleNewsEdit(newsItem: News) {
    const galleryArray = newsItem.gallery
      ? typeof newsItem.gallery === "string"
        ? JSON.parse(newsItem.gallery)
        : newsItem.gallery
      : [];
    setForm({ ...newsItem, gallery: galleryArray });
    if (newsItem.id) setEditId(newsItem.id);
  }

  async function handleNewsDelete(id: string) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) toast.error("Failed to delete news");
      else {
        Swal.fire("Deleted!", "Your news has been deleted.", "success");
        fetchNews();
      }
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("news-images")
      .upload(`news/${Date.now()}-${file.name}`, file);

    if (error) toast.error("Image upload failed");
    else {
      const url = supabase.storage.from("news-images").getPublicUrl(data.path)
        .data.publicUrl;
      setForm({ ...form, image: url });
      toast.success("Image uploaded successfully");
    }
  }

  async function handleGalleryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { data, error } = await supabase.storage
        .from("news-images")
        .upload(`news/gallery/${Date.now()}-${file.name}`, file);

      if (error) toast.error(`Failed to upload ${file.name}`);
      else {
        const url = supabase.storage.from("news-images").getPublicUrl(data.path)
          .data.publicUrl;
        setForm(prev => ({
          ...prev,
          gallery: [...(Array.isArray(prev.gallery) ? prev.gallery : []), url],
        }));
        toast.success(`${file.name} uploaded`);
      }
    }
  }

  return (
    <>
      <div className="container my-5">
        <Toaster />
        <h3 className="container my-4">News Management</h3>

        {/* FORM */}
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  {/* Main Image */}
                  <div className="mb-3">
                    <label className="form-label">Main Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageUpload}
                    />
                    {form.image && (
                      <img
                        src={form.image}
                        alt="preview"
                        style={{ width: "120px", marginTop: "10px" }}
                      />
                    )}
                  </div>

                  {/* Gallery Upload */}
                  <div className="mb-3">
                    <label className="form-label">Gallery Images (Multiple)</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleGalleryUpload}
                    />

                    {/* Gallery Preview */}
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {Array.isArray(form.gallery) &&
                        form.gallery.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`gallery ${idx}`}
                            style={{ width: "80px" }}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Author */}
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                    />
                  </div>

                  {/* Date */}
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.created_at}
                      onChange={(e) =>
                        setForm({ ...form, created_at: e.target.value })
                      }
                    />
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={form.content}
                      onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <button className="btn btn-primary w-100">
                    {editId ? "UPDATE" : "ADD"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Main Image</th>
                    <th>Gallery</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Content</th>
                    <th style={{ width: "120px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map(singleNews => {
                    const galleryArray = singleNews.gallery
                      ? typeof singleNews.gallery === "string"
                        ? JSON.parse(singleNews.gallery)
                        : singleNews.gallery
                      : [];
                    return (
                      <tr key={singleNews.id}>
                        <td>
                          {singleNews.image && (
                            <img
                              src={singleNews.image}
                              alt={singleNews.name}
                              style={{ width: "80px" }}
                            />
                          )}
                        </td>
                        <td className="d-flex flex-wrap gap-1">
                          {galleryArray.map((img: string, idx: number) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`gallery ${idx}`}
                              style={{ width: "50px" }}
                            />
                          ))}
                        </td>
                        <td>{singleNews.name}</td>
                        <td>{singleNews.author}</td>
                        <td>{singleNews.created_at}</td>
                        <td>{singleNews.content}</td>
                        <td className="text-nowrap">
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleNewsEdit(singleNews)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              singleNews.id && handleNewsDelete(singleNews.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
