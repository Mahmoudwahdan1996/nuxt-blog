<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadPost.updatedDate | date }}
        </div>
        <div class="post-detail">Written by {{ loadPost.author }}</div>
      </div>
      <p class="post-content">{{ loadPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about post , send mail to
        <a href="mailto:feedback@my-awesome-domain.com"
          >feedback@my-awesome-domain.com</a
        >
      </p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    console.log(context);
    return context.$axios
      .get(`/posts/${context.params.id}.json`)
      .then((res) => {
        return {
          loadPost: res.data,
        };
      })
      .catch((e) => context.error(e));
  },
  head: { title: "A Blog post" },
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
