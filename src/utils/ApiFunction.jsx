
import axios from "axios";
import queryString from "query-string";


export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json", 
  },
});

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in localStorage");
    return false;
  }
  return token;
};

export async function login(data) {
  try {
    const response = await api.post("/users/login", data);

    if (response.data.message !== "user.login.wrong_phone_password") {
      const { token, id, roles, fullname, avatar_link, remain_posts } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (id) {
        localStorage.setItem("id", id);
      }
      if (roles && roles.length > 0) {
        localStorage.setItem("role", roles[0]);
      }
      if (fullname) {
        localStorage.setItem("fullname", fullname);
      }
      if (avatar_link) {
        localStorage.setItem("avatar", avatar_link);
      }
      if(remain_posts) {
        localStorage.setItem("remain_posts", remain_posts)
      }
      
      return true;
    } else {
      return false;
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    return false;
  }
}

export async function buyPost(data){
  try{
    const token = localStorage.getItem("token");
    const response = await api.post("/payments", data, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.status === 200){
      return response.data;
    }
  }catch(error){
    return false;
  }
}

export async function  getChatHistory(senderId, receiverId) {
  try {
   
    const token = localStorage.getItem('token');

    // Gọi API để lấy lịch sử chat
    const response = await api.get(`/conversations/${senderId}/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });

  
   return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
  }
}
export async function handleAfterPayment(){

}

export async function getPaymentHistorybyUserId(){
    try{
      const userId = localStorage.getItem("id")
      const token = localStorage.getItem("token");
      const response = await api.get(`/payments/${userId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      if(response.status === 200){
        return response.data;
      }
    }catch(error){
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      return false;
    }
}


export async function register2(user) {
  try {
    const response = await api.post("/users/register", user);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function getUserById() {
  try {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const response = await api.get("/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const user = response.data;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function getUserDetailById(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const user = response.data;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function updateAvatar(file) {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const response = await api.post("/users/avatar/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpeg",
      },
    });

    if (response.status === 200) {
      localStorage.setItem("avatar", response.data.avatar);
      return response.data;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function updateProfileAPI(profile) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/users", profile, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { token, id, fullname, avatar } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (id) {
        localStorage.setItem("id", id);
      }
      if (fullname) {
        localStorage.setItem("fullname", fullname);
      }
      if (avatar) {
        localStorage.setItem("avatar", avatar);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function updatePasswordAPI(passwordDTO) {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await api.post("/users/" + id, passwordDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function findBuildingsByUserId() {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await api.get("/buildings/owner/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data.buildings;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}
export async function findContactedsById(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/users/contacteds/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.userResponses;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function findBuildingBySomeoneId(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/buildings/owner/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.buildings;
    }
    return false;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function findBuildingsByOwnerId(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/buildings/owner/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data.buildings;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function findBuildingsById() {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await api.get("/buildings/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    // localStorage.clear();
    // window.location.href="/login";
    return false;
  }
}

export async function getAllConnecteds(){
  try{
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await api.get(`/conversations/${id}`,{
      headers:
      {
        Authorization: `Bearer ${token}`,
      }
    });
   
    if(response.status === 200){
      return response.data;
    }


  }catch(error){
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}
export async function deleteById(buildingId) {
  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/buildings/${buildingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function getFavoriteBuilding() {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await api.get("/likes/user/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function createOrUpdateBuilding(building) {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/buildings", building, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function uploadAvatar2(id, avatar) {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const token = localStorage.getItem("token");

    const response = await api.post("/buildings/avatar/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "image/jpeg",
      },
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function uploadSlideImages2(id, images) {
  try {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("images", file);
    });
    const token = localStorage.getItem("token");

    const response = await api.post("/buildings/uploads/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data; image/jpeg",
      },
    });
    if (response.status === 200) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function getBuildingEdit(id) {
  try {
    const response = await api.get("/buildings/building-edit/" + id);
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function getSimilarBuliding(id) {
  try {
    const response = await api.get("/buildings/relations/" + id);
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function searchBuildings(data) {
  try {
    const queryParams = queryString.stringify(data);
    const response = await api.get(`/buildings/search?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    // localStorage.clear();
    // window.location.href="/login";
    return false;
  }
}
// end building

// like
export async function addToFavorite(buildingId, like) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("id"));
    formData.append("building_id", buildingId);
    formData.append("like", like);
    const response = await api.post("/likes", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}
// end like

// communication
export async function getCommunicationByBuildingId(id) {
  try {
    const token = localStorage.getItem("token");
    const id2 = localStorage.getItem("id");

    if (!token || !id2) {
      console.error("Token or id is missing in localStorage");
      return null;
    }
    const response = await api.get(`/communications/building/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function createCommunication(data) {
  try {
    console.log(data);
    const token = localStorage.getItem("token");
    const response = await api.post("/communications", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    }
    return false;
  } catch (error) {
    // localStorage.clear();
    // window.location.href="/login";
    console.error(error);
    return false;
  }
}
// end communication

export async function searchUsers(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing token in localStorage");
    }

    const queryParams = queryString.stringify(data);

    const response = await api.get(`/users/search?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("searchUsers error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return false;
  }
}

export async function adminSearchBuilding(data){
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing token in localStorage");
    }
    const queryParams = queryString.stringify(data);
    const response = await api.get(`/buildings/admin/search?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",

      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    localStorage.clear();
    window.location.href="/login";
    return false;
  }
}
// end user
