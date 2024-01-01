import React, { useState } from "react";
import "./AddCategory.css";
import { Close, Check } from "@mui/icons-material";
import axios from "axios";

interface Prop {
  toggleModal: () => void;
}

const AddCategory: React.FC<Prop> = ({ toggleModal }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [ImageFile, setImageFile] = useState<string>("");

  const handleAddCategory = async () => {
    if (categoryName === "") {
      return alert("Please input category name before you submit");
    }

    const data = new FormData();
    data.append("file", ImageFile);
    data.append("upload_preset", "upload");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
      data
    );
    const { url } = uploadRes.data;

    console.log(url);

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/category/create`,
        {
          categoryName: categoryName,
          imageUrl: url,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <div className="add-category">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Category</div>
      <hr style={{ marginBottom: "20px" }} />
      <div className="upload-image-container">
        <img
          src={
            ImageFile
              ? URL.createObjectURL(
                  new Blob([ImageFile], { type: "image/jpeg" })
                )
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          }
          alt="AddImage"
          className="addcategory-img"
        />
        <label htmlFor="file-upload" className="receipt-input-image">
          Upload the image of category here..
          <input
            type="file"
            id="file-upload"
            onChange={fileTypeChecking}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <section className="addcategory-item-section" style={{ width: "100%" }}>
        <label>Category Name</label>
        <input
          className="addcategory-input"
          style={{ width: "95%" }}
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </section>
      <div className="addcategory-btn-container">
        <button
          className="addproduct-btn"
          style={{ backgroundColor: "red" }}
          onClick={toggleModal}
        >
          <Close /> Close
        </button>
        <button
          className="addproduct-btn"
          style={{ backgroundColor: "green" }}
          onClick={handleAddCategory}
        >
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
