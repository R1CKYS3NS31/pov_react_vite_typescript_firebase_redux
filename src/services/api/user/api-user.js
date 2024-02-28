import { config } from "../../../config/config";
import { client } from "../client";

export const fetchUsers = async () => {
  try {
    const users = await client.get(`${config.apiUrl}/api/users/`);
    // console.log(users);
    return await users;
  } catch (error) {
    alert(error);
  }
};

export const fetchUser = async (credentials) => {
  try {
    const user = await client.get(`${config.apiUrl}/api/users/account`, {
      headers: {
        Authorization: "Bearer " + credentials,
      },
    });
    return await user;
  } catch (error) {
    alert(error);
  }
};

export const updateUser = async (user, credentials) => {
  //   console.log(" - ", user);
  try {
    const userUpdated = await client.put(
      `${config.apiUrl}/api/users/account`,
      user,
      {
        headers: {
          Authorization: "Bearer " + credentials,
        },
      }
    );
    return await userUpdated;
  } catch (error) {
    alert(error);
  }
};

export const deleteUser = async (credentials) => {
  try {
    const userDeleted = await client.delete(
      `${config.apiUrl}/api/users/account`,
      {
        headers: {
          Authorization: "Bearer " + credentials,
        },
      }
    );
    return await userDeleted;
  } catch (error) {
    alert(error);
  }
};
