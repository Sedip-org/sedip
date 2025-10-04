"use client";
import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sedip-news.module.css";

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
      const { error } = await supabase.from("news").update([payload]).eq("id", editId);
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
      const url = supabase.storage.from("news-images").getPublicUrl(data.path).data.publicUrl;
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
        const url = supabase.storage.from("news-images").getPublicUrl(data.path).data.publicUrl;
        setForm((prev) => ({
          ...prev,
          gallery: [...(Array.isArray(prev.gallery) ? prev.gallery : []), url],
        }));
        toast.success(`${file.name} uploaded`);
      }
    }
  }

  return (
    <>
      <style jsx>{`
        .responsive-table tbody td {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .responsive-table th,
          .responsive-table td {
            font-size: 0.875rem;
            padding: 0.5rem;
          }
          .responsive-table td[data-label="Content"] {
            max-width: 200px;
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          }
          .action-buttons-mobile button {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }
        @media (max-width: 768px) {
          .responsive-table {
            border: 0;
          }
          .responsive-table thead {
            display: none;
          }
          .responsive-table tbody tr {
            display: block;
            margin-bottom: 1.5rem;
            border: 1px solid #dee2e6;
            border-radius: 0.375rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .responsive-table tbody td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border: none;
            border-bottom: 1px solid #dee2e6;
            text-align: right;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .responsive-table tbody td:last-child {
            border-bottom: 0;
          }
          .responsive-table tbody td::before {
            content: attr(data-label);
            font-weight: 600;
            text-align: left;
            padding-right: 1rem;
            flex: 0 0 40%;
            word-break: normal;
          }
          .responsive-table tbody td[data-label="Gallery"],
          .responsive-table tbody td[data-label="Action"],
          .responsive-table tbody td[data-label="Content"] {
            flex-direction: column;
            align-items: stretch;
          }
          .responsive-table tbody td[data-label="Gallery"]::before,
          .responsive-table tbody td[data-label="Action"]::before,
          .responsive-table tbody td[data-label="Content"]::before {
            margin-bottom: 0.5rem;
          }
          .responsive-table tbody td[data-label="Name"],
          .responsive-table tbody td[data-label="Author"],
          .responsive-table tbody td[data-label="Content"] {
            word-break: break-word;
            overflow-wrap: break-word;
            text-align: left;
          }
          .responsive-table tbody td[data-label="Content"] {
            white-space: normal;
            line-height: 1.5;
          }
          .gallery-images-mobile {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            width: 100%;
          }
          .action-buttons-mobile {
            display: flex;
            gap: 0.5rem;
            width: 100%;
          }
          .action-buttons-mobile button {
            flex: 1;
          }
        }
      `}</style>

      <div className="container my-5">
        <Toaster />
        <h3 className="container my-4">News Management</h3>

        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Main Image</label>
                    <input type="file" className="form-control" onChange={handleImageUpload} />
                    {form.image && (
                      <img src={form.image} alt="preview" style={{ width: "120px", marginTop: "10px" }} />
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Gallery Images (Multiple)</label>
                    <input type="file" className="form-control" multiple onChange={handleGalleryUpload} />
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {Array.isArray(form.gallery) &&
                        form.gallery.map((img, idx) => (
                          <img key={idx} src={img} alt={`gallery ${idx}`} style={{ width: "80px" }} />
                        ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.created_at}
                      onChange={(e) => setForm({ ...form, created_at: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                    ></textarea>
                  </div>

                  <button className="btn btn-primary w-100">{editId ? "UPDATE" : "ADD"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered responsive-table">
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
                  {news.map((singleNews) => {
                    const galleryArray = singleNews.gallery
                      ? typeof singleNews.gallery === "string"
                        ? JSON.parse(singleNews.gallery)
                        : singleNews.gallery
                      : [];

                    return (
                      <tr key={singleNews.id}>
                        <td data-label="Main Image">
                          {singleNews.image && (
                            <img src={singleNews.image} alt={singleNews.name} style={{ width: "80px" }} />
                          )}
                        </td>
                        <td data-label="Gallery">
                          <div className="gallery-images-mobile d-flex flex-wrap gap-1">
                            {galleryArray.map((img: string, idx: number) => (
                              <img key={idx} src={img} alt={`gallery ${idx}`} style={{ width: "50px" }} />
                            ))}
                          </div>
                        </td>
                        <td data-label="Name">{singleNews.name}</td>
                        <td data-label="Author">{singleNews.author}</td>
                        <td data-label="Date">{singleNews.created_at}</td>
                        <td data-label="Content">{singleNews.content}</td>
                        <td data-label="Action">
                          <div className="action-buttons-mobile text-nowrap">
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleNewsEdit(singleNews)}>
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => singleNews.id && handleNewsDelete(singleNews.id)}
                            >
                              Delete
                            </button>
                          </div>
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
