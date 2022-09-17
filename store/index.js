import Vuex from "vuex";
import Cookies from "js-cookie";
import axios from "axios";

const ctreateStore = () => {
  return new Vuex.Store({
    state: {
      loadPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadPosts = posts;
      },
      addPost(state, post) {
        state.loadPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadPosts.findIndex(
          (post) => post.id === editedPost.id
        );

        state.loadPosts[postIndex] = editedPost;
      },

      setToken(state, token) {
        state.token = token;
      },

      clearToken(state) {
        state.token = null;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.$axios
          .get("/posts.json")
          .then((resposnse) => {
            const postsArray = [];
            for (const key in resposnse.data) {
              postsArray.push({ ...resposnse.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch((e) => context.error(e));
      },

      addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() };
        return axios
          .post(
            "https://nuxt-blog-4c15e-default-rtdb.firebaseio.com/posts.json?auth=" +
              vuexContext.state.token,
            createdPost
          )
          .then((result) =>
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name,
            })
          )
          .catch((e) => console.log(e));
      },

      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
            {
              ...editedPost,
              updatedDate: new Date(),
            }
          )
          .then((res) => vuexContext.commit("editPost", editedPost))
          .catch((e) => console.log(e));
      },

      setPosts(context, posts) {
        context.commit("setPosts", posts);
      },

      authenticateUser(vuexContext, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;

        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + +result.expiresIn * 1000
            );
            Cookies.set("jwt", result.idToken);
            Cookies.set(
              "expirationDate",
              new Date().getTime() + +result.expiresIn * 1000
            );
          })
          .catch((er) => {
            console.log(er);
          });
      },

      initAuth(vuexContext, req) {
        let token;
        let tokenExpiration;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }

          token = jwtCookie.split("=")[1];
          tokenExpiration = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          tokenExpiration = localStorage.getItem("tokenExpiration");
        }

        if (new Date().getTime() > +tokenExpiration || !token) {
          vuexContext.dispatch("logout");
          return;
        }

        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookies.remove("jwt");
        Cookies.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
    },
    getters: {
      loadPosts(state) {
        return state.loadPosts;
      },
      isAuthenticated(state) {
        return !!state.token;
      },
    },
  });
};

export default ctreateStore;
