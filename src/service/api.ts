const API_URL = "https://3133319-bo35045.twc1.net/api/v0";

export const fetchWithCredentials = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getImage = async (imageId: number) => {
  const data = await fetchWithCredentials(`/get_images/?ids=${imageId}`);
  return data[0];
};

export const getArticles = async () => {
  return await fetchWithCredentials("/stories/");
};

export const getAllHouses = async () => {
  return await fetchWithCredentials(`/house/`);
}

export const getHouseById = async (id: string) => {
  return await fetchWithCredentials(`/house/${id}`);
};

export const getUsers = async () => {
  return await fetchWithCredentials("/users/");
};

export const getMyProfile = async (me: string) => {
  return await fetchWithCredentials(`/users/${me}`);
};