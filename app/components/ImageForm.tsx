"use client";

interface Props {
  title: string;
  content: string;
  imageType: string;
  imageFile: File | null;
  editing: boolean;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
  setImageType: (v: string) => void;
  setImageFile: (f: File | null) => void;
  onSubmit: () => void;
}

export default function ImageForm({
  title,
  content,
  imageType,
  imageFile,
  editing,
  setTitle,
  setContent,
  setImageType,
  setImageFile,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-2xl font-semibold mb-6">
        {editing ? "Edit Image" : "Add New Image"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          placeholder="Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Content"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image Type"
          className="input"
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
        />

        <label className="upload-box">
          {imageFile ? imageFile.name : "Upload Image"}
          <input
            type="file"
            hidden
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}

          />
        </label>
      </div>

      <button onClick={onSubmit} className="btn-primary mt-6 bg-[red] py-3 px-16 text-white font-semibold rounded-2xl">
        {editing ? "Update Image" : "Create Image"}
      </button>
    </div>
  );
}
