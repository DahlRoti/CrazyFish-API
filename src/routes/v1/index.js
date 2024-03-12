import usersRoute from "./users/route.js";
import uploadRoute from "./upload/route.js";
import articlesRoute from "./articles/route.js";
import actionsRoute from "./actions/route.js";
import commentsRoute from "./comments/route.js";
import forumpostsRoute from "./forumposts/route.js";
import interactionRoute from "./interaction/route.js";
import resourcesRoute from "./resources/route.js";
import forumthreadsRoute from "./forumthreads/route.js";

const routes = [

  {
    url: "articles",
    route: articlesRoute,
  },
  {
    url: "actions",
    route: actionsRoute,
  },
  {
    url: "comments",
    route: commentsRoute,
  },
  {
    url: "forumposts",
    route: forumpostsRoute,
  },
  {
    url: "forumthreads",
    route: forumthreadsRoute,
  },
  {
    url: "resources",
    route: resourcesRoute,
  },
  {
    url: "interaction",
    route: interactionRoute,
  },
  {
    url: "users",
    route: usersRoute,
  },
  {
    url: "upload",
    route: uploadRoute,
  },

];

export const V1 = routes.map((e) => {
  e.url = "v1/" + e.url;
  return e;
});
