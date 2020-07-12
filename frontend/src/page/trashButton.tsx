import {API_ALL_THREADS_ID, API_POST_DELETE, ClientPost} from "../../../common/common";
import {Auth, abortableJsonFetch} from "../shared/shared";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {cacheDelete} from "../shared/cache";

interface TrashButtonProps {
  post: ClientPost;
  onTrashed: () => void;
}

export const TrashButton: React.FC<TrashButtonProps> = (props) =>
  <IconButton onClick={async () => {
    await abortableJsonFetch(API_POST_DELETE, Auth.Required, {id: props.post.id});

    // Delete it as part of this thread, and as the thread itself (if it is one).
    cacheDelete(props.post.threadId, props.post);
    cacheDelete(API_ALL_THREADS_ID, props.post);

    props.onTrashed();
  }}>
    <DeleteIcon/>
  </IconButton>;
