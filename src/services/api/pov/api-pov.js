import { config } from "../../../config/config";
import { client } from "../client";

export const fetchPoVs = async () => {
  try {
    const povs = await client.get(`${config.apiUrl}/api/povs`);
    return await povs;
  } catch (error) {
    throw error;
  }
};

export const fetchPov = async (povId) => {
  try {
    const pov = await client.get(`${config.apiUrl}/api/povs/${povId}`);
    return await pov;
  } catch (error) {
    throw error;
  }
};

export const fetchPovsByOwner = async (userId, credentials) => {
  try {
    const povsByOwner = await client.get(
      `${config.apiUrl}/api/povs/by/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + credentials,
        },
      }
    );
    return await povsByOwner;
  } catch (error) {
    throw error;
  }
};

export const createPoV = async (pov, credentials) => {
  try {
    const povCreated = await client.post(`${config.apiUrl}/api/povs/`, pov, {
      headers: {
        Authorization: "Bearer " + credentials,
      },
    });
    return await povCreated;
  } catch (error) {
    throw error;
  }
};

export const updatePoV = async (userId, povId, pov, credentials) => {
  try {
    const povUpdated = await client.put(
      `${config.apiUrl}/api/povs/by/${userId}/${povId}`,
      pov,
      {
        headers: {
          Authorization: "Bearer " + credentials,
        },
      }
    );
    return await povUpdated;
  } catch (error) {
    throw error;
  }
};

export const deletePoV = async (userId, povId, credentials) => {
  try {
    const povDeleted = await client.delete(
      `${config.apiUrl}/api/povs/by/${userId}/${povId}`,
      {
        headers: {
          Authorization: "Bearer " + credentials,
        },
      }
    );
    return await povDeleted;
  } catch (error) {
    throw error;
  }
};
