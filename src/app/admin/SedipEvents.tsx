"use client";
import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Event {
  id?: string;
  created_at: string;
  name: string;
  image: string;
  content: string;
}

export default function Events() {
  useEffect(() => {
    fetchEvents();
  }, []);

  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Event>({
    created_at: "",
    name: "",
    image: "",
    content: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editId) {
      const { error } = await supabase
        .from("events")
        .update([form])
        .eq("id", editId);

      if (error) {
        toast.error(`Failed to update the data ${error.message}`);
      } else {
        toast.success("Updated successfully");
        fetchEvents();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("events").insert([form]);

      if (error) {
        toast.error(`Failed to create ${error.message}`);
      } else {
        toast.success("Event added successfully");
        fetchEvents();
        resetForm();
      }
    }
  }

  function resetForm() {
    setForm({
      created_at: "",
      name: "",
      image: "",
      content: "",
    });
    setEditId(null);
  }

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select("*");

    if (error) {
      toast.error(`Failed to load data ${error.message}`);
    } else {
      setEvents(data || []);
    }
  }

  function handleEventEdit(event: Event) {
    setForm(event);
    if (event.id) {
      setEditId(event.id);
    }
  }

  async function handleEventDelete(id: string) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) {
        toast.error("Failed to delete event");
      } else {
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
        fetchEvents();
      }
    }
  }

  // IMAGE UPLOAD
  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("events-images")
      .upload(`events/${Date.now()}-${file.name}`, file);

    if (error) {
      toast.error("Image upload failed");
    } else {
      const url = supabase.storage.from("events-images").getPublicUrl(data.path)
        .data.publicUrl;

      setForm({ ...form, image: url });
      toast.success("Image uploaded successfully");
    }
  }

  return (
    <>
      <div className="events-container my-5">
        <Toaster />
        <h3 className="events-container my-4">Events Management</h3>

        {/* FORM */}
        <div className="row">
          <div className="col-12">
            <div className="card mb-4 events-card">
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
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
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.created_at}
                      onChange={(event) =>
                        setForm({ ...form, created_at: event.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={form.content}
                      onChange={(event) =>
                        setForm({ ...form, content: event.target.value })
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
              <table className="table table-bordered events-table">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Content</th>
                    <th style={{ width: "120px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((singleEvent) => (
                    <tr key={singleEvent.id}>
                      <td>
                        {singleEvent.image && (
                          <img
                            src={singleEvent.image}
                            alt={singleEvent.name}
                            style={{ width: "80px" }}
                          />
                        )}
                      </td>
                      <td>{singleEvent.name}</td>
                      <td>{singleEvent.created_at}</td>
                      <td>{singleEvent.content}</td>
                      <td className="text-nowrap">
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEventEdit(singleEvent)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            singleEvent.id && handleEventDelete(singleEvent.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
