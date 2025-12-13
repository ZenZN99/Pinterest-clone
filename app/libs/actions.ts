export const register = async (
  fullname: string,
  email: string,
  password: string
) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Register Fetching :", error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Login Fetching :", error);
  }
};

export const me = async (token: string) => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Me Fetching", error);
  }
};

export const profile = async (
  token: string,
  avatar: File | null,
  cover: File | null
) => {
  const formData = new FormData();

  if (avatar) formData.append("avatar", avatar);
  if (cover) formData.append("cover", cover);
  try {
    const res = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Profile Fetching", error);
  }
};

export const editBio = async (token: string, bio: string) => {
  try {
    const res = await fetch("/api/users/bio", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("EditBio Fetching", error);
  }
};

export const getUsers = async (token: string) => {
  try {
    const res = await fetch("/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetUsers Fetching", error);
  }
};

export const getUserById = async (token: string, id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetUserById Fetching", error);
  }
};

export const deleteUser = async (token: string, id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("DeleteUser Fetching", error);
  }
};

export const getImages = async (imageType?: string) => {
  try {
    const query = imageType
      ? `?imageType=${encodeURIComponent(imageType)}`
      : "";

    const res = await fetch(`/api/images${query}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetImages Fetching Error:", error);
    return [];
  }
};

export const getImageById = async (token: string, id: string) => {
  try {
    const res = await fetch(`/api/images/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetImageById Fetching", error);
  }
};

export const createImage = async (
  token: string,
  title: string,
  content: string,
  imageType: string,
  image: File | null
) => {
  try {
    if (!image) {
      throw new Error("Image is required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageType", imageType);
    formData.append("image", image);

    const res = await fetch("/api/images", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("CreateImage Fetching:", error);
    throw error;
  }
};

export const updateImage = async (
  token: string,
  id: string,
  title: string,
  content: string,
  imageType: string
) => {
  try {
    const res = await fetch(`/api/images/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, imageType }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("UpdateImage Fetching", error);
  }
};

export const deleteImage = async (token: string, id: string) => {
  try {
    const res = await fetch(`/api/images/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("DeleteImage Fetching", error);
  }
};

export const getImagesMe = async (token: string) => {
  try {
    const res = await fetch("/api/images/imageMe", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetImagesMe Fetching", error);
  }
};

export const getComments = async (token: string) => {
  try {
    const res = await fetch("/api/comments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetComments Fetching", error);
  }
};

export const createComment = async (
  token: string,
  content: string,
  imageId: string
) => {
  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, imageId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("CreateComment Fetching", error);
  }
};

export const updateComment = async (
  token: string,
  content: string,
  imageId: string,
  id: string
) => {
  try {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, imageId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("UpdateComment Fetching", error);
  }
};

export const deleteComment = async (token: string, id: string) => {
  try {
    const res = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("DeleteComment Fetching", error);
  }
};
