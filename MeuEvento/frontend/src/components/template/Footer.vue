<template>
  <footer class="footer">
      <span>Copyright <strong>MeuEvento</strong> 2022 </span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background: linear-gradient(to right, #1e469a, #49a7c1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
