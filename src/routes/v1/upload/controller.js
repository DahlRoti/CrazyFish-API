import { upload } from "../../../utils/index.js";
import fs from "fs";

const image = async (_req, _res) => {
  if (!_req.file) {
    _res.send({
      data: [],
      status: "fail",
      message: "No image found",
    });
    return;
  }
  const response = await upload(_req.file.path ?? "");
  await fs.promises.unlink(_req.file.path, () => {});

  _res.send({
    data: [
      {
        path: response.secure_url,
        size: response.bytes,
        name: _req.file.originalname,
      },
    ],
    status: "success",
    message: "Create image success",
  });
};

// Updated to handle multiple documents
const documents = async (_req, _res) => {
  if (!_req.files || _req.files.length === 0) {
    _res.send({
      data: [],
      status: "fail",
      message: "No documents found",
    });
    return;
  }

  const uploadPromises = _req.files.map(async (file) => {
    const response = await upload(file.path ?? "");
    await fs.promises.unlink(file.path);
    return {
      path: response.secure_url,
      size: response.bytes,
      name: file.originalname,
    };
  });

  const results = await Promise.all(uploadPromises);

  _res.send({
    data: results,
    status: "success",
    message: "Documents uploaded successfully",
  });
};

export { image, documents };
