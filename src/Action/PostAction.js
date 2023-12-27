import * as PostApi from "../Api/PostRequest.js";

export const getTimelinePostOfUser = (id) => async (dispatch) => {
  dispatch({ type: "POST_START" });
  try {
    const { data } = await PostApi.getTimelinePostOfUser(id);
    dispatch({ type: "POST_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "POST_FAIL" });
  }
};
